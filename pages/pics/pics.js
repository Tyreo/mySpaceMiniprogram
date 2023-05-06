import SERVER from "../../server/index"
Page({
  data: {
    pics: [],
    hidden: true,
    fm: SERVER.FM
  },
  onShow() {
    this.getPics()
  },
  /**
   * 生命周期函数--分享
   */
  onShareAppMessage() {
    return {
      title: 'Syreo Space',
      path: '/pages/self/self',
      imageUrl: 'https://static.syreo.cn/92940e3d-6a63-4042-a517-9c658a4b7b56.png'
    };
  },
  getPics() {

    wx.showLoading({
      title: 'loading...',
      mask: true
    })

    SERVER.getPics().then(res => {
      this.setData({
        pics: res.data.data
      })
      wx.hideLoading()
    }).catch(e => {
      wx.hideLoading()
      console.log(e)
    })
  },
  create() {
    this.setData({
      hidden: false
    })
  },
  onAddPics(e) {
    wx.showLoading({
      title: '提交中...',
      mask: true
    })
    SERVER.addPics(e.detail.name).then(res => {
      if (res.data.status == 0) this.getPics()
    }).finally(() => {
      wx.hideLoading()
      this.setData({
        hidden: true
      })
    })
  },
  onGoBack() {
    wx.hideLoading()
    this.setData({
      hidden: true
    })
  },
  toDetail(evt) {
    let {
      id,
      name
    } = evt.currentTarget.dataset
    wx.navigateTo({
      url: `../pic/pic?id=${id}&name=${name}`
    })
  }
})