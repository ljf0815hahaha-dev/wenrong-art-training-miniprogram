const { defineConfig } = require('vite')
const uniPlugin = require('@dcloudio/vite-plugin-uni')

// 该源码所用的旧版编译器是 CommonJS 包；兼容新版 Node 的模块解析方式。
const uni = uniPlugin.default || uniPlugin

module.exports = defineConfig({
  plugins: [uni()],
  build: {
    // The project is still on the 2022 UniApp compiler. Its production
    // minification output can run in DevTools while failing before the first
    // page mount in the iOS experience build. Keep the upload bundle readable
    // and let esbuild lower newer syntax to a conservative target.
    minify: false,
    target: 'es2015',
    sourcemap: false
  }
})
