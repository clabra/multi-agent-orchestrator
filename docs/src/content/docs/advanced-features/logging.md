---
title: Logging in Multi-Agent Orchestrator
description: Understanding how to use a custom logger in Multi-Agent Orchestrator
---


The Multi-Agent Orchestrator provides flexible logging capabilities that can be customized to suit your needs. This document explains how logging works in the orchestrator and how you can configure it.

## Default Logging Behavior

By default, the orchestrator uses `console.log` for logging. This means that all log messages will be printed to the console without any additional configuration.

## Customizing the Logger

The orchestrator allows you to override the default logger with a custom logging solution. 

This is done through the `OrchestratorOptions` interface:

```typescript
export interface OrchestratorOptions {
  storage?: ChatStorage;
  config?: Partial<OrchestratorConfig>;
  logger?: any;
}
```

You can provide your own logger implementation to the `logger` property when initializing the `MultiAgentOrchestrator`.

## Example: Using AWS Lambda Powertools for Logging

Here's an example of how to use AWS Lambda Powertools for logging with the Multi-Agent Orchestrator:

1. First, install the AWS Lambda Powertools package:

```bash
npm install @aws-lambda-powertools/logger
```

2. Import and initialize the Logger from AWS Lambda Powertools:

```typescript
import { Logger } from "@aws-lambda-powertools/logger";

const logger = new Logger({
  logLevel: "INFO",
  serviceName: "MyOrchestratorService"
});
```

3. Create the orchestrator instance with the custom logger:

```typescript
const orchestrator = new MultiAgentOrchestrator({
  storage: storage,
  config: {
    LOG_AGENT_CHAT: true,
    LOG_CLASSIFIER_CHAT: true,
    LOG_CLASSIFIER_RAW_OUTPUT: true,
    LOG_CLASSIFIER_OUTPUT: true,
    LOG_EXECUTION_TIMES: true,
  },
  logger: logger,
});
```

In this example, we're using the AWS Lambda Powertools Logger and configuring various logging options for the orchestrator.

## Logging Configuration Options

The `config` object in `OrchestratorOptions` allows you to fine-tune what information is logged:

- `LOG_AGENT_CHAT`: Logs the chat interactions with agents
- `LOG_CLASSIFIER_CHAT`: Logs the chat interactions with the classifier
- `LOG_CLASSIFIER_RAW_OUTPUT`: Logs the raw output from the classifier
- `LOG_CLASSIFIER_OUTPUT`: Logs the processed output from the classifier
- `LOG_EXECUTION_TIMES`: Logs the execution times of various operations

By setting these options to `true` or `false`, you can control the verbosity of the logging to suit your needs.

## Best Practices

1. In production environments, consider using a robust logging solution like AWS CloudWatch Logs or a centralized logging service.
2. Be mindful of sensitive information in logs, especially when logging chat contents.
3. Use appropriate log levels (e.g., INFO, DEBUG, ERROR) to categorize your log messages.
4. Monitor your logs regularly to track the performance and behavior of your orchestrator.

By leveraging these logging capabilities, you can gain valuable insights into the operation of your Multi-Agent Orchestrator and more easily diagnose any issues that may arise.