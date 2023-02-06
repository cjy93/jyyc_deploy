"# jyyc_deploy" 

## How to deploy frontend(React) and backend(Node) on EC2

### Update Ubuntu instance
`sudo apt-get update`

### Upgrade ubuntu system
`sudo apt-get upgrade`

### Install ngnix
`sudo apt-get install nginx -y`

### nginx version
`nginx -v`

### Turn on nginx
go to root folder `cd /`
`sudo systemctl reload nginx`

### Go to security group
inbound rules: accept "HTTP" and from ipv4
reload the public ip and you should see "welcome to nginx"
### Install nodejs ubuntu
```
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash - 
sudo apt-get install -y nodejs
```
### Amazon AWS Filezilla transfer permission denied
chown -R ubuntu /var/www/html
chmod -R 755 /var/www/html

### Create the react project
go to folder "/var/www/html"
npx create-react-app react-tutorial

### Build the react project
cd react-tutorial
npm run build

### Run the project
npm start

### Check app at 
public_ip/3000

### PM2 global
sudo npm i -g pm2@latest

### Tutorial from 
https://www.youtube.com/watch?v=zjuItRMUAcM