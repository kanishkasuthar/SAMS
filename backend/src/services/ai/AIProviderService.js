const MockProvider = require('./providers/MockProvider');
// Future providers like OpenAIProvider, AzureProvider would be imported here

class AIProviderService {
  constructor() {
    this.provider = this._resolveProvider();
  }

  /**
   * Factory method to resolve which AI Provider to use based on System Settings / ENV
   */
  _resolveProvider() {
    // In a full implementation, this would read from SystemSettings Cache
    // const settings = settingsService.getSystemSettingsByCategory('AI');
    // const activeProvider = settings.find(s => s.settingKey === 'ACTIVE_PROVIDER')?.settingValue;
    
    const activeProvider = process.env.AI_PROVIDER || 'Mock';

    switch (activeProvider) {
      case 'Mock':
        return new MockProvider();
      // case 'OpenAI':
      //   return new OpenAIProvider();
      default:
        console.warn(`Unknown AI Provider: ${activeProvider}. Falling back to MockProvider.`);
        return new MockProvider();
    }
  }

  /**
   * Universal interface for sending a prompt and getting a response
   */
  async generateCompletion(prompt, systemInstruction = '') {
    const start = Date.now();
    const result = await this.provider.generateCompletion(prompt, systemInstruction);
    const responseTime = Date.now() - start;

    return {
      text: result.text,
      tokensUsed: result.tokensUsed || 0,
      responseTime,
      providerName: this.provider.name
    };
  }

  /**
   * Universal interface for generating JSON-structured insights
   */
  async generateStructuredData(prompt, schemaDefinition) {
    const start = Date.now();
    const result = await this.provider.generateStructuredData(prompt, schemaDefinition);
    const responseTime = Date.now() - start;

    return {
      data: result.data,
      tokensUsed: result.tokensUsed || 0,
      responseTime,
      providerName: this.provider.name
    };
  }
}

module.exports = new AIProviderService();
