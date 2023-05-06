import SERVER from "../../server/index"
Page({
  data: {
    pics: [],
    hidden: true,
    fm: SERVER.FM,
    modalShow: false,
    showEdit: false,
    curAlbum: null,
    newAlbumName: ''
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
  },
  modalShow: function (e) {
    wx.vibrateShort();

    this.setData({
      modalShow: true,
      curAlbum: e.currentTarget.dataset.id
    });
  },
  modalClose() {
    this.setData({
      modalShow: false,
    });
  },
  editName(e) {
    this.setData({
      newAlbumName: e.detail.value.trim()
    })
  },
  saveName() {
    if (!this.data.newAlbumName) return
    SERVER.editAlbum(this.data.curAlbum, {
      name: this.data.newAlbumName
    }).then((res) => {
      this.getPics()
      this.closeEditAlbum()
    }).catch((error) => {
      console.log(error);
    })
  },
  showEditAlbum() {
    this.setData({
      showEdit: true,
      modalShow: false
    })
  },
  closeEditAlbum() {
    this.setData({
      showEdit: false,
      curAlbum: null,
      newAlbumName: ''
    })
  },
  deleteAlbum() {
    this.modalClose()
    wx.showModal({
      title: '删除',
      content: '确定要删除该相册吗？',
      complete: (res) => {
        if (res.cancel) {
          console.log('cancel delete');
        }
        if (res.confirm) {
          SERVER.deleteAlbum(this.data.curAlbum).then((res) => {
            this.getPics()
          }).catch((error) => {
            console.log(error);
          })
        }
      }
    })
  }
})