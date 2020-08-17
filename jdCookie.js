/*
此文件为Node.js专用。其他用户请忽略
 */
//此处单引号里面填写京东账号一cookie
let CookieJD = '';

//此处单引号里面填写京东账号二cookie
let CookieJD2 = '';

// 判断github action里面是否有京东ck
if (process.env.JD_COOKIE && process.env.JD_COOKIE.split('&') && process.env.JD_COOKIE.split('&').length > 0) {
  const temp = process.env.JD_COOKIE.split('&');
  for (let i = 0; i < temp.length; i++) {
    const index = (i + 1 === 1) ? '' : (i + 1);
    exports['CookieJD' + index] = temp[i];
  }
} else {
  exports.CookieJD = CookieJD;
  exports.CookieJD2 = CookieJD2;
}