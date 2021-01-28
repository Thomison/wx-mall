
import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList:[],
    // 导航栏数组
    catitemsList:[],
    // 楼层数组
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    /* 原生请求 */
    // 发送异步请求 获取轮播图数组
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (res) => {
    //     this.setData({
    //       swiperList:res.data.message
    //     })
    //   }
    // })

    // es6的promise优化之后
    // request({
    //   url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
    // }).then(result => {
    //   this.setData({
    //     swiperList:result.data.message
    //   })
    // })
    this.getSwiperList();
    this.getCatitemsList();
    this.getFloorList();
  },

  // 获取轮播图数组
  getSwiperList(){
    request({
      url:"/home/swiperdata"
    }).then(result => {
      let swiperList = result.data.message;
      swiperList.forEach((v, i) => {
        v.navigator_url = v.navigator_url.replace('main', 'index');
      });
      this.setData({swiperList});
    })
  },

  // 获取导航栏数组
  getCatitemsList(){
    request({
      url:"/home/catitems"
    }).then(result => {
      let catitemsList = result.data.message;
      this.setData({catitemsList});
    })
  },

  // 获取楼层数组
  getFloorList(){
    request({
      url:"/home/floordata"
    }).then(result => {
      let floorList = result.data.message;
      for (let k = 0; k < floorList.length; k++) {
        floorList[k].product_list.forEach((v, i) => 
          v.navigator_url = v.navigator_url.replace('?', '/index?'));
      }
      this.setData({floorList});
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