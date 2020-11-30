const DD ='QQ阅读APP';

const $ = new Env(DD);


const logs=0;//设置0关闭日志,1开启日志

const notify = $.isNode() ? require('./sendNotify') : '';
const x = process.env.QQREAD_COOKIE
const y = process.env.QQREADER_COOKIE
console.log(`\n============ 脚本执行时间(TM)：${new Date(new Date().getTime() + 0 * 60 * 60 * 1000).toLocaleString('zh', {hour12: false})}  =============\n`)


!(async () => {
  if (2>1) {
    await qedssign()
    await nativeSign()
    await checkinSign()
    await punchCardSign()
    await watchVideoSign()
    await openBoxSign()
    await querSign()
    await Msg()
  }
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())



 function checkinSign() {
  return new Promise((resolve) => {
      let Url = {
        url : "https://commontgw6.reader.qq.com/v7_5_1/checkin?isresign=0",
        headers : JSON.parse($.getdata('checkinheader')),
     
      }
      $.get(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.checkin = data;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
  })
}


function punchCardSign() {
  return new Promise((resolve) => {
      let Url = {
        url : "https://eventv3.reader.qq.com/activity/pkg11955/punchCard_v2",
        headers : JSON.parse($.getdata('punchCardheader')),
     
      }
      $.get(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.punchCard = data;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
  })
}


function nativeSign() {
  return new Promise((resolve) => {
      let Url = {
        url : "https://commontgw6.reader.qq.com/v7_5_1/nativepage/getAcctInfo",
        headers : JSON.parse($.getdata('checkinheader')),
     
      }
      $.get(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.native = data;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
  })
}


function watchVideoSign() {
  return new Promise((resolve) => {
      let Url = {
        url : "https://eventv3.reader.qq.com/activity/pkg11955/watchVideo",
        headers : JSON.parse($.getdata('punchCardheader')),
     
      }
      $.get(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.watchVideo = data;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
  })
}


function openBoxSign() {
  return new Promise((resolve) => {
      let Url = {
        url : "https://eventv3.reader.qq.com/activity/pkg11955/openBox",
        headers : JSON.parse($.getdata('punchCardheader')),
     
      }
      $.get(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.openBox = data;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
  })
}


function querSign() {
  return new Promise((resolve) => {
      let Url = {
        url : "https://eventv3.reader.qq.com/activity/pkg11955/myPageInit",
        headers : JSON.parse($.getdata('punchCardheader')),
     
      }
      $.get(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.quer = data;
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
  })
}




function Msg() {
  let dd = ""

if ($.native.code == 0) 
dd +="【账户昵称】"+$.native.nick+"\n";


if ($.checkin.code == 0) 
dd +="【首页签到】"+"首页签到成功✅\n";

if ($.checkin.code == -2) 
dd +="【首页签到】"+"今日已完成打卡\n";

if ($.punchCard.code == 0) 
dd +="【打卡金币】"+"获得"+$.punchCard.data.coinNum+"金币\n";

if ($.punchCard.code == -6) 
dd +="【打卡金币】"+$.punchCard.msg+"\n";


if ($.watchVideo.code == 0)
dd+="【看视频领金币】"+"+100💰"+"已看"+$.watchVideo.data.videoCount+"次\n";
if ($.watchVideo.code == -6)
dd+="【看视频领金币】"+"明日再来\n";


if ($.openBox.code == -1)
dd+="【时段宝箱打卡】"+"时间未到\n";

if ($.openBox.data.status == 0)
dd+="【时段宝箱打卡】"+"获得"+$.openBox.data.coin+"💰金币"+",开宝箱时间"+timestampToTime($.openBox.data.openTime)+"\n";
if ($.openBox.data.status == 3)
dd+="【时段宝箱打卡】"+"时间未到1小时后开启\n";


if ($.quer.code == 0)

dd+="【账号信息查询】"+"当前账号"+$.quer.data.coinBalance+"💰金币"+",现金"+$.quer.data.cashBalance+"元"+",累计现金"+$.quer.data.cashGet+"元";



  $.msg($.name,"",dd)
}



function qedssign() {
  if (2 > -1) {

//$.setdata(process.env.QQREAD_COOKIE,'checkinheader')

$.setdata(process.env.QQREAD_COOKIE.split("\n")[0],'checkinheader')
$.setdata(process.env.QQREAD_COOKIE.split("\n")[1],'punchCardheader')

//$.setdata(process.env.QQREADER_COOKIE, 'punchCardheader')


}
}














function timestampToTime(timestamp) {
        var date = new Date(timestamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return h+m+s;
    }


















function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
