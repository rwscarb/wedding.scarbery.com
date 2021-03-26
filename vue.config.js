const config = require("config.js");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new SentryWebpackPlugin({
        // sentry-cli configuration
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: config.sentry.org,
        project: config.sentry.project,

        // webpack specific configuration
        include: "./dist",
        ignore: ["node_modules", "webpack.config.js"],
      }),
    ],
  },

  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = config.site.title;
      return args;
    })
  },

  transpileDependencies: [
    'vuetify'
  ]
}