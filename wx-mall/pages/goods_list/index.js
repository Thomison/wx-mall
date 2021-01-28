// pages/goods_list/index.js

import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:0,value:"综合",isActive:true},
      {id:1,value:"销量",isActive:false},
      {id:2,value:"价格",isActive: false}
    ],
    goodsList:[] 
  },

  // 请求接口所需的查询参数
  QueryParms:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },

  // 当前页面的总页数
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParms.cid = options.cid || "";
    this.QueryParms.query = options.query || "";
    this.getGoodsList();
  },

  // 获取商品列表数据
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.QueryParms});
    // 获取总条数
    const total = res.data.message.total;
    // 计算总页数
    this.totalPages = Math.ceil(total / this.QueryParms.pagesize);

    this.setData({
      goodsList:[...this.data.goodsList, ...res.data.message.goods]
    })

    // 关闭下拉窗口
    wx.stopPullDownRefresh();
  },

  // 处理点击事件(子组件传递来的) 改变点击选项的isActive属性 
  handleItemChange(e){
    const { index } = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=> i===index? v.isActive=true:v.isActive=false);
    this.setData({tabs})
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
    // 重置数组
    this.setData({goodsList:[]})
    // 重置页码
    this.QueryParms.pagenum = 1;
    // 重新发送请求
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.QueryParms.pagenum >= this.totalPages) { // 触底 弹出提示
      wx.showToast({
        title: '没有数据了',
      })
    } else { // 加载下一页的商品数据
      this.QueryParms.pagenum++;
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})