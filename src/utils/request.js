import { API_BASE_URL, APP_API_PREFIX, DEV_MOCK_ENABLED, DEV_MOCK_TOKEN, FRONTEND_DEMO_ENABLED, TENANT_ID } from '@/config'
import { getDemoApiResponse } from '@/data/demo-api'
import { getAccessToken, clearLogin } from '@/utils/auth'

const request = (options = {}) => {
  if (FRONTEND_DEMO_ENABLED) {
    try {
      return Promise.resolve(getDemoApiResponse(options))
    } catch (error) {
      return Promise.reject(error)
    }
  }
  if (!API_BASE_URL) return Promise.reject(new Error('尚未配置业务接口地址'))

  return new Promise((resolve, reject) => {
    const url = `${API_BASE_URL}${APP_API_PREFIX}${options.url}`
    const header = {
      'Content-Type': 'application/json',
      'tenant-id': TENANT_ID,
      ...(options.header || {})
    }
    // 真机联调时没有可用的登录流程，使用后端 local profile 提供的 mock token。
    // 该配置只在开发环境显式开启；正式包不会自动携带 test1。
    const token = getAccessToken() || (DEV_MOCK_ENABLED ? DEV_MOCK_TOKEN : '')
    if (token) header.Authorization = `Bearer ${token}`

    uni.request({
      ...options,
      url,
      header,
      success: (response) => {
        const result = response.data || {}
        if (response.statusCode === 401) {
          clearLogin()
          reject(new Error('登录已过期，请重新登录'))
          return
        }
        if (result.code !== 0) {
          reject(new Error(result.msg || '请求失败'))
          return
        }
        resolve(result.data)
      },
      fail: (error) => {
        const message = error?.errMsg || '网络连接失败'
        reject(new Error(`请求失败：${message}`))
      }
    })
  })
}

export const get = (url, data, options = {}) => request({ ...options, url, data, method: 'GET' })
export const post = (url, data, options = {}) => request({ ...options, url, data, method: 'POST' })
export const put = (url, data, options = {}) => request({ ...options, url, data, method: 'PUT' })
export const del = (url, data, options = {}) => request({ ...options, url, data, method: 'DELETE' })
export default request
