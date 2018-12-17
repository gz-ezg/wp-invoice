function fail(err){
  console.log(err)
}

function complete(res){
  console.log(res)
}

let header = {
  'content-type': 'application/json' // 默认值
}
// 'content-type':'application/x-www-form-urlencoded'

let encCode

let proUrl = "https://cloud.zgcfo.com/api/"
let devUrl = "http://cloud.yrl.fun/api/"

//  处理未登录事件
function un_login(){
  // 重定向到首页？？？
  // wx.navigateTo({
  //     url: 'pages/index'
  // })
  // 未登录重新获取登录状态
  wx.login({
      success (res) {
          if (res.code) {
              console.log(res.code)
              //发起网络请求
              wx.request({
                  url: 'http://cloud.yrl.fun/api/user/weChatApplet/getWXEncKey',
                  // url: 'https://cloud.zgcfo.com/api/user/weChatApplet/getWXEncKey',
                  data: {
                      code: res.code
                  },
                  success: function (res){
                    wx.setStorage({
                      key: "encCode",
                      data: res.data.data,
                      success: function (res){
                        wx.hideToast()
                      }
                    })
                  }
              })
          } else {
              console.log('登录失败！' + res.errMsg)
          }
      },
      fail (err){
      }
  })
}

export function GET(url, data, success, fail=fail, complete=complete, header=header){
  let baseUrl = devUrl + url

  //  混入校验值
  let config
  console.log(encCode)
  if(!encCode){
    console.log("123")
    // encCode = app.globalData.encCode
    // config = Object.assign({encKey: res.data}, data)
    // myGet()
    wx.getStorage({
      key: "encCode",
      success: function(res){
        encCode = res.data
        config = Object.assign({encKey: res.data}, data)
        console.log(config)
        myGet()
      },
      fail:function (err){
        un_login()
      }
    })
  }else{
    config = Object.assign({encKey: encCode}, data)
    myGet()
    console.log(config)
  }

  function successObj(res){
      if(res.data.msgCode == 50003){
          wx.showToast({
            title: "授权失败，请刷新重试！"
          })
          un_login()
          return false
      }

      if(res.data.msgCode == 40000){
          success(res)
      }else{
          fail(res)
      }
  }

  function myGet(){
    wx.request({
      url: baseUrl,
      method: 'GET',
      header: header,
      data: config,
      success: successObj,
      fail: fail,
      complete: complete
    })
  }
}

export function POST(url, data, success, fail=fail, complete=complete, header=header){
  let baseUrl = devUrl + url
  //  混入校验值
  let config
  if(!encCode){
    // encCode = app.globalData.encCode
    // config = Object.assign({encCode: res.data}, data)
    // myPost()
    wx.getStorage({
      key: "encCode",
      success: function (res){
        console.log(res)
        encCode = res.data
        console.log(res.data)
        config = Object.assign({encKey: res.data}, data)
        console.log(config)
        myPost()
      },
      fail:function (err){
        un_login()
      }
    })
  }else{
    config = Object.assign({encKey: encCode}, data)
    myPost()
  }
  function successObj(res){
      if(res.data.msgCode == 50003){
          un_login()
          return false
      }

      if(res.data.msgCode == 40000){
          success(res)
      }else{
          fail(res)
      }
  }
  function myPost(){
    wx.request({
      url: baseUrl,
      method: 'POST',
      header: header,
      data: config,
      success: successObj,
      fail: fail,
      complete: complete
    })
  }
}
