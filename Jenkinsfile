@Library("Shared") _
pipeline {
    agent { label "docker" }

    stages {
        stage("hello") {
            steps {
                script {
                    hello()
                }
            }
        }

        stage("Code") {
            steps {
                script {
                    clone("https://github.com/vidisha162/vautlify.git", "main")
                }
            }
        }

        stage("Build") {
            steps {
                script {
                    docker_push("VaultifyCICD", "vaultify-backend", "vidisha1602")


                }
            }
        }

        stage("Push to Docker Hub") {
            steps {
                echo "this is pushing the image to docker hub"
                withCredentials([usernamePassword
        ('credentialsId':"dockerHubCred",
        passwordVariable:"dockerHubPass",
        usernameVariable:"dockerHubUser")]){
        bat "docker login -u %dockerHubUser% -p %dockerHubPass%"
        bat "docker tag vaultify-backend %dockerHubUser%/vaultify-backend"
        bat "docker push %dockerHubUser%/vaultify-backend"
   }
                   
            }
        }

        stage("Deploy") {
            steps {
                echo "this is deploying the code"
            }
        }
    }
}
