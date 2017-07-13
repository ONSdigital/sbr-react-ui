'use strict';

// Rule exceptions:
/* eslint strict: "off" */
/* eslint no-console: "off" */

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const app = require('./app');

const PORT = process.env.PORT || 3001;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.maxSockets = 500;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });

  console.log(`Worker ${process.pid} started`);
}
