/**
 * 小程序缓存容错封装。缓存不可用时使用默认值，不让页面初始化中断。
 */
export const readStorage = (key, fallback = '') => {
  try {
    const value = uni.getStorageSync(key)
    return value === undefined || value === null || value === '' ? fallback : value
  } catch (error) {
    return fallback
  }
}

export const writeStorage = (key, value) => {
  try {
    uni.setStorageSync(key, value)
    return true
  } catch (error) {
    return false
  }
}

export const removeStorage = (key) => {
  try {
    uni.removeStorageSync(key)
    return true
  } catch (error) {
    return false
  }
}
