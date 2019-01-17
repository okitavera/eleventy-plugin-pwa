const fs = require("fs");
const workbox = require("workbox-build");

module.exports = (options, outputDir) => {
  appId = "eleventy-plugin-pwa";
  defaultOptions = {
    importWorkboxFrom: "local",
    cacheId: appId,
    skipWaiting: true,
    clientsClaim: true,
    swDest: `${outputDir}/service-worker.js`,
    globDirectory: outputDir,
    globPatterns: [
      "**/*.{html,css,js,mjs,map,jpg,png,gif,webp,ico,svg,woff2,woff,eot,ttf,otf,ttc,json}"
    ],
    runtimeCaching: [
      {
        urlPattern: /^.*\.(jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,
        handler: `staleWhileRevalidate`
      },
      {
        urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
        handler: `staleWhileRevalidate`
      }
    ]
  };

  const opts = Object.assign({}, defaultOptions, options);
  let files;
  try {
    files = fs.readdirSync(opts.globDirectory);
    if (files && files.length == 0)
      throw new Error(
        `No files that can be cached on '${opts.globDirectory}', ignoring.`
      );
  } catch (e) {
    return console.error("Plugin: " + appId + ": " + e.message);
  }
  return workbox.generateSW(opts).then(({ count, size, warnings }) => {
    warnings.forEach(console.warn);
    size = (size / 1048576).toFixed(2);
    console.log(
      `Plugin: ${appId}: ${count} files will be precached, totaling ${size} MB.`
    );
  });
};
