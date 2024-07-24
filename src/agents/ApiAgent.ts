import { ConversationMessage, ParticipantRole } from "../types";
import { Agent, AgentOptions } from "./agent";
import { Logger } from "../utils/logger";
import https from 'https';
import { URL } from 'url';


export interface ApiAgentOptions extends AgentOptions {
    endpoint: string;
    streaming?: boolean;
    headersCallback?: () => Record<string, string>
    inputPayloadEncoder?: (inputText: string, ...additionalParams: any) => any; 
    outputPayloadDecoder?: (response: any) => any;
}

export class ApiAgent extends Agent {

    private options: ApiAgentOptions;

    constructor(options: ApiAgentOptions) {
        super(options);
        this.options = options;
    }

    async  *streamingPost(url: string, payload: any): AsyncGenerator<string, void, unknown> {
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        // Merge default headers with callback headers if provided
        const headers = this.options.headersCallback ? { ...defaultHeaders, ...this.options.headersCallback() } : defaultHeaders;

        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(payload),
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        if (!response.body) {
          throw new Error('Response body is null');
        }
      
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
      
        try {
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              break;
            }
            
            const chunk = decoder.decode(value, { stream: true });
            const message = this.options.outputPayloadDecoder(chunk);
            yield message;
          }
        } finally {
          reader.releaseLock();
        }
    }

    async postRequest(url: string, payload: any): Promise<any> {
        try {
          const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
      
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
        
            const { done, value } = await reader.read();
            const chunk = decoder.decode(value, { stream: false });
            return  chunk;
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      }

    async processRequest(
        inputText: string,
        userId: string,
        sessionId: string,
        chatHistory: ConversationMessage[],
        additionalParams?: Record<string, string>
      ): Promise<ConversationMessage | AsyncIterable<any>> {

        if (this.options.streaming) {
            return this.streamingPost(this.options.endpoint, this.options.inputPayloadEncoder(inputText, chatHistory));
        } 
        else 
        {
            const response = await this.postRequest(this.options.endpoint, this.options.inputPayloadEncoder(inputText, chatHistory));
            const content = this.options.outputPayloadDecoder(response);
            return Promise.resolve({ role: ParticipantRole.ASSISTANT, content: [{ text: content}] });
        }
      }
}