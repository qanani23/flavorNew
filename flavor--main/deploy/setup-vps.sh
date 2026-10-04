#!/usr/bin/env bash
# ── FLAVOR COFFEE ROASTERS — ETHIOTELECOM CLOUD VPS HARDENING SCRIPT ─────────
# Target OS: Ubuntu 22.04 / 24.04 LTS

set -euo pipefail

echo "================================================================="
echo "  Flavor Coffee Roasters — EthioTelecom Cloud VPS Hardening"
echo "================================================================="

# 1. Update System Packages
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw fail2ban unattended-upgrades nginx certbot python3-certbot-nginx

# 2. Configure Automatic Security Updates
sudo dpkg-reconfigure -f noninteractive unattended-upgrades

# 3. Configure UFW Firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp comment 'SSH'
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'
# Explicitly block public access to internal Node API port 3001
sudo ufw deny 3001/tcp comment 'Block internal Node API port'
sudo ufw --force enable
sudo ufw status verbose

# 4. Configure Fail2Ban for SSH
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
sudo cat << 'EOF' | sudo tee /etc/fail2ban/jail.local
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 4
findtime = 600
bantime = 3600
EOF
sudo systemctl restart fail2ban

# 5. Install Node.js 22 LTS & PM2
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2 pm2-logrotate

# Configure PM2 log rotation
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 14

echo "================================================================="
echo "  VPS Foundation Hardened Successfully!"
echo "================================================================="
