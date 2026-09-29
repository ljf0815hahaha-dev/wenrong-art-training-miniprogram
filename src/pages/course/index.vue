<template>
  <view class="page">
    <BrandHeader />
    <view class="main course-page">
      <view :class="['mode-picker', 'card', courseMode]">
        <view class="mode-picker-head">
          <view><text>课程类型</text><small>选择你的学习方式</small></view>
          <view class="mode-picker-status"><i></i><text>{{ courseMode === 'online' ? '线上学习中' : '到校学习中' }}</text></view>
        </view>
        <view class="mode-options">
          <view v-for="item in modeOptions" :key="item.key" :class="['mode-option', item.key, courseMode === item.key ? 'active' : '']" @click="switchCourseMode(item.key)">
            <view class="mode-option-icon"><Icon :name="item.icon" :tone="courseMode === item.key ? 'white' : 'primary'" /></view>
            <view class="mode-option-copy"><text>{{ item.label }}</text><strong>{{ item.title }}</strong><small>{{ item.desc }}</small></view>
            <view v-if="courseMode === item.key" class="mode-option-check">✓</view>
          </view>
        </view>
        <view class="mode-tip"><Icon :name="courseMode === 'offline' ? 'pin' : 'play'" :tone="courseMode === 'offline' ? 'success' : 'primary'" /><text>{{ currentModeTip }}</text><Icon name="arrow" tone="muted" /></view>
      </view>

      <view v-if="courseMode === 'offline'" class="campus-picker card">
        <view class="campus-picker-head">
          <view><text>选择线下校区</text><small>按校区查看面授班级与上课安排</small></view>
          <view class="campus-count"><b>{{ campusOptions.length }}</b><small>个校区</small></view>
        </view>
        <scroll-view scroll-x class="campus-options">
          <view v-for="campus in campusOptions" :key="campus.key" :class="['campus-option', selectedCampus === campus.key ? 'active' : '']" @click="selectCampus(campus.key)">
            <view class="campus-option-icon"><Icon name="pin" :tone="selectedCampus === campus.key ? 'white' : 'success'" /></view>
            <view class="campus-option-copy"><text>{{ campus.label }}</text><small>{{ selectedCampus === campus.key ? '当前校区' : '线下机构' }}</small></view>
            <view v-if="selectedCampus === campus.key" class="campus-option-check">✓</view>
          </view>
        </scroll-view>
        <view class="campus-current"><Icon name="school" tone="success" /><view><text>当前上课校区</text><strong>{{ selectedCampusInfo.label }}</strong></view><Icon name="check" tone="success" /></view>
      </view>

      <view :class="['reminder', 'card', courseMode === 'offline' ? 'offline-reminder' : 'online-reminder']">
        <view class="reminder-glow"></view>
        <view class="reminder-head">
          <view class="reminder-title">
            <view class="reminder-symbol"><Icon name="calendar" tone="white" /></view>
            <view><text>{{ courseMode === 'offline' ? '今日线下课' : '今日课程' }}</text><small>{{ todayLabel }}</small></view>
          </view>
          <view class="location-status"><i></i><text>{{ courseMode === 'offline' ? `已选${selectedCampusInfo.label}` : 'GPS 已开启' }}</text></view>
        </view>

        <view class="lesson-summary">
          <view class="time-block"><strong>{{ featuredTime }}</strong><small>开始</small></view>
          <view class="lesson-divider"></view>
          <view class="lesson-main">
            <text>{{ featuredTitle }}</text>
            <small>{{ courseMode === 'offline' ? offlineFeaturedMeta : '第6讲 · 线上双师互动教室 A3' }}</small>
          </view>
          <view class="lesson-badge"><b>{{ courseMode === 'offline' ? '周六' : '今晚' }}</b><small>{{ courseMode === 'offline' ? '到校上课' : '准时上课' }}</small></view>
        </view>

        <view class="check-row">
          <view class="check-tip">
            <Icon :name="courseMode === 'offline' ? 'school' : 'pin'" tone="primary" />
            <view><text>{{ courseMode === 'offline' ? '到校后即可快速签到' : '签到仅记录课程状态' }}</text><small>{{ courseMode === 'offline' ? `${selectedCampusInfo.label} · A3 教室` : '不采集定位轨迹' }}</small></view>
          </view>
          <view class="check-actions"><text>{{ courseMode === 'offline' ? '查看安排' : '查看详情' }}</text><button @click="quickCheckIn"><Icon name="check" tone="white" />签到</button></view>
        </view>
      </view>

      <view class="calendar card">
        <view class="calendar-head">
          <view><text>{{ calendarMonth }} {{ courseMode === 'offline' ? '线下课表' : '学习日历' }}</text><small>第{{ weekNumber }}教学周 · {{ lessonTotal }}节课</small></view>
          <view class="calendar-mode"><Icon name="calendar" tone="primary" /><text>周课表</text></view>
        </view>

        <view class="days">
          <view v-for="day in activeData.days" :key="day.label" :class="['day', day.active ? 'active' : '']">
            <text>{{ day.label }}</text>
            <b>{{ day.date }}</b>
            <view class="day-lessons"><i v-for="lesson in day.lessons" :key="lesson.short + lesson.time" :class="['lesson-dot', lesson.tone]"></i></view>
          </view>
        </view>

        <view class="calendar-note">
          <view class="note-date"><b>{{ activeDay?.date || '--' }}</b><small>{{ activeDay?.label || '今日' }}</small></view>
          <view class="note-copy"><text>{{ courseMode === 'offline' ? '今日线下课' : '今日课程' }}</text><strong>{{ selectedSummary }}</strong></view>
          <Icon name="arrow" tone="muted" />
        </view>

        <view class="subject-legend">
          <view v-for="subject in activeData.subjects" :key="subject.label"><i :class="['legend-dot', subject.tone]"></i><text>{{ subject.label }}</text></view>
        </view>
      </view>

      <view class="section-heading">
        <view><text>{{ courseMode === 'offline' ? '我的线下课程' : '我的课程' }}</text><small>{{ courseMode === 'offline' ? '校区、班级与面授进度' : '按科目快速筛选' }}</small></view>
        <view><b>{{ activeData.courses.length }}</b><small>门课程</small></view>
      </view>

      <scroll-view scroll-x class="filters">
        <view v-for="category in activeData.categories" :key="category.label" :class="['filter-item', category.tone, selectedCategory === category.label ? 'active' : '']" @click="selectCategory(category)">
          <view class="filter-icon"><Icon :name="category.icon" :tone="selectedCategory === category.label ? 'white' : 'primary'" /></view>
          <view class="filter-copy"><text>{{ category.label }}</text><small>{{ category.count }}门</small></view>
        </view>
      </scroll-view>

      <view class="status">
        <view class="status-main"><b>{{ courseMode === 'offline' ? '正在上课' : '正在学习' }} {{ visibleCourses.length }}</b><text>{{ courseMode === 'offline' ? '待到校 1' : '待开课 1' }}</text><text>{{ courseMode === 'offline' ? '已结课 2' : '已结课 8' }}</text></view>
        <view class="status-sort"><Icon :name="courseMode === 'offline' ? 'pin' : 'grid'" tone="muted" /><text>{{ courseMode === 'offline' ? '按上课时间' : '最近学习优先' }}</text></view>
      </view>

      <view v-if="visibleCourses.length" class="course-list">
        <view v-for="(item,index) in visibleCourses" :key="item.classId ? `class-${item.classId}` : (item.id || item.title)" :class="['course-card','card','tap','course-'+courseSubject(item,index).tone]" @click="openCourse(item)">
          <view class="course-accent"></view>
          <view class="course-top">
            <view :class="['course-image', courseSubject(item,index).tone]">
              <view class="course-image-fallback"><Icon :name="courseSubject(item,index).icon" tone="white" /><text>{{ courseSubject(item,index).short }}</text></view>
              <image v-if="item.image" :src="item.image" mode="aspectFill" />
              <view class="cover-top"><text class="subject-chip">{{ courseSubject(item,index).label }}</text><text class="course-kind">{{ item.tag || '教育课程' }}</text></view>
              <view v-if="courseMode === 'online' && index===1" class="play"><Icon name="play" tone="white" /></view>
              <view v-if="courseMode === 'offline'" class="campus-badge"><Icon name="pin" tone="white" /><text>{{ item.classroom || 'A3 教室' }}</text></view>
              <small v-if="courseMode === 'online' && index===1" class="duration">18:20</small>
            </view>
            <view class="course-copy">
              <view class="course-tags"><em>{{ courseMode === 'offline' ? (item.tag || '面授班') : (index===1 ? '随时随地学' : '名师主讲') }}</em><em class="green">{{ courseMode === 'offline' ? (item.classSize || '12人小班') : (index===1 ? '无限次回放' : '双师辅导') }}</em></view>
              <strong class="line-clamp-2">{{ item.title || '精品教育课程' }}</strong>
              <view class="course-meta"><Icon :name="courseMode === 'offline' ? 'pin' : 'clock'" tone="muted" /><text>{{ courseSchedule(index, item) }}</text></view>
            </view>
          </view>

          <view class="progress-head"><text>学习进度</text><b>{{ courseProgress(item) }}%</b></view>
          <view class="bar"><i :style="{width: courseProgress(item) + '%'}"></i></view>
          <view class="course-foot">
            <view class="course-foot-copy"><text>{{ courseSummary(item,index) }}</text><small>已完成 {{ courseProgress(item) }}%</small></view>
            <button class="course-action" @click.stop="openCourse(item)"><Icon :name="courseMode === 'offline' ? 'calendar' : 'play'" tone="white" />{{ courseMode === 'offline' ? '查看安排' : (index===1 ? '继续播放' : '进入课程') }}</button>
          </view>
        </view>
      </view>
      <view v-else class="empty-courses card"><view class="empty-icon"><Icon name="book" tone="primary" /></view><strong>还没有匹配的课程</strong><text>换一个科目，看看更多学习安排</text></view>

      <view class="tools-heading"><view><text>学习工具</text><small>把每一次学习都留下痕迹</small></view><Icon name="arrow" tone="muted" /></view>
      <view class="bottom-cards">
        <view class="tool-card card tool-profile tap">
          <view class="tool-art"><view class="tool-art-ring"></view><view class="tile-icon"><Icon name="medal" tone="primary" /></view></view>
          <view class="tool-copy"><text>成长数据</text><strong>我的学习档案</strong><small>能力雷达图与授课师评</small><view class="tool-metric"><b>28</b><span>天连续打卡</span><Icon name="arrow" tone="muted" /></view></view>
        </view>
        <view class="tool-card card tool-replay tap">
          <view class="tool-art"><view class="tool-art-ring"></view><view class="tile-icon green"><Icon name="play" tone="success" /></view></view>
          <view class="tool-copy"><text>课后资源</text><strong>课程回放中心</strong><small>高清视频与云端重难点</small><view class="tool-metric"><b>4</b><span>条新回放已生成</span><Icon name="arrow" tone="muted" /></view></view>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import BrandHeader from '@/components/BrandHeader.vue'
