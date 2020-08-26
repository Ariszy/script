/**
来客有礼宠汪汪强制助力（助力一个好友可以获得30机会，一天上限是3好友，获得积分即90积分）
注：这不是task脚本，而是重写
建议下载下来放到本地使用，可以修改friendPin换好友(助力一好友后，更换一次friendPin里面的内容)
感谢github @Zero-S1提供
重写：
surge
来客有礼宠汪汪强制助力= type=http-request,pattern=(^https:\/\/draw\.jdfcloud\.com\/\/pet\/enterRoom\?reqSource=weapp&invitePin=\w+(&inviteSource=task_invite&shareSource=h5&inviteTimeStamp=\d+&openId=\w+)?|^https:\/\/draw\.jdfcloud\.com\/\/pet\/helpFriend\?friendPin=\w+),requires-body=1,max-size=0,script-path=jd_joy_help.js

//圈x 
^https:\/\/draw\.jdfcloud\.com\/\/pet\/enterRoom\?reqSource=weapp&invitePin=.*+(&inviteSource=task_invite&shareSource=\w+&inviteTimeStamp=\d+&openId=\w+)?|^https:\/\/draw\.jdfcloud\.com\/\/pet\/helpFriend\?friendPin url script-request-header jd_joy_help.js

LOON：
http-response https://xeq1kjnhr\.m\.jd\.com/static/index\.html script-path=https://raw.githubusercontent.com/ZhiYi-N/Loon/master/jd_hd.js, requires-body=true, timeout=10
http-request ^https:\/\/draw\.jdfcloud\.com\/\/pet\/enterRoom\?reqSource=weapp&invitePin=.*+(&inviteSource=task_invite&shareSource=\w+&inviteTimeStamp=\d+&openId=\w+)?|^https:\/\/draw\.jdfcloud\.com\/\/pet\/helpFriend\?friendPin script-path=jd_joy_help.js, requires-body=true, timeout=10, tag=来客有礼宠汪汪强制助力

使用方法：

从京东宠汪汪分享给你小号微信或者微信的文件传输助手。 自己再打开刚才的分享链接，助力完后再换一个friendPin(41行代码双引号内)


**/


let url = $request.url
/**
下面提供三个好友的friendPin

zooooo58

jd_6cd93e613b0e5

被折叠的记忆33

你也可从下面链接拿好友的friendPin(复制链接到有京东ck的浏览器打开即可)

https://jdjoy.jd.com/pet/getFriends?itemsPerPage=20&currentPage=1
**/

let friendPin = "jd_6cd93e613b0e5"  //强制为对方助力，有几率自动成为好友 (pin形如jd_xxxxxxxxx的几率大，其他的不会，原因未知)
friendPin = encodeURI(friendPin);
const timestamp = new Date().getTime()
newUrl = url.replace(/friendPin=.*?$/i, "friendPin=" + friendPin).replace(/invitePin=.*?$/i, "invitePin=" + friendPin).replace(/inviteTimeStamp=.*?$/i, "inviteTimeStamp=" + timestamp + "&")
console.log(newUrl)
$done({ url: newUrl })
