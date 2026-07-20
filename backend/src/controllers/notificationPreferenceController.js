const { NotificationPreference } = require('../models');
const AppError = require('../utils/AppError');

exports.getPreferences = async (req, res, next) => {
  try {
    let preference = await NotificationPreference.findOne({
      where: { userId: req.user.id }
    });

    if (!preference) {
      // Create defaults
      preference = await NotificationPreference.create({ userId: req.user.id });
    }

    res.status(200).json({ status: 'success', data: { preference } });
  } catch (error) {
    next(error);
  }
};

exports.updatePreferences = async (req, res, next) => {
  try {
    let preference = await NotificationPreference.findOne({
      where: { userId: req.user.id }
    });

    if (!preference) {
      preference = await NotificationPreference.create({ userId: req.user.id, ...req.body });
    } else {
      await preference.update(req.body);
    }

    res.status(200).json({ status: 'success', data: { preference } });
  } catch (error) {
    next(error);
  }
};
