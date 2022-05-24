// config/envparser.js
// source: https://www.publish0x.com/bala/steps-to-use-env-files-in-your-quasar-framework-project-xvyyxvm

const dotenv = require('dotenv');

let parsedEnv = dotenv.config({ path: '.env' }).parsed;

if (process.env.MODE_ENV === 'development') {
  parsedEnv = dotenv.config({ path: '.env.dev' }).parsed;
} else {
  parsedEnv = dotenv.config({ path: '.env.prod' }).parsed;
}

module.exports = () => parsedEnv;

/*
  Before:
  Install the dotenv package in this project with 'npm install save-dev dotenv' command.

  Create the config/envparser.js file and write this:

  const dotenv = require('dotenv');
  let parsedEnv = dotenv.config({ path: '.env' }).parsed;
  if (process.env.MODE_ENV === 'development') {
    parsedEnv = dotenv.config({ path: '.env.dev' }).parsed;
  } else {
    parsedEnv = dotenv.config({ path: '.env.prod' }).parsed;
  }
  module.exports = () => parsedEnv;

  After:
  The above code identifies in which mode the execution happens and based on that it uses the respective .env file. In my case, I have used only tree .env files. So, I will be keeping my development-related environment variables in .env.dev and .env.prod file and it will get loaded when I do the command quasar dev and the other common .env file will be loaded for other modes.

  In quasar configuration (quasar.config.js):
  Import the envparser configuration 'const envparser = require('./config/envparser');' here and inside the flag build, use envparser() in env:
  ...
  build {
    ...
    env: envparser(),
    ...
  }.

  The .env file:
  MODE_ENV="development"
  # MODE_ENV="production"

  The .env.prod/dev files must to be in root directory like this:
  SUPABASE_URL=link_supabase_url
  SUPABASE_KEY=supabase_key
*/
