const api = require("../../api");

// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kind: 1,
    show: false,
    fileList: [],
    Title: '',
    detail: {},
    fileUrl: '',
    showseccess: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.getdetail({ TaskId: options.TaskId }).then((res) => {
      this.setData({
        detail: res.data.data
      })
    })
    //  api.getdetail({TaskId:})
  },



  input: function () {
    this.setData({
      show: true
    })
  },
  onChange: function (event) {

    this.setData({
      Title: event.detail
    })
  },
  uploader(event) {
    console.log(999, event.detail)
    const { file } = event.detail;
    this.data.fileList.push({ url: file.url })
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    this.setData({
      fileUrl: file.url,
      fileList: this.data.fileList
    })
  },
  uploadImage() {
  
      api.uploadimage({ Title: this.data.Title, TaskId: this.data.detail.TaskId, file: this.data.fileUrl }).then(res => {
        this.setData({
          showseccess: true
        })
      })
    
  }
})