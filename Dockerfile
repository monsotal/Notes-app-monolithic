FROM alpine:3.18
	
	LABEL version="0.0.1"
	LABEL maintainer="monsotal"


    ENV HOMEDIR="/home"
    ENV PROJECTDIR="/home/Notes-app-monolithic"
    ENV NGINX_CONFIGURATION="resources/Nginx_configuration/notes-app"


    # Set up home directory
    WORKDIR ${HOMEDIR}
	
    # Install dependencies (Nginx, Node.js, npm, and PM2)
    RUN apk update && \
        apk upgrade && \
        apk add --no-cache nginx nodejs npm bash curl&& \
        npm install -g pm2


    #Copying the start script to $HOMEDIR

    COPY start.sh ${HOMEDIR}


    #Install Frontend & Backend Dependencies
    RUN cd /home/Notes-app-monolithic/notes-app-ui && \
        npm install && \
        cd ${PROJECTDIR}/notes-app-server && \
        npm install

    #Pushing the database schema to the DB
    RUN cd ${PROJECTDIR}/notes-app-server && \
        npx prisma db push

    #Build Frontend codebase
    RUN cd ${PROJECTDIR}/notes-app-ui && \
        npm run build --verbose

    # Give execute permission to start script
    RUN chmod +x ${HOMEDIR}/start.sh

	EXPOSE 80


    #  Copy the custom Nginx site configuration to the alpine Nginx site configuration directory
    #   Removes the default Nginx site if exists
    # & Adds execute permissions to the relevant directories (if needed, although this might not be necessary for directories)


    COPY ${NGINX_CONFIGURATION} /etc/nginx/http.d/notes-app.conf
    RUN rm -f /etc/nginx/http.d/default.conf

    RUN chmod +x /home/
    RUN chmod +x /home/Notes-app-monolithic
    RUN chmod +x /home/Notes-app-monolithic/notes-app-ui

    # Starts the node backend & Nginx by Executing start.sh script
    CMD ["./start.sh"]
