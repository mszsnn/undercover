//index.js
//获取应用实例
const app = getApp()

Page({
  //开始游戏
  beginGame(){
    wx.navigateTo({
      url: '/pages/main/main'
    })
  }
})
