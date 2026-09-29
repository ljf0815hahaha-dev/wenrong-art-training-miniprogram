import { campusList } from './campus'

const onlineCourses = [
  { id: 3101, courseId: 3101, spuId: 4201, title: '少儿高阶思维数学·春季进阶课', summary: '用有趣的挑战培养观察、推理与解决问题的能力。', categoryName: '数学思维', subjectName: '数学思维', courseType: 'ONLINE', progress: 68, tag: '体验推荐', coverUrl: '/static/icons/book.png' },
  { id: 3102, courseId: 3102, spuId: 4202, title: '自然拼读与英语表达启蒙课', summary: '从字母发音到日常表达，循序渐进建立英语语感。', categoryName: '趣味英语', subjectName: '趣味英语', courseType: 'ONLINE', progress: 32, tag: '随时学习', coverUrl: '/static/icons/message.png' },
  { id: 3103, courseId: 3103, spuId: 4203, title: '创意美术与综合材料体验课', summary: '认识色彩与材料，在创作中发现生活里的美。', categoryName: '艺术素养', subjectName: '艺术素养', courseType: 'ONLINE', progress: 12, tag: '新课上架', coverUrl: '/static/icons/medal.png' }
]

const offlineCourses = [
  { id: 3201, courseId: 3201, spuId: 4201, title: '少儿高阶思维数学·春季班', summary: '每周线下小班学习与课后练习。', categoryName: '数学思维', subjectName: '数学思维', courseType: 'OFFLINE', progress: 38, tag: '面授班', coverUrl: '/static/icons/book.png' },
  { id: 3202, courseId: 3202, spuId: 4202, title: '自然拼读与口语表达·进阶班', summary: '面授互动，练习自然拼读和日常口语。', categoryName: '趣味英语', subjectName: '趣味英语', courseType: 'OFFLINE', progress: 62, tag: '小班面授', coverUrl: '/static/icons/message.png' },
  { id: 3203, courseId: 3203, spuId: 4203, title: '创意美术与综合材料·体验班', summary: '使用多种材料完成主题创作。', categoryName: '艺术素养', subjectName: '艺术素养', courseType: 'OFFLINE', progress: 12, tag: '周末班', coverUrl: '/static/icons/medal.png' }
]

const products = [
  { id: 4201, name: '少儿高阶思维数学体验课程', description: '循序渐进的数学思维训练课程。', price: 399, productType: 'COURSE', coverUrl: '/static/icons/book.png', spuId: 4201 },
  { id: 4202, name: '自然拼读与英语表达课程', description: '从发音开始建立英语表达信心。', price: 299, productType: 'COURSE', coverUrl: '/static/icons/message.png', spuId: 4202 },
  { id: 4203, name: '创意美术综合材料体验课', description: '适合初次体验的艺术课程。', price: 199, productType: 'COURSE', coverUrl: '/static/icons/medal.png', spuId: 4203 },
  { id: 4204, name: 'STEAM 趣味科学实验盒', description: '在动手实践中认识身边的科学。', price: 128, productType: 'GOODS', coverUrl: '/static/icons/settings.png', spuId: 4204 }
]

const courses = [...onlineCourses, ...offlineCourses]
const videos = [
  { id: 7101, chapterId: 710, title: '第 1 讲：从观察开始', durationSeconds: 620, videoUrl: '' },
  { id: 7102, chapterId: 710, title: '第 2 讲：发现规律', durationSeconds: 845, videoUrl: '' },
  { id: 7103, chapterId: 711, title: '第 3 讲：动手试一试', durationSeconds: 735, videoUrl: '' }
]
const myCourses = onlineCourses.slice(0, 2).map((course, index) => ({ courseId: course.id, grantTime: `2026-09-${String(20 - index).padStart(2, '0')} 09:30:00`, title: course.title }))
const notices = [
  { id: 9101, title: '数学思维课程提醒', classStartTime: '2026-09-30T18:30:00', remindBeforeMinutes: 30, status: 0 },
  { id: 9102, title: '英语口语练习提醒', classStartTime: '2026-10-01T19:00:00', remindBeforeMinutes: 15, status: 1 }
]
const orderRows = [
  { id: 6101, no: 'WR-DEMO-2026092801', status: 30, createTime: '2026-09-18T10:20:00', payPrice: 39900, items: [{ id: 61011, spuName: products[0].name, picUrl: products[0].coverUrl, count: 1, payPrice: 39900 }] },
  { id: 6102, no: 'WR-DEMO-2026092802', status: 10, createTime: '2026-09-22T15:40:00', payPrice: 12800, items: [{ id: 61021, spuName: products[3].name, picUrl: products[3].coverUrl, count: 1, payPrice: 12800 }] }
]
const demoCart = [
  { id: 8101, selected: true, count: 1, spu: { name: products[0].name, picUrl: products[0].coverUrl }, sku: { id: 8201, price: 39900 } },
  { id: 8102, selected: false, count: 1, spu: { name: products[3].name, picUrl: products[3].coverUrl }, sku: { id: 8204, price: 12800 } }
]
const member = { id: 'DEMO-1001', nickname: '晨曦妈妈', avatar: '/static/icons/person.png', level: { name: '体验会员' }, point: 2450 }
const studentProfile = { name: '陈安琪', mobile: '138****2026', basicInfo: '小学三年级，喜欢阅读、绘画和科学实验。' }

