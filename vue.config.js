const projectConfig = require("./config.js");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
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