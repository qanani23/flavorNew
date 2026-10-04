# Flavor Coffee Roasters — Secret Key Rotation & Incident Response Protocol

## 1. Secrets Scope & Rotation Triggers
The production API relies on two critical environment secrets stored exclusively in `/var/www/flavorcoffee/server/.env`:
1. `RESEND_API_KEY`: Used for sending transactional export inquiry emails.
2. `TURNSTILE_SECRET_KEY`: Used for server-side bot challenge verification.

### Rotation Triggers:
- Scheduled bi-annual security rotation.
- Any unauthorized disclosure or accidental commit into Git history.
- Employee offboarding with access to cloud dashboards.

---

## 2. Key Rotation Procedure

### Step 1: Generate Replacement Secret
1. **Resend API Key**: Log in to [Resend Dashboard](https://resend.com/api-keys) $\rightarrow$ Create API Key (`Flavor-Coffee-Prod-v2`).
2. **Turnstile Secret Key**: Log in to [Cloudflare Turnstile Dashboard](https://dash.cloudflare.com/) $\rightarrow$ Widget Settings $\rightarrow$ Obtain Secret Key.

### Step 2: Update Server Environment Secret
SSH into EthioTelecom Cloud VPS using your non-root administrative account:
```bash
ssh deployer@flavorcoffee.com
sudo nano /var/www/flavorcoffee/server/.env
```
Update the relevant variables:
```env
RESEND_API_KEY="<YOUR_RESEND_API_KEY_HERE>"
TURNSTILE_SECRET_KEY="<YOUR_TURNSTILE_SECRET_KEY_HERE>"
```
Ensure permissions remain strict:
```bash
sudo chmod 600 /var/www/flavorcoffee/server/.env
```

### Step 3: Safely Reload API Service
Reload PM2 process without downtime:
```bash
pm2 reload flavor-coffee-api
```

### Step 4: Verify Functionality
Test `/api/contact` via `curl` or front-end submission to confirm email delivery:
```bash
curl -i -X POST http://127.0.0.1:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Rotation Test","email":"flavorcoffee.team@gmail.com","country":"Ethiopia","coffeeType":"Washed","message":"Test key rotation"}'
```

### Step 5: Revoke Decommissioned Keys
1. In Resend / Cloudflare dashboards, immediately **Delete / Revoke** the old API keys.
2. Verify that requests using old keys return HTTP 403 / failure.
3. Record rotation date in the deployment log.
