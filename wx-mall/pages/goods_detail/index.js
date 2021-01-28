// pages/goods_detail/index.js

/**
 * 1.发送请求获取数据
 * 2.点击轮播图 获取大图 
 * 3.点击加入购物车
 * 4.商品收藏
 */

import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isCollect:false
  },
  GoodsObj:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsDetail(options.goods_id);
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
    let pages = getCurrentPages();
    let curPage = pages[pages.length-1];
    let opt = curPage.options;
    const {goods_id} = opt;
    this.getGoodsDetail(goods_id);
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
   * 获取商品详情数据
   */
  async getGoodsDetail(goods_id){
    const res = await request({url:"/goods/detail", data:{goods_id}});
    this.GoodsObj = res.data.message;
    // 获取缓存中商品收藏数组
    let collect = wx.getStorageSync('collect') || [];
    // 判断当前商品是否被收藏 
    let isCollect = collect.some(v => v.goods_id===this.GoodsObj.goods_id);
    // 优化 只在 Data 中放置模板中需要使用到的数据 提高速度
    this.setData({
      goodsObj:{
        goods_name:res.data.message.goods_name,
        goods_price:res.data.message.goods_price,
        // iphone 部分机型不适配webp 全局替换成 jpg
        goods_introduce:res.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics:res.data.message.pics
      },
      isCollect
    })
  },

  /**
   * 处理预览图片事件
   */
  handlePreviewImage(e){
    const urls = this.GoodsObj.pics.map(v => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    })
  },

  /**
   * 处理加入购物车事件
   */
  handleCartAdd(){
    console.log(this.GoodsObj);

    // 获取缓存中的购物车商品数组
    let cart = wx.getStorageSync('cart') || [];
    // 判断当前商品是否在购物车中 并得到其在购物车数组中的下标
    let index = cart.findIndex(v => v.goods_id===this.GoodsObj.goods_id);
    if (index === -1)  { // 不存在购物车中
      // 加入购物车
      this.GoodsObj.num = 1;
      this.GoodsObj.checked = true;
      cart.push(this.GoodsObj);
    } else {  // 存在购物车中
      // 购物车中数量加一
      cart[index].num++;
    }
    // 重置缓存中的购物车数组
    wx.setStorageSync('cart', cart); // 参数:键值对
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    })
  },

  /**
   * 处理收藏商品事件
   */
  handleCollect(){
    let isCollect = false;
    let collect = wx.getStorageSync("collect") || [];
    let index = collect.findIndex(v => v.goods_id===this.GoodsObj.goods_id);
    if (index !== -1) { // 从收藏中删除
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        duration: 1500,
        mask: true,
      })
    } else { // 添加到收藏中
      collect.push(this.GoodsObj);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        duration: 1500,
        mask: true,
      })
    }
    wx.setStorageSync("collect", collect); // 添加到缓存
    this.setData({isCollect});
  }
})