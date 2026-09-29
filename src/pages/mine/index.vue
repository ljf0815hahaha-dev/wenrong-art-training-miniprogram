<template>
  <view class="page">
    <BrandHeader />

    <view class="main mine-page">
      <view class="profile">
        <view class="profile-top">
          <view class="avatar-wrap">
            <view class="avatar-ring"></view>
            <view class="avatar"><image :src="user.avatar || avatar" mode="aspectFill" /></view>
            <view class="verified"><Icon name="check" tone="white" /><text>已认证</text></view>
          </view>
          <view class="profile-copy">
            <view class="profile-name"><text class="profile-name-main">{{ user.nickname || '晨曦妈妈' }}</text><text class="profile-role">{{ user.level?.name || '学员家长' }}</text></view>
            <text class="profile-vip">♙ {{ user.level?.name || '会员用户' }}</text>
            <text class="profile-code">会员编号：{{ user.id || '待绑定' }}</text>
          </view>
          <button class="profile-menu" @click="action('编辑资料')"><Icon name="settings" tone="white" /></button>
        </view>

        <view class="profile-insight">
          <view class="insight-heading"><view><text class="insight-kicker">LEARNING PASSPORT</text><text class="insight-title">学习成长概览</text></view><text class="insight-period">本周数据</text></view>
          <view class="stats">
            <view class="stat-tile stat-blue"><view class="stat-icon"><Icon name="book" tone="white" /></view><text class="stat-value">{{ orderCounts.courseCount || '0' }}<text class="stat-unit">门</text></text><text class="stat-label">在读课程</text><view class="stat-meter"><view class="stat-meter-fill" style="width:68%"></view></view></view>
            <view class="stat-tile stat-mint"><view class="stat-icon"><Icon name="gift" tone="white" /></view><text class="stat-value">{{ user.point || '0' }}</text><text class="stat-label">学习积分</text><view class="stat-meter"><view class="stat-meter-fill" style="width:82%"></view></view></view>
            <view class="stat-tile stat-amber"><view class="stat-icon"><Icon name="medal" tone="white" /></view><text class="stat-value">4<text class="stat-unit">张</text></text><text class="stat-label">优惠券</text><view class="stat-meter"><view class="stat-meter-fill" style="width:46%"></view></view></view>
            <view class="stat-tile stat-lavender"><view class="stat-icon"><Icon name="order" tone="white" /></view><text class="stat-value">{{ orderCounts.allCount || '0' }}<text class="stat-unit">笔</text></text><text class="stat-label">历史订单</text><view class="stat-meter"><view class="stat-meter-fill" style="width:58%"></view></view></view>
          </view>
        </view>
      </view>

      <view class="orders card">
        <view class="section-heading">
          <view class="section-title"><view class="section-icon order-section-icon"><Icon name="order" /></view><view><text class="section-eyebrow">ORDER CENTER</text><text class="section-name">我的订单</text></view></view>
          <view class="section-action" @click="openOrders"><text>全部订单</text><Icon name="arrow" tone="muted" /></view>
        </view>
        <view class="order-summary"><text class="summary-label">订单状态</text><view class="summary-status"><view class="summary-dot"></view><text>1 项待处理</text></view></view>
        <view class="order-grid">
          <view v-for="(item,index) in orders" :key="item.name" :class="['order-item','order-item-'+index]" @click="action(item.name)">
            <view class="order-icon"><Icon :name="item.icon" /></view>
            <text class="order-count">{{ orderCountValue(item) }}</text>
            <text class="order-name">{{ item.name }}</text>
            <text class="order-meta">{{ item.meta }}</text>
            <view class="order-stem"></view>
          </view>
        </view>
      </view>

      <view class="core card">
        <view class="section-heading">
          <view class="section-title"><view class="section-icon core-section-icon"><Icon name="grid" /></view><view><text class="section-eyebrow">STUDENT HUB</text><text class="section-name">学员核心服务</text></view></view>
          <text class="section-pill">教学专享通道</text>
        </view>
        <view class="core-grid">
          <view v-for="(item,index) in core" :key="item.name" :class="['core-feature','core-feature-'+index]" @click="openCore(item)">
            <view class="core-feature-top"><view class="core-icon"><Icon :name="item.icon" /></view><Icon name="arrow" tone="muted" /></view>
            <text class="core-kicker">{{ item.kicker }}</text>
            <text class="core-name">{{ item.name }}</text>
            <text class="core-desc">{{ item.desc }}</text>
            <view class="core-line"><view class="core-line-fill"></view></view>
          </view>
        </view>
      </view>

      <view class="links card">
        <view class="links-heading"><view><text class="section-eyebrow">PERSONAL SERVICES</text><text class="links-title">更多服务</text></view><text class="links-count">6 项服务</text></view>
        <view class="featured-links">
          <view v-for="(item,index) in links.slice(0,2)" :key="item.name" :class="['featured-link','featured-link-'+index]" @click="action(item.name)">
            <view class="featured-top"><view class="featured-icon"><Icon :name="item.icon" tone="white" /></view><text v-if="item.badge" class="featured-badge">{{ item.badge }}</text></view>
            <text class="featured-title">{{ item.name }}</text>
            <text class="featured-desc">{{ item.desc }}</text>
            <Icon name="arrow" tone="muted" />
          </view>
        </view>
        <view class="link-list">
          <view v-for="(item,index) in links.slice(2)" :key="item.name" :class="['service-link','service-link-'+index]" @click="openLink(item)">
            <view class="link-icon"><Icon :name="item.icon" /></view>
            <view class="link-copy"><text class="link-name">{{ item.name }}</text><text class="link-desc">{{ item.desc }}</text></view>
            <text v-if="item.badge" class="link-badge">{{ item.badge }}</text>
            <Icon name="arrow" tone="muted" />
          </view>
        </view>
      </view>

      <view class="footer"><text>♢ 全国校外线上培训监管与服务平台备案合规机构</text><text>粤ICP备20230819号-3A · 文融艺术培训系统 v2.4.1</text><text>资金安全由商业银行专款存管　|　等保三级安全认证</text></view>
    </view>


  </view>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import BrandHeader from '@/components/BrandHeader.vue'
