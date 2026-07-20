const AIProviderService = require('./AIProviderService');
const PromptBuilderService = require('./PromptBuilderService');
const { AIRecommendation } = require('../../models');

class AIRecommendationService {
  async generateRecommendations(userId) {
    const context = await PromptBuilderService.buildContextFromAnalytics();
    const prompt = PromptBuilderService.buildRecommendationPrompt(context);
    
    const result = await AIProviderService.generateStructuredData(prompt, 'AIRecommendationSchema');
    
    const savedRecs = [];
    if (Array.isArray(result.data)) {
      for (const rec of result.data) {
        const saved = await AIRecommendation.create({
          ...rec,
          status: 'Pending'
        });
        savedRecs.push(saved);
      }
    }

    return {
      recommendations: savedRecs,
      metadata: {
        provider: result.providerName,
        tokensUsed: result.tokensUsed,
        responseTime: result.responseTime
      }
    };
  }

  async getActiveRecommendations() {
    return await AIRecommendation.findAll({ where: { status: 'Pending' }, order: [['createdAt', 'DESC']] });
  }
}

module.exports = new AIRecommendationService();
