const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const OrganizationProfile = sequelize.define('OrganizationProfile', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  organizationName: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Default Organization' },
  organizationCode: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: true },
  website: { type: DataTypes.STRING, allowNull: true },
  address: { type: DataTypes.STRING, allowNull: true },
  city: { type: DataTypes.STRING, allowNull: true },
  state: { type: DataTypes.STRING, allowNull: true },
  country: { type: DataTypes.STRING, allowNull: true },
  postalCode: { type: DataTypes.STRING, allowNull: true },
  logo: { type: DataTypes.STRING, allowNull: true },
  timezone: { type: DataTypes.STRING, defaultValue: 'UTC' },
  currency: { type: DataTypes.STRING, defaultValue: 'USD' },
  dateFormat: { type: DataTypes.STRING, defaultValue: 'YYYY-MM-DD' }
}, {
  timestamps: true,
  tableName: 'organization_profiles'
});

OrganizationProfile.associate = (models) => {};

module.exports = OrganizationProfile;
