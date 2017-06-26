# Statistical Business Register User Interface using React.js

The following tutorials were used to get the deployment with Node.js and the login with redux sorted:

https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d#.mt6bbdd8m

https://github.com/mxstbr/login-flow

## Environment Setup for the UI

1. Install NPM, it is included with Node.js ([Download](https://nodejs.org/en/))

2. For testing locally, set the following environment variables (use `vim ~/.profile`):

```shell
export SBR_UI_TEST_ADMIN_USERNAME=admin
export SBR_UI_TEST_ADMIN_PASSWORD=admin
export SBR_UI_TEST_USER_USERNAME=test
export SBR_UI_TEST_USER_PASSWORD=test
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

Running `npm test` will run all the tests described below.

### Unit

All code in /utils will have associated unit tests in [/test/utils-spec](https://github.com/ONSdigital/sbr-ui/tree/feature/component-testing/test/utils-spec). Jasmine uses a [config file](https://github.com/ONSdigital/sbr-ui/blob/feature/component-testing/test/utils-unit-tests.js) which is necessary to get the tests working with ES6.

### Component

Jasmine, Enzyme and redux-mock-store are used for the component tests, which can be found in [/test/component-tests](https://github.com/ONSdigital/sbr-ui/tree/feature/component-testing/test/component-tests).

### Integration

The Selenium integration tests can be found in [/test/integration-test.js](https://github.com/ONSdigital/sbr-ui/blob/feature/component-testing/test/integration-test.js).

This test will only work if the UI is already running. You can point Selenium at the UI by providing a `UI_URL` environment variable, this is set to `http://localhost:3000` in the `npm test` command.

For the Jasmine test to work, chromedriver is required, install this with the following command:

```shell
brew install chromedriver
```

### Server

The [server tests](https://github.com/ONSdigital/sbr-ui/blob/feature/component-testing/test/server.test.js) test all the routes of the node server. The environment variable `SERVE_HTML=true` needs to be passed into the server to tell it to serve the bundled React code.

## Useful Extensions

* [Advanced REST Client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo) - for testing Node routes

* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi/related) - for viewing props & state of React components

* [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) - for seeing what is happening in your Redux store

## Logging into the Demo UI:

Username and password are `test` or `admin`.

## Troubleshooting

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for details.

## License

Copyright ©‎ 2017, Office for National Statistics (https://www.ons.gov.uk)

Released under MIT license, see [LICENSE](LICENSE.md) for details.
