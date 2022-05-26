# Quasar Store

[![Netlify Status](https://api.netlify.com/api/v1/badges/4112ddf4-30f4-4857-bb20-7aa0ab31e5e3/deploy-status)](https://app.netlify.com/sites/quasar-supabase-vue/deploys)

### Store app with Quasar Framework and Supabase (an open source Firebase alternative)

Small store project being built using [Vue3](https://vuejs.org/), [Supabase](https://supabase.com/docs/) and [Quasar](https://quasar.dev/) framework, based on the application developed in the [tutorial](https://www.youtube.com/playlist?list=PLBjvYfV_TvwIfgvouZCaLtgjYdrWQL02d) available on the [Patrick Monteiro](https://www.youtube.com/c/PatrickMonteiroEng)'s channel.

All authentication functionality used in this project is isolated in the following repository [kit-auth-supabase-quasar](https://github.com/silv4b/kit-auth-supabase-quasar).

## Techs

Quasar Store uses a number of open source projects to work properly:

- VueJS 3
- Vue Router
- Quasar Framework
- Supabase

# Dependencies

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

## Removing menur bar from electron app (optional)

After generate your electron app with the following command

```bash
quasar dev -m electron
```

Go to your `src-electron\electron-main.js` and add the specified line below

```javascript
mainWindow = new BrowserWindow({
  /*
  some code here
  */
  autoHideMenuBar: true /* <-- add this line */,
  webPreferences: {
    /*
    some code here too
    */
  },
});
```

# Netlify

## Using .env file in deploy on netlify

Add the variables through the netlify UI at `Site settings > Build & deploy > Environment > Environment variables`. In my case there are two, `SUPABASE_KEY` and `SUPABASE_URL`.

In the `quasar.config.js` file, in the build settings, modify the `env` from: env: `envparser()` best for working with multiple .env files to something like.

```javascript
build :{
  // ...
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
  },
  // ...
}
```

So that the netlify deploy build can inject the inserted variables through its UI.

If you are using netlify-cli (optional), after configuring it, just run the command 'netlify link' to link your local repository with the online project, if you haven't created it, use the documentation to create and proceed.

To test locally use: `quasar build && netlify dev`, to deploy use: `netlify build -prod` (in this case netlify will use the local environment variables, so beware. It works best if used in conjunction with the `env: envparser()` configuration in the `quasar.config.js` file).  

To test locally use: `quasar build && netlify dev`, to deploy use: `netlify build --prod` (in this case netlify will use the local environment variables, so beware. It works best if used in conjunction with the `env: envparser()` configuration in the `quasar.config.js` file.

To better use the netlify deploy, create a netlify.toml file containing the following content:

```toml
[build]
  # functions = "functions"
  base     = ""
  publish  = "dist/spa"
  command  = "quasar build"

[[redirects]]
  from   = "/*"
  to     = "/index.html"
  status = 200
```

Netlify uses netlify.toml data primarily at deploy time. The `[[redirects]]` part has the same role as the `_redirects` file created in the `public/` folder.

## Deploy on Netlify

After successful deployment on Netlify, go to your project on supabase.io, then under authentication, in the site url settings and additional redirect urls, add, after a comma, the link of your application in Netlify.

## Solving netlify's 404 error with vue-router in history mode

According to Antonio Ufano [here](https://antonioufano.com/articles/fix-404-errors-with-vuejs-apps-on-netlify/) and the Netlify documentation [here](https://docs.netlify.com/routing/redirects/), if the vue-router is configured as history mode, it is necessary to create a plain text file with the following lines

```bash
/*    /index.html   200
```

and add it to your project's `public` folder as netlify will automatically recognize it.

# Electron

## Start the app in development mode fot windows/linux

```bash
quasar dev -m electron
```

# Managing Code

## Lint the files

```bash
yarn lint
# or
npm run lint
```

## Format the files

```bash
yarn format
# or
npm run format
```

# Debugging with vscode

## Configuring vscode debugger in Quasar project

First of all, it is necessary to enable the devTool in the `quasar.config.js` file, inside the build like this:

```javascript
build: {
	//...
	devtool: "source-map",
	//..
}
```

Once this is done, a launch.json file must be created inside the .vscode folder containing the following content:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Quasar App: chrome",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack://<project_name>/./src/*": "${webRoot}/*"
      }
    }
  ]
}
```

In `"sourceMapPathOverrides"` key, change `<project_name>` to your project name (accessible in `name` property in your quasar project's `package.json` file), after these settings, run your project with 'quasar dev' and launch the debugger, in my case I installed [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome).

To start the debugger, click on the Run and Debug option in the side menu of your vscode and click on the play button, while your project is already running, a new instance of google chrome will be opened in the link that was configured in the property `"url"` from the launch.json file you created earlier, so by marking break points in your project, the debugger should follow them normally.

# To build the project

## Build the app for windows/lionux with electron

```bash
quasar build -m electron
```

## Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).
