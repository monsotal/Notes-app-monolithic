#!/bin/bash

# Start the Node.js server
cd /home/ubuntu/Notes-app-monolithic
pm2 start npm -- start &

# Start the Nginx server
nginx -g 'daemon off;'