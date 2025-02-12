---
title: Custom Agents
description: A guide to creating custom agents in the Multi-Agent Orchestrator System, including an OpenAI agent example
---


The `Agent` abstract class provides a flexible foundation for creating various types of agents. When implementing a custom agent, you can:

1. **Call Language Models**: Integrate with LLMs like GPT-3, BERT, or custom models.
2. **API Integration**: Make calls to external APIs or services.
3. **Data Processing**: Implement data analysis, transformation, or generation logic.
4. **Rule-Based Systems**: Create agents with predefined rules and responses.
5. **Hybrid Approaches**: Combine multiple techniques for more complex behaviors.

Example of a simple custom agent:

```typescript
class SimpleGreetingAgent extends Agent {
  async processRequest(
    inputText: string,
    userId: string,
    sessionId: string,
    chatHistory: Message[]
  ): Promise<Message> {
    return {
      role: "assistant",
      content: [{ text: `Hello! You said: ${inputText}` }]
    };
  }
}
```

## Basic Structure of a Custom Agent

To create a custom agent, you need to extend the base `Agent` class or one of its subclasses. Here's the basic structure:

```typescript
import { Agent, AgentOptions, Message } from './path-to-agent-module';

class CustomAgent extends Agent {
  constructor(options: AgentOptions) {
    super(options);
    // Additional initialization if needed
  }

  async processRequest(
    inputText: string,
    userId: string,
    sessionId: string,
    chatHistory: Message[],
    additionalParams?: Record<string, any>
  ): Promise<Message> {
    // Implement your custom logic here
  }
}
```

---

By creating custom agents, you can extend the capabilities of the Multi-Agent Orchestrator to meet your specific needs, whether that's integrating with external AI services like OpenAI, implementing specialized business logic, or interfacing with other systems and APIs.