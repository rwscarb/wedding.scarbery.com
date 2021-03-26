const { EnvironmentPlugin } = require('webpack');
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

const projectConfig = require("./config.js");

module.exports = {
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map',
    plugins: [
      new SentryWebpackPlugin({
        // sentry-cli configuration
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: projectConfig.sentry.org,
        project: projectConfig.sentry.project,

        // webpack specific configuration
        include: "./dist",
        ignore: ["node_modules", "webpack.config.js"],
      }),
      new EnvironmentPlugin(['NODE_ENV', 'DEBUG', 'SENTRY_DSN', 'GTAG_ID']),
    ],
  },

  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = projectConfig.site.title;
      return args;
    })
  },

  transpileDependencies: [
    'vuetify'
  ]
}