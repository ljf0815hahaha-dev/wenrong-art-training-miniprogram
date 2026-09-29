import { post } from '@/utils/request'
import { clearLogin, saveLogin } from '@/utils/auth'

export const loginByPassword = async (mobile, password) => {
  const data = await post('/member/auth/login', { mobile, password })
  saveLogin(data)
  return data
}

export const loginByWeixinPhone = async (phoneCode) => {
  const loginCode = await new Promise((resolve, reject) => {
    uni.login({ provider: 'weixin', success: (result) => resolve(result.code), fail: reject })
  })
  const data = await post('/member/auth/weixin-mini-app-login', {
    phoneCode,
    loginCode,
    state: `${Date.now()}-${Math.random().toString(16).slice(2)}`
  })
  saveLogin(data)
  return data
}

export const logout = async () => {
  try { await post('/member/auth/logout') } finally {
    clearLogin()
  }
}
