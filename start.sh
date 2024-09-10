#!/bin/sh

# Start the Node.js server using PM2
cd /home/ubuntu/Notes-app-monolithic/notes-app-server
pm2 start npm -- start &

# Remove the default Nginx site if exists(this file doesn't exist in Alpine by default, but just in case)
rm -f /etc/nginx/sites-enabled/default

# Enable custom Nginx configuration
ln -s /etc/nginx/sites-available/notes-app /etc/nginx/sites-enabled/

# Add execute permissions to the relevant directories (if needed, although this might not be necessary for directories)
chmod +x /home/ubuntu
chmod +x /home/ubuntu/Notes-app-monolithic
chmod +x /home/ubuntu/Notes-app-monolithic/notes-app-ui

# Start the Nginx server in the foreground (daemon off mode)
nginx -g 'daemon off;'
