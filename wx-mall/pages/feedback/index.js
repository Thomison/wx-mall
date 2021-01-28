// pages/feedback/index.js

import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:0,value:"体验问题",isActive:true},
      {id:1,value:"商品、商家投诉",isActive:false}
    ],
    imgs:[],
    text:""
  },

  // 处理点击事件(子组件传递来的) 改变点击选项的isActive属性 
  handleItemChange(e){
    const { index } = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=> i===index? v.isActive=true:v.isActive=false);
    this.setData({tabs})
  },

  // 处理用户文本框的输入
  handleTextInput(e) {
    this.setData({text:e.detail.value});
  },

  // 处理用户点击选择图片
  handleChooseImg(){
    // 调用小程序内置的选择图片的标签
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({imgs:[...this.data.imgs, ...result.tempFilePaths]}) //拼接图片
      }
    });
  },

  // 处理用户点击删除所选图片
  handleRemoveImg(e){
    const {index} = e.currentTarget.dataset;
    let {imgs} = this.data;
    imgs.splice(index, 1);
    this.setData({imgs});
  },

  // 处理用户点击提交按钮
  handleFormSubmit(){
    const {text} = this.data;
    if (!text.trim()) { // 不合法
      wx.showToast({
        title: '输入不能为空',
        duration: 1500,
        icon: 'none',
        mask: true
      });
      return;
    }

    // 上传图片 使用wx.uploadFile
    let {imgs} = this.data;
    let uploadImgs = [];
    wx.showLoading({
      title: '正在上传中',
      mask: true
    });
    if (imgs.length!==0) {
      // 上传图片
      imgs.forEach((v,i) => {
        wx.uploadFile({
          filePath: v,
          name: 'image',
          url: 'https://img.coolcr.cn/api/upload',
          formData: {},
          success: (result) => {
            console.log(result);          
            let url = JSON.parse(result.data).data.url;
            uploadImgs.push(url);
            if (i == imgs.length-1) {
              console.log("上传图片成功");
              this.setData({text:"", imgs:[]});
            }
          }
        });
      });
    }
    this.setData({text:""});
    console.log("上传文本成功")
    wx.hideLoading();
    wx.showToast({
      title: '上传成功',
      duration: 1500,
      mask: true
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