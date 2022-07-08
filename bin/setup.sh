#!/bin/bash
# setup.sh
# @param $1=DB_HOST, $2=DB_USER, $3=DB_PASSWORD, $4=DB_DATABASE, $5=DB_PORT, $6=DEV_SERVER_URL

echo "==========================================="
echo "1. Install Dependency"
echo "==========================================="
sudo apt-get update
sudo apt-get install npm nginx git -y

echo "==========================================="
echo "2. Repository Check, Git Configure, Pull"
echo "==========================================="
git config --global user.email khsofficial1213@gmail.com
git config --global user.name kangcoder
cd ~
[ -d team3-Backend ] || git clone https://github.com/BiBimBapXOpenStack/team3-Backend.git
cd ~/team3-Backend/
git fetch --all
git reset --hard origin/develop
git pull origin develop


echo "==========================================="
echo "3. Set Nginx"
echo "==========================================="
cd /etc/nginx/sites-enabled
sudo rm default
cd ~/team3-Backend/bin/config
sudo sed -i team3-Backend.conf
sudo cp team3-Backend.conf /etc/nginx/sites-enabled
echo "*** sites-enabled/team3-Backend.conf ***"
sudo cat /etc/nginx/sites-enabled/team3-Backend.conf


echo "==========================================="
echo "4. Build"
echo "==========================================="
cd ~/team3-Backend/server
sudo npm install
sudo npm install nodemon -g

echo "==========================================="
echo "5. Nginx restart"
echo "==========================================="
sudo systemctl start nginx
nodemon app.js