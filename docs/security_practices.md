# Security Practices

Below is a concise overview of the primary security measures in the Notes App mini-project, covering application-level, infrastructure, and deployment practices.

---

## 1. Application Security

### 1.1 JWT Verification
- **Token Storage**: On the front-end (`MainApp.tsx`), the JSON Web Token (JWT) is stored in `localStorage`.
- **Token Usage**: Each request includes an `Authorization` header (`Bearer <token>`).
- **Server Checks**: The back-end (`index.ts`) verifies JWTs with a middleware (`authenticateToken`). Invalid or missing tokens return `401` or `403`.
- **Token Expiration**: Tokens expire after 1 hour (`expiresIn: "1h"`).

### 1.2 Access Control
- **Logged-In Actions**: CRUD operations (create, update, delete notes) require valid JWTs.
- **Password Hashing**: `bcrypt` (salt factor 10) for user passwords, preventing plain-text storage.
- **Input Validation**: Ensures required fields (`title`, `content`) and numeric IDs are present before processing.

---
## 2. Infrastructure Security

### 2.1 Docker
- **Minimal Base Image**: Uses `alpine:3.18` with needed packages (Nginx, Node.js, PM2).
- **HTTPS-Only**: Exposes port **443** to ensure all traffic is encrypted.
- **Regular Updates**: `apk update && apk upgrade` to patch known vulnerabilities.

### 2.2 Kubernetes Manifests
- **TLS Secrets**:  
  - The **Deployment** mounts TLS certificates from a Kubernetes secret (`nginx-ssl-secret`).  
  - Certificates are not stored in the code or Docker image; they remain in a secure, external secret.
- **Image Pull Secrets**:  
  - The **Deployment** references `regcred` to pull images privately, hiding registry credentials from source code.
- **Volumes as Read-Only**:  
  - Certificates (`ssl-certs` volume) are mounted read-only, reducing the risk of tampering.
- **NodePort for HTTPS**:  
  - The **Service** exposes only port **443** (via `nodePort: 30443`), directing external traffic securely to the container’s HTTPS listener.

---

## 3. Deployment Security (CI/CD)

### 3.1 Jenkins Pipeline
- **Secret Management**:  
  - Jenkins credentials store Docker Hub credentials, DB credentials, JWT secret, and kubeconfig securely.
- **.env Creation**:  
  - `.env` files (with `DATABASE_URL` and `JWT_SECRET`) are generated dynamically, keeping secrets out of version control.
- **Scheduled Builds**:  
  - A cron trigger ensures regular deployments, facilitating timely security patches.

### 3.2 Docker Registry
- **Credentialed Login**:  
  - Jenkins authenticates with Docker Hub using stored credentials.
- **Traceable Tags**:  
  - Image versions are labeled with Jenkins build numbers for easy rollback management.