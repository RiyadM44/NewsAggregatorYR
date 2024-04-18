pipeline {
    agent any
    stages {
        stage('Deploy on First Instance') {
            steps {
                script {
                    // Execute SSH command and wait for completion
                    sshagent(['ssh-agent']) {
                        def sshResult = sh(script: """
                            ssh -o StrictHostKeyChecking=no ubuntu@18.197.87.109 '
                                docker stop ry || true &&
                                docker rm ry || true &&
                                docker rmi riyadm44/djangonewsimage || true &&
                                docker pull riyadm44/djangonewsimage:latest &&                                
                                docker run -d -p 8000:8000 --name ry riyadm44/djangonewsimage &&
                                cd Django_News_App/ &&
                                git pull origin main '
                            """, returnStatus: true)
                        if (sshResult != 0) {
                            error "SSH connection failed"
                        }
                    }
                }
            }
        } 
        stage('Run Tests First Instance') {
            steps {
                script {
                    def STATUS_CODE = sh(script: 'curl -s -o /dev/null -w "%{http_code}" https://newsaggregator.upskillconnect.com/', returnStdout: true).trim()

                    sshagent(['ssh-agent']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ubuntu@18.197.87.109 '
                                cd Django_News_App/news_Application &&
                                python3 manage.py test &&
                                STATUS_CODE=$STATUS_CODE &&
                                if [ "\$STATUS_CODE" == "200" ]; then
                                    echo "Code 200 Success First Instance"
                                else
                                    docker stop ry || true &&
                                    docker rm ry || true &&
                                    docker rmi riyadm44/djangonewsimage || true &&
                                    echo "Code 200 Failed"
                                    exit 1
                                fi
                            '
                        """
                    }
                }
            }
        }
        stage('Deploy on Second Instance') {
            steps {
                script {
                    // Execute SSH command and wait for completion
                    sshagent(['ssh-agent']) {
                        def sshResult = sh(script: """
                            ssh -o StrictHostKeyChecking=no ubuntu@3.64.179.223 '
                                docker stop ry || true &&
                                docker rm ry || true &&
                                docker rmi riyadm44/djangonewsimage || true &&
                                docker pull riyadm44/djangonewsimage:latest &&
                                docker run -d -p 8000:8000 --name ry riyadm44/djangonewsimage &&
                                cd Django_News_App/ &&
                                git pull origin main ' 
                            """, returnStatus: true)
                        if (sshResult != 0) {
                            error "SSH connection failed"
                        }
                    }
                }
            }
        }
        stage('Run Tests Second Instance') {
            steps {
                script {
                    def STATUS_CODE = sh(script: 'curl -s -o /dev/null -w "%{http_code}" https://newsaggregator.upskillconnect.com/', returnStdout: true).trim()

                    sshagent(['ssh-agent']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ubuntu@3.64.179.223 '
                                cd Django_News_App/news_Application &&
                                python3 manage.py test &&
                                STATUS_CODE=$STATUS_CODE &&
                                if [ "\$STATUS_CODE" == "200" ]; then
                                    echo "Code 200 Success First Instance"
                                else
                                    docker stop ry || true &&
                                    docker rm ry || true &&
                                    docker rmi riyadm44/djangonewsimage || true &&
                                    echo "Code 200 Failed"
                                    exit 1
                                fi
                            '
                        """
                    }
                }
            }
        }      
    }
}
