var tabItems = [
  { pagePath: 'pages/home/index', label: '首页', icon: 'home' },
  { pagePath: 'pages/course/index', label: '课程', icon: 'calendar' },
  { pagePath: 'pages/study/index', label: '学习', icon: 'school' },
  { pagePath: 'pages/mall/index', label: '商城', icon: 'cart' },
  { pagePath: 'pages/mine/index', label: '我的', icon: 'person' }
]

Component({
  data: {
    list: tabItems,
    selected: 0
  },
  lifetimes: {
    attached: function () {
      this.updateSelected()
    }
  },
  pageLifetimes: {
    show: function () {
      this.updateSelected()
    }
  },
  methods: {
    updateSelected: function () {
      var pages = getCurrentPages()
      var currentPage = pages[pages.length - 1]
      var route = currentPage && currentPage.route
      var selected = -1
      for (var index = 0; index < tabItems.length; index += 1) {
        if (tabItems[index].pagePath === route) {
          selected = index
          break
        }
      }
      if (selected >= 0) this.setData({ selected })
    },
    switchTab: function (event) {
      var item = tabItems[Number(event.currentTarget.dataset.index)]
      var pages = getCurrentPages()
      var currentPage = pages[pages.length - 1]
      if (!item || (currentPage && item.pagePath === currentPage.route)) return
      wx.switchTab({ url: '/' + item.pagePath })
    }
  }
})
