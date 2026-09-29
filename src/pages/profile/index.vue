<template>
  <view class="page">
    <view class="topbar"><text @click="back">‹</text><strong>我的学员档案</strong><view></view></view>
    <view class="main profile-page">
      <view v-if="loaded" class="card form">
        <view class="tip">{{ FRONTEND_DEMO_ENABLED ? '纯前端体验版：资料仅用于界面展示，不会上传或保存。' : '档案与主项目登录用户绑定，仅维护教育业务资料。' }}</view>
        <view class="field"><text>学员姓名</text><input v-model="form.name" placeholder="请输入学员姓名" maxlength="30"/></view>
        <view class="field"><text>联系电话</text><input v-model="form.mobile" placeholder="请输入联系电话" maxlength="20"/></view>
        <view class="field column"><text>基本信息</text><textarea v-model="form.basicInfo" placeholder="可填写年级、兴趣、健康注意事项等" maxlength="500"/></view>
        <button class="save" :loading="saving" @click="save">保存档案</button>
      </view>
      <view v-else class="loading">正在加载档案…</view>
    </view>
  </view>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { getStudentProfile, saveStudentProfile } from '@/api/education'
import { FRONTEND_DEMO_ENABLED } from '@/config'
import { requireLogin } from '@/utils/auth'

const loaded = ref(false)
const saving = ref(false)
const form = reactive({ name: '', mobile: '', basicInfo: '' })

const load = async () => {
  if (!requireLogin('/pages/profile/index')) return
  try {
    const data = await getStudentProfile()
    Object.assign(form, data || {})
  } catch (error) {
    uni.showToast({ title: error.message || '档案加载失败', icon: 'none' })
  } finally {
    loaded.value = true
  }
}
const save = async () => {
  if (!form.name.trim()) return uni.showToast({ title: '请填写学员姓名', icon: 'none' })
  if (FRONTEND_DEMO_ENABLED) return uni.showToast({ title: '体验版仅供展示，档案不会保存', icon: 'none' })
  saving.value = true
  try {
    await saveStudentProfile({ name: form.name.trim(), mobile: form.mobile.trim(), basicInfo: form.basicInfo.trim() })
    uni.showToast({ title: '保存成功', icon: 'success' })
  } catch (error) {
    uni.showToast({ title: error.message || '保存失败', icon: 'none' })
  } finally {
    saving.value = false
  }
}
const back = () => uni.navigateBack()
onMounted(load)
</script>

<style scoped>
.topbar{height:110rpx;padding:30rpx 32rpx 0;display:flex;align-items:center;justify-content:space-between;background:#f8f7ff}.topbar>text{font-size:54rpx;line-height:1}.topbar strong{font-size:31rpx}.topbar>view{width:40rpx}.profile-page{padding-top:12rpx}.form{padding:28rpx}.tip{padding:18rpx 20rpx;border-radius:16rpx;background:#eef2ff;color:#475569;font-size:19rpx;line-height:1.5}.field{display:flex;align-items:center;gap:20rpx;padding:24rpx 0;border-bottom:2rpx solid #edf0f8}.field>text{width:150rpx;color:#334155;font-size:22rpx}.field input{flex:1;font-size:22rpx;text-align:right}.field.column{display:block}.field.column>text{display:block;margin-bottom:14rpx}.field textarea{box-sizing:border-box;width:100%;min-height:180rpx;padding:16rpx;border-radius:14rpx;background:#f8fafc;font-size:21rpx;line-height:1.5}.save{height:76rpx;margin-top:30rpx;border:0;border-radius:38rpx;background:#0735a7;color:#fff;font-size:24rpx;font-weight:700;line-height:76rpx}.loading{padding:180rpx 0;text-align:center;color:#64748b}
</style>
