const fs = require('fs')
const path = require('path')

const outputDir = path.resolve(process.cwd(), 'dist', 'build', 'mp-weixin')
const wxssPath = path.join(outputDir, 'app.wxss')
const configPath = path.join(outputDir, 'project.config.json')

const wxss = fs.readFileSync(wxssPath, 'utf8')
const preloadStart = wxss.indexOf('page::after{position:fixed;')
const appVariablesStart = preloadStart < 0 ? -1 : wxss.indexOf('page{--status-bar-height', preloadStart)

if (preloadStart >= 0 && appVariablesStart > preloadStart) {
  const cleanWxss = wxss.slice(0, preloadStart) + wxss.slice(appVariablesStart)
  if (cleanWxss.includes('shadow-grey.png')) {
    throw new Error('UniApp shadow preload URL is still present in app.wxss')
  }
  fs.writeFileSync(wxssPath, cleanWxss)
} else if (wxss.includes('shadow-grey.png')) {
  throw new Error('Could not safely remove the UniApp shadow preload URL')
}

const projectConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'))
projectConfig.setting = projectConfig.setting || {}
projectConfig.setting.urlCheck = true
// Vite/UniApp has already compiled the JavaScript and styles. Running the old
// bundle through DevTools' secondary transforms caused es6CompileEvent upload
// failures, so keep upload processing deterministic.
projectConfig.setting.es6 = false
projectConfig.setting.minified = false
fs.writeFileSync(configPath, `${JSON.stringify(projectConfig, null, 2)}\n`)

console.log('Prepared the WeChat build without secondary ES6 conversion or minification.')
