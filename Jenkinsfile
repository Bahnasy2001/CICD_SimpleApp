pipeline {
    agent any

    environment {
        IMAGE_NAME = "jenkins-node-app"
        IMAGE_TAG = "latest"
        KUBECONFIG = credentials('minikube-kubeconfig')
    }

    stages {
        stage('Build Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
            }
        }

        stage('Deploy to Minikube') {
            steps {
                script {
                    // Load minikube docker into local daemon
                    // sh 'eval $(minikube docker-env)'
                    
                    // Apply Kubernetes manifests
                    sh 'kubectl apply -f k8s/deployment.yaml'
                    sh 'kubectl apply -f k8s/service.yaml'
                }
            }
        }
    }
}