
/*ziye

//返利网1212天天领现金，活动时间 12月  5号 9号到12号
每天1.95

下载地址  http://m.a8fdj.cn/Invite/promotion?id=775&spm=page_name.h5.pty-wxzcpv~std-65354&go=http%3A%2F%2Fhuodong.a8fdj.cn%2Fh5%2FInvitefriendsreward%2FregisterCallback%3Fuserid%3D373511081%26id%3D775%26sn%3D47ecab06aba43e015082e531d8214eb5

下载后登录

进入 我的 点击  天天领现金 获取cookie

⚠️会卡住，但是能获取到cookie，然后注释重写就行了！
提现请先微信关注返利网公众号

hostname=huodong.fanli.com,

时间👇

0 1-16 10 5,9,10,11,12 * *



#返利网红包
############## 圈x
https:\/\/huodong\.fanli\.com\/h5\/Fanlishare20201212\/ajaxInit url script-request-header https://raw.githubusercontent.com/ziye12/JavaScript/master/flwhbziye.js   



#返利网红包
############## loon


http-request https:\/\/huodong\.fanli\.com\/h5\/Fanlishare20201212\/ajaxDoTask76728 script-path=https://raw.githubusercontent.com/ziye12/JavaScript/master/flwhbziye.js,requires-header=true, tag=返利网红包获取cookie 


#返利网红包
############## surge

返利网红包 = type=http-request,pattern=https:\/\/huodong\.fanli\.com\/h5\/Fanlishare20201212\/ajaxDoTask76728,script-path=https://raw.githubusercontent.com/ziye12/JavaScript/master/flwhbziye.js,






*/





const jsname='返利网红包'
const $ = Env(jsname)


const logs = 0;   //0为关闭日志，1为开启
const notifyInterval=1//0为关闭通知，1为开启
const jbid=1;
const txbz=1.95//设置余额大于等于多少提现，必须大于0.3





const flwhburlKey = 'flwhburl'+jbid

const flwhbheaderKey = 'flwhbhd'+jbid



const flwhburlVal = process.env.FLW_URL

const flwhbheaderVal = process.env.FLW_COOKIE

const flwhbbodyVal = ''









var tz=''


let isGetCookie = typeof $request
   all()






function GetCookie() {



   if($request &&$request.url.indexOf("ajaxInit")>=0) {

  const flwhburlVal = $request.url
if (flwhburlVal)        $.setdata(flwhburlVal,flwhburlKey)
    $.log(`[${jsname}] 获取url请求: 成功,flwhburlVal: ${flwhburlVal}`)
const flwhbheaderVal = JSON.stringify($request.headers)
    if (flwhbheaderVal)        $.setdata(flwhbheaderVal,flwhbheaderKey)
    $.log(`[${jsname}] 获取Cookie: 成功,flwhbheaderVal: ${flwhbheaderVal}`)
    $.msg(flwhbheaderKey, `获取Cookie: 成功🎉`, ``)
  

  }

}












 function all()

 {

   for(var i=0;i<3;i++)
 { (function(i) {
            setTimeout(function() {
    
     if(i==0) flwhbtask();
     if(i==1) flwhblh();

else if(i==2) {
showmsg()
$.done()}
}, (i + 1) *500);
                })(i)


}}



//账户信息
function flwhbtask() {
return new Promise((resolve, reject) => {

  const toflwhburl = {

    url: flwhburlVal,

    headers: JSON.parse(flwhbheaderVal),
    body: flwhbbodyVal
  };
   $.get(toflwhburl,(error, response, data) =>{
     if(logs) $.log(`${jsname}, 账户信息: ${data}`)
     signinfo =JSON.parse(data)
      if (signinfo.status==1)
 {
tz+='【收益总计】🎉:'+signinfo.data.user_total_money+'元'+'\n'+
'【账户余额】🎉:'+signinfo.data.user_current_money+'\n'+
'【今日奖励】🎉:'+signinfo.data.get_money_76728+'元'+'\n'

}

else
tz+='【出现问题】✖️:'+signinfo.data+'\n'

zhtx(signinfo.data.user_current_money)




    resolve()
    })
   })
  }  




//惊喜礼盒
function flwhblh() {
return new Promise((resolve, reject) => {

  const toflwhblhurl = {

    url: flwhburlVal.replace(/ajaxInit/g, `ajaxDoTask76728`),

    headers: JSON.parse(flwhbheaderVal),
    body: flwhbbodyVal
  };
   $.get(toflwhblhurl,(error, response, data) =>{
     if(logs) $.log(`${jsname}, 惊喜礼盒: ${data}`)
     jxlh =JSON.parse(data)
      if (jxlh.data.remain_num_76728>0)
 {
tz+='【开启礼盒】🎉:'+jxlh.data.amount+'元'+'\n'+
'【剩余礼盒】🎉:'+jxlh.data.remain_num_76728+'个'+'\n'

}

else
tz+='【开启完毕】✖️:'+'礼盒已全部开启'+'\n'




    resolve()
    })
   })
  }  




function zhtx(y)
{
if(y>=txbz)
flwhbtx()

}






//提现
function flwhbtx() {
return new Promise((resolve, reject) => {

  const toflwhbtxurl = {

    url: flwhburlVal.replace(/ajaxInit/g, `ajaxExchangeCash`),

    headers: JSON.parse(flwhbheaderVal),

  };
   $.get(toflwhbtxurl,(error, response, data) =>{
     if(logs) $.log(`${jsname}, 余额提现: ${data}`)
     txtx =JSON.parse(data)
      if (txtx.status==1)
 {
tz+='【余额提现】🎉:提现成功,请到公众号领取'+'\n'

}

else
tz+='【余额提现】✖️:'+txtx.info+'\n'




    resolve()
    })
   })
  }  









function showmsg() {



if (notifyInterval==1)
$.msg(jsname,'',tz)
}


// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
