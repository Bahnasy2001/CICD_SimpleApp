# 🚀 CI/CD Pipeline for Node.js App on Minikube

This project demonstrates a simple **CI/CD pipeline** using **Jenkins**, **Docker**, and **Kubernetes** on a local **Minikube** cluster.

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

* Copy your Minikube kubeconfig:

  ```bash
  cp ~/.kube/config minikube-config
  ```
* In Jenkins:

  * Go to **Manage Jenkins** → **Credentials** → **Global credentials** → **Add Credentials**
  * Kind: **Secret file**
  * Upload `minikube-config`
  * Set ID: `minikube-kubeconfig`

---

### 2️⃣ Sample Node.js App

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

### 3️⃣ Kubernetes Manifests

* **Deployment**: `k8s/deployment.yaml`
* **Service**: `k8s/service.yaml` (NodePort 30007)

---

### 4️⃣ Jenkins Pipeline

* Create a **Pipeline job** in Jenkins.
* Use your GitHub repository: [CICD\_SimpleApp](https://github.com/Bahnasy2001/CICD_SimpleApp)
* The `Jenkinsfile`:

  * Builds Docker image
  * Copies kubeconfig to Jenkins agent
  * Sets KUBECONFIG
  * Loads Docker into Minikube
  * Deploys app using `kubectl apply`

---

### 5️⃣ Verify the App

* Run:

  ```bash
  minikube service node-service
  ```
* You should see:

  ```
  Hello from Jenkins deployed app!
  ```



