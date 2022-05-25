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

## Deploy on Netlify

(Melhorar descrição) After successful deployment on Netlify, go to your project on supabase.io, then under authentication, in the site url settings and additional redirect urls, add, after a comma, the link of your application in Netlify.

## Solving netlify's 404 error with vue-router in history mode

According to Antonio Ufano [here](https://antonioufano.com/articles/fix-404-errors-with-vuejs-apps-on-netlify/) and the Netlify documentation [here](https://docs.netlify.com/routing/redirects/), if the vue-router is configured as history mode, it is necessary to create a plain text file with the following lines

```bash
/*    /index.html   200
```

and add it to your project's `public` folder as netlify will automatically recognize it.

### Start the app in development mode fot windows/linux

```bash
quasar dev -m electron
```

# Managing Code

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

# To build the project

### Build the app for windows/lionux with electron

```bash
quasar build -m electron
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).
