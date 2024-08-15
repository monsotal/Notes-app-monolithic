pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '40'))
    }

    triggers {
        //check for code changes every day at 20:00
        cron('0 20 * * *')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', credentialsId: 'e7843ead-0fba-47ed-b0df-64b028be7a89', url: 'git@github.com:monsotal/Notes-app-monolithic.git'
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