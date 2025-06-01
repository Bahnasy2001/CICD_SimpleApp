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
                sh 'docker build -t hassanbahnasy/${IMAGE_NAME}:${IMAGE_TAG} .'
            }
        }
        stage('Docker Push') {
            steps {
                echo "docker push is running now" 
                withCredentials([usernamePassword(credentialsId: 'Dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh "echo $PASSWORD | docker login -u $USERNAME --password-stdin" 
                    sh "docker push hassanbahnasy/${IMAGE_NAME}:${IMAGE_TAG}" 
                }
            }
        }
        stage('Deploy to Minikube') {
            steps {
                script {
                    sh 'kubectl apply -f k8s/deployment.yaml'
                    sh 'kubectl apply -f k8s/service.yaml'
                }
            }
        }
    }
}
