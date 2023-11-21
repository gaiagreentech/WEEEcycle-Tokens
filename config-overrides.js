const webpack = require("webpack");
const {
    override,
} = require('customize-cra');

const env_prefix = /^react_app_/i;

const findwebpackplugin = (plugins, pluginname) =>
    plugins.find((plugin) => plugin.constructor.name === pluginname);

const overrideprocessenv = () => (config) => {
    const plugin = findwebpackplugin(config.plugins, 'DefinePlugin');
    return config;
};

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    http: false,
    https: false,
    url: false,
    zlib: false
  });
  config.resolve.fallback = fallback;
  
  // Prevents this warning to be shown:
  config.ignoreWarnings = [/Failed to parse source map/];

  config.module.rules.push({
    test: /\.(js|mjs|jsx)$/,
    enforce: "pre",
    loader: require.resolve("source-map-loader"),
    resolve: {
      fullySpecified: false,
    },
  });
  return config;
};
