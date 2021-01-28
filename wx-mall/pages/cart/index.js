Page({

  /**
   * 页面的初始数据
   */
  data: {
    addr:{},
    cart:{},
    allChecked:false,
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
    const cart = wx.getStorageSync('cart')||[];
    this.setData({addr})
    // 更新购物车状态
    this.setCart(cart);
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
   * 用户获取收货地址
   */
  handleChooseAddr(){
    wx.chooseAddress({
      success: (res) => {
        wx.setStorageSync("addr", res);
      }
    })
  },

  /**
   * 处理用户选中单个商品事件
   */
  handleItemChange(e){
    const goods_id = e.currentTarget.dataset.id;
    let { cart } = this.data;
    // 通过商品id找到数组下标
    let index = cart.findIndex(v => v.goods_id===goods_id);
    // 反选
    cart[index].checked = !cart[index].checked; 
    // 更新购物车状态
    this.setCart(cart);
  },

  /**
   * 处理用户编辑商品数量
   */
  setItemNum(e){
    const {id, operation} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(v => v.goods_id===id);
    // 如果商品数量为1 并且 执行减一操作 则弹出删除提示框
    if (cart[index].num===1 && operation === -1) {
      wx.showModal({
        content: '您是否删除该商品？',
        title: '提示',
        success: (result) => {
          if(result.confirm) {
            cart.splice(index, 1); // 删除商品
            this.setCart(cart); // 更新购物车
          } 
        }
      })
    } else {
      cart[index].num += operation; // 修改商品数量
      this.setCart(cart); // 更新购物车
    }
  },

  /**
   * 处理用户全选或反选购物车所有商品事件
   */
  handleAllItemChange(e){
    let {allChecked, cart} = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked=allChecked);
    console.log(allChecked);
    this.setCart(cart);
  },

  /**
   * 重新设置购物车状态 如选中、数量、价格
   */
  setCart(cart){
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    allChecked = cart.length? allChecked:false;
    this.setData({allChecked, totalPrice, totalNum, cart})
    wx.setStorageSync('cart', cart);
  },

  /**
   * 处理用户点击结算的事件
   */
  handlePay(){
    // 判断是否存在收货地址
    const {addr, totalNum} = this.data;
    if (!addr.userName) { // 不存在收货地址 => 提示用户添加收货地址
      wx.showToast({
        title: '您还没有选择收货地址',
        icon: 'none',
        mask: true,
      })
      return; 
    }
    // 判断是否选中商品
    if (totalNum===0) {
      wx.showToast({
        title: '您还没有选购商品',
        icon: 'none',
        mask: true,
      })
      return; 
    }
    // 跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    })
  }
})