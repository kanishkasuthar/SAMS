const express = require('express');
const templateController = require('../controllers/notificationTemplateController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(restrictTo('Super Admin', 'Admin')); // Templates are strictly admin

router.get('/', templateController.getAllTemplates);
router.post('/', templateController.createTemplate);
router.put('/:id', templateController.updateTemplate);
router.delete('/:id', templateController.deleteTemplate);

module.exports = router;
