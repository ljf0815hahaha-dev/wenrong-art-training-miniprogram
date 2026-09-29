import { readStorage, removeStorage, writeStorage } from '@/utils/storage'

const ACCESS_TOKEN_KEY = 'member_access_token'
const REFRESH_TOKEN_KEY = 'member_refresh_token'
const OPENID_KEY = 'member_openid'
const USER_ID_KEY = 'member_user_id'

// 真机联调阶段暂时关闭前端登录拦截；上线前改为 true 即可恢复鉴权。
export const AUTH_ENABLED = false

export const getAccessToken = () => readStorage(ACCESS_TOKEN_KEY)
export const getRefreshToken = () => readStorage(REFRESH_TOKEN_KEY)
export const getOpenid = () => readStorage(OPENID_KEY)
export const getUserId = () => readStorage(USER_ID_KEY)
export const isLoggedIn = () => AUTH_ENABLED && Boolean(getAccessToken())

export const saveLogin = (data) => {
  if (!data?.accessToken) return
  writeStorage(ACCESS_TOKEN_KEY, data.accessToken)
  if (data.refreshToken) writeStorage(REFRESH_TOKEN_KEY, data.refreshToken)
  if (data.openid) writeStorage(OPENID_KEY, data.openid)
  if (data.userId) writeStorage(USER_ID_KEY, data.userId)
}

export const clearLogin = () => {
  ;[ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, OPENID_KEY, USER_ID_KEY].forEach(removeStorage)
}

export const requireLogin = (redirect = '') => {
  if (!AUTH_ENABLED) return true
  if (isLoggedIn()) return true
  const query = redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''
  uni.navigateTo({ url: `/pages/login/index${query}` })
  return false
}
