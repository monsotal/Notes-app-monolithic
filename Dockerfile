FROM ubuntu:latest
	
	LABEL version="0.0.1"
	LABEL maintainer="monsotal"
	
    #Install dependencies
	RUN apt-get update && \
     apt-get upgrade -y && \
     apt-get install -y nginx && \
     apt-get install -y nodejs && \
     apt-get install -y npm

	EXPOSE 80

    # Set up your application
    WORKDIR /var/lib/jenkins/workspace/Notes-app-monolithic-pipeline

    # Copy your custom Nginx configuration if needed

    # Start NGINX
    CMD ["nginx","-g", "daemon off;"]