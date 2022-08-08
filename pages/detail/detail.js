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
    GatherStartDate: '',
    GatherDays: '',
    GatherEndDate: '',
    GatherInfoRecord: '',
    GatherStaffs: '',
    showEdit: false,
    TaskId: '',
    selectseccess: false,
    selectconfim: false,
    optionseccess:false,
    optionserror:false,
    errormsg:''
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
      console.log(233, res.data)
      this.setData({
        GatherDays: res.data.data.GatherDays,
        GatherStartDate: res.data.data.GatherStartDate,
        GatherEndDate: res.data.data.GatherEndDate,
        GatherInfoRecord: res.data.data.GatherInfoRecord,
        GatherStaffs: res.data.data.GatherStaffs
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
      GatherStartDate: this.data.GatherStartDate,
      GatherDays: this.data.GatherDays,
      GatherEndDate: this.data.GatherEndDate,
      GatherInfoRecord: this.data.GatherInfoRecord,
      GatherStaffs: this.data.GatherStaffs
    }
    console.log(23, data)
    api.gatherRecordInfo(data).then((res) => {
      this.onLoad();
    })
  },
  changeGatherStartDate: function (e) {
    this.setData({
      GatherStartDate: e.detail
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
      if (res.data.flag === 0) {
        this.setData({
          optionseccess:true
        })
        res.flag === 0 && wx.navigateTo({
          url: `/pages/waitselect/waitselect`,
        })
      }else{
        console.log()
        this.setData({
          optionserror:true,
          errormsg:res.data.msg
        })
      }
    })

  }
})
