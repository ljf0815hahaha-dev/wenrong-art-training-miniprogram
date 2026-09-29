<template>
  <view class="page"><BrandHeader/><view class="main home"><view class="campus tap" @click="openCampusPicker"><Icon name="pin"/><text>{{selectedCampus.label}}</text><b>⌄</b><view class="notice" @click.stop="openNotices"><Icon name="bell"/><i></i></view></view><SearchBar hot/><view class="hero"><image :src="data.photos.hero" mode="aspectFill"/><view class="shade"></view><view class="hero-copy"><view><!-- #ifdef H5 --><UiTag type="warning" round>限时返校礼</UiTag><!-- #endif --><!-- #ifndef H5 --><view class="platform-tag platform-tag-warning platform-tag-round">限时返校礼</view><!-- #endif --><text>名额告急 · 仅剩12席</text></view><strong>春季提分冲刺班 · 新学员立减300元</strong><small>名校名师一对一诊断 · 课后名师伴学巩固</small></view><view class="dots"><i></i><i></i><i></i></view></view><view class="quick card"><view class="quick-head"><view><text>常用服务</text><small>学习、校园与成长，一站完成</small></view><view class="quick-mark"><Icon name="arrow" tone="muted"/></view></view><view class="quick-grid"><view v-for="(item,index) in quick" :key="item.label" :class="['quick-item','quick-item-'+index,'tap']" @click="handleQuickAction(item)"><view :class="['quick-icon',item.color]"><Icon :name="item.icon" :tone="item.tone"/></view><text>{{item.label}}</text></view></view></view><view class="announcement tap" @click="openNotices"><b>喜报</b><text>热烈祝贺！李明哲同学在第十四届全国少儿...</text><Icon name="arrow" tone="muted"/></view><SectionHeader title="热门特惠 · 拼团抢座" more="查看全部"/><view class="deal-grid"><view v-for="(item,index) in data.deals" :key="item.title" :class="['deal','deal-'+index,'card','tap']" @click="action(item.title)"><view class="deal-media"><image :src="item.image" mode="aspectFill"/><view class="deal-media-shade"></view><!-- #ifdef H5 --><UiTag class="deal-badge" :type="index===0?'danger':'success'" round>{{item.tag}}</UiTag><!-- #endif --><!-- #ifndef H5 --><view :class="['platform-tag',index===0?'platform-tag-danger':'platform-tag-success','platform-tag-round','deal-badge']">{{item.tag}}</view><!-- #endif --><span>{{index===0?'限时拼团':'到店体验'}}</span></view><view class="deal-body"><view class="deal-title-wrap"><text class="deal-title line-clamp-2">{{item.title}}</text><small>{{item.sub}}</small></view><view class="deal-proof"><Icon :name="index===0?'users':'person'" :tone="index===0?'danger':'success'"/><text>{{item.price==='免费'?'名校师资 · 专属诊断':'已有 86% 学员拼成'}}</text></view><view class="deal-foot"><view><small>{{item.price==='免费'?'体验价':'拼团价'}}</small><strong>{{item.price==='免费'?'免费':'¥'+item.price}}</strong><del v-if="item.price!=='免费'">¥{{item.old}}</del></view><!-- #ifdef H5 --><UiButton :type="item.price==='免费'?'success':'danger'" size="small" round @click.stop="action(item.title)">{{item.price==='免费'?'预约':'抢名额'}}</UiButton><!-- #endif --><!-- #ifndef H5 --><button :class="['platform-button',item.price==='免费'?'platform-button-success':'platform-button-danger','platform-button-small','platform-button-round']" @click.stop="action(item.title)">{{item.price==='免费'?'预约':'抢名额'}}</button><!-- #endif --></view></view></view></view><SectionHeader title="精品推荐课程"/><view class="filters"><text class="active">小学</text><text>初中</text><text>思维素养</text></view><view class="recommend-list"><view v-for="(item,index) in data.recommendations" :key="item.title" :class="['recommend','recommend-'+index,'card','tap']" @click="goCourse"><view class="recommend-media"><image :src="item.image" mode="aspectFill"/><view class="course-play"><Icon name="play" tone="white"/></view></view><view class="recommend-content"><view class="course-eyebrow"><!-- #ifdef H5 --><UiTag type="primary" round>小学三年级</UiTag><UiTag type="warning" round>{{index===0?'思维提升':'语文阅读'}}</UiTag><!-- #endif --><!-- #ifndef H5 --><view class="platform-tag platform-tag-primary platform-tag-round">小学三年级</view><view class="platform-tag platform-tag-warning platform-tag-round">{{index===0?'思维提升':'语文阅读'}}</view><!-- #endif --></view><text class="recommend-title line-clamp-2">{{item.title}}</text><small>{{item.teacher}}</small><view class="recommend-foot"><view><b>¥{{item.price}}</b><span>/ {{item.lessons}}课时</span></view><em>{{item.learned}}人已学</em></view></view></view></view><SectionHeader title="精选学习好物" more="教具商城"/><scroll-view scroll-x class="goods"><view class="goods-track"><view v-for="(item,index) in data.goods" :key="item.title" :class="['goods-card','goods-card-'+index,'card','tap']"><view class="goods-media"><image :src="item.image" mode="aspectFill"/><!-- #ifdef H5 --><UiTag class="goods-badge" :type="item.title.includes('百科')?'primary':'success'" round>{{item.title.includes('百科')?'积分抵扣':'立送课时'}}</UiTag><!-- #endif --><!-- #ifndef H5 --><view :class="['platform-tag',item.title.includes('百科')?'platform-tag-primary':'platform-tag-success','platform-tag-round','goods-badge']">{{item.title.includes('百科')?'积分抵扣':'立送课时'}}</view><!-- #endif --></view><text class="line-clamp-2">{{item.title}}</text><view class="goods-foot"><view><small>{{item.sold}}</small><strong>¥{{item.price}}</strong></view><Icon name="arrow" tone="muted"/></view></view></view></scroll-view><view class="trust">教育部备案合规机构 · 资金存管保障<small>文融艺术培训 · 伴孩子走的每一步都笃定</small></view></view><CampusPicker v-model:visible="campusPickerVisible" :campus-list="campusList" :selected-key="selectedCampus.key" @select="selectCampus" /></view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import BrandHeader from '@/components/BrandHeader.vue'
