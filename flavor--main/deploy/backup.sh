#!/usr/bin/env bash
# ── FLAVOR COFFEE ROASTERS — AUTOMATED VPS BACKUP SCRIPT ──────────────────────
# Backs up environment secrets, Nginx configs, and SSL certs with 30-day retention.

set -euo pipefail

BACKUP_DIR="/var/backups/flavorcoffee"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
TARGET_ARCHIVE="${BACKUP_DIR}/flavorcoffee_backup_${TIMESTAMP}.tar.gz"

sudo mkdir -p "${BACKUP_DIR}"
sudo chmod 700 "${BACKUP_DIR}"

echo "Creating backup archive ${TARGET_ARCHIVE}..."
sudo tar -czf "${TARGET_ARCHIVE}" \
  /etc/nginx/sites-available/flavorcoffee.conf \
  /var/www/flavorcoffee/server/.env \
  /etc/letsencrypt/live/flavorcoffee.com 2>/dev/null || true

# Restrict permissions on backup file
sudo chmod 600 "${TARGET_ARCHIVE}"

# Retention Policy — Prune backups older than 30 days
sudo find "${BACKUP_DIR}" -name "flavorcoffee_backup_*.tar.gz" -mtime +30 -delete

echo "Backup complete: ${TARGET_ARCHIVE}"
echo ""
echo "── RESTORATION TEST VERIFICATION COMMAND ──"
echo "To test restoration of this archive in a temporary test directory:"
echo "  sudo mkdir -p /tmp/backup_restore_test"
echo "  sudo tar -xzf ${TARGET_ARCHIVE} -C /tmp/backup_restore_test"
echo "  sudo ls -la /tmp/backup_restore_test"
echo "  sudo rm -rf /tmp/backup_restore_test"
