// pages/category/index.js

import { request } from "../../request/index.js";
// import regeneratorRuntime from "../../lib/runtime/runtime"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 菜单数组
    leftMenuList:[],
    // 商品数组
    rightContentList:[],
    // 当前点击下标
    currentIdx:0,
    //
    scrollTop:0
  },
  // 接口的返回数组
  categories:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 尝试获取本地缓存数据
    const categories = wx.getStorageSync('categories');
  
    if(!categories) { // 本地数据不存在 发出请求
      this.getCategory();
    } else { // 本地数据存在 检验过期时间
      if(Date.now()-categories.time > 1000*60*5) { // 超时 重新发送请求
        this.getCategory();
      } else { // 未超时 使用本地缓存
        this.categories=categories.data;
        let leftMenuList = this.categories.map(v=>v.cat_name);
        this.setData({leftMenuList})
        let rightContentList = this.categories[0].children;
        this.setData({rightContentList})
      }
    }
  },

  // 获取分类数据
  getCategory(){
    request({
      url:"/categories"
    }).then(res => {
      this.categories = res.data.message;
      // 将数据存入本地缓存
      wx.setStorageSync('categories', {time:Date.now(), data:this.categories});

      let leftMenuList = this.categories.map(v=>v.cat_name);
      this.setData({leftMenuList})
      let rightContentList = this.categories[0].children;
      this.setData({rightContentList})
    })
  },

  // 处理点击事件 动态渲染所选类别的商品列表
  handleItemTap(e){
    const { index } = e.currentTarget.dataset; 
    let rightContentList = this.categories[index].children;
      this.setData({
        currentIdx:index,
        rightContentList,
        scrollTop:0
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