<template>
  <view class="page">
    <view class="topbar"><text @click="back">‹</text><strong>我的订单</strong><view></view></view>
    <view class="main order-page">
      <view class="tabs"><text v-for="tab in tabs" :key="tab.key" :class="{ active: status === tab.key }" @click="changeStatus(tab.key)">{{ tab.label }}</text></view>
      <view v-if="loading" class="empty card">正在加载订单…</view>
      <view v-else-if="orders.length" class="orders">
        <view v-for="order in orders" :key="order.id" class="order card">
          <view class="order-head"><text>订单号：{{ order.no || order.id }}</text><em>{{ statusText(order.status) }}</em></view>
          <view v-for="item in order.items || []" :key="item.id" class="order-item">
            <image v-if="item.picUrl" :src="item.picUrl" mode="aspectFill" />
            <view v-else class="thumb"><Icon name="book" tone="primary" /></view>
            <view class="copy"><strong>{{ item.spuName || '文融艺术培训商品' }}</strong><small>数量 × {{ item.count || 1 }}</small></view>
            <text class="price">¥{{ ((item.payPrice || order.payPrice || 0) / 100).toFixed(2) }}</text>
          </view>
          <view class="order-foot"><text>{{ formatTime(order.createTime) }}</text><strong>合计 ¥{{ ((order.payPrice || 0) / 100).toFixed(2) }}</strong></view>
        </view>
      </view>
      <view v-else class="empty card">暂无订单</view>
    </view>
  </view>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Icon from '@/components/Icon.vue'
import { getOrderPage } from '@/api/trade'

const tabs = [{ key: '', label: '全部' }, { key: 0, label: '待付款' }, { key: 10, label: '待发货' }, { key: 20, label: '待收货' }, { key: 30, label: '已完成' }]
const status = ref('')
const orders = ref([])
const loading = ref(false)
const formatTime = value => value ? String(value).replace('T', ' ').slice(0, 16) : '时间待同步'
const statusText = value => ({ 0: '待付款', 10: '待发货', 20: '待收货', 30: '已完成', 40: '已关闭' }[value] || '处理中')
const load = async () => {
  loading.value = true
  try { const page = await getOrderPage(status.value === '' ? {} : { status: status.value }); orders.value = page?.list || [] } catch (error) { orders.value = [] } finally { loading.value = false }
}
const changeStatus = async key => { status.value = key; await load() }
const back = () => uni.navigateBack()
onMounted(load)
</script>

<style scoped>
.topbar{height:110rpx;padding:30rpx 32rpx 0;display:flex;align-items:center;justify-content:space-between;background:#f8f7ff}.topbar>text{font-size:54rpx;line-height:1}.topbar strong{font-size:31rpx}.topbar>view{width:40rpx}.order-page{padding-top:14rpx}.tabs{display:flex;gap:26rpx;overflow-x:auto;padding:0 3rpx 16rpx;white-space:nowrap}.tabs text{padding:10rpx 4rpx;color:#7d879b;font-size:20rpx}.tabs text.active{border-bottom:5rpx solid #1e40af;color:#1e40af;font-weight:800}.order{padding:18rpx;margin-bottom:16rpx}.order-head,.order-foot{display:flex;align-items:center;justify-content:space-between}.order-head{padding-bottom:14rpx;border-bottom:2rpx solid #eef1f7;color:#8b95a9;font-size:16rpx}.order-head em{color:#1e40af;font-style:normal}.order-item{display:flex;align-items:center;gap:12rpx;padding:15rpx 0}.order-item image,.thumb{width:90rpx;height:90rpx;flex:none;border-radius:14rpx;background:#eef2ff}.thumb{display:flex;align-items:center;justify-content:center}.thumb .icon{width:40rpx;height:40rpx}.copy{flex:1;min-width:0}.copy strong,.copy small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.copy strong{color:#27344e;font-size:20rpx}.copy small{margin-top:7rpx;color:#8b95a9;font-size:16rpx}.price{color:#1e40af;font-size:18rpx}.order-foot{padding-top:12rpx;border-top:2rpx solid #eef1f7;color:#8b95a9;font-size:15rpx}.order-foot strong{color:#253453;font-size:18rpx}.empty{padding:90rpx 20rpx;color:#94a3b8;text-align:center;font-size:20rpx}
</style>
