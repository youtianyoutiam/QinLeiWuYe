// //按需引用 Element
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {
  ElementPlusResolver
} = require('unplugin-vue-components/resolvers')


const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 设置css的主入口文件
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "./src/styles/style.scss";`
      }
    }
  },
  //配值按需引用 Element
  configureWebpack: {
    plugins: [
      //按需引用 Element
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  }
})