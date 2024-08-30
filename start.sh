#!/bin/bash

# Start the Node.js server
cd /home/ubuntu/Notes-app-monolithic/notes-app-server
pm2 start npm -- start &


#remove the default site 
rm /etc/nginx/sites-enabled/default

#Enable Nginx configuration
ln -s /etc/nginx/sites-available/notes-app /etc/nginx/sites-enabled/

# Start the Nginx server
nginx -g 'daemon off;'