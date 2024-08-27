pipeline {
    agent any

    parameters{
        string(name:'DB_IP', description: 'Postgres public ip', defaultValue: '')
    }

    environment {
        WORKDIR = '/var/lib/jenkins/workspace/Notes-app-monolithic-pipeline'
        DATABASE_IP = "${params.DB_IP}"
    }

   
    options {
        buildDiscarder(logRotator(numToKeepStr: '40'))
    }

    triggers {
        //check for code changes every day at 20:00
        cron('0 20 * * *')
    }

    stages {
        stage('Clean workspace'){
            steps {
                cleanWs()
            }
        }
       stage('Checkout Code') {
            steps {
            git url: 'git@github.com:monsotal/Notes-app-monolithic.git', branch: 'main', credentialsId: 'bc43102f-a155-4c35-9626-1b0d2efd5080'

                 }
        }
        stage('Create .env file with Postgres connection details') {
            steps {
                echo 'Create a .env file with PostgreSQL connection details:'
                sh '''
                    cd ${WORKDIR}/notes-app-server
                    echo "DATABASE_URL=postgresql://postgres:uniquePassword@${DATABASE_IP}:5432/notes_db?schema=public" > .env
                    '''
                  }
        }
        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t monsotal/notes-app-monolithic:0.0.1 ${WORKDIR}
                   '''
            }
        }
        stage('Push Docker Image') {
            steps {
                echo 'Pushing the image to Docker hub repository..'
            }
        }
         stage('Deploy to Server') {
            steps {
                echo 'Pulling the image and run the container'
            }
        }
        stage('Clean Up') {
            steps {
                sh '''
                docker builder prune -f
                docker container prune -f
                docker image prune -a -f
                '''
            }
        }
    }
}