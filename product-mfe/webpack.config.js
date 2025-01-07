const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const path = require("path");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "sysco",
    projectName: "product-mfe",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    resolve: {
      // Extensions directly in `resolve`
      extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx", ".json"],
      alias: {
        '@': path.resolve(__dirname, 'src'), // Resolve '@' to the 'src' directory
      },
    },
    externals: [
      "@sysco/auth-mfe", // List your micro-frontend dependencies as external
    ],
  });
};