import Icon from '@/components/Icon.vue'
import { getCampusList, getCourseClassList, getCourseList, checkIn } from '@/api/education'
import { FRONTEND_DEMO_ENABLED } from '@/config'
import { requireLogin } from '@/utils/auth'
import { campusList } from '@/data/campus'
import { readStorage, writeStorage } from '@/utils/storage'

const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const subjects = [
  { label: '数学思维', short: '数', tone: 'math', icon: 'book', match: ['数学', '思维'] },
  { label: '趣味英语', short: '英', tone: 'english', icon: 'message', match: ['英语', '拼读'] },
  { label: '编程机器人', short: '编', tone: 'coding', icon: 'settings', match: ['编程', '机器人', 'scratch'] },
  { label: '人文语文', short: '文', tone: 'chinese', icon: 'school', match: ['语文', '阅读', '人文'] },
  { label: '艺术素养', short: '艺', tone: 'art', icon: 'medal', match: ['艺术', '美术'] }
]
const categorySeed = [
  { label: '全部科目', icon: 'grid', tone: 'indigo', match: [] },
  ...subjects.map(({ label, icon, tone, match }) => ({ label, icon, tone, match }))
]
const modeOptions = [
  { key: 'online', label: '线上课程', title: '随时随地学', desc: '直播 · 录播 · 双师互动', icon: 'play' },
  { key: 'offline', label: '线下课程', title: '到校面对面', desc: '校区 · 班级 · 面授课堂', icon: 'school' }
]
const campusOptions = ref(campusList)
const weeklyPlan = [
  [{ short: '数', label: '数学思维', tone: 'math', time: '18:30' }],
  [{ short: '英', label: '趣味英语', tone: 'english', time: '19:00' }],
  [{ short: '编', label: '编程机器人', tone: 'coding', time: '18:30' }],
  [{ short: '文', label: '人文语文', tone: 'chinese', time: '18:30' }],
  [{ short: '数', label: '数学思维', tone: 'math', time: '18:30' }, { short: '英', label: '趣味英语', tone: 'english', time: '20:00' }],
  [{ short: '艺', label: '艺术素养', tone: 'art', time: '10:00' }],
  []
]
const offlineWeeklyPlan = [
  [{ short: '数', label: '数学思维', tone: 'math', time: '09:00' }],
  [{ short: '英', label: '趣味英语', tone: 'english', time: '14:00' }],
  [{ short: '编', label: '编程机器人', tone: 'coding', time: '18:30' }],
  [{ short: '文', label: '人文语文', tone: 'chinese', time: '09:00' }],
  [{ short: '数', label: '数学思维', tone: 'math', time: '09:00' }, { short: '英', label: '趣味英语', tone: 'english', time: '14:00' }],
  [{ short: '艺', label: '艺术素养', tone: 'art', time: '15:00' }],
  []
]
const offlineCourses = [
  { id: 'offline-math-spring', title: '少儿高阶思维数学·春季班', subjectName: '数学思维', categoryName: '数学思维', progress: 38, tag: '面授班', classSize: '12人小班', schedule: '每周六 09:00 - 10:30', summary: '下一节 · 周六 09:00 · A3 教室', classroom: 'A3 教室', teacher: '林老师' },
  { id: 'offline-english-spring', title: '自然拼读与口语表达·进阶班', subjectName: '趣味英语', categoryName: '趣味英语', progress: 62, tag: '小班面授', classSize: '10人小班', schedule: '每周日 14:00 - 15:30', summary: '本周作业 · 口语闯关待完成', classroom: 'B2 教室', teacher: '周老师' },
  { id: 'offline-art-spring', title: '创意美术与综合材料·体验班', subjectName: '艺术素养', categoryName: '艺术素养', progress: 12, tag: '周末班', classSize: '8人小班', schedule: '每周六 15:00 - 16:30', summary: '本周主题 · 春日自然观察', classroom: '艺术教室 1', teacher: '苏老师' }
]

