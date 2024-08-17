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
                checkout([
                $class: 'GitSCM',
                branches: [[name: 'main']],
                doGenerateSubmoduleConfigurations: false,
                extensions: [],
                userRemoteConfigs: [[url: 'git@github.com:monsotal/Notes-app-monolithic.git', credentialsId: 'bc43102f-a155-4c35-9626-1b0d2efd5080']]
])
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