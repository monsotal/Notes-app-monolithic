#!/bin/bash

# Start the Node.js server
cd /home/ubuntu/Notes-app-monolithic/notes-app-server
pm2 start npm -- start &

# Start the Nginx server
nginx -g 'daemon off;'