import Icon from '@/components/Icon.vue'
import { action } from '@/services/app'
import { getMemberUserInfo } from '@/api/member'
import { getOrderCount } from '@/api/trade'
import { getMyCourses } from '@/api/education'

const user = ref({})
const orderCounts = ref({})

const openCore = item => {
  if (item.name === '我的学员档案') return uni.navigateTo({ url: '/pages/profile/index' })
  if (item.name === '上课日程提醒') return uni.navigateTo({ url: '/pages/notice/index' })
  return action(item.name)
}
const openOrders = () => uni.navigateTo({ url: '/pages/order/index' })
const orderCountValue = item => ({ '待付款': orderCounts.value.unpaidCount, '待核销/发货': orderCounts.value.undeliveredCount, '已完成': orderCounts.value.uncommentedCount, '退款/售后': orderCounts.value.afterSaleCount }[item.name] || item.badge || '0')
const openLink = item => {
  if (item.name === '校区查询与环境导览') return uni.switchTab({ url: '/pages/course/index' })
  return action(item.name)
}

const avatar='/static/icons/person.png'
const orders = [
  { name: '待付款', meta: '待处理', icon: 'order', badge: '1' },
  { name: '待核销/发货', meta: '运输中', icon: 'truck' },
  { name: '已完成', meta: '已归档', icon: 'check' },
  { name: '退款/售后', meta: '安心保障', icon: 'shield' },
  { name: '电子合同', meta: '可查阅', icon: 'order' }
]
const core = [
  { name: '我的学员档案', desc: '孩子信息、健康档案', kicker: '成长档案', icon: 'person' },
  { name: '上课日程提醒', desc: '订阅通知、打卡日历', kicker: '课程安排', icon: 'calendar' },
  { name: '在线请假/补课', desc: '智能调课、审批进度', kicker: '灵活调课', icon: 'calendar' },
  { name: '收货地址管理', desc: '教材教具收发管理', kicker: '学习装备', icon: 'pin' }
]
const links = [
  { name: '团报邀请返现', desc: '邀请好友报名立领 ¥200 现金减免券', badge: '高奖励', icon: 'gift' },
  { name: '专属班主任 / 课程顾问', desc: '林老师（在线响应中）· 电话/微信直通', badge: '● 在线', icon: 'headset' },
  { name: '校区查询与环境导览', desc: '已绑定「科技园旗舰校区」· 查看全景实况', icon: 'pin' },
  { name: '发票与报销开具', desc: '增值税电子普通发票、纸质专票申领', icon: 'order' },
  { name: '意见反馈与在线客服', desc: '服务监督、建议提报与官方客服工单', icon: 'message' },
  { name: '设置与账号安全', desc: '微信号绑定、手机换绑、切换登录账号', icon: 'settings' }
]
onMounted(async () => {
  try { user.value = await getMemberUserInfo() || {} } catch (error) {}
  try { orderCounts.value = await getOrderCount() || {} } catch (error) {}
  try { const courses = await getMyCourses() || []; orderCounts.value = { ...orderCounts.value, courseCount: courses.length } } catch (error) {}
})
</script>

