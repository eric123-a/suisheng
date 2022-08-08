// pages/imagePage/index.js
import api from '../../api'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TaskId: '',
    imageList: [{ UrlPath: 'https://th.bing.com/th/id/OIP.kB-Ovasi0GW67-rmwnAcwAHaEo?pid=ImgDet&rs=1' }],
    show: false,
    Title: '',
    Place: '',
    Longitude: '',
    Latitude: '',
    Accuracy: '',
    Time: '',
    fileUrl: '',
    showImage: false,
    imageSrc: '',
    fileList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      TaskId: options.TaskId
    }),
      api.getImageList({ TaskId: options.TaskId }).then((res) => {
        console.log(res.data.data)
        this.setData({
          imageList: res.data.data
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  uploadImage() {

    api.uploadimage({
      Title: this.data.Title,
      TaskId: this.data.TaskId,
      file: this.data.fileUrl,
      Place: this.data.Place,
      Longitude: this.data.Longitude,
      Latitude: this.data.Latitude,
      Accuracy: this.data.Accuracy,
      Time: this.data.Time
    }).then(res => {
      this.setData({
        showseccess: true
      })
      api.getImageList({ TaskId: this.data.TaskId }).then((res) => {
        console.log(res.data.data)
        this.setData({
          imageList: res.data.data
        })
      })
    })

  },
  showdialog: function () {
    console.log(234)
    this.setData({
      show: true
    })
  },
  onChangeTitle: function (event) {
    console.log(event)
    this.setData({
      Title: event.detail
    })
  },
  onChangePlace: function (event) {
    this.setData({
      Place: event.detail
    })
  },
  onChangeLongitude: function (event) {
    this.setData({
      Longitude: event.detail
    })
  },
  onChangeLatitude: function (event) {
    this.setData({
      Latitude: event.detail
    })
  },
  onChangeAccuracy: function (event) {
    this.setData({
      Accuracy: event.detail
    })
  },
  onChangeTime: function (event) {
    this.setData({
      Time: event.detail
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
  uploadFile(uploadFile) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: 'https://hbdac.ihb.ac.cn/detectionApi/api/flowSample/fileUploadWithInfo', // 上传的服务器接口地址
        filePath: this.data.fileUrl,
        Title: this.data.Title,
        TaskId: this.data.TaskId,
        file: this.data.fileUrl,
        Place: this.data.Place,
        Longitude: this.data.Longitude,
        Latitude: this.data.Latitude,
        Accuracy: this.data.Accuracy,
        Time: this.data.Time,
        success: (res) => {
          // 上传完成操作
          const data = JSON.parse(res.data)
          const url = data.data.url
          resolve({
            url: url
          })
        },
        fail: (err) => {
          //上传失败：修改pedding为reject
          reject(err)
        }
      });
    })
  },
  deleteClick(event) {
    var imgData = this.data.fileList;
    // 通过splice方法删除图片
    imgData.splice(event.detail.index, 1);
    // 更新图片数组
    this.setData({
        fileList: imgData
    })
},
  afterRead(event) {
     
    wx.showLoading({
      title: '上传中...'
    })
    const { file } = event.detail;//获取图片详细信息
    let that = this;//防止this指向问题
    // 设置请求头，根据项目需求变换
    let Authorization = wx.getStorageSync('key')
    let headers = {
      Accecpt: "application/json",
      "content-type": "multipart/form-data",
      token: app.token
    }
    let data = {
      Title: this.data.Title,
      TaskId: this.data.TaskId,
      file: this.data.fileUrl,
      Place: this.data.Place,
      Longitude: this.data.Longitude,
      Latitude: this.data.Latitude,
      Accuracy: this.data.Accuracy,
      Time: this.data.Time,
    }
    if (Authorization) {
      headers.Authorization = 'Bearer ' + Authorization
  }
  wx.uploadFile({
    url: "https://hbdac.ihb.ac.cn/detectionApi/api/flowSample/fileUploadWithInfo",
    method: 'POST',
    header: headers,
    filePath: file.url,
    formData: data,
    name: 'image',
    // 成功回调
    success(res) {
        // JSON.parse()方法是将JSON格式字符串转换为js对象
        var result = JSON.parse(res.data);
        // 上传完成需要更新 fileList
        const {fileList = []} = that.data;
        // 将图片信息添加到fileList数字中
        fileList.push({
            ...file,
            url: result.data
        });
        // 更新存放图片的数组
        that.setData({
            fileList
        });
        wx.hideLoading();//停止loading
    },
})
  },
  clickImage(event){
    console.log(event.currentTarget.dataset.src)
    this.setData({
      showImage:true,
      imagesrc:event.currentTarget.dataset.src
    })
  }
})