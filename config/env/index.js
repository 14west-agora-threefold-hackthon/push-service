const cc = require('config-chain');
const path = require('path');
const opts = require('optimist').argv; // ALWAYS USE OPTIMIST FOR COMMAND LINE OPTIONS.

const PRODUCTION_ENVIRONMENT = 'production';
const DEVELOPMENT_ENVIRONMENT = 'development';
let defaults = require('./defaults'); // Load defaults

const env = opts.env || process.env.PUSH_SERVICE_ENV || DEVELOPMENT_ENVIRONMENT; // SET YOUR ENV LIKE THIS.
defaults.IS_PRODUCTION = env === PRODUCTION_ENVIRONMENT;

try {
  // eslint-disable-next-line global-require, import/no-unresolved
  const apiKeys = require('./apiKeys');
  defaults = Object.assign(defaults, apiKeys);
} catch (err) {
  console.log('keys file does not exist - falling through to environment variables');
}

// EACH ARG TO CONFIGURATOR IS LOADED INTO CONFIGURATION CHAIN
// EARLIER ITEMS OVERIDE LATER ITEMS
// PUTS COMMAND LINE OPTS FIRST, AND DEFAULTS LAST!

// strings are interpereted as filenames and will be loaded synchronously
const conf = cc(
  // OVERRIDE SETTINGS WITH COMMAND LINE OPTS
  opts,
  // ENV VARS IF PREFIXED WITH 'TEMPLATE_APP_'
  cc.env('PUSH_SERVICE_'), // TEMPLATE_APP__FOO = 'foo configuration'
  // FILE NAMED BY ENV
  path.join(__dirname, `config.${env}.json`),
  // IF `env` is PRODUCTION
  env === 'production' ? path.join(__dirname, 'special.json') : null, // load a special file, NULL IS IGNORED!
  // SUBDIR FOR ENV CONFIG
  path.join(__dirname, 'config', env, 'config.json'),
  // SEARCH PARENT DIRECTORIES FROM CURRENT DIR FOR FILE
  cc.find('config.json'),
  // DEFAULTS LAST
  defaults
);

module.exports = {
  conf
};
