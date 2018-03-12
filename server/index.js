'use strict';

// Rule exceptions:
/* eslint strict: "off" */
/* eslint no-console: "off" */

const logger = require('./utilities/logger')(module);

const app = require('./app');

const PORT = process.env.PORT || 3001;

app.maxSockets = 500;
app.listen(PORT, () => {
  logger.info(`App listening on port ${PORT}!`);
});
