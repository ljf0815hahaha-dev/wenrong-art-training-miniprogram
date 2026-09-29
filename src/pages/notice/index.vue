<template>
  <view class="page">
    <view class="topbar"><text @click="back">‹</text><strong>上课日程提醒</strong><view></view></view>
    <view class="main notice-page">
      <view class="intro card"><strong>课程通知</strong><text>已绑定课程的上课提醒会在这里集中展示。</text></view>
      <view v-if="notices.length" class="list">
        <view v-for="item in notices" :key="item.id" class="notice card">
          <view class="notice-head"><strong>{{item.title || '上课提醒'}}</strong><em :class="statusClass(item.status)">{{statusText(item.status)}}</em></view>
          <text class="time">上课时间：{{formatTime(item.classStartTime)}}</text>
          <text v-if="item.remindBeforeMinutes" class="detail">提前 {{item.remindBeforeMinutes}} 分钟提醒</text>
        </view>
      </view>
      <view v-else class="empty card">暂无课程日程提醒</view>
    </view>
  </view>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getMyNotices } from '@/api/education'
import { requireLogin } from '@/utils/auth'

const notices = ref([])
const formatTime = (value) => value ? String(value).replace('T', ' ').slice(0, 16) : '待安排'
const statusText = (value) => ({ 0: '待发送', 1: '发送中', 2: '已处理' }[value] || '已排课')
const statusClass = (value) => `status-${value ?? 'default'}`
const load = async () => {
  if (!requireLogin('/pages/notice/index')) return
  try { notices.value = await getMyNotices() || [] } catch (error) { uni.showToast({ title: error.message || '通知加载失败', icon: 'none' }) }
}
const back = () => uni.navigateBack()
onMounted(load)
</script>

<style scoped>
.topbar{height:110rpx;padding:30rpx 32rpx 0;display:flex;align-items:center;justify-content:space-between;background:#f8f7ff}.topbar>text{font-size:54rpx;line-height:1}.topbar strong{font-size:31rpx}.topbar>view{width:40rpx}.notice-page{padding-top:12rpx}.intro{padding:24rpx}.intro strong,.intro text{display:block}.intro strong{font-size:27rpx}.intro text{margin-top:8rpx;color:#64748b;font-size:19rpx}.list{margin-top:18rpx}.notice{margin-bottom:16rpx;padding:23rpx}.notice-head{display:flex;align-items:center;justify-content:space-between;gap:14rpx}.notice-head strong{font-size:23rpx}.notice-head em{padding:6rpx 10rpx;border-radius:16rpx;background:#e6ebff;color:#153fa8;font-size:16rpx;font-style:normal;white-space:nowrap}.notice-head em.status-2{background:#d8f6e8;color:#08734e}.notice-head em.status-1{background:#fff0d6;color:#8a5700}.time,.detail{display:block;margin-top:13rpx;color:#475569;font-size:19rpx}.detail{margin-top:7rpx;color:#94a3b8;font-size:17rpx}.empty{margin-top:18rpx;padding:80rpx 20rpx;color:#94a3b8;text-align:center;font-size:20rpx}
</style>
