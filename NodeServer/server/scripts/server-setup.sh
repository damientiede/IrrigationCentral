#Install node and npm
wget https://nodejs.org/dist/v4.3.2/node-v4.3.2-linux-armv6l.tar.gz 
tar -xvf node-v4.3.2-linux-armv6l.tar.gz 
cd node-v4.3.2-linux-armv6l
sudo cp -R * /usr/local/

#mysql
sudo apt-get install mysql-server --fix-missing

#Sequelize
npm install --save sequelize
npm install -g sequelize-cli
npm install cors
npm install --save mysql2

#install yarn
curl -o- -L https://yarnpkg.com/install.sh | bash

# NOTE: need to open a new terminal window to continue with yarn
yarn add sequelize
yarn add mysql2

#install express and dependencies
npm install --save express body-parser morgan

npm install --save moment