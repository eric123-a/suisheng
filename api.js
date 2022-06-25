const host = 'https://58.48.189.211/detectionApi'

var app = getApp()

function login(data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + '/api/Account/Login',
      method: 'post',
      header: {
        // 'Content-Type': "application/json;charset=utf-8",
        // 'cookie': wx.getStorageSync("sessionid"),
        user: data.user,
        password: data.password
      }, // 设置请求的 header
      success(res) {
        resolve(res)
      }
    })
  })

}
function getList() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + '/api/task/list',
      method: 'post',
      header: {
        'Content-Type': "application/json;charset=utf-8",
        Accecpt: "application/json",
        token: app.token
      }, // 设置请求的 header
      data: {
        StatusCode: 'S020',
        QueryMode: 'current',
        pageno: 1,
        pagesize: 100
      },
      success(res) {
        resolve(res)
      }
    })
  })
}
function getdetail(data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + '/api/task/info',
      method: 'post',
      header: {
        'Content-Type': "application/json;charset=utf-8",
        Accecpt: "application/json",
        token: app.token
      }, // 设置请求的 header
      data: {
        TaskId: data.TaskId
      },
      success(res) {
        resolve(res)
      }
    })
  })
}
function claimSamplingTask(data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + '/api/task/claim',
      method: 'post',
      header: {
        'Content-Type': "application/json;charset=utf-8",
        Accecpt: "application/json",
        token: app.token
      }, // 设置请求的 header
      data: {
        TaskId: data.TaskId
      },
      success(res) {
        resolve(res)
      }
    })
  })
}
function uploadimage(data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + '/api/flowSample/fileUploadWithTitle',
      method: 'post',
      header: {
        'Content-Type': "application/json;charset=utf-8",
        Accecpt: "application/json",
        token: app.token
      }, // 设置请求的 header
      data: {
        TaskId: data.TaskId,
        file: data.url,
        Title: data.Title,
      },
      success(res) {
        resolve(res)
      }
    })
  })
}
module.exports = {
  login,
  getList,
  getdetail,
  claimSamplingTask,
  uploadimage
}