<template>
  <view v-if="AUTH_ENABLED" class="page login-page">
    <view class="brand"><image src="/static/icons/brand-logo.png" mode="aspectFit"/><text>文融艺术培训</text></view>
    <view class="panel">
      <text class="title">登录后开始学习</text>
      <text class="desc">登录后可购买课程、同步学习进度和完成签到</text>
      <!-- #ifdef MP-WEIXIN -->
      <button class="wechat" open-type="getPhoneNumber" @getphonenumber="onPhoneNumber">微信手机号一键登录</button>
      <!-- #endif -->
      <view class="divider"><i></i><text>或使用账号登录</text><i></i></view>
      <input v-model="form.mobile" type="number" maxlength="11" placeholder="请输入手机号"/>
      <input v-model="form.password" password placeholder="请输入密码"/>
      <button class="primary" :loading="loading" @click="onPasswordLogin">登录</button>
      <text class="hint">小程序正式支付必须使用微信登录，以获取支付所需 openid。</text>
    </view>
  </view>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { loginByPassword, loginByWeixinPhone } from '@/api/auth'
import { AUTH_ENABLED } from '@/utils/auth'

const form = reactive({ mobile: '', password: '' })
const loading = ref(false)
const pages = getCurrentPages()
const currentPage = pages[pages.length - 1]
const redirect = decodeURIComponent(currentPage?.options?.redirect || '')

onMounted(() => {
  if (!AUTH_ENABLED) uni.switchTab({ url: '/pages/course/index' })
})

const finish = () => {
  uni.showToast({ title: '登录成功', icon: 'success' })
  setTimeout(() => {
    if (redirect) uni.redirectTo({ url: redirect })
    else uni.switchTab({ url: '/pages/course/index' })
  }, 350)
}

const run = async (task) => {
  if (loading.value) return
  loading.value = true
  try { await task(); finish() } catch (error) {
    uni.showToast({ title: error.message || '登录失败', icon: 'none' })
  } finally { loading.value = false }
}

const onPhoneNumber = (event) => {
  const code = event.detail?.code
  if (!code) return uni.showToast({ title: '需要授权手机号才能登录', icon: 'none' })
  run(() => loginByWeixinPhone(code))
}

const onPasswordLogin = () => {
  if (!form.mobile || !form.password) return uni.showToast({ title: '请输入手机号和密码', icon: 'none' })
  run(() => loginByPassword(form.mobile, form.password))
}
</script>

<style scoped>
.login-page{padding:150rpx 40rpx 60rpx;background:linear-gradient(180deg,#e9efff 0,#f8f7ff 52%)}.brand{display:flex;align-items:center;justify-content:center;gap:16rpx;color:#062eaa;font-size:36rpx;font-weight:800}.brand image{width:76rpx;height:76rpx;border-radius:18rpx}.panel{margin-top:80rpx;padding:40rpx 30rpx;border-radius:32rpx;background:#fff;box-shadow:var(--shadow-float)}.title,.desc{display:block;text-align:center}.title{font-size:34rpx;font-weight:800}.desc{margin-top:14rpx;color:#64748b;font-size:21rpx;line-height:1.5}.wechat,.primary{width:100%;height:86rpx;margin-top:34rpx;border:0;border-radius:43rpx;font-size:27rpx;font-weight:700;line-height:86rpx}.wechat{background:#12b76a;color:#fff}.primary{background:#062eaa;color:#fff}.divider{display:flex;align-items:center;gap:14rpx;margin:34rpx 0 22rpx;color:#94a3b8;font-size:19rpx}.divider i{height:2rpx;flex:1;background:#e2e8f0}.panel input{height:82rpx;margin-top:16rpx;padding:0 24rpx;border:2rpx solid #e2e8f0;border-radius:18rpx;background:#f8faff;font-size:24rpx}.hint{display:block;margin-top:24rpx;color:#94a3b8;font-size:18rpx;line-height:1.5;text-align:center}
</style>
