<template>
  <view class="page">
    <view class="topbar"><text @click="back">‹</text><strong>课程详情</strong><view></view></view>
    <view v-if="course" class="main detail-page">
      <image class="cover" :src="course.coverUrl" mode="aspectFill"/>
      <view class="card intro"><text class="tag">教育课程</text><text class="title">{{course.title}}</text><text class="summary">{{course.summary || '系统化课程内容，支持视频学习与进度同步'}}</text></view>
      <view class="card product" v-if="product"><view><text class="price">¥{{price}}</text><text class="sold">已接入主项目商品 SKU</text></view><text class="delivery">{{deliveryText}}</text></view>
      <view class="card group-buy" v-if="groupBuy"><view><strong>{{groupBuy.name || '课程团报'}}</strong><text>{{groupBuy.userSize || 0}} 人成团 · 主项目拼团活动</text></view><view class="group-right"><text v-if="groupBuy.products?.length" class="group-price">¥{{groupPrice}}</text><button open-type="share">邀请好友</button></view></view>
      <view class="card access" v-if="hasAccess"><view><strong>已获得课程权限</strong><text>可以进入课程目录并同步学习进度</text></view><button @click="startLearning">开始学习</button></view>
      <view class="card outline"><view class="heading"><strong>课程目录</strong><text>{{outline.videos?.length || 0}} 个视频</text></view><view v-if="outline.videos?.length" v-for="video in outline.videos" :key="video.id" class="video-row"><text>{{video.title}}</text><em>{{formatDuration(video.durationSeconds)}}</em></view><text v-else class="empty">购买后可查看完整课程目录</text></view>
      <button v-if="!hasAccess" class="buy" :loading="loading" @click="buy">立即购买并开通</button>
      <button v-else class="checkin" :loading="checking" @click="doCheckIn">今日签到</button>
    </view>
    <view v-else class="loading">正在加载课程…</view>
  </view>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { getCourseDetail, getCourseOutline, getMyCourses, checkIn, getCourseGroupBuy } from '@/api/education'
import { getProductDetail } from '@/api/product'
import { createTradeOrder } from '@/api/trade'
import { submitWechatPay, waitPaySuccess } from '@/api/pay'
import { FRONTEND_DEMO_ENABLED } from '@/config'
import { AUTH_ENABLED, getOpenid, isLoggedIn, requireLogin } from '@/utils/auth'

const course=ref(null), product=ref(null), groupBuy=ref(null), outline=ref({}), hasAccess=ref(false)
const loading=ref(false), checking=ref(false), courseId=ref('')
const price=computed(()=>((product.value?.skus?.[0]?.price || 0)/100).toFixed(2))
const groupPrice=computed(()=>((groupBuy.value?.products?.[0]?.combinationPrice || 0)/100).toFixed(2))
const deliveryText=computed(()=>product.value?.deliveryTypes?.includes(2)?'课程数字权益 · 无需物流':'请先在主项目配置该商品的配送方式')

