<template>
  <view class="page">
    <view class="topbar"><text @click="back">‹</text><strong>购物车</strong><view></view></view>
    <view class="main cart-page">
      <view v-if="loading" class="empty card">正在加载购物车…</view>
      <view v-else-if="items.length" class="items">
        <view v-for="item in items" :key="item.id" class="cart-item card">
          <view class="check" :class="{ active: item.selected }" @click="toggle(item)">{{ item.selected ? '✓' : '' }}</view>
          <image v-if="item.spu?.picUrl" :src="item.spu.picUrl" mode="aspectFill" />
          <view v-else class="thumb"><Icon name="book" tone="primary" /></view>
          <view class="copy"><strong>{{ item.spu?.name || '文融艺术培训商品' }}</strong><small>¥{{ ((item.sku?.price || 0) / 100).toFixed(2) }}</small><view class="counter"><text @click="changeCount(item, -1)">−</text><b>{{ item.count }}</b><text @click="changeCount(item, 1)">＋</text></view></view>
          <text class="remove" @click="remove(item)">删除</text>
        </view>
      </view>
      <view v-else class="empty card">购物车还是空的</view>
    </view>
    <view v-if="items.length" class="checkout"><view><small>已选 {{ selectedCount }} 件</small><strong>¥{{ totalPrice.toFixed(2) }}</strong></view><button @click="checkout">去结算</button></view>
  </view>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import Icon from '@/components/Icon.vue'
import { getCartList, updateCartCount, updateCartSelected, deleteCart } from '@/api/trade'

const items = ref([])
const loading = ref(false)
const selectedCount = computed(() => items.value.filter(item => item.selected).reduce((total, item) => total + Number(item.count || 0), 0))
const totalPrice = computed(() => items.value.filter(item => item.selected).reduce((total, item) => total + Number(item.count || 0) * Number(item.sku?.price || 0) / 100, 0))
const load = async () => {
  loading.value = true
  try { const result = await getCartList(); items.value = result?.validList || [] } catch (error) { items.value = [] } finally { loading.value = false }
}
const toggle = async item => {
  const selected = !item.selected
  try { await updateCartSelected([item.id], selected); item.selected = selected } catch (error) { uni.showToast({ title: error.message || '选择状态更新失败', icon: 'none' }) }
}
const changeCount = async (item, delta) => {
  const count = Math.max(1, Number(item.count || 1) + delta)
  if (count === item.count) return
  try { await updateCartCount(item.id, count); item.count = count } catch (error) { uni.showToast({ title: error.message || '数量更新失败', icon: 'none' }) }
}
const remove = async item => {
  try { await deleteCart(item.id); items.value = items.value.filter(row => row.id !== item.id) } catch (error) { uni.showToast({ title: error.message || '删除失败', icon: 'none' }) }
}
const checkout = () => { if (!selectedCount.value) return uni.showToast({ title: '请先选择商品', icon: 'none' }); uni.navigateTo({ url: '/pages/order/index' }) }
const back = () => uni.navigateBack()
onMounted(load)
</script>

<style scoped>
.topbar{height:110rpx;padding:30rpx 32rpx 0;display:flex;align-items:center;justify-content:space-between;background:#f8f7ff}.topbar>text{font-size:54rpx;line-height:1}.topbar strong{font-size:31rpx}.topbar>view{width:40rpx}.cart-page{padding-top:16rpx}.cart-item{position:relative;display:flex;align-items:center;gap:12rpx;margin-bottom:14rpx;padding:16rpx}.check{width:36rpx;height:36rpx;flex:none;border:2rpx solid #c8d0e3;border-radius:50%;color:#fff;text-align:center;font-size:24rpx;line-height:32rpx}.check.active{border-color:#1e40af;background:#1e40af}.cart-item image,.thumb{width:110rpx;height:110rpx;flex:none;border-radius:16rpx;background:#edf1ff}.thumb{display:flex;align-items:center;justify-content:center}.thumb .icon{width:42rpx;height:42rpx}.copy{flex:1;min-width:0}.copy strong,.copy small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.copy strong{color:#28344d;font-size:20rpx}.copy small{margin-top:7rpx;color:#1e40af;font-size:19rpx}.counter{display:flex;align-items:center;gap:18rpx;margin-top:10rpx}.counter text{width:34rpx;height:34rpx;border-radius:50%;background:#eef1ff;color:#1e40af;text-align:center;font-size:25rpx;line-height:32rpx}.counter b{font-size:18rpx}.remove{position:absolute;right:15rpx;top:15rpx;color:#a2abba;font-size:15rpx}.empty{padding:90rpx 20rpx;color:#94a3b8;text-align:center;font-size:20rpx}.checkout{position:fixed;left:28rpx;right:28rpx;bottom:35rpx;z-index:20;display:flex;align-items:center;justify-content:space-between;padding:12rpx 12rpx 12rpx 20rpx;border-radius:48rpx;background:#1d273e;color:#fff;box-shadow:0 18rpx 38rpx rgba(15,23,42,.25)}.checkout small,.checkout strong{display:block}.checkout small{color:#bdc7d8;font-size:15rpx}.checkout strong{margin-top:4rpx;color:#70efbe;font-size:25rpx}.checkout button{height:62rpx;margin:0;padding:0 25rpx;border:0;border-radius:32rpx;background:#70efbe;color:#08271c;font-size:20rpx;font-weight:800;line-height:62rpx}
</style>
