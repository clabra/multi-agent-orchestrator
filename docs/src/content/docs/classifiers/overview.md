---
title: Classifier overview
description: An introduction to the Classifier in the Multi-Agent Orchestrator
---

The Classifier is a crucial component of the Multi-Agent Orchestrator, responsible for analyzing user input and identifying the most appropriate agents. The orchestrator supports multiple classifier implementations, with Bedrock Classifier and Anthropic Classifier being the primary options.

## Available Classifiers

- **[Bedrock Classifier](/multi-agent-orchestrator/classifiers/built-in/bedrock-classifier)** leverages Amazon Bedrock's AI models for intent classification. It is the default classifier used by the orchestrator.

- **[Anthropic Classifier](/multi-agent-orchestrator/classifiers/built-in/anthropic-classifier)** uses Anthropic's AI models, for intent classification. It provides an alternative option for users who prefer or have access to Anthropic's services.

### Process Flow
Regardless of the classifier used, the general process remains the same:
1. User input is collected by the orchestrator.
2. The Classifier performs input analysis, considering:
   - Conversation history across all agents
   - Individual agent profiles and capabilities
3. The most suitable agent is determined.

### Initialization

When you create a new Orchestrator by initializing a `MultiAgentOrchestrator` the default Bedrock Classifier is initialized. 

```typescript
const orchestrator = new MultiAgentOrchestrator();
```


To use the Anthropic Classifier, you can pass it as an option:

```typescript
import { AnthropicClassifier } from "multi-agent-orchestrator";

const anthropicClassifier = new AnthropicClassifier({
  apiKey: 'your-anthropic-api-key'
});
const orchestrator = new MultiAgentOrchestrator({ classifier: anthropicClassifier });
```

## Custom Classifier Implementation

You can provide your own custom implementation of the classifier by extending the abstract `Classifier` class. For details on how to do this, please refer to the [Custom Classifier](/multi-agent-orchestrator/classifiers/custom-classifier) section.

## Testing

You can test any Classifier directly using the `classifyIntent` method:

```typescript
const response = await orchestrator.classifyIntent(userInput, userId, sessionId);
console.log('\n** RESPONSE ** \n');
console.log(` > Agent ID: ${response.selectedAgent?.id}`);
console.log(` > Agent Name: ${response.selectedAgent?.name}`);
console.log(` > Confidence: ${response.confidence}\n`);
```

This allows you to:
- Verify the Classifier's decision-making process
- Test different inputs and conversation scenarios
- Fine-tune the system prompt or agent descriptions

## Common Issues

- **Misclassification**: If you notice frequent misclassifications, review and update agent descriptions or adjust the system prompt.
- **API Key Issues**: For AnthropicClassifier, ensure your API key is valid and properly configured.
- **Model Availability**: For BedrockClassifier, ensure you have access to the specified Amazon Bedrock model in your AWS account.

## Choosing the Right Classifier

When deciding between different classifiers, consider:

1. **API Access**: Which service you have access to and prefer.
2. **Model Performance**: Test classifiers with your specific use case to determine which performs better for your needs.
3. **Cost**: Compare the pricing structures for your expected usage.

By thoroughly testing and debugging your chosen Classifier, you can ensure accurate intent classification and efficient query routing in your Multi-Agent Orchestrator.

---

For more detailed information on each classifier, refer to the [BedrockClassifier](/multi-agent-orchestrator/classifiers/built-in/bedrock-classifier) and [AnthropicClassifier](/classifiers/built-in/anthropic-classifier) documentation pages.

