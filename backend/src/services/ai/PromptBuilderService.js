const analyticsService = require('../analyticsService');
const reportService = require('../reportService');

class PromptBuilderService {
  
  /**
   * Generates a dense context string without hitting the DB directly.
   * Reuses analytics endpoints to feed the AI.
   */
  async buildContextFromAnalytics() {
    // We mock fetching this from Analytics Service directly
    // In real implementation: const overview = await analyticsService.getOverviewKPIs();
    // For now, we simulate what the analytics service would return:
    
    const context = `
      Current Organization State:
      Total Users: 150
      Active Departments: 5
      Pending Workflows: 15
      Delayed Workflows ( > 48h ): 3
      Recent Roles Created: 2
    `;

    return context;
  }

  buildSummaryPrompt(context, focusArea = 'General Health') {
    return `
      You are an AI Executive Assistant for the SAMS Organization System.
      Based on the following data context, generate an executive summary focusing on ${focusArea}.
      
      DATA CONTEXT:
      ${context}

      Respond clearly and concisely.
    `;
  }

  buildInsightPrompt(context) {
    return `
      Analyze the following organizational data. Return a JSON array of insights.
      Each insight must have: title, category (Health/Bottleneck/Workload), summary, confidenceScore (0.0-1.0), severity (Low/Medium/High/Critical).
      
      DATA CONTEXT:
      ${context}
    `;
  }

  buildRecommendationPrompt(context) {
    return `
      Analyze the following organizational data. Return a JSON array of actionable recommendations.
      Each recommendation must have: recommendationType (Optimization/Cleanup), title, description, priority (Low/Medium/High), relatedModule.
      
      DATA CONTEXT:
      ${context}
    `;
  }

  buildPredictionPrompt(context) {
    return `
      Analyze the following historical data and predict upcoming trends.
      Return a response predicting approval delays and workload growth.
      
      DATA CONTEXT:
      ${context}
    `;
  }
}

module.exports = new PromptBuilderService();
