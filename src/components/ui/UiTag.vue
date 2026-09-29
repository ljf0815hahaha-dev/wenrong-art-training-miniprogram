<template>
  <!-- #ifdef H5 -->
  <VanTag :type="type" :plain="plain" :round="round" :size="size"><slot /></VanTag>
  <!-- #endif -->
  <!-- #ifndef H5 -->
  <view :class="['ui-tag', `ui-tag-${type}`, `ui-tag-${size}`, { 'ui-tag-plain': plain, 'ui-tag-round': round }]">
    <slot />
  </view>
  <!-- #endif -->
</template>

<script setup>
/* #ifdef H5 */
import { Tag as VanTag } from 'vant'
/* #endif */

defineProps({
  type: { type: String, default: 'primary' },
  size: { type: String, default: 'medium' },
  plain: Boolean,
  round: Boolean
})
</script>

<style scoped>
.ui-tag{display:inline-flex;align-items:center;justify-content:center;padding:5rpx 9rpx;border-radius:8rpx;background:#eef0ff;color:#1e40af;font-size:17rpx;line-height:1.2;white-space:nowrap}.ui-tag-small{font-size:16rpx}.ui-tag-large{font-size:19rpx;padding:7rpx 12rpx}.ui-tag-round{border-radius:999rpx}.ui-tag-plain{background:transparent;border:2rpx solid currentColor}.ui-tag-danger{background:#ffdad6;color:#ba1a1a}.ui-tag-success{background:#d1fae5;color:#006c49}.ui-tag-warning{background:#fef3c7;color:#8a5b00}.ui-tag-default{background:#f1f3f8;color:#59657c}
</style>
