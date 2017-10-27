const winston = require('winston');
const fs = require('fs');

// Logging Setup
const tsFormat = () => (new Date()).toLocaleTimeString();
const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = new (winston.Logger)({
  transports: [
    // Colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
    }),
    new (winston.transports.File)({
      filename: `${logDir}/sbr-ui-node-logs.log`,
      timestamp: tsFormat,
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    }),
  ],
});

// Morgan appends an extra \n, so we need to remove it
logger.stream = {
  write: (message, encoding) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};


module.exports = logger;
