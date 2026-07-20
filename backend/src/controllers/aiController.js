const AIInsightService = require('../services/ai/AIInsightService');
const AIRecommendationService = require('../services/ai/AIRecommendationService');
const AISummaryService = require('../services/ai/AISummaryService');
const AIPredictionService = require('../services/ai/AIPredictionService');
const AppError = require('../utils/AppError');
const Joi = require('joi');

const querySchema = Joi.object({
  query: Joi.string().min(3).max(1000).required()
});

exports.getOverview = async (req, res, next) => {
  try {
    const insights = await AIInsightService.getActiveInsights();
    const recommendations = await AIRecommendationService.getActiveRecommendations();
    
    res.status(200).json({
      status: 'success',
      data: {
        insights,
        recommendations
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getInsights = async (req, res, next) => {
  try {
    const insights = await AIInsightService.getActiveInsights();
    res.status(200).json({ status: 'success', results: insights.length, data: { insights } });
  } catch (error) {
    next(error);
  }
};

exports.getRecommendations = async (req, res, next) => {
  try {
    const recommendations = await AIRecommendationService.getActiveRecommendations();
    res.status(200).json({ status: 'success', results: recommendations.length, data: { recommendations } });
  } catch (error) {
    next(error);
  }
};

exports.generateSummary = async (req, res, next) => {
  try {
    const summaryData = await AISummaryService.generateExecutiveSummary();
    res.status(200).json({ status: 'success', data: summaryData });
  } catch (error) {
    next(error);
  }
};

exports.getPredictions = async (req, res, next) => {
  try {
    const predictionData = await AIPredictionService.generatePredictions();
    res.status(200).json({ status: 'success', data: predictionData });
  } catch (error) {
    next(error);
  }
};

exports.naturalLanguageQuery = async (req, res, next) => {
  try {
    const { error } = querySchema.validate(req.body);
    if (error) return next(new AppError(error.details[0].message, 400));

    const response = await AIInsightService.processNaturalLanguageQuery(req.user.id, req.body.query);
    res.status(200).json({ status: 'success', data: response });
  } catch (error) {
    next(error);
  }
};

exports.generateReport = async (req, res, next) => {
  try {
    // A heavy orchestrator route that triggers multiple AI endpoints to populate the DB
    const insightsData = await AIInsightService.generateInsights(req.user.id);
    const recsData = await AIRecommendationService.generateRecommendations(req.user.id);
    
    res.status(200).json({ 
      status: 'success', 
      message: 'Comprehensive AI Report Generated Successfully',
      data: {
        insightsGenerated: insightsData.insights.length,
        recommendationsGenerated: recsData.recommendations.length,
        totalTokensUsed: insightsData.metadata.tokensUsed + recsData.metadata.tokensUsed
      }
    });
  } catch (error) {
    next(error);
  }
};
