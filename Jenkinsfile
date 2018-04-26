pipeline {
    agent any
    environment {
         DOCKER_REPO = "eu.gcr.io/p2-utvikling"
         DOCKER_IMAGE = "dc-workbench-ui"
    }
    stages {
        stage ('Initialize') {
            steps {
                echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
                sh '''
                    echo "PATH = ${PATH}"
                    echo "M2_HOME = ${M2_HOME}"
                '''
            }
        }
        stage('Build') {
            steps {
                sh 'mvn --settings .jenkins/settings.xml clean install'
            }
            post {
                success {
                    junit 'target/surefire-reports/**/*.xml'
                }
            }
        }
        stage('Deploy Maven Artifacts') {
            steps {
                sh 'mvn deploy --settings .jenkins/settings.xml -DskipTests -B -V'
            }
        }
        stage('Build image') {
            steps {
                #sh "docker build -t ${env.DOCKER_REPO}/${env.DOCKER_IMAGE}:${env.BUILD_NUMBER} ."
            }
        }
        stage('Push image') {
            steps {
                #withDockerRegistry([credentialsId: 'gcr:P2 utvikling', url: 'https://eu.gcr.io']){
                #    sh "docker push ${env.DOCKER_REPO}/${env.DOCKER_IMAGE}:${env.BUILD_NUMBER}"
                #}
            }
        }
        stage('Release') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
