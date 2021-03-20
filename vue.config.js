module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Smart Wedding Contract';
      return args;
    })
  }
}