import SearchBar from '@/components/SearchBar.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import Icon from '@/components/Icon.vue'
import CampusPicker from '@/components/CampusPicker.vue'
/* #ifdef H5 */
import UiTag from '@/components/ui/UiTag.vue'
import UiButton from '@/components/ui/UiButton.vue'
/* #endif */
import { getHomeData, getHomeDataSync, action } from '@/services/app'
import { getCampusList, getCourseList } from '@/api/education'
import { getEducationProductList } from '@/api/product'
import { campusList as localCampusList, getCampus } from '@/data/campus'
import { readStorage, writeStorage } from '@/utils/storage'

const campusPickerVisible = ref(false)
const storedCampus = readStorage('selectedOfflineCampus')
const campuses = ref(localCampusList)
const campusList = campuses
const selectedCampus = ref(getCampus(storedCampus))
const localDemoHomeData = getHomeDataSync()
const data = ref(localDemoHomeData)
const quick = [
  { key: 'reporter', label: '文融小记者', icon: 'message', tone: 'primary', color: 'blue' },
  { key: 'actor', label: '文融小演员', icon: 'person', tone: 'success', color: 'mint' },
  { key: 'anchor', label: '文融小主播', icon: 'headset', tone: 'primary', color: 'lavender' },
  { key: 'research-reporter', label: '研学记者', icon: 'school', tone: 'success', color: 'green' },
  { key: 'events', label: '专属赛事', icon: 'medal', tone: 'warning', color: 'amber' },
  { key: 'media', label: '官媒发布', icon: 'bell', tone: 'danger', color: 'red' },
  { key: 'highlights', label: '往期风采', icon: 'camera', tone: 'success', color: 'soft' },
  { key: 'community-care', label: '社区托管', icon: 'home', tone: 'primary', color: 'blue' },
  { key: 'student-profile', label: '学员档案', icon: 'order', tone: 'primary', color: 'lavender' },
  { key: 'mall', label: '专属商城', icon: 'cart', tone: 'success', color: 'green' }
]

function openNotices() {
  return uni.navigateTo({ url: '/pages/notice/index' })
}

function openCampusPicker() {
  campusPickerVisible.value = true
}

function selectCampus(key) {
  selectedCampus.value = campuses.value.find(item => item.key === key) || getCampus(key)
  writeStorage('selectedOfflineCampus', key)
}

