const shimmer = require("shimmer");

module.exports = {
  configFunction: (__, options = {}) => {
    function postBuild() {
      const Eleventy = require("@11ty/eleventy/src/Eleventy");
      shimmer.wrap(Eleventy.prototype, "finish", function(orig) {
        const outputDir = new Eleventy().outputDir;
        process.on("unhandledRejection", (reason) => {
          console.log("Reason: " + reason);
        });
        return function() {
          const swBuild = require("./src/builder");
          swBuild(options, outputDir).then((res) => console.log(res));
          return orig.apply(this);
        };
      });
    }
    setImmediate(postBuild);
  }
};
