const { EnvironmentPlugin } = require('webpack');
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

const projectConfig = require("./config.js");
const { routes } = require("./src/plugins/router.js");

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new SentryWebpackPlugin({
        // sentry-cli configuration
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: projectConfig.sentry.org,
        project: projectConfig.sentry.project,
        validate: true,

        // webpack specific configuration
        include: "./dist",
        ignore: ["node_modules", "webpack.config.js"],
      }),
      new EnvironmentPlugin(['NODE_ENV', 'SENTRY_DSN', 'GTAG_ID']),
    ],
  },

  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = projectConfig.site.title;
      return args;
    })
  },

  pluginOptions: {
    sitemap: {
      baseURL: projectConfig.site.baseURL,
      outputDir: './dist/robots',
      routes
    }
  },

  transpileDependencies: [
    'vuetify'
  ]
}