/**
 宠汪汪邀请助力与赛跑助力脚本，感谢github@Zero-S1提供帮助
 token时效很短，每天拿到后，可一次性运行完毕即可。
 token获取途径：
 1、微信搜索'来客有礼'小程序,登陆京东账号，点击底部的'发现'Tab,即可获取Token，脚本运行提示token失效后，继续按此方法获取即可
 2、或者每天去'来客有礼'小程序->宠汪汪里面，领狗粮->签到领京豆 也可获取Token(此方法每天只能获取一次)
 [MITM]
 hostname = draw.jdfcloud.com
 surge
 [Script]
 宠汪汪邀请助力与赛跑助力 = type=cron,cronexp="15 10 * * *",wake-system=1,timeout=20,script-path=https://raw.githubusercontent.com/lxk0301/scripts/master/jd_joy_run.js
 宠汪汪助力获取Cookie = type=http-response,pattern=^https://draw\.jdfcloud\.com//api/user/addUser\?code=\w+&, requires-body=1, max-size=0, script-path=https://raw.githubusercontent.com/lxk0301/scripts/master/jd_joy_run.js

 圈X
 [task_local]
 # 宠汪汪邀请助力与赛跑助力
 15 10 * * * https://raw.githubusercontent.com/lxk0301/scripts/master/jd_joy_run.js, tag=宠汪汪邀请助力与赛跑助力, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdcww.png, enabled=true
 [rewrite_local]
 # 宠汪汪助力获取Cookie
 ^https://draw\.jdfcloud\.com//api/user/addUser\?code=\w+& url script-response-body https://raw.githubusercontent.com/lxk0301/scripts/master/jd_joy_run.js

 LOON：
 [Script]
 cron "15 10 * * *" script-path=https://raw.githubusercontent.com/lxk0301/scripts/master/jd_joy_run.js,tag=宠汪汪邀请助力与赛跑助力

 http-response ^https://draw\.jdfcloud\.com//api/user/addUser\?code=\w+& script-path=https://raw.githubusercontent.com/lxk0301/scripts/master/jd_joy_help.js
 , requires-body=true, timeout=10, tag=宠汪汪助力获取Cookie
 **/
const isRequest = typeof $request != "undefined"
const $ = new Env('来客有礼宠汪汪');
const JD_BASE_API = `https://draw.jdfcloud.com//pet`;

//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '';
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
} else {
  cookiesArr.push($.getdata('CookieJD'));
  cookiesArr.push($.getdata('CookieJD2'));
}


