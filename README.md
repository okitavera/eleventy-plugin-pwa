# eleventy-plugin-pwa

An [Eleventy](https://11ty.io) plugin to generate service worker.
Using Google Workbox to generate service-worker.js based on your `dir.output`.

### Note

Since (at this moment) `eleventy` doesn't have any API to do a things after build process, this plugin are using monkey patch method to wrap into the `finish` function in order to run workbox properly.

## Installation

```bash
npm i eleventy-plugin-pwa
```

#### Add to eleventy config file

```js
const pluginPWA = require("eleventy-plugin-pwa");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginPWA);
};
```

Read more about [Eleventy plugins](https://www.11ty.io/docs/plugins/)

#### Registering Service Worker

- [Eleventy-ways](<https://github.com/okitavera/eleventy-plugin-pwa/wiki/Registering-Service-Worker-(Eleventy-ways)>)

- [Webpack-ways](<https://github.com/okitavera/eleventy-plugin-pwa/wiki/Registering-Service-Worker-(using-webpack.DefinePlugin)>)

#### Adding Web App Manifest

Read [The Web App Manifest Guide](https://developers.google.com/web/fundamentals/web-app-manifest/)

## Options

You can also pass workbox generateSW options directly into the plugin.
For example :

```js
// overwriting destination file and more
const pluginPWA = require("eleventy-plugin-pwa");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginPWA, {
    swDest: "./build/sw.js",
    globDirectory: "./build",
    clientsClaim: true,
    skipWaiting: true
  });
};
```

Read more about it on [workbox generateSW module page](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config)

## License

This code is available under the [MIT license](LICENSE).
