<template><view class="tabbar"><view v-for="item in items" :key="item.key" :class="['tab',active===item.key?'active':'']" @click="go(item)"><Icon :name="item.icon" :tone="active===item.key?'primary':'muted'"/><text>{{item.label}}</text></view></view></template>
<script setup>
import Icon from './Icon.vue'
const props=defineProps({active:{type:String,required:true}})
const items=[{key:'home',label:'首页',icon:'home',url:'/pages/home/index'},{key:'course',label:'课程',icon:'calendar',url:'/pages/course/index'},{key:'study',label:'学习',icon:'school',url:'/pages/study/index'},{key:'mall',label:'商城',icon:'cart',url:'/pages/mall/index'},{key:'mine',label:'我的',icon:'person',url:'/pages/mine/index'}]
const go=(item)=>{if(props.active!==item.key)uni.switchTab({url:item.url})}
</script>
<style scoped>.tabbar{position:fixed;left:0;right:0;bottom:0;z-index:20;height:calc(112rpx + env(safe-area-inset-bottom));padding:4rpx 12rpx env(safe-area-inset-bottom);display:flex;align-items:center;justify-content:space-around;background:rgba(255,255,255,.965);backdrop-filter:blur(18rpx);border-top:2rpx solid rgba(226,232,240,.8);box-shadow:0 -8rpx 28rpx rgba(15,23,42,.035)}.tab{position:relative;width:20%;height:104rpx;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5rpx;color:#475569;font-size:20rpx;line-height:1}.tab .icon{width:39rpx;height:39rpx}.tab.active{color:#072eaa;font-weight:700}.tab.active:after{content:'';position:absolute;top:-4rpx;width:34rpx;height:5rpx;border-radius:0 0 8rpx 8rpx;background:#164ac7}</style>
