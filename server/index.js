'use strict';

/* eslint strict: "off" */

const fork = require('child_process').fork;
const logger = require('./logger')(module);
const app = require('./app');

const RedisSession = require('./sessions/RedisSession');
const PsqlSession = require('./sessions/PsqlSession');
const JsonSession = require('./sessions/JsonSession');

const PORT = process.env.PORT || 3001;
const SESSION_DB = process.env.SESSION_DB || 'json';

// Choose which session type to use
const session = ((db) => {
  switch (db) {
    case 'json':
      logger.debug('Creating new JsonSession');
      return new JsonSession();
    case 'psql':
      logger.debug('Creating new PsqlSession');
      return new PsqlSession();
    case 'redis':
      logger.debug('Creating new RedisSession');
      return new RedisSession();
    default:
      logger.debug('Creating new JsonSession');
      return new JsonSession();
  }
})(SESSION_DB);
logger.info(`Using session type: ${session.name}`);

// On a local environment, we mock the API Gateway with the a node script on localhost:3002
const child = (process.env.ENV === 'local') ? fork('./server/apiGateway') : null;

logger.level = 'debug';
logger.info('Started Winston logger & created log file');

app.session = session;
app.maxSockets = 500;
app.listen(PORT, () => {
  logger.info(`sbr-ui-node-server listening on port ${PORT}!`);
});

// Cleanup Code - for before the application exits
process.stdin.resume(); // so the program will not close instantly

function exitHandler(options, err) {
  if (options.cleanup) {
    if (process.env.ENV === 'local') {
      logger.info('Killing child process (sbr-ui-mock-api-gateway)...');
      child.kill('SIGINT');
    }
  }
  if (err) logger.error(err.stack);
  if (options.exit) process.exit();
}

// Do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

// Catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// Catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

// Catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
