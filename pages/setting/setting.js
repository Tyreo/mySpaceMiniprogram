import connect from "../../utils/connect"
import SERVER from "../../server/index"

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}
Page(connect(mapStateToProps)({
  data: {
    avatar: '',
    isChangeAvatar: false,
  },
  onShow() {
    if (this.data.userInfo && this.data.userInfo.data && this.data.userInfo.data.avatar) {
      this.setData({
        avatar: this.data.userInfo.data.avatar
      })
    }
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
  setUserInfo(e) {
    const info = {
      name: e.detail.value.name || ''
    }
    wx.showLoading({
      title: 'loading...',
      mask: true
    })
    if (this.data.isChangeAvatar) {
      SERVER.addAvatar({
        filePath: this.data.avatar,
        name: 'file',
      }).then(res => {
        let body = {}
        try {
          body = res && res.data && JSON.parse(res.data) || {}
        } catch (error) {
          console.log(error);
        }
        if (body && body.data && body.data.url) {
          info.avatar = body.data.url
        }
        this.saveInfo(info)
      }).catch(e => {
        wx.hideLoading()
        console.log(e)
      })
    } else {
      this.saveInfo(info)
    }
  },
  saveInfo(info) {
    SERVER.updateUserInfo(info).catch(e => {
      wx.showLoading({
        title: e,
        mask: true
      })
      console.log(e)
    }).then(() => {
      getApp().getUserInfo()
      setTimeout(() => {
        wx.showLoading({
          title: '保存成功',
          mask: true,
          duration: 1000,
        })
      }, 100)
    })
  },
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatar: avatarUrl,
      isChangeAvatar: true,
    })
  }
}))