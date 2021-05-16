/*!
 * utils公共方法
 */

/*!
 * h5复制方法
 * text: 需要复制的文本
 * callback: 回调函数 返回布尔值 表明是否复制成功
 */
function execCommandCopy(text: string, callback:Function) {
    var input = document.createElement("input");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "absolute";
    input.style.left = "-9999px";
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, input.value.length);
    let bool = document.execCommand("Copy");
    document.body.removeChild(input);
    callback(bool);
  }
  
  /**
   * 是否支持webp
   */
  function checkWebpSupport() {
    var canvas = document.createElement('canvas');
    if ((canvas.getContext && canvas.getContext("2d"))) {
      return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
    }
    return false;
  }
  
  /**
   * 图片尺寸重置
   */
  function resizeImage(url:string, width:number, height:number) {
    if (checkWebpSupport()) {
      if (!/\.40017\.cn/gi.test(url)) {
        return url;
      } else if (/_(\d*)x(\d*)_(00|01|02)/gi.test(url)) {
        return url + ".webp";
      } else {
        return url.replace(/\.(jpg|png)$/i, "_" + width + "x" + height + "_00.$1.webp");
      }
    } else {
      if (!/\.40017\.cn/gi.test(url) || /_(\d*)x(\d*)_(00|01|02)/gi.test(url)) {
        return url;
      } else {
        return url.replace(/\.(jpg|png)$/i, "_" + width + "x" + height + "_00.$1");
      }
    }
  }
  
  /**
   * null => ''
   * @param {*} data 要处理的数据
   */
 
  function null2str(data) {
    for (let x in data) {
      if (data[x] === null) { // 如果是null 把直接内容转为 ''
        data[x] = '';
      } else {
        if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
          data[x] = data[x].map(z => {
            return null2str(z);
          });
        }
        if (typeof (data[x]) === 'object') { // 是json 递归继续处理
          data[x] = null2str(data[x])
        }
      }
    }
    return data;
  }
  
  // 判断安卓
  function isAndroid() {
    let u = navigator.userAgent;
    let android = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    return android
  }
  
  // 判断设备为 ios
  function isIos() {
    let u = navigator.userAgent;
    let iOs = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端\
    return iOs;
  }
  
  // 设置cookie
  function setCookie(c_name:string, value:any, expire: number) {
    var date = new Date()
    date.setSeconds(date.getSeconds() + expire)
    document.cookie = c_name + "=" + escape(value) + "; expires=" + date.toUTCString()
  }
  // 获取cookie
  function getCookie(c_name: string) {
    if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(c_name + "=")
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1
        let c_end = document.cookie.indexOf(";", c_start)
        if (c_end == -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ""
  }
  
  export default {
    execCommandCopy,
    resizeImage,
    null2str,
    isAndroid,
    isIos,
    setCookie,
    getCookie
  };