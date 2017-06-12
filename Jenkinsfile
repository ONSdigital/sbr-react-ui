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
*/
pipeline {
  agent none
  options {
    skipDefaultCheckout()
  }
  stages {
    stage('Information') {
      agent any
      steps {
        colourText("info","Running build ${env.BUILD_ID} on ${env.JENKINS_URL}")
        checkout scm
        stash name: 'app'
      }
    }
    stage('Build') {
      agent { label 'adrianharristesting' }
      steps {
        unstash 'app'
        sh '''node --version
              npm --version
              rm -rf node_modules'''
        echo 'Running npm install...'
        sh 'npm install'
      }
    }
    stage('Test - Server') {
     agent { label 'adrianharristesting' }
      steps {
        unstash 'app'
        echo 'Running server tests...'
        sh 'node_modules/mocha/bin/mocha test/server.test.js'
      }
    }
    stage('Test - Integration') {
      agent { label 'adrianharristesting' }
      steps {
        unstash 'app'
        // sh 'rm -rf chromedriver'
        echo 'Running integration tests...'
        //sh 'node_modules/.bin/jasmine test/integration-test.js'
      }
    }
    stage('Test - Unit Tests') {
      agent { label 'adrianharristesting' }
      steps {
        unstash 'app'
        echo 'Running unit tests...'
        echo 'STUB: this will be completed once feature/utils-testing is merged into test/deploy'
      }
    }
    stage('Deploy - Dev') {
      agent any
      steps {
        unstash 'app'
        echo 'CF push'
      }
    }
    stage('Deploy - Test') {
      agent any
      steps {
        unstash 'app'
        echo 'CF push'
      }
    }
    stage('Promote to Beta') {
      agent any
      steps {
        unstash 'app'
        timeout(time: 1, unit: 'MINUTES') {
          input 'Deploy to Beta?'
        }
      }
    }
    stage('Deploy - Beta') {
      agent any
      steps {
        unstash 'app'
        echo 'Deploying to Beta...'
      }
    }
    stage('Promote to Production?') {
      agent any
      steps {
        unstash 'app'
        timeout(time: 1, unit: 'MINUTES') {
          input 'Deploy to Production?'
        }
      }
    }
    stage('Deploy - Production') {
      agent any
      steps {
        unstash 'app'
        echo 'Deploying to Production...'
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
