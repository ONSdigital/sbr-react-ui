#!groovy
@Library('jenkins-pipeline-shared@develop') _

/*
* sbr-ui Jenkins Pipeline
*
* The information stage will check the code of SCM, due to the
* skipDefaultCheckout option being defined in the pipeline main
* body, none of the other stages will check out the code.
*
* Only the master can check out the code as the 'adrianharristesting'
* node is not behind the Artifactory proxy.
*
* The unit tests and server tests run before deployment, then once the app
* has been deployed to CloudFoundry (Dev), the Selenium tests will run against
* the deployed app. If these pass, it will be deployed to Test.
*
*/
pipeline {
  agent none
  options {
    skipDefaultCheckout()
    buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '30'))
    timeout(time: 60, unit: 'MINUTES')
  }
  environment {
    SBR_UI_TEST_ADMIN_USERNAME="admin"
    SBR_UI_TEST_ADMIN_PASSWORD="admin"
    SBR_UI_TEST_USER_USERNAME="test"
    SBR_UI_TEST_USER_PASSWORD="test"
    JWT_SECRET="SECRET"
  }
  stages {
    stage('Checkout') {
      agent any
      steps {
        colourText("info","Running build ${env.BUILD_ID} on ${env.JENKINS_URL}...")
        colourText("info","Checking out Github & Gitlab repos")
        deleteDir()
        checkout scm
        dir('conf') {
          git(url: "$GITLAB_URL/StatBusReg/sbr-ui.git", credentialsId: 'sbr-gitlab-id', branch: 'develop')
        }
        stash name: 'app'
      }
    }
    stage('Install Dependancies & Build') {
      agent { label 'adrianharristesting' }
      steps {
        colourText("info","Running 'npm install' and 'npm build'...")
        deleteDir()
        sh 'node --version'
        sh 'npm --version'
        unstash 'app'
        sh 'npm install'

        // Install the node_modules for just the server
        dir('server') {
          sh 'npm install'
        }
      }
    }
    stage('Test - Unit, Component, Server, Coverage + Stress') {
      agent { label 'adrianharristesting' }
      steps {
        parallel (
          "Unit" :  {
            colourText("info","Running unit tests...")
            sh 'npm run-script test-unit'
          },
          "Stress" :  {
            colourText("info","Running stress tests...")
            sh 'ENV=local node server/ & HOST=http://localhost:3001 REQUEST=5000 REQ_PER_SECOND=50 npm run-script test-load'
            // sh 'killall node'
            // The above command will leave node running, will this be closed along with the workspace?
          },
          "Server" : {
            colourText("info","Running server tests...")
            sh "npm run-script test-server"
          },
          "Coverage Report" : {
            colourText("info","Generating coverage report...")
            sh "npm run-script cover"
            step([$class: 'CoberturaPublisher', coberturaReportFile: '**/coverage/cobertura-coverage.xml'])
          },
          "Style Report" : {
            colourText("info","Generating style report...")
            sh 'npm run-script lint-report-xml'
            step([$class: 'CheckStylePublisher', pattern: 'coverage/eslint-report-checkstyle.xml'])
            //checkstyle canComputeNew: false, canRunOnFailed: true, defaultEncoding: '', healthy: '', pattern: 'coverage/eslint-report-checkstyle.xml', unHealthy: ''
          }
        )
      }
    }
    stage('Zip Project') {
      agent { label 'adrianharristesting' }
      when {
        anyOf {
          branch "develop"
          branch "release"
          branch "master"
        }
      }
      steps {
        script {
          colourText("info","Zipping project...")
          colourText("info","Host is: ${env.CLOUD_FOUNDRY_ROUTE_SUFFIX}")
          sh "sed -i -e 's|Local|dev|g' src/config/constants.js"
          sh "sed -i -e 's|http://localhost:9002|https://dev-sbr-api.${env.CLOUD_FOUNDRY_ROUTE_SUFFIX}|g' src/config/api-urls.js"
          sh "sed -i -e 's|http://localhost:3001|https://dev-sbr-ui.${env.CLOUD_FOUNDRY_ROUTE_SUFFIX}|g' src/config/api-urls.js"
          sh 'npm run build'
          // For deployment, only need the node_modules/package.json for the server
          sh 'rm -rf node_modules'
          sh 'cp -r server/node_modules .'
          sh 'rm -rf package.json'
          sh 'cp server/package.json .'
          sh 'rm -rf manifest.yml'
          // Get the proper manifest from Gitlab
          sh 'cp conf/dev/manifest.yml .'
          sh 'zip -r sbr-ui.zip build node_modules favicon.ico package.json server manifest.yml'
          stash name: 'zip'
        }
      }
    }
    stage('Deploy - DEV') {
      agent any
      when {
        anyOf {
          branch "develop"
        }
      }
      steps {
        script {
          colourText("info","Deploying to DEV...")
          unstash 'zip'
          deployToCloudFoundry('cloud-foundry-sbr-dev-user','sbr','dev','dev-sbr-ui','sbr-ui.zip','manifest.yml')
        }
      }
    }
    stage('Integration Tests') {
      agent any
      when {
        anyOf {
          branch "release"
          branch "master"
        }
      }
      steps {
        script {
          colourText("info","Running integration tests...")
        }
      }
    }
    stage('Deploy - TEST') {
      agent any
      when {
        anyOf {
          branch "release"
        }
      }
      steps {
        script {
          colourText("info","Deploying to TEST...")
          unstash 'zip'
          deployToCloudFoundry('cloud-foundry-sbr-test-user','sbr','test','test-sbr-ui','sbr-ui.zip','manifest.yml')
        }
      }
    }
    stage('Promote to BETA?') {
      agent any
      when {
        anyOf {
          branch "master"
        }
      }
      steps {
        script {
          colourText("info","Deploy to BETA?")
          timeout(time: 10, unit: 'MINUTES') {
            input 'Deploy to Beta?'
          }
        }
      }
    }
    stage('Deploy - BETA') {
      agent any
      when {
        anyOf {
          branch "master"
        }
      }
      steps {
        script {
          colourText("info","Deploying to BETA...")
          unstash 'zip'
          deployToCloudFoundry('cloud-foundry-sbr-prod-user','sbr','beta','prod-sbr-ui','sbr-ui.zip','manifest.yml')
        }
      }
    }
  }
  post {
    success {
      colourText("success", "All stages complete. Build was successful.")
      sendNotifications currentBuild.result, "\$SBR_EMAIL_LIST"
    }
    unstable {
      colourText("warn", "Something went wrong, build finished with result ${currentResult}.")
      sendNotifications currentResult, "\$SBR_EMAIL_LIST"
    }
    failure {
      colourText("warn","Build failed")
      sendNotifications currentResult, "\$SBR_EMAIL_LIST"
    }
  }
}
