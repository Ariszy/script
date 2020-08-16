/*
此文件为Node.js专用。其他用户请忽略
第7行代码处填写第一个京东账号ck
第9行代码处填写第二个京东账号ck
 */
//此处单引号里面填写京东账号一cookie
let CookieJD = '';

//此处单引号里面填写京东账号二cookie
let CookieJD2 = '';

// 判断github action里面是否有京东ck
if (process.env.JD_COOKIE && process.env.JD_COOKIE.split('&') && process.env.JD_COOKIE.split('&').length > 0) {
  const temp = process.env.JD_COOKIE.split('&');
  CookieJD = temp[0];
  CookieJD2 = temp[1];
}
exports.CookieJD = CookieJD;
exports.CookieJD2 = CookieJD2;