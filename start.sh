#!/bin/sh

# Start the Node.js server using PM2
cd /home/ubuntu/Notes-app-monolithic/notes-app-server
pm2 start npm -- start &

# Start the Nginx server in the foreground (daemon off mode)
nginx -g 'daemon off;'