const getCalendar = (courses = [], plan = weeklyPlan) => {
  const now = new Date()
  const todayIndex = (now.getDay() + 6) % 7
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - todayIndex)
  const days = weekdays.map((label, index) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index)
    const lessons = plan[index].map((lesson, lessonIndex) => ({ ...lesson, title: courses.length ? courses[(index + lessonIndex) % courses.length]?.title : lesson.label }))
    return { label, date: String(date.getDate()).padStart(2, '0'), active: index === todayIndex, lessons }
  })
  return { days, month: `${now.getMonth() + 1}月`, weekNumber: Math.floor((start.getDate() - 1) / 7) + 1, todayLabel: `${now.getMonth() + 1}月${now.getDate()}日 · ${weekdays[todayIndex]}` }
}

const resolveSubject = (item, index = 0) => {
  const source = `${item?.categoryName || ''}${item?.subjectName || ''}${item?.title || ''}`.toLowerCase()
  return subjects.find(subject => subject.match.some(word => source.includes(word.toLowerCase()))) || subjects[index % subjects.length]
}
const buildCategories = courses => categorySeed.map(category => ({ ...category, count: category.match.length ? courses.filter(item => category.match.some(word => `${item?.categoryName || ''}${item?.subjectName || ''}${item?.title || ''}`.includes(word))).length : courses.length }))

const initialCalendar = getCalendar()
const data = ref({ days: initialCalendar.days, month: initialCalendar.month, weekNumber: initialCalendar.weekNumber, todayLabel: initialCalendar.todayLabel, subjects, categories: buildCategories([]), courses: [] })
const offlineCourseList = ref(offlineCourses)
const offlineCalendar = computed(() => getCalendar(offlineCourseList.value, offlineWeeklyPlan))
const storedCampus = readStorage('selectedOfflineCampus')
const selectedCampus = ref(campusOptions.value.some(item => item.key === storedCampus) ? storedCampus : campusOptions.value[0].key)
const selectedCampusInfo = computed(() => campusOptions.value.find(item => item.key === selectedCampus.value) || campusOptions.value[0])
const offlineData = computed(() => ({ days: offlineCalendar.value.days, month: offlineCalendar.value.month, weekNumber: offlineCalendar.value.weekNumber, todayLabel: offlineCalendar.value.todayLabel, subjects, categories: buildCategories(offlineCourseList.value), courses: offlineCourseList.value.map(item => ({ ...item, campus: item.campus || selectedCampusInfo.value.label })) }))
const courseMode = ref('online')
const selectedCategory = ref('全部科目')
const activeData = computed(() => courseMode.value === 'offline' ? offlineData.value : data.value)
const activeDay = computed(() => activeData.value.days.find(day => day.active) || activeData.value.days[0])
const todayLabel = computed(() => activeData.value.todayLabel)
const calendarMonth = computed(() => activeData.value.month)
const weekNumber = computed(() => activeData.value.weekNumber)
const lessonTotal = computed(() => activeData.value.days.reduce((total, day) => total + day.lessons.length, 0))
const featuredTime = computed(() => courseMode.value === 'offline' ? '09:00' : '18:30')
const featuredTitle = computed(() => activeData.value.courses[0]?.title || (courseMode.value === 'offline' ? '少儿高阶思维数学·春季班' : '少儿高阶思维数学课'))
const offlineFeaturedMeta = computed(() => {
  const course = offlineData.value.courses[0]
  return course ? `${course.schedule} · ${course.classroom}` : '周六 09:00 · A3 教室'
})
const currentModeTip = computed(() => courseMode.value === 'offline' ? `已选择${selectedCampusInfo.value.label}，报名后可查看班级与教室安排` : '直播课与录播课会自动同步学习进度')
const selectedSummary = computed(() => {
  const lesson = activeDay.value?.lessons?.[0]
  return lesson ? `${lesson.time} · ${lesson.title}` : '今天没有排课，适合整理错题和预习'
})
const visibleCourses = computed(() => {
  if (selectedCategory.value === '全部科目') return activeData.value.courses
  return activeData.value.courses.filter(item => resolveSubject(item).label === selectedCategory.value)
})

