FROM ubuntu:latest
	
	LABEL version="0.0.1"
	LABEL maintainer="monsotal"


    ENV HOMEDIR = "/home/ubuntu"


    # Set up your application
    WORKDIR /home/ubuntu/
	
    #Install dependencies
	RUN apt-get update && \
     apt-get upgrade -y && \
     apt-get install -y nginx && \
     apt-get install -y nodejs && \
     apt-get install -y npm

    #Copying project directory from Jenkins host to the docker image
    COPY . ${HOMEDIR}

	EXPOSE 80


    # Copy your custom Nginx configuration if needed

    # Start NGINX
    CMD ["nginx","-g", "daemon off;"]