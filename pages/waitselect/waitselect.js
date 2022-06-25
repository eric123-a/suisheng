// pages/waitselect/waitselect.js
import api from '../../api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record: [
      {
        id: '111123',
        name: '名称'
      }, {
        id: '111123',
        name: '名称'
      }
    ],
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.getList().then((res) => {
      this.setData({
        record: res.data.data.datalist
      })
      for (let item of this.data.record) {
        item.check = false
      }
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


  select: function () {
    this.data.record.map((item) => {
      if (item.check) {
        api.claimSamplingTask({ TaskId: item.TaskId }).then(res=>{
          this.setData({
            show:true
          })
        })
        this.onLoad()
      }
    })
    //  api.claimSamplingTask({Taskid:})
  },
  checktotal: function () {
    for (let item of this.data.record) {
      item.check = true
    }
    this.setData({
      record: this.data.record
    })
  },
  change: function (e) {
    let select = this.data.record.map((item) => {
      if (item.TaskCode == e.currentTarget.dataset.item.TaskCode) {
        item.check = !item.check
        return item
      }
      return item
    })
    this.setData({
      record: select
    })
  },
  detail: function (e) {
    wx.navigateTo({
      url: `/pages/detail/detail?TaskId=${e.currentTarget.dataset.item.TaskId}`,
    })
  }
})