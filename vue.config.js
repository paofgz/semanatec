module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.geojson$/,
          loader: 'json-loader'
        },
        {
        test: /\bmapbox-gl-csp-worker.js\b/i,
        use: { loader: 'worker-loader' }
        },
      ]
  },
}
}