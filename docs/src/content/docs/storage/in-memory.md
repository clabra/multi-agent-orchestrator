---
title: In-Memory Storage
description: Using in-memory storage for conversation history in the Multi-Agent Orchestrator System
---

In-memory storage is the default storage option for the Multi-Agent Orchestrator System. It provides a quick and efficient way to store conversation history, making it ideal for development, testing, or scenarios where long-term persistence is not required.

## Features

- Fast read and write operations
- No additional setup or external dependencies
- Perfect for local development and testing environments

## When to Use In-Memory Storage

- During development and testing phases
- For applications with short-lived sessions
- When persistence across application restarts is not necessary

## Implementation

To use in-memory storage in your Multi-Agent Orchestrator:

```typescript
import { MemoryStorage } from './MemoryStorage';
import { MultiAgentOrchestrator } from './MultiAgentOrchestrator';

const memoryStorage = new MemoryStorage();
const orchestrator = new MultiAgentOrchestrator(memoryStorage);
```

## Considerations

- Data is lost when the application restarts or crashes
- Not suitable for distributed systems or applications requiring data persistence
- Limited by available memory on the host machine

## Best Practices

- Use in-memory storage for rapid prototyping and development
- Implement proper error handling to manage potential memory constraints
- Consider switching to a persistent storage option like DynamoDB for production deployments

In-memory storage provides a straightforward and efficient solution for managing conversation history in scenarios where long-term data persistence is not a requirement. It allows for quick setup and is particularly useful during the development and testing phases of your Multi-Agent Orchestrator System implementation.