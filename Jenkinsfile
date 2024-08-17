pipeline {
    agent any

    environment {
        WORKDIR = '/var/lib/jenkins/workspace/Notes-app-monolithic-pipeline'
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
                    deleteDir()
            }
        }
        stage('Checkout Code') {
            steps {
            git url: 'git@github.com:monsotal/Notes-app-monolithic.git', branch: 'main', credentialsId: 'bc43102f-a155-4c35-9626-1b0d2efd5080'

                 }
        }
        stage('Install dependencies') {
            steps {
                sh '''
                    cd ${env.WORKDIR}/notes-app-ui
                    npm install
                    '''

                sh '''
                    cd ${env.WORKDIR}/notes-app-server
                    npm install
                '''

                echo 'Create a .env file with your PostgreSQL connection details:'
                sh '''
                cd ${env.WORKDIR}/notes-app-server
                echo DATABASE_URL=postgresql://postgres:uniquePassword@3.64.179.211:5432/notes_db?schema=public > .env
                sh '''

                echo 'Pushing the database schema to the DB'
                sh '''
                cd ${env.WORKDIR}/notes-app-server
                sudo npx prisma db push
                sh '''
            }
                
        }
        stage('Build Frontend') {
            steps {
                sh '''
                    cd ~
                    cd notes-app-ui
                    sudo npm run build --verbose
                '''
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