// pages/search/index.js

import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    // 取消按钮是否显示
    isFocus:false,
    // 输入框的值
    inputValue:""
  },
  TimeId:-1, // 定时器

  /**
   * 处理用户输入事件
   */
  handleInput(e) {
    // 获取输入框的关键字
    const { value } = e.detail;
    // 检验合法性
    if (!value.trim()) {
      this.setData({
        goods:[],isFocus:false
      });
      clearTimeout(this.TimeId);
      return;
    }
    // 显示 取消 按钮
    this.setData({isFocus:true});
    // 发送请求获取搜索结果 /goods/qsearch?query= 加入防抖功能（定时器实现）
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000);
  },

  /**
   * 发送搜索请求
   */
  async qsearch(query) {
    const res = await request({url:"/goods/qsearch", data:{query}});
    this.setData({goods:res.data.message});
  },

  /**
   * 处理用户点击取消按钮的事件
   */
  handleCancel() {
    this.setData({
      inputValue:"",
      isFocus:false,
      goods:[]
    })
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

  }
})

/**
 * 防抖：一般用于输入框 防止重复输入、重复发送请求
 * 节流：一般用于页面的上拉下拉
 */