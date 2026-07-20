class MockProvider {
  constructor() {
    this.name = 'MockProvider';
  }

  async generateCompletion(prompt, systemInstruction) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 50));

    let text = "This is a generic mock AI response.";
    
    if (prompt.toLowerCase().includes("summarize") || prompt.toLowerCase().includes("summary")) {
      text = "Mock Summary: The organization is healthy. 5 pending approvals exist. Workload is balanced.";
    } else if (prompt.toLowerCase().includes("predict")) {
      text = "Mock Prediction: Approval delays will increase by 10% next week due to holidays.";
    }

    return {
      text,
      tokensUsed: prompt.length + text.length
    };
  }

  async generateStructuredData(prompt, schemaDefinition) {
    await new Promise(resolve => setTimeout(resolve, 50));

    let data = {};
    
    if (prompt.includes("insights")) {
      data = [
        {
          title: "High Pending Approvals",
          category: "Bottleneck",
          summary: "IT Operations has 15 pending requests exceeding 48 hours.",
          confidenceScore: 0.95,
          severity: "High"
        }
      ];
    } else if (prompt.includes("recommendations")) {
      data = [
        {
          recommendationType: "Optimization",
          title: "Reassign Workflows",
          description: "Shift 3 approval steps from IT Manager to IT Lead to clear bottleneck.",
          priority: "High",
          relatedModule: "DecisionFlow"
        }
      ];
    } else {
      data = { message: "Mock structured response" };
    }

    return {
      data,
      tokensUsed: prompt.length + 100
    };
  }
}

module.exports = MockProvider;
