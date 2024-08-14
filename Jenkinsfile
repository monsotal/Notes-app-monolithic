pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checkout Code..'
            }
        }
        stage('Install dependencies') {
            steps {
                echo 'Install dependencies..'
            }
        }
        stage('Build Frontend') {
            steps {
                echo 'Deploying....'
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Build Docker Image..'
            }
        }
        stage('Push Docker Image') {
            steps {
                echo 'Building..'
            }
    }
         stage('Deploy to Server') {
            steps {
                echo 'Deploy to Server'
            }
    }
        stage('Clean Up') {
            steps {
                echo 'Clean Up'
            }
    }
}
}