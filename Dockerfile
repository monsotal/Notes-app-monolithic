FROM ubuntu:latest
	
	LABEL version="0.0.1"
	LABEL maintainer="monsotal"
	
    #Install dependencies
	RUN apt-get update && apt-get upgrade -y
	RUN apt-get install nginx -y
    RUN apt-get install nodejs -y && apt-get install npm -y
	
	EXPOSE 80

    # Set up your application
    WORKDIR /var/lib/jenkins/workspace/Notes-app-monolithic-pipeline

    # Copy your custom Nginx configuration if needed

    # Start NGINX
    CMD ["nginx","-g", "daemon off;"]