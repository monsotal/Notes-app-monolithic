FROM node:alpine3.19
	
	LABEL version="0.0.1"
	LABEL maintainer="monsotal"
	
	RUN apt-get update && apt-get upgrade -y
	RUN apt-get install nginx -y
	
	EXPOSE 80

    # Copy your custom Nginx configuration if needed

    # Start NGINX
    CMD ["nginx","-g", "daemon off;"]