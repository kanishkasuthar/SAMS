#!/bin/bash

# SAMS Database Backup Script
# Usage: ./backup-db.sh
# Can be run via crontab, e.g., 0 2 * * * /path/to/sams/scripts/backup-db.sh

BACKUP_DIR="/var/backups/sams_db"
DATE=$(date +%Y-%m-%d_%H-%M-%S)
DB_USER=${DB_USER:-"root"}
DB_PASSWORD=${DB_PASSWORD:-""}
DB_NAME=${DB_NAME:-"sams_db"}
DB_HOST=${DB_HOST:-"localhost"}
RETENTION_DAYS=30

mkdir -p "$BACKUP_DIR"

echo "Starting database backup for $DB_NAME..."

if [ -z "$DB_PASSWORD" ]; then
  mysqldump -h "$DB_HOST" -u "$DB_USER" "$DB_NAME" > "$BACKUP_DIR/$DB_NAME-$DATE.sql"
else
  mysqldump -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" > "$BACKUP_DIR/$DB_NAME-$DATE.sql"
fi

if [ $? -eq 0 ]; then
  echo "Backup successful: $BACKUP_DIR/$DB_NAME-$DATE.sql"
  
  # Compress the backup
  gzip "$BACKUP_DIR/$DB_NAME-$DATE.sql"
  echo "Compressed backup to $BACKUP_DIR/$DB_NAME-$DATE.sql.gz"
  
  # Delete backups older than retention period
  find "$BACKUP_DIR" -name "*.sql.gz" -type f -mtime +$RETENTION_DAYS -delete
  echo "Cleaned up backups older than $RETENTION_DAYS days."
else
  echo "Backup failed!"
  exit 1
fi
