<template>
  <view v-if="visible" class="campus-picker-mask" @click="close">
    <view class="campus-picker-panel" @click.stop>
      <view class="campus-picker-head">
        <view><text>选择校区</text><small>查看校区位置和线下课程</small></view>
        <view class="campus-picker-close" @click="close">×</view>
      </view>
      <scroll-view scroll-y class="campus-picker-list">
        <view v-for="campus in campusList" :key="campus.key" :class="['campus-row', selectedKey === campus.key ? 'active' : '']" @click="choose(campus)">
          <view class="campus-row-icon"><Icon name="pin" :tone="selectedKey === campus.key ? 'white' : 'success'" /></view>
          <view class="campus-row-copy"><strong>{{ campus.label }}</strong><text>{{ campus.location }}</text></view>
          <button class="campus-location-button" @click.stop="openLocation(campus)"><Icon name="pin" tone="success" />定位</button>
          <view v-if="selectedKey === campus.key" class="campus-row-check">✓</view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import Icon from '@/components/Icon.vue'

defineProps({
  visible: Boolean,
  campusList: { type: Array, default: () => [] },
  selectedKey: { type: String, default: '' }
})
const emit = defineEmits(['update:visible', 'select'])

const close = () => emit('update:visible', false)
const choose = campus => {
  emit('select', campus.key)
  close()
}
const openLocation = campus => {
  if (!Number.isFinite(campus.latitude) || !Number.isFinite(campus.longitude)) {
    return uni.showModal({
      title: `${campus.label}定位信息`,
      content: `${campus.location}\n\n当前已配置到校区所属区域，精确地址和经纬度需要在后台补充后才能导航。`,
      showCancel: false,
      confirmText: '知道了'
    })
  }
  return uni.openLocation({
    latitude: campus.latitude,
    longitude: campus.longitude,
    name: campus.label,
    address: campus.location,
    scale: 16
  })
}
</script>

<style scoped>
.campus-picker-mask{position:fixed;z-index:1000;inset:0;display:flex;align-items:flex-end;background:rgba(15,23,42,.42)}.campus-picker-panel{width:100%;max-height:82vh;padding:26rpx 24rpx calc(24rpx + env(safe-area-inset-bottom));border-radius:32rpx 32rpx 0 0;background:#fff;box-shadow:0 -12rpx 34rpx rgba(15,23,42,.16)}.campus-picker-head{display:flex;align-items:center;justify-content:space-between;padding:0 4rpx 18rpx}.campus-picker-head text,.campus-picker-head small{display:block}.campus-picker-head text{color:#17233c;font-size:28rpx;font-weight:800}.campus-picker-head small{margin-top:6rpx;color:#8a95aa;font-size:16rpx}.campus-picker-close{width:48rpx;height:48rpx;border-radius:50%;background:#f1f3f8;color:#64718b;text-align:center;font-size:36rpx;line-height:43rpx}.campus-picker-list{max-height:66vh}.campus-row{position:relative;display:flex;align-items:center;gap:12rpx;margin-bottom:12rpx;padding:15rpx 12rpx;border:2rpx solid #edf0f5;border-radius:20rpx;background:#fff}.campus-row.active{border-color:#8bcfb0;background:#f2fbf6}.campus-row-icon{width:50rpx;height:50rpx;display:flex;align-items:center;justify-content:center;flex:none;border-radius:16rpx;background:#dff4e8}.campus-row.active .campus-row-icon{background:#087a62}.campus-row-icon .icon{width:28rpx;height:28rpx}.campus-row-copy{flex:1;min-width:0}.campus-row-copy strong,.campus-row-copy text{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.campus-row-copy strong{color:#22314e;font-size:22rpx}.campus-row-copy text{margin-top:5rpx;color:#8a95aa;font-size:15rpx}.campus-location-button{display:flex;align-items:center;gap:4rpx;flex:none;margin:0;padding:0 12rpx;border:2rpx solid #b8e5ca;border-radius:999rpx;background:#f0fbf4;color:#087a62;font-size:16rpx;line-height:2}.campus-location-button::after{border:0}.campus-location-button .icon{width:20rpx;height:20rpx}.campus-row-check{position:absolute;right:11rpx;top:8rpx;width:20rpx;height:20rpx;border-radius:50%;background:#087a62;color:#fff;text-align:center;font-size:14rpx;line-height:20rpx}
</style>
