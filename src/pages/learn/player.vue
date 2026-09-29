<template>
  <view class="page"><view class="topbar"><text @click="back">‹</text><strong>课程学习</strong><view></view></view><view class="main player-page"><view v-if="FRONTEND_DEMO_ENABLED" class="demo-player">体验版 · 课程视频仅供界面预览</view><video v-else-if="current" class="player" :src="current.videoUrl" :poster="course?.coverUrl" controls @ended="onEnded"/><view v-else-if="!FRONTEND_DEMO_ENABLED" class="empty">正在加载课程目录…</view><view class="title" v-if="course">{{course.title}}</view><view class="card list"><view v-for="video in videos" :key="video.id" :class="['row',current?.id===video.id?'active':'']" @click="current=video"><text>{{video.title}}</text><view class="row-right"><em>{{formatDuration(video.durationSeconds)}}</em><b v-if="completed(video.id)">已学</b></view></view></view></view></view>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { getCourseDetail, getCourseOutline, getProgressList, updateProgress } from '@/api/education'
import { FRONTEND_DEMO_ENABLED } from '@/config'
import { requireLogin } from '@/utils/auth'
const course=ref(null),videos=ref([]),progress=ref([]),current=ref(null),courseId=ref('')
const getId=()=>{const pages=getCurrentPages();return pages[pages.length-1]?.options?.courseId}
const load=async()=>{if(!requireLogin(`/pages/learn/player?courseId=${getId()}`))return;courseId.value=getId();try{course.value=await getCourseDetail(courseId.value);const data=await getCourseOutline(courseId.value);videos.value=data?.videos||[];progress.value=await getProgressList(courseId.value);current.value=videos.value[0]}catch(error){uni.showToast({title:error.message||'课程目录加载失败',icon:'none'})}}
const completed=(videoId)=>progress.value.some(item=>String(item.videoId)===String(videoId)&&item.completed)
const onEnded=async()=>{if(!current.value)return;try{await updateProgress({courseId:courseId.value,chapterId:current.value.chapterId,videoId:current.value.id,progressSeconds:current.value.durationSeconds||0,completed:true});progress.value=[...progress.value.filter(item=>String(item.videoId)!==String(current.value.id)),{videoId:current.value.id,completed:true}]}catch(error){uni.showToast({title:error.message||'进度同步失败',icon:'none'})}}
const formatDuration=(seconds)=>`${Math.floor(Number(seconds||0)/60)}:${String(Number(seconds||0)%60).padStart(2,'0')}`
const back=()=>uni.navigateBack()
onMounted(load)
</script>
<style scoped>
.topbar{height:110rpx;padding:30rpx 32rpx 0;display:flex;align-items:center;justify-content:space-between;background:#f8f7ff}.topbar>text{font-size:54rpx;line-height:1}.topbar strong{font-size:31rpx}.topbar>view{width:40rpx}.player-page{padding-top:0}.player{width:100%;height:430rpx;border-radius:24rpx;background:#0f172a}.demo-player{width:100%;height:430rpx;display:flex;align-items:center;justify-content:center;border-radius:24rpx;background:linear-gradient(135deg,#183caa,#6f69d8);color:#fff;font-size:24rpx}.title{margin:22rpx 4rpx;font-size:29rpx;font-weight:800}.list{padding:8rpx 24rpx}.row{display:flex;justify-content:space-between;align-items:center;padding:24rpx 0;border-bottom:2rpx solid #edf0f8;font-size:22rpx}.row-right{display:flex;align-items:center;gap:12rpx}.row em{color:#64748b;font-size:18rpx;font-style:normal}.row b{padding:4rpx 8rpx;border-radius:10rpx;background:#d7f6e7;color:#08734e;font-size:15rpx}.row.active{color:#0b38af;font-weight:700}.empty{padding:120rpx 0;text-align:center;color:#64748b}
</style>
