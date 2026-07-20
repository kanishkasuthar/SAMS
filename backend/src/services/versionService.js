const { VersionHistory } = require('../models');
const models = require('../models');
const AppError = require('../utils/AppError');

/**
 * Creates a new version snapshot
 */
exports.createVersion = async (moduleName, entityType, entityId, snapshot, changedBy, changeReason = null, changeType = 'Update') => {
  try {
    // Find highest version number for this entity
    const latestVersion = await VersionHistory.findOne({
      where: { entityType, entityId },
      order: [['versionNumber', 'DESC']]
    });

    const nextVersionNumber = latestVersion ? latestVersion.versionNumber + 1 : 1;
    const previousVersionId = latestVersion ? latestVersion.id : null;

    const version = await VersionHistory.create({
      module: moduleName,
      entityType,
      entityId,
      versionNumber: nextVersionNumber,
      changeType,
      snapshot,
      changedBy,
      changeReason,
      previousVersionId
    });

    return version;
  } catch (error) {
    console.error('Failed to create version history:', error);
    throw new AppError('Version creation failed', 500);
  }
};

/**
 * Deep compares two JSON snapshots and returns the differences
 */
exports.compareVersions = async (versionId1, versionId2) => {
  const v1 = await VersionHistory.findByPk(versionId1);
  const v2 = await VersionHistory.findByPk(versionId2);

  if (!v1 || !v2) throw new AppError('One or both versions not found', 404);
  if (v1.entityId !== v2.entityId) throw new AppError('Cannot compare versions of different entities', 400);

  const diff = {
    added: {},
    removed: {},
    changed: {}
  };

  const snap1 = v1.snapshot || {};
  const snap2 = v2.snapshot || {};

  // Simple deep compare for top-level keys
  const allKeys = new Set([...Object.keys(snap1), ...Object.keys(snap2)]);

  allKeys.forEach(key => {
    if (!(key in snap1)) {
      diff.added[key] = snap2[key];
    } else if (!(key in snap2)) {
      diff.removed[key] = snap1[key];
    } else if (JSON.stringify(snap1[key]) !== JSON.stringify(snap2[key])) {
      diff.changed[key] = {
        oldValue: snap1[key],
        newValue: snap2[key]
      };
    }
  });

  return {
    version1: { id: v1.id, versionNumber: v1.versionNumber },
    version2: { id: v2.id, versionNumber: v2.versionNumber },
    diff
  };
};

/**
 * Restores a target entity back to a previous version's snapshot
 */
exports.restoreVersion = async (versionId, restoredByUserId, restoreReason = 'Manual Restore') => {
  const targetVersion = await VersionHistory.findByPk(versionId);
  if (!targetVersion) throw new AppError('Target version not found', 404);

  const EntityModel = models[targetVersion.entityType];
  if (!EntityModel) throw new AppError(`Entity model ${targetVersion.entityType} not found in registry`, 400);

  const targetEntity = await EntityModel.findByPk(targetVersion.entityId);
  if (!targetEntity) throw new AppError(`Target entity not found. It may have been permanently deleted.`, 404);

  // Exclude primary keys or system managed fields from being overwritten by the snapshot if needed
  // For basic restore, we apply the snapshot payload directly.
  const payload = { ...targetVersion.snapshot };
  delete payload.id; // Usually we don't want to mess with the PK

  await targetEntity.update(payload);

  // Create the new "Restore" version showing the entity has bounced back
  const newSnapshot = targetEntity.get({ plain: true });
  
  const restoreLog = await this.createVersion(
    targetVersion.module,
    targetVersion.entityType,
    targetVersion.entityId,
    newSnapshot,
    restoredByUserId,
    restoreReason,
    'Restore'
  );

  return restoreLog;
};

/**
 * Gets timeline for a single entity
 */
exports.getEntityTimeline = async (entityType, entityId) => {
  return await VersionHistory.findAll({
    where: { entityType, entityId },
    order: [['versionNumber', 'DESC']]
  });
};
