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

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);  
  
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

  const plugin = findwebpackplugin(config.plugins, 'DefinePlugin');

  const processenv = plugin.definitions['process.env'] || {};

  const transformedenv = Object.keys(processenv)
      .filter((key) => env_prefix.test(key))
      .reduce((env, key) => {
          const crakey = key.replace('react_app_', '');
          env[crakey] = processenv[key];
          return env;
      }, {});
  plugin.definitions['process.env'] = {
      ...processenv,
      ...transformedenv,
  };

  return config;
};
