function api(methods, url, data, callback) {
  wx.request({
    url: url,
    method: methods,
    data: data,
    dataType: 'json',
    success: (res) => {
      typeof callback == "function" && callback(res, "");
    },
    fail: (res) => {
      console.log('请求数据失败')
      console.log(err)
      typeof callback == "function" && callback(err, "");
    }
  });
}

export function getSystem(url, data, callback) {
  api('POST', url, data, callback)
}