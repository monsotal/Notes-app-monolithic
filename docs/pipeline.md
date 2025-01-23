# Pipeline.md - Notes App Monolithic Pipeline

This document describes the automated pipeline for building, deploying, and managing the Notes App Monolithic application. 
The pipeline is implemented using Jenkins and uses Docker containers for packaging and deployment to a Kubernetes cluster.

## Pipeline Stages

The pipeline consists of the following key stages:

1.  **Clean Workspace:** This stage removes any existing content from the Jenkins workspace before starting the pipeline execution.
2.  **Checkout Code:** The code for the Notes App Monolithic application is fetched from a Git repository ([invalid URL removed]) and stored in the workspace.
3.  **Create .env File:** A `.env` file is created within the application code directory. This file contains sensitive configuration details like database connection strings and secret keys. The credentials for these values are managed by Jenkins and retrieved securely during this stage.
4.  **Build Docker Image:** The Docker image for the Notes App Monolithic application is built using the Dockerfile present in the codebase. The image is tagged with the current Jenkins build number for versioning purposes.
5.  **Push Docker Image to Docker Hub Registry:** The built Docker image is pushed to a Docker Hub repository using credentials stored securely within Jenkins.
6.  **Prepare Deployment Manifest:** A deployment manifest file (`deployment.yaml`) used for deploying the application to the Kubernetes cluster is prepared. This involves copying a template file and replacing a placeholder with the actual image tag generated during the build stage.
7.  **Deploy to Kubernetes Cluster:** The prepared deployment manifest and service definition file (`service.yaml`) are applied to the Kubernetes cluster using `kubectl` commands. The kubeconfig file required for authentication with the cluster is retrieved securely from Jenkins credentials.
8.  **Clean Up:** This stage performs Docker image cleanup tasks to remove unused images, containers, and builder data.

## Additional Notes

*   The pipeline is triggered daily at 8:00 PM (cron job) to check for code changes and initiate a new run if any changes are detected.
*   The pipeline utilizes various Jenkins credentials to securely access sensitive information like database credentials, Docker Hub credentials, and the Kubernetes cluster configuration file.
*   The pipeline outputs success and failure messages upon completion, including the deployed image tag in case of success.

![picture alt](docs/images/deployment_pipeline.svg)