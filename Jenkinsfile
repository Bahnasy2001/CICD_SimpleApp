pipeline {
    agent any

    environment {
        IMAGE_NAME = "jenkins-node-app"
        IMAGE_TAG = "latest"
        KUBECONFIG_CRED_ID = credentials('minikube-kubeconfig')
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
                    echo "Copying kubeconfig to writable location..."
                    sh 'mkdir -p /tmp/.kube'
                    sh 'cp $KUBECONFIG_CRED /tmp/.kube/config'
                    
                    echo "Setting KUBECONFIG env var..."
                    env.KUBECONFIG = "/tmp/.kube/config"
                    // Load minikube docker into local daemon
                    sh 'eval $(minikube docker-env)'
                    sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'

                    // Apply Kubernetes manifests
                    sh 'kubectl apply -f k8s/deployment.yaml'
                    sh 'kubectl apply -f k8s/service.yaml'
                }
            }
        }
    }
}