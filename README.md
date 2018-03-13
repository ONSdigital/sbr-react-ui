# sbr-ui

[![phase](https://img.shields.io/badge/phase-ALPHA-blue.svg)](https://img.shields.io/badge/phase-ALPHA-blue.svg) [![license](https://img.shields.io/github/license/mashape/apistatus.svg)](./LICENSE) (https://www.versioneye.com/user/projects/59cb91720fb24f005d4bc6c6) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/4e4fd30114bf491ba640872d0e902f3c)](https://www.codacy.com/app/ONSDigital/sbr-ui?utm_source=github.com&utm_medium=referral&utm_content=ONSdigital/sbr-ui&utm_campaign=badger)

The Statistical Business Register User Interface allows a user to query `sbr-api`, which returns Enterprise, Legal Unit and Administrative (VAT/PAYE/CH) data.

The following tutorials were used to help with the deployment using Node.js, the login with redux and the isolation of bootstrap styles: [Node](https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d#.mt6bbdd8m
), [Login](https://github.com/mxstbr/login-flow) and [Bootstrap Isolation](https://formden.com/blog/isolate-bootstrap).

### Table of Contents
**[1. Environment Setup](#environment-setup-for-the-ui)**<br>
**[2. Running the UI](#running-sbr-ui)**<br>
**[3. Running the API's](#running-the-apis)**<br>
**[4. Testing](#testing)**<br>
**[5. Useful Extensions](#useful-extensions)**<br>
**[6. Logging into the UI](#logging-into-sbr-ui)**<br>
**[7. Troubleshooting](#troubleshooting)**<br>
**[8. Contributing](#contributing)**<br>
**[9. License](#license)**<br>

## Environment Setup for the UI

1. Install NPM, it is included with [Node.js](https://nodejs.org/en/)

## Running sbr-ui:

### Devlopment Setup

1. Clone this repo and install dependencies:

```shell
git clone https://github.com/ONSdigital/sbr-ui.git
cd sbr-ui
npm install
```

2. Start the `React.js` development server (which uses hot-reloading):

```shell
npm run start:react
```

3. Start the `Node.js` server:

```shell
npm run start:server
```

### Docker Setup

Build and run the UI inside a Docker container.

```shell
docker build -t sbr-ui .
docker run -p 3001:3001 sbr-ui
```

## Running the API's

| API                                                                    | Start Command                                                                     |
|------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| [sbr-api](https://github.com/ONSdigital/sbr-api)                       | `sbt "api/run -Dhttp.port=9002"`                                                  |
| [sbr-admin-data-api](https://github.com/ONSdigital/sbr-admin-data-api) | `sbt "api/run -Dsource=hbaseInMemory -Dsbr.hbase.inmemory=true -Dhttp.port=9003"` |
| [sbr-control-api](https://github.com/ONSdigital/sbr-control-api)       | `sbt "api/run -Dsbr.hbase.inmemory=true -Dhttp.port=9001"`                        |
| [business-index-api](https://github.com/ONSdigital/business-index-api) | `elasticsearch & sbt "api/run -Denvironment=local"`                               |

## Testing

Running `npm test` will run all the tests described below.

### Unit

All code in /utils will have associated unit tests in [/test/utils-spec](./test/utils-spec). Jasmine uses a [config file](./test/utils-unit-tests.js) which is necessary to get the tests working with ES6.

### Component

Jasmine, Enzyme and redux-mock-store are used for the component tests, which can be found in [/test/component-tests](./test/component-tests).

### Integration

The Selenium integration tests can be found in [/test/integration-test.js](./test/integration-test.js).

This test will only work if the UI is already running. You can point Selenium at the UI by providing a `UI_URL` environment variable, this is set to `http://localhost:3000` in the `npm test` command.

For the Jasmine test to work, chromedriver is required, install this with the following command:

```shell
brew install chromedriver
```

### Server

The [server tests](./test/server.test.js) test all the routes of the node server. The environment variable `SERVE_HTML=true` needs to be passed into the server to tell it to serve the bundled React code.

### Stress

The [stress tests](./test/loadtest-spec/loadtest-test.js) use [loadtest](https://github.com/alexfernandez/loadtest) alongside Jasmine. If you have the node server running, you can run the following command to run the stress tests:

`HOST=http://localhost:3001 REQUESTS=5000 npm run-script test-load`

To run the stress tests and the node server together, use the following:

`node server/ & HOST=http://localhost:3001 REQUESTS=5000 npm run-script test-load`

The node server will carry on running afterwards, you can shut it down with `killall node`.

## Useful Extensions

* [Advanced REST Client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo) - for testing Node routes

* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi/related) - for viewing props & state of React components

* [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) - for seeing what is happening in your Redux store

## Logging into sbr-ui:

Username and password are `admin`.

## Troubleshooting

### Using Bootstrap

If you wish to use any React component that requires Bootstrap CSS/JS, do the following:

```html
<div className="bootstrap-iso">
  <your code here>
</div>
```

More details on this can be found [here](https://github.com/ONSdigital/sbr-ui/pull/50).

## Contributing

See [CONTRIBUTING](./CONTRIBUTING.md) for details.

## License

Copyright ©‎ 2017, Office for National Statistics (https://www.ons.gov.uk)

Released under MIT license, see [LICENSE](./LICENSE) for details.