function getToken() {
  // const url = $request.url;
  // $.log(`${$.name}url\n${url}\n`)
  const body = JSON.parse($response.body);
  const token = body.data.token;
  $.log(`${$.name}token\n${token}\n`)
  $.msg($.name, '宠汪汪token获取成功', token);
  $.setdata(token, 'jdJoyRun');
  // $done({});
  $.done({ body: JSON.stringify(body) })
}
async function main() {
  const invite_pins = ["jd_6cd93e613b0e5", "被折叠的记忆33", "jd_704a2e5e28a66", "jd_45a6b5953b15b", 'zooooo58']
  const run_pins = ["jd_6cd93e613b0e5", "被折叠的记忆33", "jd_704a2e5e28a66", "jd_45a6b5953b15b", 'zooooo58']
  // $.LKYLToken = '34099ab699acc383195f0063156ff60e' || $.getdata('jdJoyRun');
  $.LKYLToken = '553b82bd28b4e32e6d02b64de1ec2920' || $.getdata('jdJoyRun');
  //console.log($.getdata('jdJoyRun'))
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {"open-url": "https://bean.m.jd.com/"});
    return;
  }
  if (!$.LKYLToken) {
    $.msg($.name, '【提示】请先获取来客有礼宠汪汪token', `来客有礼小程序获取`);
    return;
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
      $.index = i + 1;
      console.log(`\n开始【京东账号${$.index}】${UserName}\n`);
      message = '';
      subTitle = '';
      $.jdLogin = true;
      $.LKYLLogin = true;
      await invite(invite_pins);
      if ($.jdLogin && $.LKYLLogin) {
        console.log(`开始助力好友赛跑`)
        await run(run_pins);
      }
    }
  }
  $.done()
}
//邀请助力
async function invite(invite_pins) {
  for (let item of invite_pins) {
    console.log(`\n邀请助力 friendPin ${item}`)
    const data = await enterRoom(item);
    if (!data.success && data.errorCode === 'B0001') {
      console.log('京东Cookie失效');
      $.jdLogin = false;
      break
    } else {
      const { helpStatus } = data.data;
      console.log(`helpStatus ${helpStatus}`)
      if (helpStatus=== 'help_full') {
        console.log(`您的邀请助力机会已耗尽\n`)
        break;
      } else if (helpStatus=== 'cannot_help') {
        console.log(`已给该好友助力过了\n`)
        continue;
      } else if (helpStatus=== 'invite_full') {
        console.log(`该好友已经满3人给他助力了\n`)
        continue;
      } else if (helpStatus=== 'can_help') {
        console.log(`开始给好友助力\n`)
        const LKYL_DATA = await helpInviteFriend(item);
        if (LKYL_DATA.errorCode === 'L0001' && !LKYL_DATA.success) {
          console.log('来客有礼宠汪汪token失效');
          $.setdata('', 'jdJoyRun');
          $.LKYLLogin = false;
          break
        } else {
          $.LKYLLogin = true;
        }
      }
      $.jdLogin = true;
    }
  }
}
function enterRoom(invitePin) {
  return new Promise(resolve => {
    const options = {
      url: `${JD_BASE_API}/enterRoom?reqSource=weapp&invitePin=${encodeURI(invitePin)}`,
      headers: {
        'Host': 'draw.jdfcloud.com',
        'App-Id': 'wxccb5c536b0ecd1bf',
        'Accept': '*/*',
        'openId': 'oPcgJ48QtztO1b_aMpI5LcQ0mcbM',
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br',
        'Lottery-Access-Signature': 'wxccb5c536b0ecd1bf1537237540544h79HlfU',
        'Content-Type': 'application/json',
        'reqSource': 'weapp',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.15(0x17000f28) NetType/WIFI Language/zh_CN',
        'Referer': 'https://servicewechat.com/wxccb5c536b0ecd1bf/624/page-frame.html',
        'LKYLToken': $.LKYLToken,
        'Cookie': cookie,
        'Connection': 'keep-alive',
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          $.log('API请求失败')
          $.logErr(JSON.stringify(err));
        } else {
          data = JSON.parse(data);
          // console.log('进入房间', data)
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    });
  })
}
function helpInviteFriend(friendPin) {
  return new Promise((resolve) => {
    const options = {
      url: `${JD_BASE_API}/helpFriend?friendPin=${encodeURI(friendPin)}`,
      headers: {
        'Host': 'draw.jdfcloud.com',
        'App-Id': 'wxccb5c536b0ecd1bf',
        'Accept': '*/*',
        'openId': 'oPcgJ48QtztO1b_aMpI5LcQ0mcbM',
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br',
        'Lottery-Access-Signature': 'wxccb5c536b0ecd1bf1537237540544h79HlfU',
        'Content-Type': 'application/json',
        'reqSource': 'weapp',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.15(0x17000f28) NetType/WIFI Language/zh_CN',
        'Referer': 'https://servicewechat.com/wxccb5c536b0ecd1bf/624/page-frame.html',
        'LKYLToken': $.LKYLToken,
        'Cookie': cookie,
        'Connection': 'keep-alive',
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          $.log('API请求失败')
          $.logErr(JSON.stringify(err));
        } else {
          $.log(`邀请助力结果：${data}`);
          data = JSON.parse(data);
          // {"errorCode":"help_ok","errorMessage":null,"currentTime":1600254297789,"data":29466,"success":true}
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    });
  })
}
//赛跑助力
async function run(run_pins) {
  for (let item of run_pins) {
    console.log(`\n赛跑助力 friendPin ${item}`)
    const combatDetailRes = await combatDetail(item);
    const { petRaceResult } = combatDetailRes.data;
    console.log(`petRaceResult ${petRaceResult}`);
    if (petRaceResult === 'help_full') {
      console.log('您的赛跑助力机会已耗尽');
      break;
    } else if (petRaceResult === 'can_help') {
      await combatHelp(item);
    }
  }
}
function combatHelp(friendPin) {
  return new Promise(resolve => {
    const options = {
      url: `${JD_BASE_API}/combat/help?friendPin=${encodeURI(friendPin)}`,
      headers: {
        'Host': 'draw.jdfcloud.com',
        'App-Id': 'wxccb5c536b0ecd1bf',
        'Accept': '*/*',
        'openId': 'oPcgJ48QtztO1b_aMpI5LcQ0mcbM',
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br',
        'Lottery-Access-Signature': 'wxccb5c536b0ecd1bf1537237540544h79HlfU',
        'Content-Type': 'application/json',
        'reqSource': 'weapp',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.15(0x17000f28) NetType/WIFI Language/zh_CN',
        'Referer': 'https://servicewechat.com/wxccb5c536b0ecd1bf/624/page-frame.html',
        'LKYLToken': $.LKYLToken,
        'Cookie': cookie,
        'Connection': 'keep-alive',
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          $.log('API请求失败')
          $.logErr(JSON.stringify(err));
        } else {
          $.log(`赛跑助力结果${data}`);
          data = JSON.parse(data);
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    });
  })
}
function combatDetail(invitePin) {
  return new Promise(resolve => {
    const options = {
      url: `${JD_BASE_API}/combat/detail/v2?help=true&inviterPin=${encodeURI(invitePin)}`,
      headers: {
        'Host': 'draw.jdfcloud.com',
        'App-Id': 'wxccb5c536b0ecd1bf',
        'Accept': '*/*',
        'openId': 'oPcgJ48QtztO1b_aMpI5LcQ0mcbM',
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br',
        'Lottery-Access-Signature': 'wxccb5c536b0ecd1bf1537237540544h79HlfU',
        'Content-Type': 'application/json',
        'reqSource': 'weapp',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.15(0x17000f28) NetType/WIFI Language/zh_CN',
        'Referer': 'https://servicewechat.com/wxccb5c536b0ecd1bf/624/page-frame.html',
        'LKYLToken': $.LKYLToken,
        'Cookie': cookie,
        'Connection': 'keep-alive',
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          $.log('API请求失败')
          $.logErr(JSON.stringify(err));
        } else {
          data = JSON.parse(data);
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    });
  })
}
isRequest ? getToken() : main();
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,o)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=e&&e.timeout?e.timeout:o;const[r,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:o},headers:{"X-Key":r,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),o=JSON.stringify(this.data);s?this.fs.writeFileSync(t,o):i?this.fs.writeFileSync(e,o):this.fs.writeFileSync(t,o)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of i)if(o=Object(o)[t],void 0===o)return s;return o}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),o=s?this.getval(s):"";if(o)try{const t=JSON.parse(o);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(e),r=this.getval(i),h=i?"null"===r?null:r||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,o,t),s=this.setval(JSON.stringify(e),i)}catch(e){const r={};this.lodash_set(r,o,t),s=this.setval(JSON.stringify(r),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)}):this.isQuanX()?$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t)):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t)))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t))}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",o){const r=t=>{if(!t||!this.isLoon()&&this.isSurge())return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,r(o)):this.isQuanX()&&$notify(e,s,i,r(o)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}