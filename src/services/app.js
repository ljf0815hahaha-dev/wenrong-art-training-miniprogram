const photos = {
  avatar: '/static/icons/person.png',
  hero: '/static/icons/school.png',
  deal: '/static/icons/gift.png',
  lab: '/static/icons/settings.png',
  course: '/static/icons/book.png',
  book: '/static/icons/book.png',
  product: '/static/icons/bag.png'
}
const wait = (data) => Promise.resolve(JSON.parse(JSON.stringify(data)))
const homeData = { photos, deals: [{ title:'暑期英语思维训练', sub:'少儿进阶 / 口语拓展', price:'699', old:'1299', tag:'3人成团', image:photos.deal }, { title:'名师编程思维体验课', sub:'动手造火箭 / 启蒙逻辑', price:'免费', old:'299', tag:'0元抢先', image:photos.lab }], recommendations: [{ title:'趣味几何与逻辑能力冲刺', teacher:'张老师 · 10年一线教龄', price:'880', lessons:'12', learned:'1,248', image:photos.course }, { title:'大语文经典名篇精读与表达', teacher:'刘老师 · 北大中文系硕士', price:'960', lessons:'16', learned:'892', image:photos.book }], goods: [{ title:'3D几何思维空间积木盒', price:'79', sold:'已售600+', image:photos.product }, { title:'少儿万物科学百科全书', price:'128', sold:'已售1.2k', image:photos.book }, { title:'全光谱护眼智能伴学台灯', price:'299', sold:'已售320', image:photos.product }] }
export const getHomeDataSync = () => JSON.parse(JSON.stringify(homeData))
export const getHomeData = () => wait(homeData)
export const getCourseData = () => wait({ categories:['全部科目','幼小衔接','少儿思维','趣味英语','编程机器人','艺术素养'], days:[['周一','14'],['周二','15'],['周三','16'],['周四','17'],['周五','18'],['周六','19'],['周日','20']], courses:[{ title:'思维拔高强化系统课（春季班）', image:photos.course, progress:25, tag:'春季系统课' },{ title:'全能自然拼读启蒙课（录播精编）', image:photos.hero, progress:0, tag:'随时随地学' },{ title:'少儿图形化编程 Scratch 从入门到精通', image:photos.lab, progress:0, tag:'硬核热销' }] })
export const getStudyData = () => wait({ name:'陈安琪', code:'STU-20240982', className:'启明星少儿思维二班', teacher:'王心怡老师', attendance:'48', rate:'98.2%', hours:'72.5', medal:'15', photos })
export const getMallData = () => wait({ categories:['热卖推荐','官方教材','实验教具盒','文具文创','智能硬件'], products:[{title:'官方配套少儿奥数思维训练教材全套 (附习题+视频)',price:'128',old:'168',sold:'2,140',tag:'自营　包邮',image:photos.book},{title:'STEAM趣味科学实验宝盒豪华版 (含24个启蒙小课题)',price:'299',old:'359',sold:'850',tag:'积分抵¥30',image:photos.lab},{title:'智能点读笔 + 培优双语早教故事绘本 20册特惠装',price:'259',old:'499',sold:'520',tag:'限时拼团',image:photos.product},{title:'一对一课时充值尊享卡 (10课时名师面授/线上)',price:'2,600',old:'',sold:'',tag:'课时礼遇',image:photos.course}] })
export const getProfileData = () => wait({ name:'晨曦妈妈', member:'学员家长', vip:'VIP 银牌会员', code:'ZX-2024098', courses:'3', points:'2,450', coupons:'4', orders:'6' })
const routeActions = {
  '订单': '/pages/order/index',
  '全部订单': '/pages/order/index',
  '待付款': '/pages/order/index',
  '待核销/发货': '/pages/order/index',
  '已完成': '/pages/order/index',
  '退款/售后': '/pages/order/index',
  '购物车': '/pages/cart/index',
  '查看课程': '/pages/course/index',
  '编辑资料': '/pages/profile/index',
  '学员档案': '/pages/profile/index',
  '上课日程提醒': '/pages/notice/index',
  '专属商城': '/pages/mall/index',
  '校区查询与环境导览': '/pages/course/index'
}
export const action = (name) => {
  const url = routeActions[name]
  if (url) {
    if (['/pages/course/index', '/pages/mall/index'].some(path => url.includes(path))) return uni.switchTab({ url })
    return uni.navigateTo({ url })
  }
  uni.showToast({ title: `${name}功能待配置`, icon: 'none' })
  return Promise.resolve()
}
