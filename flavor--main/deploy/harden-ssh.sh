#!/usr/bin/env bash
# ── SSH HARDENING SCRIPT FOR ETHIOTELECOM CLOUD VPS ────────────────────────
# Enforces SSH key authentication, disables root login, and disables password auth.

set -euo pipefail

SSHD_CONFIG="/etc/ssh/sshd_config"
SSHD_CONFIG_BAK="/etc/ssh/sshd_config.bak.$(date +%F_%T)"

echo "Backing up existing SSH configuration to ${SSHD_CONFIG_BAK}..."
sudo cp "${SSHD_CONFIG}" "${SSHD_CONFIG_BAK}"

# Update SSH settings safely
sudo sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/' "${SSHD_CONFIG}"
sudo sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' "${SSHD_CONFIG}"
sudo sed -i 's/^#\?PubkeyAuthentication.*/PubkeyAuthentication yes/' "${SSHD_CONFIG}"
sudo sed -i 's/^#\?X11Forwarding.*/X11Forwarding no/' "${SSHD_CONFIG}"
sudo sed -i 's/^#\?MaxAuthTries.*/MaxAuthTries 4/' "${SSHD_CONFIG}"

echo "Validating SSH syntax..."
if sudo sshd -t; then
    echo "SSH syntax is valid! Reloading sshd..."
    sudo systemctl reload sshd
    echo "SSH Hardened successfully!"
    echo "CRITICAL: KEEP YOUR CURRENT TERMINAL OPEN AND TEST SSH IN A NEW WINDOW BEFORE CLOSING!"
else
    echo "ERROR: SSH syntax validation failed! Restoring backup..."
    sudo cp "${SSHD_CONFIG_BAK}" "${SSHD_CONFIG}"
    exit 1
fi
