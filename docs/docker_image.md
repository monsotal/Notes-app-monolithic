# Docker Image Documentation

This document provides a clear explanation of how this Docker image is built and how the application is started within the container. It outlines each build step, the installed dependencies, and the final startup process.

---

## Steps Explanation

1. **Base Image**  
   - Uses a minimal Alpine Linux image (version 3.18) for efficiency.

2. **Labels**  
   - Adds version and maintainer metadata to the image.

3. **Environment Variables**  
   - Defines `HOMEDIR`, `PROJECTDIR`, and `NGINX_CONFIGURATION` to keep directory paths organized within the container.

4. **Working Directory**  
   - Sets the container’s default working directory to `$HOMEDIR`.

5. **Install Dependencies**  
   - Updates and upgrades existing packages.
   - Installs required packages: Nginx, OpenSSL, Node.js, npm, Bash, and cURL.
   - Installs PM2 globally for process management of the Node.js application.

6. **Copy Source Code**  
   - Copies the entire project codebase into `$PROJECTDIR`.

7. **Copy the Start Script**  
   - Copies the `start.sh` script into `$HOMEDIR`.

8. **Install Frontend & Backend Dependencies**  
   - Installs npm dependencies in both `notes-app-ui` (frontend) and `notes-app-server` (backend).

9. **Push Database Schema**  
   - Uses Prisma to push the schema to the configured database.

10. **Build Frontend**  
   - Builds production-ready static assets for the frontend, stored in `notes-app-ui` after the build process.

11. **Set Execute Permissions**  
   - Grants execute permissions to the `start.sh` script and relevant directories to avoid permission issues.

12. **Expose Port**  
   - Exposes port `443` (HTTPS) for incoming traffic.

13. **Nginx Configuration**  
   - Copies a custom Nginx configuration into the container.
   - Removes the default Nginx configuration file to avoid conflicts.

14. **Start Command**  
   - Defines `start.sh` as the script to run when the container is started.

---

## The `start.sh` Script

- Starts the Node.js server using PM2
- Starts the Nginx server in the foreground (daemon off mode)
