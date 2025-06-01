# 🚀 CI/CD Pipeline for Node.js App on Minikube

This project demonstrates a simple **CI/CD pipeline** using **Jenkins**, **Docker**, and **Kubernetes** on a local **Minikube** cluster, with Docker images pushed to Docker Hub.

---

## 📂 Project Structure

```
.
├── Dockerfile
├── index.js
├── Jenkinsfile
└── k8s
    ├── deployment.yaml
    └── service.yaml
```

---

## 🛠️ Steps to Reproduce

### 1️⃣ Create Minikube Credential in Jenkins

* Copy your Minikube kubeconfig file locally:

  ```bash
  cp ~/.kube/config minikube-config
  ```

* In Jenkins:

  * Go to **Manage Jenkins** → **Credentials** → **Global credentials** → **Add Credentials**
  * Kind: **Secret file**
  * Upload the file `minikube-config`
  * Set ID: `minikube-kubeconfig`

---

### 2️⃣ Add Docker Hub Credentials in Jenkins

* Go to **Manage Jenkins** → **Credentials** → **Global credentials** → **Add Credentials**
* Kind: **Username with password**
* Username: your Docker Hub username (`hassanbahnasy`)
* Password: your Docker Hub password
* Set ID: `Dockerhub`

---

### 3️⃣ Sample Node.js App

* `index.js` creates a simple HTTP server:

  ```js
  res.write("Hello from Jenkins deployed app!");
  ```

* `Dockerfile`:

  ```Dockerfile
  FROM node:16-alpine
  WORKDIR /app
  COPY . .
  EXPOSE 8082
  CMD ["node", "index.js"]
  ```

---

### 4️⃣ Kubernetes Manifests

* **Deployment**: `k8s/deployment.yaml` — make sure the container image uses your Docker Hub image, e.g.:

  ```yaml
  image: hassanbahnasy/jenkins-node-app:latest
  ```

* **Service**: `k8s/service.yaml` (e.g., NodePort 30007)

---

### 5️⃣ Jenkins Pipeline

* Create a **Pipeline job** in Jenkins.
* Use your GitHub repository (e.g., [CICD\_SimpleApp](https://github.com/Bahnasy2001/CICD_SimpleApp))
* The `Jenkinsfile` does:

  * Build Docker image tagged as `hassanbahnasy/jenkins-node-app:latest`
  * Login to Docker Hub and push the image
  * Deploy the app on Minikube using `kubectl apply`

---

### 6️⃣ Verify the App

* Run this command to open the service in your browser:

  ```bash
  minikube service node-service
  ```

* You should see:

  ```
  Hello from Jenkins deployed app!
  ```