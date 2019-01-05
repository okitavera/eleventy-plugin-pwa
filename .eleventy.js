const shimmer = require("shimmer");

module.exports = {
  configFunction: (__, options = {}) => {
    function postBuild() {
      const Eleventy = require("@11ty/eleventy/src/Eleventy");
      shimmer.wrap(Eleventy.prototype, "finish", function(orig) {
        process.on("unhandledRejection", (reason) => {
          console.log("Reason: " + reason);
        });
        return function() {
          const swBuild = require("./builder");
          swBuild(options);
          return orig.apply(this);
        };
      });
    }
    setImmediate(postBuild);
  }
};
