const host = 'https://hbdac.ihb.ac.cn/detectionApi/'

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
function getList(data) {
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
        QueryMode: data,
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
      url: host + '/api/flowSample/fileUploadWithInfo',
      method: 'post',
      header: {
        'Content-Type': "application/json;charset=utf-8",
        Accecpt: "application/json",
        token: app.token
      }, // 设置请求的 header
      data: {
        Title: data.Title,
       TaskId: data.TaskId,
        file: data.fileUrl,
        Place:data.Place,
        Longitude:data.Longitude,
        Latitude:data.Latitude,
         Accuracy:data.Accuracy,
         Time:data.Time
      },
      success(res) {
        resolve(res)
      }
    })
  })
}
function gatherRecordInfo(data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + '/api/flowSample/gatherRecordUpdate',
      method: 'post',
      header: {
        'Content-Type': "application/json;charset=utf-8",
        Accecpt: "application/json",
        token: app.token
      }, // 设置请求的 header
      data: {
        TaskId: data.TaskId,
        GatherStartDate:data.GatherStartDate,
        GatherEndDate:data.GatherEndDate,
        GatherDays:data.GatherDays,
        GatherInfoRecord:data.GatherInfoRecord,
        GatherStaffs:data.GatherStaffs
      },
      success(res) {
        resolve(res)
      }
    })
  })
}
function getImageList(data){
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + '/api/flowSample/fileList',
      method: 'post',
      header: {
        'Content-Type': "application/json;charset=utf-8",
        Accecpt: "application/json",
        token: app.token
      }, // 设置请求的 header
      data: {
        TaskId: data.TaskId,
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
  uploadimage,
  gatherRecordInfo,
  getImageList
}