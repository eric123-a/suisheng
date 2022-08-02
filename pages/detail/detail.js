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
    showseccess: false,
    select: false,
    GatherStarDate: '',
    GatherDays: '',
    GatherEndDate: '',
    GatherInfoRecord: '',
    GatherStaffs: '',
    showEdit: false,
    TaskId: '',
    selectseccess: false,
    selectconfim: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      TaskId: options.TaskId
    })
    if (options.select == 2) {
      this.setData({
        select: true
      })
    }

    api.getdetail({ TaskId: options.TaskId }).then((res) => {
      this.setData({
        detail: res.data.data
      })
    })
    api.getInfo({ TaskId: options.TaskId }).then((res) => {
      this.setData({
        GatherDays: res.data.GatherDays,
        GatherStarDate: res.data.GatherStarDate,
        GatherEndDate: res.data.GatherEndDate,
        GatherInfoRecord: res.data.GatherInfoRecord,
        GatherStaffs: res.data.GatherStaffs
      })
    })
    //  api.getdetail({TaskId:})
  },



  input: function () {
    this.setData({
      show: true
    })
  },
  edit: function () {
    this.setData({
      edit: true
    })
  },
  record: function () {
    let data = {
      TaskId: this.data.detail.TaskId,
      GatherStarDate: this.data.GatherStarDate,
      GatherDays: this.data.GatherDays,
      GatherEndDate: this.data.GatherEndDate,
      GatherInfoRecord: this.data.GatherInfoRecord,
      GatherStaffs: this.data.GatherStaffs
    }
    api.gatherRecordInfo(data).then((res) => {
      this.onLoad();
    })
  },
  changeGatherStarDate: function (e) {
    this.setData({
      GatherStarDate: e.detail
    })
  },
  changeGatherDays: function (e) {
    this.setData({
      GatherDays: e.detail
    })
  },
  changeGatherEndDate: function (e) {
    this.setData({
      GatherEndDate: e.detail
    })
  },
  changeGatherInfoRecord: function (e) {
    this.setData({
      GatherInfoRecord: e.detail
    })
  },
  changeGatherStaffs: function (e) {
    this.setData({
      GatherStaffs: e.detail
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

  },
  select: function () {
    api.claimSamplingTask({ TaskId: this.data.TaskId }).then(res => {
      wx.navigateTo({
        url: `/pages/waitselect/waitselect`,
      })
    })
    this.onLoad()

    //  api.claimSamplingTask({Taskid:})
  },
  selectconfim: function () {
    this.setData({
      selectconfim: true
    })
  },
  image: function () {
    wx.navigateTo({
      url: `/pages/imagePage/index?TaskId=${this.data.TaskId}`,
    })
  },
  finsh: function () {
    this.setData({
      confirmfinsh: true
    });

  },
  back: function () {
    api.endOption({ TaskId: this.data.TaskId }).then((res) => {
      res.flag === 0 && wx.navigateTo({
        url: `/pages/waitselect/waitselect`,
      })
    })

  }
})
