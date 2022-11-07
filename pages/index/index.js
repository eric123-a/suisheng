// index.js
// 获取应用实例
const app = getApp()
import api from '../../api';

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    user: '',
    password: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    show:false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    this.setData({
      user: wx.getStorageSync("strloginUser"),
      password: wx.getStorageSync("strloginpassword"),
    })
  },
  bindKeyInput(e) {
    this.setData({
      user: e.detail
    })
  },
  bindKeyInputpaw(e) {
    this.setData({
      password: e.detail
    })
  },
  login(e) {
    let data = {
      user: this.data.user,
      password: this.data.password
    }
    console.log(data);
    api.login(data).then(res => {
      wx.setStorageSync("strloginUser",this.data.user);
      wx.setStorageSync("strloginpassword",this.data.password);
      app.token = res.data.data

      this.setData({
        resultMap: res.resultMap
      })
      //   this.postUserInfo({ userInfo: this.data.userInfo, resultMap: this.data.resultMap })
      if (res.data.flag == 0) {
        wx.navigateTo({
          url: '/pages/waitselect/waitselect',
        })
      }else{
       this,this.setData({
         show:true
       })
      }
    })
  },
  getUserProfile(e) {
    var that = this
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
        wx.login({
          success(res) {
            console.log(res.code)
            if (res.code) {
              //发起网络请求
              app.globalData.code = res.code
              url: '/pages/waitselect/waitselect',
                api.login(res.code).then(res => {
                  that.setData({
                    resultMap: res.resultMap
                  })
                  that.postUserInfo({ userInfo: that.data.userInfo, resultMap: that.data.resultMap })
                  wx.navigateTo({
                    url: '/pages/waitselect/waitselect',
                  })
                })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })

      }
    })
  },
})
