pipeline {
    agent any
    options {
        timeout(time: 1, unit: 'HOURS')
        timestamps()
        gitLabConnection('GitLab')
        gitlabBuilds(builds: ['build', 'test', 'quality'])
    }
    environment {
        CI = 'true'
        NODEJS_LABEL = 'NodeJS'
    }
    triggers {
        gitlab(
            triggerOnPush: true,
            triggerOnMergeRequest: true,
            skipWorkInProgressMergeRequest: true,
            branchFilterType: 'All'
        )
    }
    stages {
        stage('Init') {
            steps {
                nodejs(nodeJSInstallationName: env.NODEJS_LABEL) {
                    sh 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: env.NODEJS_LABEL) {
                    sh 'npm run build'
                }
            }
            post {
                unsuccessful {
                    updateGitlabCommitStatus name: 'build', state: 'failed'
                }
                success {
                    updateGitlabCommitStatus name: 'build', state: 'success'
                }
            }
        }
        stage('Test') {
            steps {
                nodejs(nodeJSInstallationName: env.NODEJS_LABEL) {
                    sh 'npm test -- --coverage --reporters=default --reporters=jest-junit --reporters=jest-sonar'
                }
            }
            post {
                always {
                    junit 'junit.xml'
                    step([
                        $class: 'CloverPublisher',
                        cloverReportDir: 'coverage',
                        cloverReportFileName: 'clover.xml',
                    ])
                }
                unsuccessful {
                    updateGitlabCommitStatus name: 'test', state: 'failed'
                }
                success {
                    updateGitlabCommitStatus name: 'test', state: 'success'
                }
            }
        }
        stage('Quality') {
            environment {
                scannerHome = tool 'SonarQube Scanner'
                nodejsHome = tool env.NODEJS_LABEL
            }
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh "${scannerHome}/bin/sonar-scanner -Dsonar.nodejs.executable=${nodejsHome}/bin/node"
                }
                timeout(time: 15, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
            post {
                unsuccessful {
                    updateGitlabCommitStatus name: 'quality', state: 'failed'
                }
                success {
                    updateGitlabCommitStatus name: 'quality', state: 'success'
                }
            }
        }
        stage('Bundle') {
            steps {
                zip zipFile: 'build.zip', dir: 'build', archive: true
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}