// pages/order/index.js

import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    tabs:[
      {id:0,value:"全部",isActive:true},
      {id:1,value:"待付款",isActive:false},
      {id:2,value:"待发货",isActive:false},
      {id:3,value:"退款/退货",isActive:false}
    ]
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
  onShow: function (options) {
    // 判断缓存中是否存在token 否则跳转到授权页面
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    // 获取小程序当前的页面栈数组
    let pages = getCurrentPages();
    let currentPage = pages[pages.length-1];
    const {type} = currentPage.options;
    // 激活页面选中的标题
    this.changeTitleByIndex(type-1);
    this.getOrders(type);
  },

  /**
   * 获取订单列表
   */
  async getOrders(type) {
    const res = await request({url:"/my/orders/all", data:{type}});
    this.setData({
      orders:res.data.message.orders.map(v => ({...v, create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    })
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
  // 处理点击事件(子组件传递来的) 改变点击选项的isActive属性 
  handleItemChange(e){
    // 获取点击标题的索引
    const { index } = e.detail;
    this.changeTitleByIndex(index);
    // 再次发送请求
    this.getOrders(index+1);
  },

  changeTitleByIndex(index) {
    let {tabs} = this.data;
    tabs.forEach((v,i)=> i===index? v.isActive=true:v.isActive=false);
    this.setData({tabs});
  }
})