function normalizeCampus(item) {
  return { ...item, key: item.code || String(item.id), label: item.name || item.label, location: item.address || item.location || '位置待配置' }
}

async function loadCampuses() {
  try {
    const rows = await getCampusList()
    if (Array.isArray(rows) && rows.length) {
      campuses.value = rows.map(normalizeCampus)
      selectedCampus.value = campuses.value.find(item => item.key === storedCampus) || campuses.value[0]
    }
  } catch (error) {
    console.error('校区接口加载失败，继续使用本地校区', error)
  }
}

function normalizeCourse(item) {
  return { ...item, title: item.title || '未命名课程', teacher: '文融艺术培训教研组', price: '咨询', lessons: item.courseType === 'OFFLINE' ? '线下班' : '课程内容', learned: '', image: item.coverUrl || '' }
}

function normalizeProduct(item) {
  return { id: item.id, title: item.name, sub: item.description || '文融艺术培训精选商品', price: item.price === null || item.price === undefined ? '咨询' : String(item.price), old: '', sold: '', tag: item.productType === 'COURSE' ? '课程商品' : item.productType === 'SERVICE' ? '服务商品' : '教材教具', image: item.coverUrl || '' }
}

async function loadHomeData() {
  let fallback = localDemoHomeData
  try {
    fallback = await getHomeData()
  } catch (error) {
    console.error('首页本地数据加载失败，保留内置演示内容', error)
  }

  try {
    const [courses, products] = await Promise.all([getCourseList(), getEducationProductList()])
    const liveCourses = Array.isArray(courses) ? courses.map(normalizeCourse) : []
    const liveProducts = Array.isArray(products) ? products.map(normalizeProduct) : []
    return {
      ...fallback,
      deals: liveProducts.length ? liveProducts.slice(0, 2) : fallback.deals,
      recommendations: liveCourses.length ? liveCourses.slice(0, 2) : fallback.recommendations,
      goods: liveProducts.length ? liveProducts.slice(0, 4) : fallback.goods
    }
  } catch (error) {
    console.error('首页接口加载失败，继续展示本地演示内容', error)
    return fallback
  }
}

function goCourse() {
  return uni.switchTab({ url: '/pages/course/index' })
}

function handleQuickAction(item) {
  return action(item.label)
}

