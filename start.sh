#!/bin/sh

# Start the Node.js server using PM2
cd /home/ubuntu/Notes-app-monolithic/notes-app-server
pm2 start npm -- start &

# Remove the default Nginx site (this file doesn't exist in Alpine by default, but just in case)
rm -f /etc/nginx/conf.d/default.conf

# Enable custom Nginx configuration
ln -s /etc/nginx/conf.d/notes-app /etc/nginx/conf.d/notes-app.conf

# Add execute permissions to the relevant directories (if needed, although this might not be necessary for directories)
chmod +x /home/ubuntu
chmod +x /home/ubuntu/Notes-app-monolithic
chmod +x /home/ubuntu/Notes-app-monolithic/notes-app-ui

# Start the Nginx server in the foreground (daemon off mode)
nginx -g 'daemon off;'
