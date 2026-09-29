<template>
  <!-- #ifdef H5 -->
  <VanButton :type="type" :size="size" :block="block" :round="round" :hairline="hairline" :loading="loading" :disabled="disabled" @click="$emit('click', $event)"><slot /></VanButton>
  <!-- #endif -->
  <!-- #ifndef H5 -->
  <button :class="['ui-button', `ui-button-${type}`, `ui-button-${size}`, { 'ui-button-block': block, 'ui-button-round': round }]" :disabled="disabled || loading" @click="$emit('click', $event)"><slot /></button>
  <!-- #endif -->
</template>

<script setup>
/* #ifdef H5 */
import { Button as VanButton } from 'vant'
/* #endif */

defineProps({
  type: { type: String, default: 'primary' },
  size: { type: String, default: 'normal' },
  block: Boolean,
  round: Boolean,
  hairline: Boolean,
  loading: Boolean,
  disabled: Boolean
})

defineEmits(['click'])
</script>

<style scoped>
.ui-button{margin:0;padding:0 20rpx;border:0;border-radius:18rpx;color:#fff;font-size:19rpx;font-weight:800;line-height:2.2}.ui-button::after{border:0}.ui-button-primary{background:#1e40af}.ui-button-danger{background:#ba1a1a}.ui-button-success{background:#006c49}.ui-button-warning{background:#c27a09}.ui-button-default{background:#eef0ff;color:#1e40af}.ui-button-small{padding:0 16rpx;font-size:18rpx;line-height:2}.ui-button-large{padding:0 26rpx;font-size:21rpx;line-height:2.35}.ui-button-block{display:block;width:100%}.ui-button-round{border-radius:999rpx}.ui-button[disabled]{opacity:.55}
</style>