const clone = value => JSON.parse(JSON.stringify(value))
const queryValue = (url, name) => {
  const query = String(url).split('?')[1] || ''
  const pair = query.split('&').find(item => item.split('=')[0] === name)
  return pair ? decodeURIComponent(pair.slice(pair.indexOf('=') + 1)) : undefined
}
const getParam = (options, name) => options.data?.[name] ?? queryValue(options.url, name)

export const getDemoApiResponse = (options = {}) => {
  const path = String(options.url || '').split('?')[0]
  const method = String(options.method || 'GET').toUpperCase()
  const id = String(getParam(options, 'id') ?? getParam(options, 'courseId') ?? '')

  if (path === '/education/campus/list') return clone(campusList.map((item, index) => ({ id: index + 1, code: item.key, name: item.label, address: item.location })))
  if (path === '/education/course/list') {
    const source = options.data?.courseType === 'OFFLINE' ? offlineCourses : onlineCourses
    return clone(source)
  }
  if (path === '/education/course-class/list') {
    return clone(offlineCourses.map((course, index) => ({ id: 3301 + index, courseId: course.id, courseTitle: course.title, campusName: campusList[index]?.label || campusList[0].label, classroomName: ['A3 教室', 'B2 教室', '艺术教室 1'][index], teacherName: ['林老师', '周老师', '苏老师'][index], startTime: `2026-10-${String(3 + index).padStart(2, '0')}T09:00:00`, endTime: `2026-10-${String(3 + index).padStart(2, '0')}T10:30:00`, capacity: [12, 10, 8][index], registeredCount: [8, 6, 5][index] })))
  }
  if (path === '/education/course/detail') return clone(courses.find(course => String(course.id) === id) || onlineCourses[0])
  if (path === '/education/course/my-list') return clone(myCourses)
  if (path === '/education/course/outline') return { videos: clone(videos) }
  if (path === '/education/course/progress-list') return [{ videoId: 7101, completed: true }, { videoId: 7102, completed: false }]
  if (path === '/education/course/progress' && method === 'PUT') return clone(options.data || {})
  if (path === '/education/course-attendance/today-status') return false
  if (path === '/education/course-attendance/my-page') return { list: [], total: 0 }
  if (path === '/education/course-attendance/check-in' && method === 'POST') return { success: true }
  if (path === '/education/student-profile/get') return clone(studentProfile)
  if (path === '/education/student-profile/save' && method === 'PUT') return clone(options.data || {})
  if (path === '/education/course-notice/my-list') return clone(notices)
  if (path === '/education/course-group-buy/get') return { id: 9301, name: '好友同行体验团', userSize: 2, products: [{ combinationPrice: 29900 }] }
  if (path === '/education/product/list') return clone(products)
  if (path === '/product/category/list') return ['课程商品', '服务商品', '教材教具']
  if (path === '/product/spu/page') return { list: clone(products), total: products.length }
  if (path === '/product/spu/get-detail') {
    const product = products.find(item => String(item.id) === id) || products[0]
    return { ...clone(product), deliveryTypes: [2], skus: [{ id: 5200 + product.id, name: product.name, price: Number(product.price) * 100 }] }
  }
  if (path === '/member/user/get') return clone(member)
  if (path === '/member/user/update' && method === 'PUT') return clone(options.data || {})
  if (path === '/member/auth/login' || path === '/member/auth/weixin-mini-app-login') return { accessToken: 'frontend-demo-token', refreshToken: 'frontend-demo-refresh', openid: 'frontend-demo-openid', userId: member.id }
  if (path === '/member/auth/logout') return { success: true }
  if (path === '/trade/cart/get-count') return demoCart.reduce((total, item) => total + Number(item.count || 0), 0)
  if (path === '/trade/cart/list') return { validList: clone(demoCart) }
  if (path === '/trade/cart/update-count' && method === 'PUT') {
    const item = demoCart.find(row => String(row.id) === String(options.data?.id))
    if (item) item.count = Number(options.data?.count || item.count)
    return { success: true }
  }
  if (path === '/trade/cart/update-selected' && method === 'PUT') {
    const ids = (options.data?.ids || []).map(String)
    demoCart.forEach(item => { if (ids.includes(String(item.id))) item.selected = Boolean(options.data?.selected) })
    return { success: true }
  }
  if (path === '/trade/cart/delete' && method === 'DELETE') {
    const ids = String(queryValue(options.url, 'ids') || '').split(',')
    for (let index = demoCart.length - 1; index >= 0; index -= 1) if (ids.includes(String(demoCart[index].id))) demoCart.splice(index, 1)
    return { success: true }
  }
  if (path === '/trade/cart/add' && method === 'POST') return { success: true }
  if (path === '/trade/order/get-count') return { unpaidCount: 1, undeliveredCount: 1, uncommentedCount: 1, afterSaleCount: 0, allCount: orderRows.length }
  if (path === '/trade/order/page') {
    const status = options.data?.status
    const list = status === undefined ? orderRows : orderRows.filter(order => String(order.status) === String(status))
    return { list: clone(list), total: list.length }
  }
  if (path === '/trade/order/create') return { id: 9501, payOrderId: 'FRONTEND-DEMO-ORDER' }
  if (path === '/trade/order/cancel' || path === '/trade/order/receive') return { success: true }
  if (path === '/pay/order/submit') return { displayMode: 'demo', displayContent: '' }
  if (path === '/pay/order/get') return { id: 'FRONTEND-DEMO-ORDER', status: 10 }

  throw new Error(`体验版演示数据未配置：${method} ${path}`)
}
