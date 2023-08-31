const { defineConfig } = require('@vue/cli-service')
const CompressionPlugin = require('compression-webpack-plugin')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const glob = require('glob')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    extract: true,
  },
  configureWebpack: {
    plugins: [
      new CompressionPlugin(),
      new PurgeCSSPlugin({
        paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`,  { nodir: true }),
        safelist: [
            /-(leave|enter|appear)(|-(to|from|active))$/,
            /^(?!(|.*?:)cursor-move).+-move$/,
            /^router-link(|-exact)-active$/,
            /data-v-.*/,
            /^transition-/,
        ],
      }),
    ],
    resolve: {
      alias: {
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    },
  },
})