const getId=()=>{const pages=getCurrentPages();return pages[pages.length-1]?.options?.id}
const load=async()=>{
  courseId.value=getId()
  if(!courseId.value) return
  try {
    course.value=await getCourseDetail(courseId.value)
    if(course.value?.spuId) product.value=await getProductDetail(course.value.spuId)
    try { groupBuy.value=await getCourseGroupBuy(courseId.value) } catch (error) { groupBuy.value=null }
    if(AUTH_ENABLED && isLoggedIn()) {
      const mine=await getMyCourses()
      hasAccess.value=(mine||[]).some(item=>String(item.courseId)===String(courseId.value))
      if(hasAccess.value) outline.value=await getCourseOutline(courseId.value)
    }
  } catch(error) { uni.showToast({title:error.message||'课程加载失败',icon:'none'}) }
}
const buy=async()=>{
  if(FRONTEND_DEMO_ENABLED) return uni.showModal({title:'体验版说明',content:'当前版本仅供界面体验，暂不开放下单和支付。',showCancel:false,confirmText:'知道了'})
  if(AUTH_ENABLED && !requireLogin(`/pages/course/detail?id=${courseId.value}`)) return
  if(AUTH_ENABLED && !getOpenid()) return uni.showToast({title:'请使用微信手机号一键登录后支付',icon:'none'})
  const sku=product.value?.skus?.[0]
  if(!sku) return uni.showToast({title:'课程商品尚未配置 SKU',icon:'none'})
  if(!product.value.deliveryTypes?.includes(2)) return uni.showToast({title:'请将课程商品设置为可自提或配置配送方式',icon:'none'})
  loading.value=true
  try {
    const order=await createTradeOrder(sku.id,2)
    const pay=await submitWechatPay(order.payOrderId)
    if(pay?.displayMode==='app' && pay.displayContent) {
      const payParams=typeof pay.displayContent==='string'?JSON.parse(pay.displayContent):pay.displayContent
      await new Promise((resolve,reject)=>uni.requestPayment({...payParams,success:resolve,fail:reject}))
    }
    await waitPaySuccess(order.payOrderId)
    uni.showToast({title:'支付完成，课程已开通',icon:'success'})
    await load()
  } catch(error) { uni.showToast({title:error.message||'下单或支付失败',icon:'none'}) }
  finally { loading.value=false }
}
const startLearning=()=>uni.navigateTo({url:`/pages/learn/player?courseId=${courseId.value}`})
const doCheckIn=async()=>{if(FRONTEND_DEMO_ENABLED)return uni.showToast({title:'体验版仅供浏览，签到记录不会保存',icon:'none'});checking.value=true;try{await checkIn(courseId.value);uni.showToast({title:'签到成功',icon:'success'})}catch(error){uni.showToast({title:error.message||'签到失败',icon:'none'})}finally{checking.value=false}}
const formatDuration=(seconds)=>{const value=Number(seconds||0);return `${Math.floor(value/60)}:${String(value%60).padStart(2,'0')}`}
const back=()=>uni.navigateBack()
onMounted(load)
// #ifdef MP-WEIXIN
import { onShareAppMessage } from '@dcloudio/uni-app'
onShareAppMessage(() => ({ title: course.value?.title || '课程团报', path: `/pages/course/detail?id=${courseId.value}` }))
// #endif
</script>

<style scoped>
.topbar{height:110rpx;padding:30rpx 32rpx 0;display:flex;align-items:center;justify-content:space-between;background:#f8f7ff}.topbar>text{font-size:54rpx;line-height:1}.topbar strong{font-size:31rpx}.topbar>view{width:40rpx}.detail-page{padding-top:0}.cover{width:100%;height:390rpx;border-radius:28rpx;background:#e8edff}.intro{margin-top:20rpx;padding:26rpx}.tag{display:inline-block;padding:7rpx 12rpx;border-radius:9rpx;background:#dfe5ff;color:#123ca5;font-size:18rpx}.title,.summary{display:block}.title{margin-top:14rpx;font-size:34rpx;font-weight:800;line-height:1.35}.summary{margin-top:12rpx;color:#64748b;font-size:21rpx;line-height:1.5}.product,.access{display:flex;align-items:center;justify-content:space-between;margin-top:18rpx;padding:22rpx 26rpx}.price{display:block;color:#ba1a1a;font-size:38rpx;font-weight:800}.sold,.delivery{display:block;margin-top:6rpx;color:#64748b;font-size:18rpx}.delivery{color:#08734e}.access{background:#e7f8ef}.access text{display:block;margin-top:7rpx;color:#08734e;font-size:18rpx}.access button,.buy,.checkin{height:70rpx;margin:0;padding:0 25rpx;border:0;border-radius:35rpx;background:#062eaa;color:#fff;font-size:22rpx;font-weight:700;line-height:70rpx}.outline{margin-top:18rpx;padding:24rpx}.heading{display:flex;justify-content:space-between;align-items:center}.heading strong{font-size:27rpx}.heading text{color:#64748b;font-size:19rpx}.video-row{display:flex;justify-content:space-between;padding:20rpx 0;border-bottom:2rpx solid #edf0f8;font-size:21rpx}.video-row em{color:#64748b;font-size:18rpx;font-style:normal}.empty{display:block;padding:40rpx 0;color:#94a3b8;text-align:center;font-size:20rpx}.buy,.checkin{width:100%;margin-top:24rpx}.checkin{background:#087a52}.loading{padding:180rpx 0;text-align:center;color:#64748b}.group-buy{display:flex;align-items:center;justify-content:space-between;margin-top:18rpx;padding:22rpx 26rpx;background:#fff8e8}.group-buy strong,.group-buy text{display:block}.group-buy strong{font-size:23rpx}.group-buy text{margin-top:6rpx;color:#8a5700;font-size:17rpx}.group-right{text-align:right}.group-price{color:#ba1a1a!important;font-size:27rpx!important;font-weight:700}.group-right button{height:54rpx;margin:9rpx 0 0;padding:0 18rpx;border:0;border-radius:27rpx;background:#ba1a1a;color:#fff;font-size:18rpx;line-height:54rpx}
</style>
