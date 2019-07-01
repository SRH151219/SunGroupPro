function createCookie(key, data, time) {
  // 如果name或vlue中有汉字，低版浏览器不能识别，要对其进行编码
  var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(key)


  // time的值是否为数字,如果不为数字，则不设置过期时间
  if (time === 'number') {
    var d = new Date()
    // 设置过期时间，当前日期 + time 值,单位 ms
    d.setDate(d.getDate() + time)


    cookieText += ';expires=' + d
  }
  document.cookie = cookieText
}


// 获取指定名称的cookie
function getCookie(key) {
  // 先获取所有的cookie（字符串），并将字符串转为数组
  var arr = document.cookie.split('; ')
  // 遍历数组
  for (var i = 0; i < arr.length; i++) {
    // 将数组中的每个元素进行分割，转为数组
    var list = arr[i].split('=')
    // 判断当前分割的元素的第一个值是否和key相等，如果相等呢个，则返回第二个值
    if (encodeURIComponent(key) === list[0]) {
      return decodeURIComponent(list[1])
    }
  }
}


export default {
  // 获取
  get(key) {
    // 兼容处理，判断浏览器是否支持localstroage
    if (window.localStorage) {
      let data = JSON.parse(localStorage.getItem(key))
      // 判断数据是否存在，不存在，直接退出
      if (!data) {
        return null
      }
      // 获取当前时间
      let nowtime = (new Date()).getTime()
      // 判断时间是否过期
      if (nowtime - data.ctime > data.outtime) {
        // 时间过期
        return null
      } else {
        return data.data
      }
    } else {
      // 从cookie中获取
      getCookie(key)
    }
  },
  // key：，dat:,time:过期时间，单位ms
  set(key, data, time) {
    // 以 天为单位，转为 ms
    var t = time * 24 * 60 * 60 * 1000
    if (window.localStorage) {
      // 设置过期时间
      let tmp = {
        data: data,
        // 当前时间
        ctime: (new Date()).getTime(),
        // 过期时间
        outtime: t
      }
      let tmpdata = JSON.stringify(tmp)
      localStorage.setItem(key, tmpdata)
    } else {
      // 存到cookie中
      createCookie(key, data, t)
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  }
}