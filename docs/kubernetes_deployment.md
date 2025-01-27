# Kubernetes Deployment Practices

This document outlines the practices used in the Kubernetes deployment manifests for the Notes App. These practices ensure a secure, modular, and scalable deployment while integrating seamlessly with CI/CD pipelines.

## 1. Service Manifest (`service.yaml`)
- **Service Type**: 
  - `NodePort` is used to expose the application externally with a defined port.
- **Selector**: 
  - Connects the service to pods labeled `app: notes-app`.
- **Port Configuration**: 
  - Defines HTTPS (`port: 443`) and maps it to the corresponding container port (`targetPort: 443`).
  - Exposes the service externally using a node port (`nodePort: 30443`).

## 2. Deployment Manifest Template (`deployment-template.yaml`)
- **Deployment Strategy**: 
  - `RollingUpdate` ensures zero downtime during updates by configuring:
    - `maxUnavailable: 1`
    - `maxSurge: 1`
- **Replica Management**: 
  - Uses a single replica (`replicas: 1`) for the initial setup.
- **Pod Selector**: 
  - Matches pods with the label `app: notes-app`.
- **Container Configuration**: 
  - Specifies the Docker image (`monsotal/notes-app-monolithic:<TAG>`) with `imagePullPolicy: Always` to ensure the latest image is pulled.
  - Exposes container port 443 for HTTPS traffic.
- **Volume Mounts**: 
  - Mounts a volume for TLS certificates from a Kubernetes secret (`ssl-certs`).
- **Image Pull Secrets**: 
  - Uses `imagePullSecrets` to fetch private images from Docker Hub.

## 3. Volume Management
- **TLS Secret**: 
  - Configures `ssl-certs` to store SSL certificates using the secret `nginx-ssl-secret`.
- **Read-Only Mounts**: 
  - Ensures security by mounting volumes as read-only (`readOnly: true`).

## 4. Environment Variables and Secrets
- Securely integrates sensitive data like database credentials and JWT secrets via Kubernetes secrets and ConfigMaps.

## 5. Resource Modularity
- Separation of concerns between the service (`service.yaml`) and deployment (`deployment-template.yaml`), allowing independent updates and management.

## 6. Scalability Considerations
- While currently set to a single replica, the deployment can easily scale by modifying the `replicas` field.

## 7. Integration with CI/CD
- The Jenkins pipeline dynamically updates the deployment manifest using `sed` to replace placeholders like `<TAG>` with the specific build version before applying the manifests to the cluster.

These practices ensure the Notes App is deployed efficiently, with flexibility for future enhancements and seamless integration.
