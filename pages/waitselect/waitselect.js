// pages/waitselect/waitselect.js
import api from '../../api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select:'未认领',
    record: [
      {
        id: '111123',
        ProjectName: '名称'
      }, {
        id: '111123',
        name: '名称'
      }
    ],
    unrecord:[],
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.getList({mode:'current',code:'S025'}).then((res) => {
      this.setData({
        select:'已认领',
        record: res.data.data.datalist
      })
      for (let item of this.data.record) {
        item.check = false
      }
    })
    api.getList({mode:'current',code:'S020'}).then((res) => {xx
      this.setData({
        unrecord: res.data.data.datalist
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
       this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */

  changeselect:function(){
     if(this.data.select=='未认领'){
       api.getList({mode:'current',code:'S025'}).then((res) => {
        this.setData({
          select:'已认领',
          record: res.data.data.datalist
        })
        for (let item of this.data.record) {
          item.check = false
        }
      })
     }else{
      api.getList({mode:'current',code:'S020'}).then((res) => {
        this.setData({
          select:'未认领',
          record: res.data.data.datalist
        })
        for (let item of this.data.record) {
          item.check = false
        }
      })
     }
  },
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
  undetail: function (e) {
    wx.navigateTo({
      url: `/pages/detail/detail?TaskId=${e.currentTarget.dataset.item.TaskId}&select=1`,
    })
  },
  detail: function (e) {
    wx.navigateTo({
      url: `/pages/detail/detail?TaskId=${e.currentTarget.dataset.item.TaskId}&select=2`,
    })
  }
})