#!/bin/bash

apt-get install git -y
apt-get install nodejs -y

# mongodb
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

mkdir -p ~/nodejsserver
cd ~/nodejsserver

git clone https://github.com/pppepito86/lego_scoring_rest.git --depth=1

apt-get install npm -y

cd lego_scoring_rest
npm install

mkdir -p /data/db
chmod -R 777 /data/db/
mongod &

https://deb.nodesource.com/setup_6.x | sudo -E bash -
apt-get install -y build-essential
apt-get install nodejs-legacy

node app.js &

curl http://localhost:8085/load
