const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const logger = require('./src/utils/logger');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();
const { sequelize } = require('./src/config/database');

const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const roleRoutes = require('./src/routes/roleRoutes');
const departmentRoutes = require('./src/routes/departmentRoutes');
const matrixRoutes = require('./src/routes/matrixRoutes');
const specializedAssignmentRoutes = require('./src/routes/specializedAssignmentRoutes');
const decisionFlowRoutes = require('./src/routes/decisionFlowRoutes');
const decisionRequestRoutes = require('./src/routes/decisionRequestRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const notificationPreferenceRoutes = require('./src/routes/notificationPreferenceRoutes');
const notificationTemplateRoutes = require('./src/routes/notificationTemplateRoutes');
const reportRoutes = require('./src/routes/reportRoutes');
const analyticsRoutes = require('./src/routes/analyticsRoutes');
const auditRoutes = require('./src/routes/auditRoutes');
const versionRoutes = require('./src/routes/versionRoutes');
const settingsRoutes = require('./src/routes/settingsRoutes');
const aiRoutes = require('./src/routes/aiRoutes');
const auditMiddleware = require('./src/middlewares/auditMiddleware');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(hpp()); // Protect against HTTP Parameter Pollution
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(express.json());

// Global Rate Limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', globalLimiter);

// Specific Auth Limiter
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Too many login attempts from this IP, please try again after 15 minutes'
});
app.use('/api/auth/', authLimiter);

// Swagger API Documentation Setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SAMS API Documentation',
      version: '1.0.0',
      description: 'API Documentation for the SAMS Backend System'
    },
    servers: [
      { url: 'http://localhost:3000' }
    ]
  },
  apis: ['./src/routes/*.js']
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Global Audit Middleware
app.use(auditMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/responsibility-matrices', matrixRoutes);
app.use('/api/responsibility-assignments', specializedAssignmentRoutes);
app.use('/api/responsibility-matrix', matrixRoutes); // Keeping for backward compatibility temporarily if needed
app.use('/api/decision-flows', decisionFlowRoutes);
app.use('/api/decision-requests', decisionRequestRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/notification-preferences', notificationPreferenceRoutes);
app.use('/api/notification-templates', notificationTemplateRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/audit-logs', auditRoutes);
app.use('/api/version-history', versionRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/ai', aiRoutes);

// Health Check Route
app.get('/api/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ status: 'success', message: 'SAMS API and Database are healthy', uptime: process.uptime() });
  } catch (err) {
    logger.error('Health check failed', err);
    res.status(503).json({ status: 'error', message: 'Database connection failed' });
  }
});

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'SAMS API is running' });
});

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connected successfully.');
    
    // Sync models (in development)
    require('./src/models');
    await sequelize.sync();
    
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;
