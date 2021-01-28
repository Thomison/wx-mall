
import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addr:{},
    cart:{},
    totalPrice:0,
    totalNum:0
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
    // 获取缓存中的收货地址信息
    const addr = wx.getStorageSync('addr');
    // 获取缓存中的购物车商品数组
    let cart = wx.getStorageSync('cart')||[];
    // 过滤购物车商品数组 只保留checked属性为true的商品
    cart = cart.filter(v => v.checked);
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
       totalNum += v.num;
    });
    this.setData({addr, totalPrice, totalNum, cart})
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
   * 处理用户点击支付的事件
   */
  async handleOrderPay() {
    try {
      // 尝试从缓存中获取 用户token
      const token = wx.getStorageSync('token');
      if (!token) { // token不存在 跳转到授权页面
        wx.navigateTo({
          url: '/pages/auth/index'
        })
      }
      // 创建订单 
      // 请求头参数
      // const header = {Authorization: token};
      // 请求体参数
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.addr.provinceName + 
                              this.data.addr.cityName + 
                              this.data.addr.countyName + 
                              this.data.addr.detailInfo;
      const {cart} = this.data;
      let goods = [];
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }));
      const params = {order_price, consignee_addr, goods};
      // 发送请求 创建订单 获取订单编号
      const res = await request({url:"/my/orders/create", data:params, method:"POST"});
      const {order_number} = res.data.message;
      // 发送请求 预支付
      const res2 = await request({url:"/my/orders/req_unifiedorder", data:{order_number}, method:"POST"});
      const {pay} = res2.data.message;
      // 发起微信支付 报错："requestPayment:fail no permission" 没有权限 可能是appid和token不是同一个用户
      // wx.requestPayment(pay);
      // 查询后台 订单支付状态
      const res3 = await request({url:"/my/orders/chkOrder", data:{order_number}, method:"POST"});
      // 显示支付成功的提示框
      wx.showToast({
        title: '支付成功'
      })
      // 手动删除缓存中已经支付的商品
      let newCart = wx.getStorageSync('cart');
      newCart = newCart.filter(v => !v.checked);
      wx.setStorageSync('cart', newCart);
      // 支付成功 跳转到订单页面
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/order/index',
          icon: 'success',
          duration: 1500
        }) 
      }, 1500)
    } catch (error) {
      wx.showToast({
        title: '支付失败'
      })
      console.log(error);
    }
  }
})