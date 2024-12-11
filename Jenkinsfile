pipeline {
    agent any

    parameters {
        string(name: 'DB_IP', description: 'Postgres public IP', defaultValue: '172.31.19.168')
        string(name: 'DB_USER', description: 'Postgres Username', defaultValue: 'postgres')
        string(name: 'DB_PASS', description: 'Postgres Password', defaultValue: 'uniquePassword')
    }

    environment {
        IMAGE_NAME = 'monsotal/notes-app-monolithic'
        IMAGE_TAG = "${env.BUILD_NUMBER}" // Use Jenkins build number for the tag
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
        // Check for code changes every day at 20:00
        cron('0 20 * * *')
    }

    stages {
        stage('Clean Workspace') {
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
        }

        stage('Create .env File') {
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
                docker build --no-cache -t ${IMAGE_NAME}:${IMAGE_TAG} ${WORKDIR}
                """
            }
        }

        stage('Push Docker Image to Docker Hub Registry') {
            steps {
                sh """
                docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW
                docker image push ${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Prepare Deployment Manifest') {
            steps {
                //creates a copy of the template (deployment.yaml) and replaces <TAG> with the actual image tag using sed
                sh """
                cp ${WORKDIR}/k8s/deployment-template.yaml ${WORKDIR}/k8s/deployment.yaml
                sed -i "s|<TAG>|${IMAGE_TAG}|g" ${WORKDIR}/k8s/deployment.yaml
                """
            }
        }

        stage('Deploy to Kubernetes Cluster') {
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
            echo "Deployment succeeded with image tag: ${IMAGE_TAG}"
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}