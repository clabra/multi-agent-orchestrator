---
title: Open AI Agent
description: Documentation Open AI Agent
---

The `OpenAIAgent` is a powerful agent class in the Multi-Agent Orchestrator framework that integrates with OpenAI's Chat Completion API. This agent allows you to leverage OpenAI's language models, such as GPT-3.5 and GPT-4, for various natural language processing tasks.

## Key Features

- Integration with OpenAI's Chat Completion API
- Support for multiple OpenAI models
- Streaming and non-streaming response options
- Customizable inference configuration
- Handles conversation history for context-aware responses
- Customizable system prompts

## Creating an OpenAIAgent

To create a new `OpenAIAgent`, you need to provide an `OpenAIAgentOptions` object. Here's an example of how to create an OpenAIAgent:

```typescript
import { OpenAIAgent } from './path-to-openai-agent';

const agent = new OpenAIAgent({
  name: 'OpenAI Assistant',
  description: 'A versatile AI assistant powered by OpenAI models',
  apiKey: 'your-openai-api-key',
  model: 'gpt-3.5-turbo',
  streaming: true,
  inferenceConfig: {
    maxTokens: 500,
    temperature: 0.7,
    topP: 0.9,
    stopSequences: ['Human:', 'AI:']
  },
  systemPrompt: 'You are a helpful AI assistant specialized in answering questions about technology.'
});
```

### OpenAIAgentOptions

The `OpenAIAgentOptions` extends the base `AgentOptions` and includes the following properties:

- `name` (required): A string representing the name of the agent.
- `description` (required): A string describing the agent's capabilities and expertise.
- `apiKey` (required): Your OpenAI API key.
- `model` (optional): The OpenAI model to use. Defaults to `OPENAI_MODEL_ID_GPT_O_MINI`.
- `streaming` (optional): Whether to use streaming responses. Defaults to `false`.
- `inferenceConfig` (optional): An object to customize the inference behavior:
  - `maxTokens` (optional): The maximum number of tokens to generate. Defaults to 1000.
  - `temperature` (optional): Controls randomness in output generation.
  - `topP` (optional): Controls diversity of output generation.
  - `stopSequences` (optional): An array of sequences that, when generated, will stop the generation process.
- `systemPrompt` (optional): A string representing the initial system prompt for the agent.

## Setting the System Prompt

You can set or update the system prompt for the OpenAIAgent in two ways:

1. During initialization:

```typescript
const agent = new OpenAIAgent({
  // ... other options ...
  systemPrompt: 'You are a helpful AI assistant specialized in answering questions about technology.'
});
```

2. Using the `setSystemPrompt` method after initialization:

```typescript
agent.setSystemPrompt(
  `You are an AI assistant specialized in {{DOMAIN}}.
   Your main goal is to {{GOAL}}.
   Always maintain a {{TONE}} tone in your responses.`,
  {
    DOMAIN: "artificial intelligence",
    GOAL: "explain complex AI concepts in simple terms",
    TONE: "friendly and educational"
  }
);
```

The `setSystemPrompt` method allows you to dynamically change the agent's behavior and focus without creating a new instance. You can use placeholders in the prompt template and provide values for them in the second argument.

## Usage

Once you've created an OpenAIAgent, you can add it to the Multi-Agent Orchestrator and use it to process requests:

```typescript
import { MultiAgentOrchestrator } from "multi-agent-orchestrator";

const orchestrator = new MultiAgentOrchestrator();
orchestrator.addAgent(agent);

const response = await orchestrator.routeRequest(
  "What is the capital of France?",
  "user123",
  "session456"
);
```

## Streaming Responses

If you've enabled streaming (`streaming: true` in the options), the agent will return an AsyncIterable that you can use to process the response in chunks:

```typescript
const streamingResponse = await orchestrator.routeRequest(
  "Tell me a long story about a brave knight",
  "user123",
  "session456"
);

if (Symbol.asyncIterator in streamingResponse) {
  for await (const chunk of streamingResponse) {
    console.log(chunk); // Process each chunk of the response
  }
}
```

## Best Practices

1. **API Key Security**: Ensure your OpenAI API key is kept secure and not exposed in your codebase.
2. **Model Selection**: Choose an appropriate model based on your use case and performance requirements.
3. **Inference Configuration**: Experiment with different inference parameters to find the best balance between response quality and speed.
4. **Error Handling**: Implement additional error handling in your application to manage potential API failures gracefully.
5. **Rate Limiting**: Be aware of OpenAI's rate limits and implement appropriate throttling if necessary.
6. **System Prompts**: Craft clear and specific system prompts to guide the model's behavior and improve response quality for your use case.

By leveraging the OpenAIAgent, you can create sophisticated, context-aware AI agents capable of handling a wide range of tasks and interactions, all powered by OpenAI's state-of-the-art language models.