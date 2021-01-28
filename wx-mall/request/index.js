let ajaxTimes = 0;

export const request=(params)=>{
  // 如果url中带有'/my/' 则自动加上token的请求头
  let header = {...params.header};
  if (params.url.includes("/my/")) {
    header["Authorization"] = wx.getStorageSync("token");
  }
  ajaxTimes++;
  // 显示提示：正在加载中
  wx.showLoading({
    title: '正在加载中',
    mask: true
  })
  // 定义公共 url
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve, reject)=>{
    wx.request({
      ...params,
      header: header,
      url: baseUrl+params.url,
      success: (result) => {resolve(result)},
      fail: (err) => {reject(err)},
      complete: () => {
        ajaxTimes--;
        if(ajaxTimes==0) wx.hideLoading();
      }
    })
  })
}