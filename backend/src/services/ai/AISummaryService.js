const AIProviderService = require('./AIProviderService');
const PromptBuilderService = require('./PromptBuilderService');

class AISummaryService {
  async generateExecutiveSummary() {
    const context = await PromptBuilderService.buildContextFromAnalytics();
    const prompt = PromptBuilderService.buildSummaryPrompt(context, 'Executive Overview');
    
    const result = await AIProviderService.generateCompletion(prompt);
    
    return {
      summary: result.text,
      metadata: {
        provider: result.providerName,
        tokensUsed: result.tokensUsed,
        responseTime: result.responseTime
      }
    };
  }
}

module.exports = new AISummaryService();
