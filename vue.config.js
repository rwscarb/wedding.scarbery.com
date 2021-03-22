const SentryWebpackPlugin = require("@sentry/webpack-plugin");

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new SentryWebpackPlugin({
        // sentry-cli configuration
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: "ryan-scarbery",
        project: "ryan-scarbery",

        // webpack specific configuration
        include: "./dist",
        ignore: ["node_modules", "webpack.config.js"],
      }),
    ],
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Smart Wedding Contract';
      return args;
    })
  }
}