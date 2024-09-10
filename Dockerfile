FROM alpine:3.18
	
	LABEL version="0.0.1"
	LABEL maintainer="monsotal"


    ENV HOMEDIR="/home/ubuntu"
    ENV PROJECTDIR="/home/ubuntu/Notes-app-monolithic"
    ENV NGINX_CONFIGURATION="resources/Nginx_configuration/notes-app"


    # Set up home directory
    WORKDIR ${HOMEDIR}
	
    # Install dependencies (Nginx, Node.js, npm, and PM2)
    RUN apk update && \
        apk upgrade && \
        apk add --no-cache nginx nodejs npm bash && \
        npm install -g pm2

    #Copying the project directory from Jenkins host to the container file system PROJECTDIR
    #and Copying the start script to WORKDIR

    COPY . ${PROJECTDIR}
    COPY start.sh ${HOMEDIR}


    #Install Frontend & Backend Dependencies
    RUN cd ${PROJECTDIR}/notes-app-ui && \
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


    # Create the Nginx site directory (since in alpine it's not existing by default)
    # & Copy the custom Nginx configuration to this directory
    RUN mkdir /etc/nginx/sites-available && \
        mkdir /etc/nginx/sites-enabled

    COPY ${NGINX_CONFIGURATION} /etc/nginx/sites-available/


    # Starts the node backend & Nginx by Executing start.sh script
    CMD ["./start.sh"]
