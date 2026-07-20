const AIProviderService = require('./AIProviderService');
const PromptBuilderService = require('./PromptBuilderService');
const { AIInsight, AIConversation } = require('../../models');

class AIInsightService {
  async generateInsights(userId) {
    const context = await PromptBuilderService.buildContextFromAnalytics();
    const prompt = PromptBuilderService.buildInsightPrompt(context);
    
    const result = await AIProviderService.generateStructuredData(prompt, 'AIInsightSchema');
    
    const savedInsights = [];
    if (Array.isArray(result.data)) {
      for (const ins of result.data) {
        const saved = await AIInsight.create({
          ...ins,
          generatedBy: userId,
          status: 'Active'
        });
        savedInsights.push(saved);
      }
    }

    return {
      insights: savedInsights,
      metadata: {
        provider: result.providerName,
        tokensUsed: result.tokensUsed,
        responseTime: result.responseTime
      }
    };
  }

  async getActiveInsights() {
    return await AIInsight.findAll({ where: { status: 'Active' }, order: [['generatedAt', 'DESC']] });
  }

  async processNaturalLanguageQuery(userId, query) {
    // Log the prompt to conversation history
    const conversation = await AIConversation.create({
      userId,
      prompt: query,
      response: 'Processing...', // Temporary
      provider: AIProviderService.provider.name
    });

    const context = await PromptBuilderService.buildContextFromAnalytics();
    const fullPrompt = `USER QUERY: ${query}\n\nCONTEXT:\n${context}`;

    const result = await AIProviderService.generateCompletion(fullPrompt);

    // Update conversation log
    await conversation.update({
      response: result.text,
      tokensUsed: result.tokensUsed,
      responseTime: result.responseTime
    });

    return {
      response: result.text,
      conversationId: conversation.id
    };
  }
}

module.exports = new AIInsightService();