const courseSubject = (item, index) => resolveSubject(item, index)
const courseProgress = item => Math.max(0, Math.min(100, Number(item?.progress || 0)))
const courseSchedule = (index, item) => courseMode.value === 'offline' ? (item?.schedule || '按班级课表上课') : (['每周六 09:00 - 10:30 上课', '随时学习 · 共32讲', '课后练习 · 每周更新'][index] || '按课程安排学习')
const courseSummary = (item, index) => item?.summary || (courseMode.value === 'offline' ? `${item?.campus || selectedCampusInfo.value.label} · ${item?.teacher || '班主任'}跟进` : (['课程目录已更新 · 12个章节', '已掌握 8 讲语音规则', '本周教学大纲已更新'][index] || '打开详情查看学习内容'))

const selectCategory = category => { selectedCategory.value = category.label }
const selectCampus = key => {
  if (!campusOptions.value.some(item => item.key === key)) return
  selectedCampus.value = key
  writeStorage('selectedOfflineCampus', key)
  if (courseMode.value === 'offline') loadCourses('offline')
}
const switchCourseMode = mode => {
  courseMode.value = mode
  selectedCategory.value = '全部科目'
  loadCourses(mode)
}
const normalizeCampus = item => ({ ...item, key: item.code || String(item.id), label: item.name || item.label, location: item.address || item.location || '位置待配置' })
const loadCampuses = async () => {
  try {
    const rows = await getCampusList()
    if (!Array.isArray(rows) || !rows.length) return
    campusOptions.value = rows.map(normalizeCampus)
    selectedCampus.value = campusOptions.value.some(item => item.key === storedCampus) ? storedCampus : campusOptions.value[0].key
    writeStorage('selectedOfflineCampus', selectedCampus.value)
  } catch (error) {
    // 后端尚未部署时继续使用本地校区配置，保证真机可以浏览页面。
  }
}
const normalizeCourse = item => ({ ...item, image: item.coverUrl, tag: item.tag || (courseMode.value === 'offline' ? '面授班' : '教育课程'), progress: Number(item.progress || 0) })
const formatClassTime = value => {
  if (!value) return ''
  const text = Array.isArray(value) ? value.join('-') : String(value).replace('T', ' ')
  return text.length >= 16 ? `${text.slice(5, 10).replace('-', '月')}日 ${text.slice(11, 16)}` : text
}
const normalizeCourseClass = item => {
  const capacity = Number(item.capacity || 0)
  const remaining = Number(item.remainingCount ?? Math.max(0, capacity - Number(item.registeredCount || 0)))
  const start = formatClassTime(item.startTime)
  const end = formatClassTime(item.endTime)
  return {
    id: item.courseId || item.id,
    classId: item.id,
    title: item.courseTitle || item.name || '线下课程班级',
    categoryName: item.courseTitle || '线下课程',
    campus: item.campusName || selectedCampusInfo.value.label,
    classroom: item.classroomName || '教室待安排',
    teacher: item.teacherName || '教师待安排',
    schedule: [start, end].filter(Boolean).join(' - ') || '按班级课表上课',
    summary: `剩余 ${remaining} 个名额`,
    classSize: capacity ? `${capacity}人班` : '小班面授',
    tag: '线下班',
    progress: 0
  }
}
const loadCourses = async mode => {
  try {
    const params = { courseType: mode === 'offline' ? 'OFFLINE' : 'ONLINE' }
    if (mode === 'offline' && selectedCampusInfo.value?.id) params.campusId = selectedCampusInfo.value.id
    const courses = await getCourseList(params)
    const normalized = (Array.isArray(courses) ? courses : []).map(normalizeCourse)
    if (mode === 'offline') {
      let classes = []
      try {
        classes = await getCourseClassList(selectedCampusInfo.value?.id ? { campusId: selectedCampusInfo.value.id } : undefined)
      } catch (error) {
        classes = []
      }
      offlineCourseList.value = classes.length ? classes.map(normalizeCourseClass) : (normalized.length ? normalized : offlineCourses)
      return
    }
    const calendar = getCalendar(normalized)
    data.value = { ...data.value, ...calendar, categories: buildCategories(normalized), courses: normalized }
  } catch (error) {
    if (mode === 'offline') offlineCourseList.value = offlineCourses
    else data.value = { ...data.value, categories: buildCategories([]) }
  }
}
const openCourse = item => {
  if (courseMode.value === 'offline') {
    return uni.showModal({ title: item.title, content: [item.schedule, item.campus, item.classroom, item.teacher].filter(Boolean).join(' · '), showCancel: false, confirmText: '知道了' })
  }
  return uni.navigateTo({ url: `/pages/course/detail?id=${item.id}` })
}
const quickCheckIn = async () => {
  const item = activeData.value.courses[0]
  if (!item?.id) return uni.showToast({ title: '当前暂无可签到课程', icon: 'none' })
  if (FRONTEND_DEMO_ENABLED) return uni.showToast({ title: '体验版仅供浏览，签到记录不会保存', icon: 'none' })
  if (courseMode.value === 'offline') return uni.showToast({ title: '线下课程请到校后签到', icon: 'none' })
  if (!requireLogin('/pages/course/index')) return
  try { await checkIn(item.id); uni.showToast({ title: '签到成功', icon: 'success' }) } catch (error) { uni.showToast({ title: error.message || '签到失败', icon: 'none' }) }
}
onMounted(async () => { try { await loadCampuses(); await loadCourses('online') } catch (error) { console.error('课程页初始化失败，保留本地课程内容', error) } })
</script>

