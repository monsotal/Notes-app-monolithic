FROM ubuntu:latest
	
	LABEL version="0.0.1"
	LABEL maintainer="monsotal"


    ENV HOMEDIR="/home/ubuntu"
    ENV PROJECTDIR="/home/ubuntu/Notes-app-monolithic"


    # Set up home directory
    WORKDIR ${HOMEDIR}
	
    #Install dependencies
	RUN apt-get update && \
     apt-get upgrade -y && \
     apt-get install -y nginx && \
     apt-get install -y nodejs && \
     apt-get install -y npm && \
     npm install -g pm2

    #Copying project directory from Jenkins host to the container file system
    COPY . ${PROJECTDIR}


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

    #Start the backend server with PM2
    #RUN cd ${PROJECTDIR}/notes-app-server && \
    #npm start


	EXPOSE 80


    # Copy your custom Nginx configuration if needed

    # Start NGINX
    CMD ["nginx","-g","daemon off"]