<style scoped>
.mine-page{padding-top:8rpx;padding-bottom:180rpx}
.profile{position:relative;overflow:hidden;padding:24rpx 22rpx 18rpx;border-radius:31rpx;background:linear-gradient(136deg,#0c2f91 0%,#164eb8 56%,#2e6fd1 100%);color:#fff;box-shadow:var(--shadow-float)}
.profile:before{content:'';position:absolute;right:-88rpx;top:-105rpx;width:285rpx;height:285rpx;border:2rpx solid rgba(255,255,255,.13);border-radius:50%;box-shadow:0 0 0 26rpx rgba(255,255,255,.035),0 0 0 52rpx rgba(255,255,255,.028)}
.profile:after{content:'';position:absolute;right:35rpx;bottom:-135rpx;width:220rpx;height:190rpx;border:2rpx solid rgba(255,255,255,.1);border-radius:50%}
.profile-top,.profile-insight{position:relative;z-index:1}.profile-top{display:flex;align-items:center}.avatar-wrap{position:relative;width:88rpx;height:88rpx;flex:none}.avatar-ring{position:absolute;inset:-7rpx;border:2rpx solid rgba(128,193,255,.68);border-radius:50%}.avatar{width:88rpx;height:88rpx;overflow:hidden;border:4rpx solid rgba(255,255,255,.86);border-radius:50%;background:#dce7ff}.avatar image{width:100%;height:100%;display:block}.verified{position:absolute;left:-2rpx;bottom:-12rpx;display:flex;align-items:center;gap:3rpx;padding:4rpx 9rpx;border:2rpx solid #1645a8;border-radius:16rpx;background:#0a9c70;color:#fff}.verified .icon{width:18rpx;height:18rpx}.verified text{font-size:13rpx;line-height:1;white-space:nowrap}.profile-copy{min-width:0;flex:1;margin-left:19rpx}.profile-name{display:flex;align-items:center;gap:8rpx;min-width:0}.profile-name-main{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:27rpx;font-weight:800}.profile-role{padding:5rpx 9rpx;border:2rpx solid rgba(255,255,255,.18);border-radius:14rpx;background:rgba(255,255,255,.14);font-size:14rpx;white-space:nowrap}.profile-vip,.profile-code{display:block;margin-top:9rpx}.profile-vip{color:#fff;font-size:17rpx}.profile-code{color:#c6d8ff;font-size:16rpx}.profile-menu{position:relative;z-index:1;width:52rpx;height:52rpx;margin:0 0 0 8rpx;padding:0;border:0;border-radius:50%;background:rgba(255,255,255,.17);line-height:52rpx}.profile-menu .icon{width:28rpx;height:28rpx}
.profile-insight{margin-top:25rpx;padding:17rpx 14rpx 14rpx;border:2rpx solid rgba(255,255,255,.16);border-radius:22rpx;background:rgba(4,32,112,.29);backdrop-filter:blur(9px)}.insight-heading{display:flex;align-items:flex-end;justify-content:space-between;padding:0 4rpx 13rpx;border-bottom:2rpx solid rgba(255,255,255,.13)}.insight-kicker,.insight-title,.insight-period{display:block}.insight-kicker{color:#a7c6ff;font-size:12rpx;letter-spacing:1.2rpx}.insight-title{margin-top:5rpx;color:#fff;font-size:18rpx;font-weight:700}.insight-period{color:#c8dcff;font-size:13rpx}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8rpx;padding-top:13rpx}.stat-tile{position:relative;min-width:0;padding:7rpx 4rpx 9rpx;border-radius:14rpx;background:rgba(255,255,255,.08);text-align:center}.stat-icon{width:33rpx;height:33rpx;margin:0 auto 7rpx;display:flex;align-items:center;justify-content:center;border-radius:11rpx;background:rgba(255,255,255,.2)}.stat-icon .icon{width:20rpx;height:20rpx}.stat-value,.stat-unit,.stat-label{display:block}.stat-value{color:#fff;font-size:22rpx;font-weight:800;line-height:1.05;white-space:nowrap}.stat-unit{display:inline;font-size:13rpx;font-weight:500}.stat-label{margin-top:6rpx;color:#c6d8ff;font-size:12rpx;white-space:nowrap}.stat-meter{height:4rpx;margin:10rpx 5rpx 0;overflow:hidden;border-radius:5rpx;background:rgba(255,255,255,.14)}.stat-meter-fill{height:100%;border-radius:5rpx;background:#9bc7ff}.stat-mint .stat-meter-fill{background:#75efc0}.stat-amber .stat-meter-fill{background:#ffd276}.stat-lavender .stat-meter-fill{background:#c5b7ff}
.card{margin-top:20rpx;padding:18rpx;border-radius:27rpx}.section-heading{display:flex;align-items:center;justify-content:space-between;padding:0 1rpx 15rpx;border-bottom:2rpx solid #edf1f8}.section-title{display:flex;align-items:center;gap:10rpx;min-width:0}.section-icon{width:38rpx;height:38rpx;display:flex;align-items:center;justify-content:center;border-radius:12rpx;background:#e7ecff}.section-icon .icon{width:24rpx;height:24rpx}.order-section-icon{background:#e3eaff}.core-section-icon{background:#e2f8ef}.core-section-icon .icon{filter:hue-rotate(92deg) saturate(.8)}.section-eyebrow{display:block;color:#8d98ad;font-size:11rpx;letter-spacing:1rpx;line-height:1}.section-name{display:block;margin-top:5rpx;color:#17213a;font-size:21rpx;font-weight:800;line-height:1}.section-action{display:flex;align-items:center;gap:3rpx;color:#4661ad}.section-action text{font-size:14rpx;white-space:nowrap}.section-action .icon{width:19rpx;height:19rpx}.section-pill{padding:6rpx 10rpx;border-radius:16rpx;background:#d9f8ea;color:#07805b;font-size:13rpx;white-space:nowrap}
.order-summary{display:flex;align-items:center;justify-content:space-between;padding:13rpx 2rpx 4rpx}.summary-label{color:#69758d;font-size:14rpx}.summary-status{display:flex;align-items:center;gap:5rpx;color:#78859b;font-size:13rpx}.summary-dot{width:9rpx;height:9rpx;border-radius:50%;background:#ed746c;box-shadow:0 0 0 4rpx #ffebe8}.order-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:5rpx;padding-top:8rpx}.order-item{position:relative;min-width:0;padding:7rpx 1rpx 3rpx;text-align:center}.order-icon{position:relative;width:48rpx;height:48rpx;margin:0 auto;display:flex;align-items:center;justify-content:center;border:2rpx solid #dbe3ff;border-radius:16rpx;background:#f2f4ff;color:#3456b9}.order-icon .icon{width:25rpx;height:25rpx}.order-count{display:block;margin-top:8rpx;color:#243458;font-size:17rpx;font-weight:800;line-height:1}.order-name{display:block;overflow:hidden;margin-top:7rpx;color:#3d4961;font-size:13rpx;line-height:1.2;white-space:nowrap;text-overflow:ellipsis}.order-meta{display:block;margin-top:5rpx;color:#9aa5b8;font-size:11rpx;line-height:1;white-space:nowrap}.order-stem{width:22rpx;height:3rpx;margin:10rpx auto 0;border-radius:4rpx;background:#dfe5f7}.order-item-0 .order-icon{border-color:#ffd8d7;background:#fff0ef;color:#d45760}.order-item-0 .order-stem{background:#ef7479}.order-item-1 .order-icon{border-color:#cfe9ff;background:#eef8ff;color:#2b73c5}.order-item-1 .order-stem{background:#7ebbed}.order-item-2 .order-icon{border-color:#cceedd;background:#effbf5;color:#0a8a62}.order-item-2 .order-stem{background:#72d3ac}.order-item-3 .order-icon{border-color:#ded6ff;background:#f3f0ff;color:#7454b7}.order-item-3 .order-stem{background:#ac99e3}.order-item-4 .order-icon{border-color:#ffe2b1;background:#fff8e8;color:#ac7513}.order-item-4 .order-stem{background:#edc06b}
.core-grid{display:grid;grid-template-columns:1fr 1fr;gap:10rpx;margin-top:15rpx}.core-feature{position:relative;min-width:0;overflow:hidden;padding:13rpx 12rpx 12rpx;border:2rpx solid transparent;border-radius:20rpx;background:#f3f5ff}.core-feature:after{content:'';position:absolute;right:-24rpx;bottom:-30rpx;width:87rpx;height:87rpx;border:2rpx solid rgba(76,101,191,.08);border-radius:50%}.core-feature-top{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between}.core-icon{width:42rpx;height:42rpx;display:flex;align-items:center;justify-content:center;border-radius:14rpx;background:#dce5ff}.core-icon .icon{width:25rpx;height:25rpx}.core-feature-top>.icon{width:20rpx;height:20rpx}.core-kicker,.core-name,.core-desc{display:block;position:relative;z-index:1}.core-kicker{margin-top:12rpx;color:#73809a;font-size:12rpx}.core-name{margin-top:4rpx;color:#25304a;font-size:18rpx;font-weight:800;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.core-desc{margin-top:5rpx;overflow:hidden;color:#7c879c;font-size:13rpx;line-height:1.2;white-space:nowrap;text-overflow:ellipsis}.core-line{height:4rpx;margin-top:12rpx;overflow:hidden;border-radius:5rpx;background:#dfe5f8}.core-line-fill{width:62%;height:100%;border-radius:5rpx;background:#7899e8}.core-feature-1{background:#eefaf5}.core-feature-1 .core-icon{background:#d7f3e7}.core-feature-1 .core-icon .icon{filter:hue-rotate(92deg) saturate(.8)}.core-feature-1 .core-line-fill{width:78%;background:#6dccaa}.core-feature-2{background:#fff8eb}.core-feature-2 .core-icon{background:#ffedc5}.core-feature-2 .core-icon .icon{filter:hue-rotate(188deg) saturate(1.35) brightness(1.05)}.core-feature-2 .core-line-fill{width:42%;background:#eeb35a}.core-feature-3{background:#f4efff}.core-feature-3 .core-icon{background:#e8ddff}.core-feature-3 .core-line-fill{width:55%;background:#9d84da}
.links{padding:18rpx 16rpx 8rpx}.links-heading{display:flex;align-items:flex-end;justify-content:space-between;padding:0 3rpx 14rpx}.links-title{display:block;margin-top:6rpx;color:#17213a;font-size:21rpx;font-weight:800}.links-count{color:#94a0b3;font-size:13rpx}.featured-links{display:grid;grid-template-columns:1fr 1fr;gap:10rpx}.featured-link{position:relative;min-width:0;min-height:154rpx;overflow:hidden;padding:14rpx 13rpx;border-radius:20rpx;background:linear-gradient(145deg,#fff7df,#fff0d0)}.featured-link:after{content:'';position:absolute;right:-23rpx;bottom:-34rpx;width:100rpx;height:100rpx;border:2rpx solid rgba(181,123,27,.13);border-radius:50%}.featured-link-1{background:linear-gradient(145deg,#e8faf2,#d8f2e7)}.featured-link-1:after{border-color:rgba(28,137,94,.14)}.featured-top{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between}.featured-icon{width:40rpx;height:40rpx;display:flex;align-items:center;justify-content:center;border-radius:14rpx;background:#e89b2a}.featured-icon .icon{width:24rpx;height:24rpx}.featured-link-1 .featured-icon{background:#16a879}.featured-badge{padding:4rpx 6rpx;border-radius:8rpx;background:rgba(255,255,255,.7);color:#99600b;font-size:11rpx;white-space:nowrap}.featured-link-1 .featured-badge{color:#08734e}.featured-title,.featured-desc{position:relative;z-index:1;display:block}.featured-title{margin-top:12rpx;overflow:hidden;color:#2d3446;font-size:17rpx;font-weight:800;line-height:1.25;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.featured-desc{margin-top:6rpx;overflow:hidden;color:#7b8392;font-size:12rpx;line-height:1.25;white-space:nowrap;text-overflow:ellipsis}.featured-link>.icon{position:absolute;right:12rpx;bottom:10rpx;width:20rpx;height:20rpx}
.link-list{margin-top:12rpx}.service-link{position:relative;display:flex;align-items:center;gap:11rpx;min-height:77rpx;border-top:2rpx solid #eef1f7}.link-icon{width:40rpx;height:40rpx;display:flex;align-items:center;justify-content:center;flex:none;border-radius:13rpx;background:#e8edff;color:#3455ba}.link-icon .icon{width:24rpx;height:24rpx}.service-link-1 .link-icon{background:#e2f3ff}.service-link-2 .link-icon{background:#f2eaff}.service-link-3 .link-icon{background:#e5f8ed}.link-copy{min-width:0;flex:1}.link-name,.link-desc{display:block}.link-name{overflow:hidden;color:#344057;font-size:17rpx;line-height:1.2;white-space:nowrap;text-overflow:ellipsis}.link-desc{margin-top:4rpx;overflow:hidden;color:#8791a3;font-size:13rpx;line-height:1.15;white-space:nowrap;text-overflow:ellipsis}.link-badge{padding:5rpx 7rpx;border-radius:9rpx;background:#d8f6e8;color:#08734e;font-size:11rpx;white-space:nowrap}.service-link>.icon{width:20rpx;height:20rpx;flex:none}
.footer{padding:28rpx 0 18rpx;text-align:center;color:#7b8494;font-size:13rpx;line-height:1.5}.footer text{display:block}.footer text+text{margin-top:5rpx;color:#9aa2af;font-size:12rpx}
@media(max-width:360px){.profile-copy{margin-left:15rpx}.profile-name-main{font-size:24rpx}.profile-role{font-size:12rpx}.profile-code{font-size:14rpx}.stats{gap:4rpx}.stat-value{font-size:20rpx}.stat-label{font-size:11rpx}.card{padding-left:14rpx;padding-right:14rpx}.order-name{font-size:12rpx}.order-meta{font-size:10rpx}.core-feature{padding-left:10rpx;padding-right:10rpx}.core-name{font-size:17rpx}.core-desc{font-size:12rpx}.featured-link{padding-left:10rpx;padding-right:10rpx}.featured-title{font-size:16rpx}.link-name{font-size:16rpx}}
</style>
