<template>
  <view class="header" :style="headerStyle">
    <view class="brand"><image class="logo" src="/static/icons/brand-logo.png" mode="aspectFit"/><text>文融艺术培训</text></view>
    <view class="profile" @click="login"><view class="capsule"><b>•••</b><i></i><em></em></view><image class="avatar" :src="avatar" mode="aspectFill" /></view>
  </view>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { AUTH_ENABLED, isLoggedIn } from '@/utils/auth'
const avatar='/static/icons/person.png'
const top=ref(0),bar=ref(104)
const headerStyle=computed(()=>({paddingTop:`${top.value}rpx`,height:`${top.value+bar.value}rpx`}))
const login=()=>{if(!AUTH_ENABLED)return uni.switchTab({url:'/pages/mine/index'});if(!isLoggedIn())uni.navigateTo({url:'/pages/login/index'});else uni.switchTab({url:'/pages/mine/index'})}
onMounted(()=>{try{const s=uni.getSystemInfoSync();top.value=Number(s.statusBarHeight||0)*2;if(typeof wx!=='undefined'&&wx.getMenuButtonBoundingClientRect){const r=wx.getMenuButtonBoundingClientRect();top.value=Math.max(top.value,Number(r.top||0)*2-8);bar.value=Math.max(96,Number(r.height||0)*2+24)}}catch(e){}})
</script>
<style scoped>
.header{display:flex;align-items:center;justify-content:space-between;padding-left:32rpx;padding-right:28rpx;background:rgba(250,248,255,.94);backdrop-filter:blur(20rpx);position:relative;z-index:8}.brand,.profile,.capsule{display:flex;align-items:center}.brand{gap:16rpx;min-width:0}.brand>text{font-size:32rpx;font-weight:800;color:#032a92;letter-spacing:-1rpx;white-space:nowrap}.logo{width:66rpx;height:66rpx;flex:none;border-radius:15rpx;box-shadow:0 8rpx 18rpx rgba(37,99,235,.22)}.profile{gap:14rpx;flex:none}.capsule{height:66rpx;min-width:122rpx;justify-content:center;gap:14rpx;border:2rpx solid #edf0f7;border-radius:36rpx;background:#fff;box-shadow:0 7rpx 24rpx rgba(15,23,42,.055)}.capsule b{font-size:24rpx;letter-spacing:3rpx;line-height:1;transform:translateY(-3rpx)}.capsule i{width:2rpx;height:32rpx;background:#dbe0ea}.capsule em{width:27rpx;height:27rpx;border:3rpx solid #131b2e;border-radius:50%;position:relative}.capsule em:after{content:'';position:absolute;inset:7rpx;border-radius:50%;background:#131b2e}.avatar{width:64rpx;height:64rpx;border-radius:50%;background:#dbeafe;box-shadow:0 0 0 2rpx #fff,0 6rpx 18rpx rgba(15,23,42,.1)}
/* #ifdef MP-WEIXIN */ .capsule,.avatar{display:none} /* #endif */
@media (max-width:360px){.brand>text{font-size:29rpx}.logo{width:60rpx;height:60rpx}.capsule{min-width:112rpx}.avatar{width:58rpx;height:58rpx}}
</style>
