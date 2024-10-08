pipeline {
    agent any

    parameters{
        string(name:'DB_IP', description: 'Postgres public ip', defaultValue: '')
        string(name:'DB_USER', description: 'Postgres Username', defaultValue: 'postgres')
        string(name:'DB_PASS', description: 'Postgres Password', defaultValue: 'uniquePassword')
    }

    environment {
        WORKDIR = '/var/lib/jenkins/workspace/Notes-app-monolithic-pipeline'
        DATABASE_IP = "${params.DB_IP}"
        DATABASE_USERNAME = "${params.DB_USER}"
        DATABASE_PASSWORD = "${params.DB_PASS}"
        DOCKERHUB_CREDENTIALS = credentials('57b1926b-7963-4f0f-bdfb-ef3a6d5d22db')
        JWT_SECRET_KEY = credentials('1adb0619-e011-4df4-b8ce-6e125fc9c4f0')
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
        stage('Create .env file with Postgres connection details & jwt token secret key') {
            steps {
                echo 'Create a .env file with PostgreSQL connection details:'
                sh '''
                    cd ${WORKDIR}/notes-app-server
                    echo "DATABASE_URL=postgresql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_IP}:5432/notes_db?schema=public" >> .env
                    echo "JWT_SECRET=${JWT_SECRET_KEY}" >> .env
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
        stage('Push Docker Image to Docker hub registry') {
            steps {
                sh '''
                docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW
                docker image push monsotal/notes-app-monolithic:0.0.1
                    '''
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
                docker image prune -f
                '''
            }
        }
    }
}