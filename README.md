# Statistical Business Register User Interface using React.js

The following tutorials were used to get the deployment with Node.js and the login with redux sorted:

https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d#.mt6bbdd8m

https://github.com/mxstbr/login-flow

## Environment Setup for the UI

1. Install NPM, it is included with Node.js ([Download](https://nodejs.org/en/))

2. For testing locally, set the following environment variables (use `vim ~/.profile`):

```shell
export ONS_BI_UI_TEST_ADMIN_USERNAME=admin
export ONS_BI_UI_TEST_ADMIN_PASSWORD=admin
export ONS_BI_UI_TEST_USER_USERNAME=test
export ONS_BI_UI_TEST_USER_PASSWORD=test
export JWT_SECRET=SECRET
```

## Running the Demo UI:

1. Clone this repo, install dependencies and start NPM

```shell
git clone https://github.com/ONSdigital/sbr-ui.git
cd sbr-ui
npm install
npm start
```

The NPM start command uses the following commands:

```shell
npm run build
SERVE_HTML=true ENV=local node server
```

This will run Node and React on localhost:3001, since Node is serving
`index.html`, hot-reloading will not work.

To use hot-reloading, use `npm restart` which runs `react-scripts start`, this
will start React on port 3000. To start the server, use `ENV=local node server/index.js`.

## Testing

You can run `npm test` to run the two test files, make sure you have done `npm restart` to start the UI prior to the test, or the integration tests will fail.

`server.test.js` is run using Mocha and `integration-test.js` is run using Jasmine.

To run the tests individually, use `mocha test/server.test.js` and `jasmine test/integration-test.js`.

For the Jasmine test to work, chromedriver is required, install this with the following command:

```shell
brew install chromedriver
```

## Useful Extensions

* [Advanced REST Client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo) - for testing Node routes

* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi/related) - for viewing props & state of React components

* [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) - for seeing what is happening in your Redux store

## Logging into the Demo UI:

### Locally

Username and password are `test` or `admin`.

### Deployed

Use your ONS credentials.

## Troubleshooting

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for details.

## License

Copyright ©‎ 2017, Office for National Statistics (https://www.ons.gov.uk)

Released under MIT license, see [LICENSE](LICENSE.md) for details.
