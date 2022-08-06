pipeline {
    agent any

    stages {
        stage('TEST') {
            steps {
                sh "env"
                sh 'docker run -v $(pwd):/app pycovn/ci-node bash -c "cd /app && npm i && npm run build"'
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG'), usernamePassword(credentialsId: 'gitlab-registry-access', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USER')]) {
                    sh "kubectl get pods"
                    sh 'docker build -t registry.gitlab.com/pycovn/ms-node:${BUILD_ID} .'
                    sh "docker login registry.gitlab.com -u ${DOCKER_USER} -p ${DOCKER_PASSWORD}"
                    sh 'docker push registry.gitlab.com/pycovn/ms-node:${BUILD_ID}'
                    sh "docker logout registry.gitlab.com"
                    sh 'docker rmi registry.gitlab.com/pycovn/ms-node:${BUILD_ID}'
                    sh "helm list"
                    sh 'helm upgrade -i --set image.tag=${BUILD_ID} -f ./deploy/helm-chart/values.yaml ms-node ./deploy/helm-chart/'
                }
            }
        }
    }
    post {
        always {
            /* Use slackNotifier.groovy from shared library and provide current build result as parameter */
            notifyBuild(currentBuild.result)
        }
    }
}

def notifyBuild(String buildStatus = 'STARTED') {
    // build status of null means successful
    buildStatus = buildStatus ?: 'SUCCESS'

    // Default values
    def colorName = 'RED'
    def colorCode = '#FF0000'
    def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
    def summary = "${subject} (${env.BUILD_URL})"
    def details = """<p>STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
     <p>Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>"""

    // Override default values based on build status
    if (buildStatus == 'STARTED') {
        color = 'YELLOW'
        colorCode = '#FFFF00'
    } else if (buildStatus == 'SUCCESS') {
        color = 'GREEN'
        colorCode = '#00FF00'
    } else {
        color = 'RED'
        colorCode = '#FF0000'
    }

    // Send notifications
    slackSend(color: colorCode, message: summary)
}

