<template>
  <view class="compat-entry">
    <image class="logo" src="/static/icons/brand-logo.png" mode="aspectFit" />
    <text>正在进入文融艺术培训…</text>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'

onLoad(() => {
  uni.reLaunch({ url: '/pages/home/index' })
})
</script>

<style scoped>
.compat-entry {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24rpx;
  background: #f8f7ff;
  color: #444653;
  font-size: 26rpx;
}
.logo {
  width: 112rpx;
  height: 112rpx;
  border-radius: 28rpx;
}
</style>
