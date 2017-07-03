'use strict';

// Rule exceptions:
/* eslint strict: "off" */

const app = require('./app');

const PORT = process.env.PORT || 3001;

/* eslint no-console: "off" */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
