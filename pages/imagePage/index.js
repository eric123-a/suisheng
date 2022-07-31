// pages/imagePage/index.js
import api from '../../api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      TaskId:'',
      imageList:[ {UrlPath:'https://th.bing.com/th/id/OIP.kB-Ovasi0GW67-rmwnAcwAHaEo?pid=ImgDet&rs=1'}],
      show:false,
      Title:'',
      Place:'',
      Longitude:'',
      Latitude:'',
      Accuracy:'',
      Time:'',
      fileUrl:'',
      showImage:false,
      imageSrc:'',
      fileList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
      this.setData({
        TaskId:options.TaskId
      }),
     api.getImageList({TaskId:options.TaskId}).then((res) => {
       console.log(res.data.data)
           this.setData({
             imageList:res.data
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
        Place:this.data.Place,
        Longitude:this.data.Longitude,
        Latitude:this.data.Latitude,
         Accuracy:this.data.Accuracy,
         Time:this.data.Time
      }).then(res => {
      this.setData({
        showseccess: true
      })
      this.onLoad()
    })

  },
  showdialog: function(){
    console.log(234)
    this.setData({
      show:true
    })
  },
  onChangeTitle: function (event) {
   console.log(event)
    this.setData({
      Title: event.detail
    })
  },
  onChangePlace:function(event){
    this.setData({
      Place:event.detail
    })
  },
  onChangeLongitude:function(event){
    this.setData({
      Longitude:event.detail
    })
  },
  onChangeLatitude:function(event){
    this.setData({
      Latitude:event.detail
    })
  },
  onChangeAccuracy:function(event){
    this.setData({
      Accuracy:event.detail
    })
  },
  onChangeTime:function(event){
    this.setData({
      Time:event.detail
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
})