const express = require('express');
const requestController = require('../controllers/decisionRequestController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/pending', requestController.getPendingRequests);
router.get('/completed', requestController.getCompletedRequests);
router.get('/:id/history', requestController.getHistory);

router.post('/', requestController.createRequest);
router.post('/:id/approve', requestController.approveRequest);
router.post('/:id/reject', requestController.rejectRequest);
router.post('/:id/delegate', requestController.delegateRequest);
router.post('/:id/escalate', requestController.escalateRequest);
router.post('/:id/return', requestController.returnRequest);
router.post('/:id/cancel', requestController.cancelRequest);

module.exports = router;
