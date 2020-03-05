# Push Service

Push Service

## Structure

```bash

|-- app.js
|-- api
|   |-- index.js
|   |-- v1
|       |-- routes
|           |-- index.js
|       |-- controllers
|           |-- index.js
|           |-- controller.js
|       |-- services
|           |-- index.js
|           |-- service.js
|       |-- utils
|           |-- index.js
|           |-- util.js
|       |-- schema
|   |-- v2
|       |-- routes
|           |-- index.js
|       |-- controllers
|           |-- index.js
|           |-- controller.js
|       |-- services
|           |-- index.js
|           |-- service.js
|       |-- utils
|           |-- index.js
|           |-- util.js
|       |-- schema
|-- config
|   |-- db.js
|-- coverage
|   |-- template
|       |-- html
|-- tests
|   |-- v1
|       |-- api
|       |-- unit
|   |-- v2
|       |-- api
|       |-- unit
|-- README.md
|-- swagger.json

```

---

## Requirements

For development, you will only need Node.js/npm, installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v10.16.0

    $ npm --version
    6.9.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

### NPM installation

## After installing node, use NPM to run package.json script commands

## Install

    $ git clone https://stash.pubsvs.com/scm/threefold/template-node-app.git
    $ cd template-node-app
    $ npm install

## Configure app

Open `./package.json` then edit it with local configuration settings. You will need:

- e.g. A local db setting;

## Running the project

[nodemon](https://nodemon.io/) server monitoring and reload utlility

    $ npm run startdev

## Sensitive File Access

[git-secret](https://git-secret.io/) is used to encrypy keys at rest, please contact (a maintainer) to be added to the keyring  
Once you have been added you will be able to decrypt sensitive file(s) that facilitate local development and testing.

## Linting

Use eslint to detail linting warnings and errors:

- \$ npm run lint

Use eslint to detail lint and fix warnings and errors:

- \$ npm run lint:fix

---

## API Specification

[Swagger](https://swagger.io/) for API definition. Swagger is mounted at /api-docs/

---

## Mocha Test framework and Istanbul for code coverage

- [Mocha](https://mochajs.org/) Test framework
- [Istanbul](https://istanbul.js.org/) Code coverage utility
- Code coverage is configured in package.json

## Testing

Run unit tests:

- \$ npm run test

Run api tests:

- \$ npm run api_test

## Git Hooks

[Husky](https://github.com/typicode/husky) configured to implement git hooks. Files being staged (git add) will be linted prior to staging.

- \$ git add

---

## Versioning

We use [SemVer](http://semver.org/) for versioning.

---