onMounted(async () => {
  try {
    await loadCampuses()
    data.value = await loadHomeData()
  } catch (error) {
    console.error('首页初始化失败，继续展示本地演示内容', error)
  }
})
</script>
<style scoped>
.main{padding-top:12rpx}.campus{height:64rpx;display:flex;align-items:center;gap:10rpx;font-size:30rpx;font-weight:800}.campus .icon{color:#00288e}.campus>b{font-size:28rpx}.notice{margin-left:auto;position:relative}.notice .icon{width:42rpx}.notice>i{position:absolute;right:-2rpx;top:0;width:14rpx;height:14rpx;border-radius:50%;background:#ba1a1a}.hero{height:332rpx;margin-top:18rpx;overflow:hidden;position:relative;border-radius:32rpx;background:#00288e;box-shadow:var(--shadow-float)}.hero>image,.shade{position:absolute;inset:0;width:100%;height:100%}.hero>image{opacity:.8}.shade{background:linear-gradient(90deg,rgba(0,20,83,.92),rgba(0,40,142,.12))}.hero-copy{position:absolute;left:24rpx;right:18rpx;bottom:52rpx;color:#fff}.hero-copy>view{display:flex;align-items:center;gap:10rpx}.hero-copy>view .ui-tag,.hero-copy>view .platform-tag{font-size:20rpx}.hero-copy>text{font-size:20rpx}.hero-copy strong,.hero-copy small{display:block}.hero-copy strong{margin-top:10rpx;font-size:30rpx;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.hero-copy small{margin-top:8rpx;font-size:20rpx;opacity:.84}.dots{position:absolute;bottom:18rpx;left:50%;display:flex;gap:10rpx;transform:translateX(-50%)}.dots i{width:12rpx;height:12rpx;border-radius:50%;background:#c4c5d5}.dots i:first-child{width:36rpx;border-radius:10rpx;background:#1e40af}.card{background:#fff;border:2rpx solid rgba(226,232,240,.66);border-radius:32rpx;box-shadow:var(--shadow)}.quick{margin-top:24rpx;padding:22rpx 14rpx 16rpx}.quick-head{display:flex;align-items:center;justify-content:space-between;padding:0 10rpx 18rpx}.quick-head>view:first-child{display:flex;align-items:baseline;gap:12rpx}.quick-head text{font-size:26rpx;font-weight:800;color:#15203a}.quick-head small{font-size:18rpx;color:#9aa4b8}.quick-mark{width:42rpx;height:42rpx;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#f4f6fc}.quick-mark .icon{width:24rpx}.quick-grid{display:grid;grid-template-columns:repeat(4,1fr);row-gap:12rpx}.quick-item{height:126rpx;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:10rpx;border-radius:22rpx;font-size:23rpx;font-weight:700;color:#263149;transition:transform .16s ease,background .16s ease}.quick-item:active{transform:translateY(2rpx);background:#f5f7ff}.quick-icon{width:68rpx;height:68rpx;display:flex;align-items:center;justify-content:center;border-radius:20rpx;color:#1e40af;box-shadow:inset 0 1rpx 0 rgba(255,255,255,.55)}.quick-icon .icon{width:40rpx}.quick-icon.blue{background:#e2e7ff}.quick-icon.mint{background:#e2f2eb;color:#006c49}.quick-icon.lavender{background:#dde1ff}.quick-icon.amber{background:#fef3c7;color:#6b4200}.quick-icon.green{background:#a7f3d0;color:#006c49}.quick-icon.red{background:#ffdad6;color:#ba1a1a}.quick-icon.soft{background:#eef0ff}.announcement{height:76rpx;margin-top:22rpx;padding:0 18rpx;display:flex;align-items:center;gap:12rpx;border-radius:24rpx;background:#f2f3ff;color:#444653;font-size:21rpx}.announcement b{padding:6rpx 10rpx;border-radius:6rpx;background:#00288e;color:#fff}.announcement text{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.announcement .icon{width:28rpx}.deal-grid{display:grid;grid-template-columns:1fr 1fr;gap:14rpx}.deal{position:relative;padding:12rpx 12rpx 14rpx;overflow:hidden}.deal:after{content:'';position:absolute;right:-48rpx;bottom:-78rpx;width:150rpx;height:150rpx;border-radius:50%;background:rgba(30,64,175,.05);pointer-events:none}.deal-1:after{background:rgba(0,108,73,.06)}.deal-media{height:170rpx;overflow:hidden;position:relative;border-radius:20rpx;background:#dfe5ff}.deal-media image{width:100%;height:100%;display:block}.deal-media-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,24,65,.02),rgba(11,24,65,.28))}.deal-media-badge{position:absolute;left:12rpx;top:12rpx}.deal-media-badge.van-tag{font-size:18rpx}.deal-media span{position:absolute;right:10rpx;bottom:10rpx;padding:5rpx 9rpx;border-radius:8rpx;background:rgba(11,24,65,.58);color:#fff;font-size:17rpx}.deal-body{position:relative;z-index:1}.deal-title-wrap{min-height:84rpx;padding-top:12rpx}.deal-title{display:block;font-size:25rpx;line-height:1.25;font-weight:800;color:#15203a}.deal-title-wrap small{display:block;margin-top:7rpx;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#7b8497;font-size:18rpx}.deal-proof{display:flex;align-items:center;gap:6rpx;margin-top:8rpx;color:#8c6470;font-size:17rpx}.deal-1 .deal-proof{color:#577d6b}.deal-proof .icon{width:24rpx;height:24rpx}.deal-foot{display:flex;align-items:flex-end;justify-content:space-between;margin-top:12rpx}.deal-foot>view{display:flex;align-items:baseline;gap:6rpx;min-width:0}.deal-foot small{position:absolute;margin-top:-30rpx;color:#9aa4b8;font-size:17rpx}.deal-foot strong{color:#ba1a1a;font-size:29rpx;line-height:1}.deal-1 .deal-foot strong{color:#006c49}.deal-foot del{color:#a3abba;font-size:17rpx}.deal-foot .van-button{margin:0}.platform-tag{display:inline-flex;align-items:center;justify-content:center;padding:5rpx 9rpx;border-radius:8rpx;line-height:1.2;white-space:nowrap;background:#eef0ff;color:#1e40af;font-size:17rpx}.platform-tag-round{border-radius:999rpx}.platform-tag-primary{background:#eef0ff;color:#1e40af}.platform-tag-danger{background:#ffdad6;color:#ba1a1a}.platform-tag-success{background:#d1fae5;color:#006c49}.platform-tag-warning{background:#fef3c7;color:#8a5b00}.platform-button{margin:0;padding:0 20rpx;border:0;border-radius:18rpx;color:#fff;font-size:19rpx;font-weight:800;line-height:2.2}.platform-button::after{border:0}.platform-button-small{padding:0 16rpx;font-size:18rpx;line-height:2}.platform-button-round{border-radius:999rpx}.platform-button-danger{background:#ba1a1a}.platform-button-success{background:#006c49}.filters{display:flex;margin:-4rpx 0 14rpx;gap:10rpx}.filters text{padding:8rpx 16rpx;border-radius:20rpx;background:#f2f3ff;color:#59657c;font-size:19rpx}.filters .active{background:#1e40af;color:#fff;box-shadow:0 6rpx 12rpx rgba(30,64,175,.16)}.recommend-list{display:flex;flex-direction:column;gap:14rpx}.recommend{position:relative;display:flex;gap:16rpx;padding:12rpx;overflow:hidden}.recommend:before{content:'';position:absolute;left:0;top:20rpx;bottom:20rpx;width:6rpx;border-radius:0 8rpx 8rpx 0;background:#2463ee}.recommend-1:before{background:#f59e0b}.recommend-media{position:relative;width:204rpx;height:164rpx;flex:none;overflow:hidden;border-radius:18rpx;background:#e2e7ff}.recommend-media image{width:100%;height:100%;display:block}.course-play{position:absolute;right:10rpx;bottom:10rpx;width:42rpx;height:42rpx;display:flex;align-items:center;justify-content:center;border-radius:50%;background:rgba(15,23,42,.62);box-shadow:0 4rpx 12rpx rgba(15,23,42,.16)}.course-play .icon{width:22rpx;height:22rpx}.recommend-content{display:flex;flex:1;min-width:0;flex-direction:column;padding:3rpx 4rpx 2rpx 0}.course-eyebrow{display:flex;align-items:center;gap:8rpx}.course-eyebrow .van-tag,.course-eyebrow .platform-tag{font-size:17rpx}.recommend-title{margin-top:8rpx;font-size:25rpx;line-height:1.26;font-weight:800;color:#15203a}.recommend-content>small{display:block;margin-top:8rpx;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#7b8497;font-size:18rpx}.recommend-foot{display:flex;align-items:baseline;justify-content:space-between;margin-top:auto;padding-top:8rpx}.recommend-foot>view{display:flex;align-items:baseline}.recommend-foot b{font-size:29rpx;color:#1e40af}.recommend-foot span{font-size:17rpx;color:#7b8497}.recommend-foot em{font-size:17rpx;color:#8b94a6;font-style:normal}.goods{height:382rpx;margin:0 -32rpx;padding:0 32rpx 8rpx}.goods-track{display:flex;gap:14rpx;width:max-content}.goods-card{width:276rpx;height:358rpx;display:flex;flex-direction:column;margin:0;padding:12rpx;overflow:hidden}.goods-media{height:182rpx;position:relative;flex:none;overflow:hidden;border-radius:18rpx;background:#eef0f7}.goods-media image{width:100%;height:100%;display:block}.goods-media-badge{position:absolute;left:9rpx;top:9rpx}.goods-media-badge.van-tag{font-size:17rpx}.goods-card>text{margin-top:12rpx;min-height:56rpx;font-size:21rpx;line-height:1.32;font-weight:700;color:#25314b}.goods-foot{display:flex;align-items:flex-end;justify-content:space-between;margin-top:auto;padding-top:12rpx}.goods-foot>view{display:flex;flex-direction:column;gap:5rpx}.goods-foot small{color:#8a94a8;font-size:17rpx}.goods-foot strong{color:#1e40af;font-size:30rpx;line-height:1}.goods-foot>.icon{width:28rpx;height:28rpx;margin-bottom:2rpx}.trust{padding:32rpx 0 14rpx;text-align:center;color:#757684;font-size:18rpx}.trust small{display:block;margin-top:8rpx;color:#94a3b8;font-size:17rpx}
 .quick-grid{grid-template-columns:repeat(3,1fr)}.quick-item>text{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:19rpx}
 </style>
