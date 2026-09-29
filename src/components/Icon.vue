<template><image :class="['icon','tone-'+tone]" :src="`/static/icons/${name}.png`" mode="aspectFit" aria-hidden="true"/></template>
<script setup>defineProps({name:{type:String,required:true},tone:{type:String,default:'primary'}})</script>
<style scoped>
.icon{width:44rpx;height:44rpx;display:inline-block;object-fit:contain;flex:none}.tone-primary{filter:none}.tone-muted{filter:grayscale(1) opacity(.64)}.tone-success{filter:hue-rotate(92deg) saturate(.8)}.tone-warning{filter:hue-rotate(188deg) saturate(1.35) brightness(1.05)}.tone-danger{filter:hue-rotate(126deg) saturate(1.7)}.tone-white{filter:grayscale(1) brightness(0) invert(1)}
</style>
