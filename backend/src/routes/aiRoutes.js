const express = require('express');
const aiController = require('../controllers/aiController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

// Basic Rate Limiting middleware stub (in a real app, use express-rate-limit)
const rateLimiter = (req, res, next) => {
  // Simple pass-through for now, robust implementation requires installing the package
  next();
};

// Protect all AI routes
router.use(protect);
router.use(restrictTo('Super Admin', 'Admin', 'Executive'));
router.use(rateLimiter); // Apply rate limiting to prevent LLM abuse

router.get('/overview', aiController.getOverview);
router.get('/insights', aiController.getInsights);
router.get('/recommendations', aiController.getRecommendations);
router.get('/summaries', aiController.generateSummary);
router.get('/predictions', aiController.getPredictions);

router.post('/query', aiController.naturalLanguageQuery);
router.post('/generate-summary', aiController.generateSummary); // explicit trigger
router.post('/generate-report', aiController.generateReport); // massive trigger

module.exports = router;
