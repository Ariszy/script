// qx 及 loon 可用。
// 半自动提醒支付宝蚂蚁庄园喂食。
// 15 */4 * * * AlipayManor.js
// 自用 Modified from zZPiglet

const $ = new cmp();
const manor = "alipays://platformapi/startapp?appId=66666674"

$.notify("支付宝", "", "蚂蚁庄园喂食啦", manor)

$done()

function cmp() {
  _isQuanX = typeof $task != "undefined"
  _isLoon = typeof $loon != "undefined"
  this.notify = (title, subtitle, message, url) => {
    if (_isLoon) $notification.post(title, subtitle, message, url)
    if (_isQuanX) $notify(title, subtitle, message, {"open-url" : url})
  }
}