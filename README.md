# 文融艺术培训小程序

面向微信小程序的 UniApp 前端。本仓库包含小程序源码、构建脚本和文档；业务后端不在本仓库中。

## 构建

在本目录运行：

复制 `.env.development.example` 为 `.env.development`，并按需修改接口地址和本地联调配置。
```bash
npm ci
npm run dev:mp-weixin
```

开发产物在 `dist/dev/mp-weixin`，用于微信开发者工具调试。上传体验版前运行：

```bash
npm run build:mp-weixin
```

正式产物在 `dist/build/mp-weixin`。请在微信开发者工具中导入这个目录并上传；不要上传 `dist/dev/mp-weixin`。

克隆仓库后首次构建体验版前，复制 `.env.production.example` 为 `.env.production`，然后运行 `npm run build:mp-weixin`。本地 `.env.*` 文件不会提交到仓库。

## AppID 与体验版

小程序 AppID 配置在 `src/manifest.json`，当前值为 `wxbeaa5211f10d208f`。默认生产构建是纯前端演示模式：页面数据来自 `src/data/demo-api.js`，不调用业务服务器、不使用微信云开发。演示图片使用包内静态资源。

上传体验版前，在本目录运行 `npm run build:mp-weixin`，然后将 `dist/build/mp-weixin` 导入微信开发者工具并上传。构建会以首页作为启动页、移除 UniApp 注入的 DCloud 远程预加载图片，并开启 URL 校验。不要上传 `dist/dev/mp-weixin`，它使用本地联调配置。

演示模式下购买、支付、签到和视频播放不会连接真实服务；页面仅用于浏览和展示交互，购物车等演示数据不会作为真实业务数据保存。

## 连接真实业务后端

如需切换到真实业务数据，在 `.env.production` 中设置 `VITE_FRONTEND_DEMO=false` 和 `VITE_API_BASE_URL=https://你的接口域名`，再重新构建。接口域名必须已在微信公众平台配置为 request 合法域名，并由 HTTPS 提供服务。开发联调配置仍在 `.env.development`。
