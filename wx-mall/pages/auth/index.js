// pages/auth/index.js

import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 获取用户授权
   */
  /* async */ handleGetUserInfo(e){
    // 获取用户信息
    const {encryptedData, rawData, iv, signature} = e.detail;
    // code
    // wx.login({
    //   timeout: 10000,
    //   success: (result) => {const {code} = result;}
    // })
    // 构造请求参数
    // const loginParams = {encryptedData, rawData, iv, signature, code};
    // 发送请求 获取用户token
    // const res = await request({url:"/users/wxlogin", data:loginParams, method:"post"});
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo" // 由于获取token需要企业账号 故使用示例token
    // 将token存储到缓存中 跳转回支付页面
    wx.setStorageSync('token', token);
    wx.navigateBack({
      delta: 1
    })
  }
})