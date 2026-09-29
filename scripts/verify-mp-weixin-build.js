const fs = require('fs')
const path = require('path')

const outputDir = path.resolve(process.cwd(), 'dist', 'build', 'mp-weixin')
const requiredFiles = [
  'app.js',
  'app.json',
  'app.wxss',
  'common/vendor.js',
  'pages/home/index.js',
  'pages/home/index.json',
  'pages/home/index.wxml',
  'pages/home/index.wxss',
  'pages/index/index.js',
  'pages/index/index.json',
  'pages/index/index.wxml',
  'pages/index/index.wxss',
  'custom-tab-bar/index.js',
  'custom-tab-bar/index.json',
  'custom-tab-bar/index.wxml',
  'custom-tab-bar/index.wxss'
]

const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(outputDir, file)))
if (missingFiles.length) {
  throw new Error(`WeChat build is incomplete; missing: ${missingFiles.join(', ')}`)
}

const appConfig = JSON.parse(fs.readFileSync(path.join(outputDir, 'app.json'), 'utf8'))
if (appConfig.pages?.[0] !== 'pages/home/index') {
  throw new Error(`Unexpected startup page: ${appConfig.pages?.[0] || '(missing)'}`)
}

const projectConfig = JSON.parse(fs.readFileSync(path.join(outputDir, 'project.config.json'), 'utf8'))
if (projectConfig.setting?.es6 !== false || projectConfig.setting?.minified !== false) {
  throw new Error('DevTools secondary ES6 conversion/minification must remain disabled')
}

console.log(`Verified WeChat upload directory: ${outputDir}`)
