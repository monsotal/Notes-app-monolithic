pipeline {
    agent any

    parameters {
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
        KUBECONFIG = credentials('k8s-cluster-kubeconfig')
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '40'))
    }

    triggers {
        //check for code changes every day at 20:00
        cron('0 20 * * *')
    }

    stages {
        stage('Clean workspace') {
            steps {
                cleanWs()
            }
        }
        stage('Checkout Code') {
            steps {
                git url: 'git@github.com:monsotal/Notes-app-monolithic.git',
                branch: 'main',
                credentialsId: 'bc43102f-a155-4c35-9626-1b0d2efd5080'
            }
            stage('Verify Build Context') {
                steps {
                    sh """
                echo "()()()()()()()Verifying the right and updated codebse got pulled()()()()()()()"
                ls -la ${WORKDIR}
                   """
                }
            }
        }
        stage('Create .env file') {
            steps {
                sh """
                cd ${WORKDIR}/notes-app-server/
                echo "DATABASE_URL=postgresql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_IP}:5432/notes_db?schema=public" > .env
                echo "JWT_SECRET=pqpTxMVHqoE8OS" >> .env
                   """
            }
        }
        stage('Build Docker Image') {
            steps {
                sh """
                docker build --no-cache -t monsotal/notes-app-monolithic:0.0.1 ${WORKDIR}
                   """
            }
        }
        stage('Push Docker Image to Docker hub registry') {
            steps {
                sh """
                docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW
                docker image push monsotal/notes-app-monolithic:0.0.1
                    """
            }
        }
        stage('Deploy to Kubernetes cluster') {
            steps {
                withCredentials([file(credentialsId: 'k8s-cluster-kubeconfig', variable: 'KUBECONFIG')]) {
                    sh """
                    export KUBECONFIG=${KUBECONFIG}
                    kubectl apply -f ${WORKDIR}/k8s/deployment.yaml
                    kubectl apply -f ${WORKDIR}/k8s/service.yaml
                    """
                }
            }
        }
        stage('Clean Up') {
            steps {
                script {
                    sh """
                    docker builder prune -f
                    docker container prune -f
                    docker image prune -f
                    """
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline execution failed!'
        }
    }
}
