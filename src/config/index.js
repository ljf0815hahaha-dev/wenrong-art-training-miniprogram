/**
 * 小程序运行配置。
 * 生产体验包使用本地演示数据；连接业务后端时再配置 VITE_API_BASE_URL。
 */
const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL
export const FRONTEND_DEMO_ENABLED = import.meta.env.VITE_FRONTEND_DEMO === 'true'
export const API_BASE_URL = FRONTEND_DEMO_ENABLED ? '' : (configuredApiBaseUrl || '').replace(/\/$/, '')
export const APP_API_PREFIX = '/app-api'
export const TENANT_ID = '1'

// 仅用于本地真机联调：后端 local profile 会把 test1 解析为用户 ID 1。
// 生产构建由 .env.production 显式关闭，发布前也请确认该开关为 false。
export const DEV_MOCK_ENABLED = import.meta.env.VITE_ENABLE_DEV_MOCK === 'true'
export const DEV_MOCK_TOKEN = import.meta.env.VITE_DEV_MOCK_TOKEN || 'test1'

export const isWeixinMiniProgram = () => {
  // #ifdef MP-WEIXIN
  return true
  // #endif
  return false
}
