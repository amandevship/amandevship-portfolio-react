pipeline {
    agent any

    environment {
        PATH = "/Users/amansharma/.nvm/versions/node/v22.22.2/bin:/opt/homebrew/bin:/usr/local/bin:${env.PATH}"
    }

    tools {
        nodejs 'NodeJS'
    }

    stages {

        stage('Tool Install') {
            steps {
                echo 'Node.js tool ready'
            }
        }

        stage('Git Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/amandevship/amandevship-portfolio-react.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    export PATH="/Users/amansharma/.nvm/versions/node/v22.22.2/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"
                    corepack enable
                    corepack prepare yarn@4.14.1 --activate
                    yarn install
                '''
            }
        }

        stage('Build Client') {
            steps {
                sh '''
                    export PATH="/Users/amansharma/.nvm/versions/node/v22.22.2/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"
                    yarn workspace client build
                '''
            }
        }
       stage('Deploy to Netlify') {
    steps {
        withCredentials([
           string(credentialsId: 'netlify-token', variable: 'NETLIFY_AUTH_TOKEN'),
           string(credentialsId: 'netlify-site-id', variable: 'NETLIFY_SITE_ID')
        ]) {
            sh '''
                export PATH="/Users/amansharma/.nvm/versions/node/v22.22.2/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"
                npm install -g netlify-cli
                netlify deploy --prod \
                    --dir=client/dist \
                     --auth=$NETLIFY_AUTH_TOKEN \
                    --site=$NETLIFY_SITE_ID
            '''
        }
    }
}

    }

    post {
        success {
            echo '✅ Client build completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Check the logs above.'
        }
    }
}