<style scoped>
.mode-picker{margin-bottom:20rpx;padding:20rpx 18rpx 15rpx;border-radius:28rpx;background:linear-gradient(135deg,#ffffff 0%,#f4f6ff 100%)}.mode-picker-head{display:flex;align-items:center;justify-content:space-between;padding:0 5rpx}.mode-picker-head text,.mode-picker-head small{display:block}.mode-picker-head text{font-size:24rpx;font-weight:800;color:#17233c}.mode-picker-head small{margin-top:5rpx;color:#8a95aa;font-size:16rpx}.mode-picker-status{display:flex;align-items:center;gap:6rpx;padding:7rpx 10rpx;border-radius:999rpx;background:#eef0ff;color:#3155b6;font-size:15rpx}.mode-picker-status i{width:10rpx;height:10rpx;border-radius:50%;background:#4769dc;box-shadow:0 0 0 4rpx rgba(71,105,220,.12)}.mode-picker.offline .mode-picker-status{background:#e0f5ea;color:#08734e}.mode-picker.offline .mode-picker-status i{background:#0aa56e;box-shadow:0 0 0 4rpx rgba(10,165,110,.12)}.mode-options{display:grid;grid-template-columns:1fr 1fr;gap:10rpx;margin-top:15rpx}.mode-option{position:relative;display:flex;align-items:center;gap:9rpx;min-width:0;padding:12rpx 10rpx;border:2rpx solid transparent;border-radius:20rpx;background:#f1f3ff;transition:transform .16s ease,background .16s ease,border-color .16s ease}.mode-option:active{transform:scale(.985)}.mode-option.offline{background:#edf8f4}.mode-option.active.online{border-color:#8ea6ff;background:#e6ebff;box-shadow:0 8rpx 16rpx rgba(30,64,175,.1)}.mode-option.active.offline{border-color:#84cbae;background:#dcf5e9;box-shadow:0 8rpx 16rpx rgba(0,108,73,.1)}.mode-option-icon{width:47rpx;height:47rpx;display:flex;align-items:center;justify-content:center;flex:none;border-radius:15rpx;background:#dfe5ff}.mode-option.offline .mode-option-icon{background:#d5f0e3}.mode-option.active.online .mode-option-icon{background:#1e40af}.mode-option.active.offline .mode-option-icon{background:#087a62}.mode-option-icon .icon{width:27rpx;height:27rpx}.mode-option-copy{min-width:0}.mode-option-copy text,.mode-option-copy strong,.mode-option-copy small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mode-option-copy text{color:#7c87a0;font-size:14rpx}.mode-option-copy strong{margin-top:2rpx;color:#1a2946;font-size:20rpx}.mode-option-copy small{margin-top:3rpx;color:#7a879e;font-size:14rpx}.mode-option-check{position:absolute;right:8rpx;top:7rpx;width:22rpx;height:22rpx;border-radius:50%;background:#1e40af;color:#fff;text-align:center;font-size:15rpx;line-height:22rpx}.mode-option.active.offline .mode-option-check{background:#087a62}.mode-tip{display:flex;align-items:center;gap:6rpx;margin:13rpx 5rpx 0;color:#7b879c;font-size:15rpx}.mode-tip text{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mode-tip>.icon{width:21rpx;height:21rpx}.reminder.offline-reminder{background:linear-gradient(135deg,#eefaf6 0%,#def3e9 100%);border-color:rgba(124,204,170,.54)}.offline-reminder .reminder-glow{background:rgba(12,151,102,.12)}.offline-reminder .reminder-symbol{background:#087a62;box-shadow:0 10rpx 18rpx rgba(8,122,98,.18)}.offline-reminder .reminder-title text{color:#08704c}.offline-reminder .location-status{color:#08704c}.offline-reminder .check-actions>text{color:#08704c}.offline-reminder .check-actions button{background:#087a62}.campus-badge{position:absolute;z-index:2;right:8rpx;bottom:7rpx;display:flex;align-items:center;gap:3rpx;padding:5rpx 7rpx;border-radius:8rpx;background:rgba(4,50,39,.72);color:#fff;font-size:14rpx}.campus-badge .icon{width:19rpx;height:19rpx}
.course-page{padding-top:8rpx}.reminder{position:relative;overflow:hidden;padding:24rpx 24rpx 20rpx;background:linear-gradient(135deg,#eef3ff 0%,#e1e8ff 100%);border-color:rgba(174,189,255,.6)}.reminder-glow{position:absolute;right:-88rpx;top:-120rpx;width:290rpx;height:290rpx;border-radius:50%;background:rgba(72,108,242,.13)}.reminder-head,.reminder-title,.reminder-title>view,.lesson-summary,.check-row,.check-tip,.check-actions{display:flex;align-items:center}.reminder-head{position:relative;z-index:1;justify-content:space-between}.reminder-title{gap:12rpx}.reminder-symbol{width:54rpx;height:54rpx;display:flex;align-items:center;justify-content:center;border-radius:18rpx;background:#123ca5;box-shadow:0 10rpx 18rpx rgba(18,60,165,.18)}.reminder-symbol .icon{width:31rpx;height:31rpx}.reminder-title text,.reminder-title small{display:block}.reminder-title text{font-size:25rpx;font-weight:800;color:#092f9f}.reminder-title small{margin-top:4rpx;color:#657391;font-size:17rpx}.location-status{display:flex;align-items:center;padding:8rpx 12rpx;border:2rpx solid rgba(255,255,255,.75);border-radius:999rpx;background:rgba(255,255,255,.68);color:#08764e;font-size:18rpx}.location-status i{width:11rpx;height:11rpx;margin-right:6rpx;border-radius:50%;background:#0aa56e;box-shadow:0 0 0 5rpx rgba(10,165,110,.12)}.lesson-summary{position:relative;z-index:1;gap:14rpx;margin-top:22rpx;padding:16rpx 15rpx;border:2rpx solid rgba(255,255,255,.8);border-radius:22rpx;background:rgba(255,255,255,.6)}.time-block{width:94rpx;flex:none}.time-block strong,.time-block small{display:block}.time-block strong{color:#0b38af;font-size:31rpx;line-height:1}.time-block small{margin-top:7rpx;color:#74809a;font-size:17rpx}.lesson-divider{width:2rpx;height:55rpx;background:#c1ceef}.lesson-main{flex:1;min-width:0}.lesson-main text,.lesson-main small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.lesson-main text{color:#182440;font-size:24rpx;font-weight:800}.lesson-main small{margin-top:7rpx;color:#64718b;font-size:17rpx}.lesson-badge{flex:none;padding:9rpx 10rpx;border-radius:14rpx;background:#d6f7e8;color:#08704c;text-align:center}.lesson-badge b,.lesson-badge small{display:block}.lesson-badge b{font-size:18rpx}.lesson-badge small{margin-top:3rpx;font-size:15rpx}.check-row{position:relative;z-index:1;justify-content:space-between;gap:10rpx;margin-top:14rpx;padding:10rpx 10rpx 10rpx 13rpx;border-radius:18rpx;background:rgba(255,255,255,.78)}.check-tip{flex:1;min-width:0;gap:8rpx}.check-tip>.icon{width:27rpx;height:27rpx;flex:none}.check-tip text,.check-tip small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.check-tip text{color:#51617e;font-size:17rpx}.check-tip small{margin-top:3rpx;color:#8792aa;font-size:15rpx}.check-actions{gap:12rpx}.check-actions>text{color:#123ca5;font-size:17rpx;white-space:nowrap}.check-actions button{height:54rpx;margin:0;padding:0 16rpx;display:flex;align-items:center;gap:5rpx;border:0;border-radius:28rpx;background:#062eaa;color:#fff;font-size:18rpx;font-weight:700;line-height:1;white-space:nowrap}.check-actions button .icon{width:25rpx;height:25rpx}
.calendar{margin-top:22rpx;padding:22rpx 18rpx 17rpx}.calendar-head{display:flex;align-items:center;justify-content:space-between;padding:0 6rpx}.calendar-head text,.calendar-head small{display:block}.calendar-head text{font-size:27rpx;font-weight:800}.calendar-head small{margin-top:6rpx;color:#8994aa;font-size:17rpx}.calendar-mode{display:flex;align-items:center;gap:5rpx;padding:9rpx 11rpx;border-radius:14rpx;background:#eef0ff;color:#1e40af;font-size:17rpx}.calendar-mode .icon{width:24rpx;height:24rpx}.days{display:grid;grid-template-columns:repeat(7,1fr);gap:6rpx;margin-top:18rpx}.day{height:112rpx;display:flex;flex-direction:column;align-items:center;padding:10rpx 2rpx 8rpx;border:2rpx solid transparent;border-radius:18rpx;color:#7b879c}.day>text{font-size:16rpx}.day>b{margin-top:7rpx;color:#1d2944;font-size:24rpx;line-height:1}.day-lessons{display:flex;gap:4rpx;margin-top:auto;min-height:13rpx}.lesson-dot,.legend-dot{display:block;border-radius:999rpx}.lesson-dot{width:18rpx;height:7rpx}.day.active{border-color:#9fb2ff;background:#062eaa;box-shadow:0 8rpx 16rpx rgba(6,46,170,.18);color:#fff}.day.active>b{color:#fff}.calendar-note{display:flex;align-items:center;gap:11rpx;margin-top:13rpx;padding:11rpx 13rpx;border-radius:17rpx;background:#f3f4ff}.note-date{width:48rpx;flex:none;text-align:center}.note-date b,.note-date small{display:block}.note-date b{color:#123ca5;font-size:25rpx;line-height:1}.note-date small{margin-top:4rpx;color:#8691a7;font-size:15rpx}.note-copy{flex:1;min-width:0}.note-copy text,.note-copy strong{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.note-copy text{color:#8792aa;font-size:15rpx}.note-copy strong{margin-top:4rpx;color:#354361;font-size:18rpx}.calendar-note>.icon{width:24rpx;height:24rpx}.subject-legend{display:flex;flex-wrap:wrap;gap:12rpx 18rpx;margin:15rpx 5rpx 0}.subject-legend>view{display:flex;align-items:center;gap:5rpx;color:#7f8aa0;font-size:15rpx}.legend-dot{width:12rpx;height:12rpx}.math,.legend-dot.math{background:#6658d9}.english,.legend-dot.english{background:#0f9f8a}.coding,.legend-dot.coding{background:#ed8b2f}.chinese,.legend-dot.chinese{background:#e15b75}.art,.legend-dot.art{background:#3e82e8}.indigo,.legend-dot.indigo{background:#315bdc}
.section-heading,.tools-heading{display:flex;align-items:center;justify-content:space-between}.section-heading{margin:28rpx 2rpx 0}.section-heading text,.section-heading small,.tools-heading text,.tools-heading small{display:block}.section-heading text,.tools-heading text{font-size:27rpx;font-weight:800}.section-heading small,.tools-heading small{margin-top:5rpx;color:#9099aa;font-size:16rpx}.section-heading>view:last-child{display:flex;align-items:baseline;gap:5rpx;color:#97a0b2}.section-heading b{color:#1e40af;font-size:29rpx}.filters{display:flex;white-space:nowrap;margin:18rpx -32rpx 0;padding:0 32rpx 8rpx}.filter-item{width:156rpx;height:78rpx;display:inline-flex;align-items:center;gap:9rpx;margin-right:10rpx;padding:10rpx;border:2rpx solid transparent;border-radius:21rpx;background:#fff;box-shadow:0 7rpx 18rpx rgba(30,64,175,.045)}.filter-item.active{border-color:#1e40af;background:#1e40af;box-shadow:0 9rpx 18rpx rgba(30,64,175,.16)}.filter-icon{width:48rpx;height:48rpx;display:flex;align-items:center;justify-content:center;border-radius:15rpx;background:#e8ecff}.filter-item.active .filter-icon{background:rgba(255,255,255,.17)}.filter-icon .icon{width:28rpx;height:28rpx}.filter-copy{min-width:0}.filter-copy text,.filter-copy small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.filter-copy text{color:#27334d;font-size:18rpx;font-weight:700}.filter-copy small{margin-top:3rpx;color:#929caf;font-size:15rpx}.filter-item.active .filter-copy text,.filter-item.active .filter-copy small{color:#fff}.filter-item.active .filter-copy small{opacity:.72}.status{display:flex;align-items:center;justify-content:space-between;margin:14rpx 2rpx 12rpx;color:#768198;font-size:17rpx}.status-main{display:flex;align-items:center;gap:18rpx}.status-main b{color:#123ca5}.status-sort{display:flex;align-items:center;gap:5rpx;color:#8b95a9}.status-sort .icon{width:22rpx;height:22rpx}
.course-list{display:flex;flex-direction:column;gap:14rpx}.course-card{position:relative;overflow:hidden;padding:15rpx 15rpx 14rpx}.course-accent{position:absolute;left:0;top:24rpx;bottom:24rpx;width:7rpx;border-radius:0 7rpx 7rpx 0;background:#6658d9}.course-english .course-accent{background:#0f9f8a}.course-coding .course-accent{background:#ed8b2f}.course-chinese .course-accent{background:#e15b75}.course-art .course-accent{background:#3e82e8}.course-top{display:flex;gap:14rpx}.course-image{position:relative;width:215rpx;height:154rpx;flex:none;overflow:hidden;border-radius:18rpx;background:#eef1ff}.course-image>image{position:relative;z-index:1;width:100%;height:100%;display:block}.course-image-fallback{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5rpx;color:#fff}.course-image-fallback .icon{width:39rpx;height:39rpx}.course-image-fallback text{font-size:18rpx;font-weight:700}.course-image.math{background:linear-gradient(135deg,#7164e3,#4038a9)}.course-image.english{background:linear-gradient(135deg,#21b79e,#087362)}.course-image.coding{background:linear-gradient(135deg,#f4aa53,#d6651b)}.course-image.chinese{background:linear-gradient(135deg,#ea7d91,#ad3e5f)}.course-image.art{background:linear-gradient(135deg,#65a0f0,#3262bf)}.cover-top{position:absolute;z-index:2;left:9rpx;right:9rpx;top:9rpx;display:flex;align-items:center;justify-content:space-between;gap:5rpx}.subject-chip,.course-kind{padding:5rpx 7rpx;border-radius:7rpx;color:#fff;font-size:15rpx;white-space:nowrap}.subject-chip{background:rgba(15,23,42,.52)}.course-kind{overflow:hidden;text-overflow:ellipsis;background:rgba(15,23,42,.4)}.play{position:absolute;z-index:2;left:50%;top:50%;width:43rpx;height:43rpx;display:flex;align-items:center;justify-content:center;transform:translate(-50%,-50%);border:3rpx solid #fff;border-radius:50%;background:rgba(0,40,142,.72)}.play .icon{width:22rpx;height:22rpx}.duration{position:absolute;z-index:2;right:7rpx;bottom:6rpx;padding:3rpx 6rpx;border-radius:6rpx;background:rgba(15,23,42,.72);color:#fff;font-size:14rpx}.course-copy{flex:1;min-width:0;padding-top:1rpx}.course-tags{display:flex;gap:6rpx}.course-tags em{display:block;max-width:125rpx;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:5rpx 7rpx;border-radius:7rpx;background:#e3e7ff;color:#173ea7;font-size:15rpx;font-style:normal}.course-tags em.green{background:#d8f4e7;color:#08704c}.course-copy>strong{display:block;margin-top:9rpx;color:#17233c;font-size:24rpx;line-height:1.32}.course-meta{display:flex;align-items:center;gap:5rpx;margin-top:9rpx;color:#7c879b;font-size:16rpx}.course-meta .icon{width:23rpx;height:23rpx}.progress-head{display:flex;align-items:center;justify-content:space-between;margin-top:14rpx;color:#8590a4;font-size:16rpx}.progress-head b{color:#1e40af;font-size:18rpx}.bar{height:10rpx;margin-top:7rpx;padding:2rpx;border-radius:10rpx;background:#e7eaff}.bar i{display:block;height:100%;border-radius:8rpx;background:#6658d9}.course-english .bar i{background:#0f9f8a}.course-coding .bar i{background:#ed8b2f}.course-chinese .bar i{background:#e15b75}.course-art .bar i{background:#3e82e8}.course-foot{display:flex;align-items:center;gap:10rpx;margin-top:12rpx;padding:10rpx 11rpx;border-radius:16rpx;background:#f7f8ff}.course-foot-copy{flex:1;min-width:0}.course-foot-copy text,.course-foot-copy small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.course-foot-copy text{color:#586681;font-size:16rpx}.course-foot-copy small{margin-top:3rpx;color:#9aa4b8;font-size:14rpx}.course-action{height:52rpx;display:flex;align-items:center;gap:5rpx;margin:0;padding:0 13rpx;border:0;border-radius:15rpx;background:#1e40af;color:#fff;font-size:17rpx;font-weight:700;line-height:1;white-space:nowrap}.course-action .icon{width:24rpx;height:24rpx}.course-english .course-action{background:#087a62}.course-coding .course-action{background:#d97720}.course-chinese .course-action{background:#c44d69}.course-art .course-action{background:#356fc9}.empty-courses{display:flex;flex-direction:column;align-items:center;margin-top:14rpx;padding:38rpx 20rpx;color:#8b95a9}.empty-icon{width:64rpx;height:64rpx;display:flex;align-items:center;justify-content:center;border-radius:22rpx;background:#e8ecff}.empty-icon .icon{width:35rpx;height:35rpx}.empty-courses strong{margin-top:14rpx;color:#293550;font-size:22rpx}.empty-courses text{margin-top:6rpx;font-size:17rpx}
.tools-heading{margin:28rpx 2rpx 14rpx}.tools-heading>.icon{width:26rpx;height:26rpx}.bottom-cards{display:grid;grid-template-columns:1fr 1fr;gap:13rpx}.tool-card{position:relative;min-width:0;overflow:hidden;padding:16rpx}.tool-art{position:relative;height:79rpx;overflow:hidden;border-radius:18rpx;background:#eef1ff}.tool-replay .tool-art{background:#e8f7ef}.tool-art:before,.tool-art:after{content:'';position:absolute;border-radius:50%;border:2rpx solid rgba(77,96,193,.15)}.tool-art:before{right:-28rpx;top:-42rpx;width:130rpx;height:130rpx}.tool-art:after{right:12rpx;top:-14rpx;width:72rpx;height:72rpx}.tool-replay .tool-art:before,.tool-replay .tool-art:after{border-color:rgba(0,108,73,.15)}.tool-art-ring{position:absolute;left:20rpx;bottom:-35rpx;width:92rpx;height:92rpx;border-radius:50%;border:18rpx solid rgba(30,64,175,.08)}.tool-replay .tool-art-ring{border-color:rgba(0,108,73,.08)}.tile-icon{position:absolute;z-index:1;left:13rpx;top:12rpx;width:54rpx;height:54rpx;display:flex;align-items:center;justify-content:center;border-radius:18rpx;background:#dfe5ff}.tile-icon.green{background:#d3f1e2}.tile-icon .icon{width:33rpx;height:33rpx}.tool-copy>text,.tool-copy>strong,.tool-copy>small{display:block}.tool-copy>text{margin-top:14rpx;color:#8b95a9;font-size:15rpx}.tool-copy>strong{margin-top:5rpx;color:#202c46;font-size:23rpx}.tool-copy>small{margin-top:6rpx;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#7d879b;font-size:16rpx}.tool-metric{display:flex;align-items:baseline;gap:5rpx;margin-top:13rpx;padding-top:10rpx;border-top:2rpx solid #f0f1f7;color:#8290a7}.tool-metric b{color:#1e40af;font-size:25rpx}.tool-replay .tool-metric b{color:#087a62}.tool-metric span{font-size:14rpx}.tool-metric .icon{width:20rpx;height:20rpx;margin-left:auto}
@media(max-width:360px){.location-status{padding:7rpx 8rpx}.location-status text{font-size:16rpx}.lesson-badge{display:none}.check-actions>text{display:none}.course-image{width:190rpx}.course-tags em{max-width:105rpx}.course-action{padding:0 9rpx;font-size:16rpx}.status-main{gap:12rpx}.status-sort text{display:none}}
 .campus-picker{margin-bottom:20rpx;padding:20rpx 16rpx 15rpx}.campus-picker-head{display:flex;align-items:center;justify-content:space-between;padding:0 5rpx}.campus-picker-head text,.campus-picker-head small,.campus-count b,.campus-count small{display:block}.campus-picker-head text{font-size:24rpx;font-weight:800;color:#17233c}.campus-picker-head small{margin-top:5rpx;color:#8a95aa;font-size:16rpx}.campus-count{text-align:right}.campus-count b{color:#087a62;font-size:25rpx;line-height:1}.campus-count small{margin-top:4rpx;color:#8a95aa;font-size:15rpx}.campus-options{display:flex;white-space:nowrap;margin:16rpx -16rpx 0;padding:0 16rpx 8rpx}.campus-option{position:relative;width:188rpx;height:86rpx;display:inline-flex;align-items:center;gap:9rpx;margin-right:10rpx;padding:10rpx;border:2rpx solid transparent;border-radius:19rpx;background:#f0f8f4;vertical-align:top}.campus-option.active{border-color:#69b994;background:#087a62;box-shadow:0 8rpx 16rpx rgba(8,122,98,.18)}.campus-option-icon{width:43rpx;height:43rpx;display:flex;align-items:center;justify-content:center;flex:none;border-radius:14rpx;background:#d6f1e4}.campus-option.active .campus-option-icon{background:rgba(255,255,255,.18)}.campus-option-icon .icon{width:25rpx;height:25rpx}.campus-option-copy{min-width:0}.campus-option-copy text,.campus-option-copy small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.campus-option-copy text{color:#135d47;font-size:19rpx;font-weight:800}.campus-option-copy small{margin-top:5rpx;color:#7d9b8d;font-size:14rpx}.campus-option.active .campus-option-copy text,.campus-option.active .campus-option-copy small{color:#fff}.campus-option.active .campus-option-copy small{opacity:.72}.campus-option-check{position:absolute;right:7rpx;top:6rpx;width:20rpx;height:20rpx;border-radius:50%;background:#fff;color:#087a62;text-align:center;font-size:14rpx;line-height:20rpx}.campus-current{display:flex;align-items:center;gap:9rpx;margin-top:10rpx;padding:10rpx 12rpx;border-radius:16rpx;background:#f5fbf8;color:#087a62}.campus-current>.icon{width:26rpx;height:26rpx;flex:none}.campus-current>view{flex:1;min-width:0}.campus-current text,.campus-current strong{display:block}.campus-current text{color:#8a9b91;font-size:14rpx}.campus-current strong{margin-top:3rpx;color:#08704c;font-size:19rpx}.campus-current>view+ .icon{width:22rpx;height:22rpx}
 </style>
