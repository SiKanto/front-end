const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "stream": require.resolve("stream-browserify"),
      "url": require.resolve("url/"),
      "crypto": require.resolve("crypto-browserify"),
      "assert": require.resolve("assert/"),
      "util": require.resolve("util/"),
    },
  },
  webpack: {
    plugins: [
      // Memastikan React Refresh hanya aktif di development mode
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }),
    ],
    configure: (config, { env }) => {
      if (env === 'production') {
        // Hapus React Refresh di production
        config.plugins = config.plugins.filter(
          (plugin) => plugin.constructor.name !== 'ReactRefreshPlugin'
        );
      }
      return config;
    },
  },
};
