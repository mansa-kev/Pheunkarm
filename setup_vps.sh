#!/bin/bash
set -e

echo "Updating system..."
sudo apt-get update
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y unzip curl nginx certbot python3-certbot-nginx

echo "Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs

echo "Installing PM2..."
sudo npm install -g pm2

echo "Setting up backend..."
cd /home/ubuntu
unzip -o backend.zip
cd whop-backend
npm install
npm run build

echo "Starting PM2..."
pm2 delete whop-backend || true
pm2 start dist/index.js --name whop-backend
pm2 save
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu

echo "Configuring Nginx..."
sudo bash -c 'cat > /etc/nginx/sites-available/pay.pheunkarm.online <<EOF
server {
    listen 80;
    server_name pay.pheunkarm.online;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF'

sudo ln -sf /etc/nginx/sites-available/pay.pheunkarm.online /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

echo "Running Certbot..."
sudo certbot --nginx -d pay.pheunkarm.online --non-interactive --agree-tos -m admin@pheunkarm.online

echo "Setup complete!"
