pipeline{
    
    agent { label "docker"}
    
    stages{
        
        stage("Code"){
            steps{
                echo "this is cloning the code"
                git url: "https://github.com/vidisha162/vautlify.git", branch:"main"
                echo "code cloning successfully done"
            }
        }
        stage("Build"){
            steps{
                echo "this is building the code"
                bat "docker build -t vaultify-backend backend"
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

        stage("Deploy"){
            steps{ 
                echo "this is deploying the code"
            }
        }
    }
}