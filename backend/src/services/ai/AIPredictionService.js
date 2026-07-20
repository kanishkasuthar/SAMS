const AIProviderService = require('./AIProviderService');
const PromptBuilderService = require('./PromptBuilderService');

class AIPredictionService {
  async generatePredictions() {
    const context = await PromptBuilderService.buildContextFromAnalytics();
    const prompt = PromptBuilderService.buildPredictionPrompt(context);
    
    const result = await AIProviderService.generateCompletion(prompt);
    
    return {
      prediction: result.text,
      metadata: {
        provider: result.providerName,
        tokensUsed: result.tokensUsed,
        responseTime: result.responseTime
      }
    };
  }
}

module.exports = new AIPredictionService();
