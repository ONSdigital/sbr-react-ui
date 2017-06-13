#!groovy
@Library('jenkins-pipeline-shared@feature/cloud-foundry-deploy') _

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
  }
  triggers {
    pollSCM('*/5 * * * *') // pollSCM every 5 minutes
  }
  stages {
    stage('Checkout') {
      agent any
      steps {
        colourText("info","Running build ${env.BUILD_ID} on ${env.JENKINS_URL}...")
        checkout scm
        //stash name: 'app'
      }
    }
    stage('Install Dependancies') {
      agent { label 'adrianharristesting' }
      steps {
        sh '''node --version
              npm --version'''
        colourText("info","Running NPM install...")
        sh 'npm install'
        //stash name: 'test'
      }
    }
    stage('Test - Unit Tests') {
      agent { label 'adrianharristesting' }
      steps {
        colourText("info","Running unit tests...")
        echo 'STUB: this will be completed once feature/utils-testing is merged into test/deploy'
      }
    }
    stage('Test - Server') {
      agent { label 'adrianharristesting' }
      steps {
        colourText("info","Running server tests...")
        sh 'node_modules/mocha/bin/mocha test/server.test.js'
      }
    }
    stage('Build') {
      agent { label 'adrianharristesting' }
      steps {
        echo '...'
        // zip -g sbr-ui.zip build
        sh '''npm run build
              ls -la
              tar -czvf sbr-ui.tar.gz -C build .
              ls -la'''
        stash includes: '*.tar.gz', name: 'test'
      }
    }
    stage('Deploy - Dev') {
      agent any
      steps {
        unstash 'test'
        sh 'ls -la'
        //sh 'zip -r test-zip.zip build'
        //sh 'tar -ztvf sbr-ui.tar.gz'
        //sh 'ls -la'
        colourText("info","Deploying to DEV...")
        sh 'cf buildpacks'
        deployToCloudFoundry('cloud-foundry-sbr-dev-user','sbr','dev','dev-sbr-ui','sbr-ui.tar.gz','manifest.yml')
      }
    }
    stage('Test - Integration') {
      agent { label 'r-slave' }
      steps {
        // sh 'rm -rf chromedriver'
        colourText("info","Running Selenium Integration tests against deployed DEV app...")
        //sh 'UI_URL=http://localhost:3000 node_modules/.bin/jasmine test/integration-test.js'
        //sh 'node_modules/.bin/jasmine test/integration-test.js'
      }
    }
    stage('Deploy - Test') {
      agent any
      steps {
        colourText("info","Deploying to TEST...")
      }
    }
    stage('Promote to Beta') {
      agent any
      steps {
        timeout(time: 1, unit: 'MINUTES') {
          input 'Deploy to Beta?'
        }
      }
    }
    stage('Deploy - Beta') {
      agent any
      steps {
        colourText("info","Deploying to BETA...")
      }
    }
  }
}

/*
* @method colourText(level,text)
*
* @description This method will wrap any input text inside
* ANSI colour codes.
*
* @param {String} level - The logging level (warn/info)
* @param {String} text - The text to wrap inside the colour
*
*/
def colourText(level,text){
  wrap([$class: 'AnsiColorBuildWrapper']) {
    // This method wraps input text in ANSI colour
    // Pass in a level, e.g. info or warning
    def code = getLevelCode(level)
    echo "${code[0]}${text}${code[1]}"
  }
}

/*
* @method getLevelCode(level)
*
* @description This method is called with a log level and
* will return a list with the start and end ANSI codes for
* the log level colour.
*
* @param {String} level - The logging level (warn/info)
*
* @return {List} colourCode - [start ANSI code, end ANSI code]
*
*/
def getLevelCode(level) {
    def colourCode
    switch (level) {
        case "info":
            // Blue
            colourCode = ['\u001B[34m','\u001B[0m']
            break
        case "error":
            // Red
            colourCode = ['\u001B[31m','\u001B[0m']
            break
        default:
            colourCode = ['\u001B[31m','\u001B[0m']
            break
    }
    colourCode
}
