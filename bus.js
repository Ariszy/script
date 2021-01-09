const $ = new Env('ZhiYi-N🚗')
const jsname = "ZhiYi-N🚗";
const notify = $.isNode() ? require('./sendNotify') : '';
var message = '';
if ($.isNode()){
      message += `脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()} \n\n`;
      console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
      console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}=============\n`)
  }
const shareCodes = [
  {
    zd: "qwmkwedt5pnudvik5qlpdqswshjc4o3tva4uqii",
    nc: "eb6c342da930464a997ed03b8bea49d9",
    mc: "MTAxODc2NTEzOTAwMDAwMDAyODI1NzQxNQ==",
    dd: "P04z54XCjVWnYaS5m9cZx2atAcQ9eSrr5Cpuw",
    jx: "IO6FIBzYeEztXOK7BigRuA==",
    zz: "AUWE54s_5tm9oVhiJmR0b",
    joy: "Fxn3_9qt5P_Rt3JFz7yZyg=="
  },
  {
    zd: "e7lhibzb3zek3rus7xktpq2wmwzbccmdzsxerla",
    nc: "69c262ee6b414944869828915ae74be9",
    mc: "MTE1NDUyMjEwMDAwMDAwNDI1NDgwMjE=",
    dd: "P04z54XCjVWnYaS5m9cZ2T_iXtCwUwWbrJw2hc",
    jx: "zGL7La1hPe-boRUrceb6Gg==",
    zz: "AUWE5m6rEyj1cDmXx1HQenA",
   joy: "Fxn3_89ghy_Rt3JFz7yZyg=="
  },

];
$.result = []

!(async () => {
  for (let i = 0; i < shareCodes.length; i++) {
    const { zd, nc, mc, dd, jx, zz, joy} = shareCodes[i];
    zd && await createZd(`http://api.turinglabs.net/api/v1/jd/bean/create/${zd}/`)
    nc && await createNc(`http://api.turinglabs.net/api/v1/jd/farm/create/${nc}/`)
    mc && await createMc(`http://api.turinglabs.net/api/v1/jd/pet/create/${mc}/`)
    dd && await createDd(`http://api.turinglabs.net/api/v1/jd/ddfactory/create/${dd}/`)
    jx && await createJx(`http://api.turinglabs.net/api/v1/jd/jxfactory/create/${jx}/`)
    zz &&await createZz(`https://code.chiang.fun/api/v1/jd/jdzz/create/${zz}/`)
    joy &&await createJoy(`https://code.chiang.fun/api/v1/jd/jdcrazyjoy/create/${joy}/`)
  }
  await showMsg()
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())

// 种豆得豆
function createZd(zdUrl) {
  return new Promise((resolve) => {
    const url = { url: zdUrl }
    $.get(url, (err, resp, data) => {
      try {
        const _data = JSON.parse(data)
        if (_data) {
          if(_data.message.indexOf("existe")!=-1){
             message += `种豆得豆：已在车上`+'\n'
           }else{
             message += `种豆得豆：完美上车`+'\n'
            }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}

// 京东农场
function createNc(ncUrl) {
  return new Promise((resolve) => {
    const url = { url: ncUrl }
    $.get(url, (err, resp, data) => {
      try {
        const _data = JSON.parse(data)
         if(_data.message.indexOf("existe")!=-1){
             message += `京东农场：已在车上`+'\n'
           }else{
             message += `京东农场：完美上车`+'\n'
            }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}

// 京东萌宠
function createMc(mcUrl) {
  return new Promise((resolve) => {
    const url = { url: mcUrl }
    $.get(url, (err, resp, data) => {
      try {
        const _data = JSON.parse(data)
         if(_data.message.indexOf("existe")!=-1){
             message += `京东萌宠：已在车上`+'\n'
           }else{
             message += `京东萌宠：完美上车`+'\n'
            }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}
function createDd(ddUrl) {
  return new Promise((resolve) => {
    const url = { url: ddUrl }
    $.get(url, (err, resp, data) => {
      try {
        const _data = JSON.parse(data)
         if(_data.message.indexOf("existe")!=-1){
             message += `东东工厂：已在车上`+'\n'
           }else{
             message += `东东工厂：完美上车`+'\n'
            }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}
function createJx(jxUrl) {
  return new Promise((resolve) => {
    const url = { url: jxUrl }
    $.get(url, (err, resp, data) => {
      try {
        const _data = JSON.parse(data)
         if(_data.message.indexOf("existe")!=-1){
             message += `京喜工厂：已在车上`+'\n'
           }else{
             message += `京喜工厂：完美上车`+'\n'
            }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}
function createZz(zzUrl) {
  return new Promise((resolve) => {
    const url = { url: zzUrl }
    $.get(url, (err, resp, data) => {
      try {
        const _data = JSON.parse(data)
         if(_data.msg.indexOf("Exists")!=-1){
             message += `京东赚赚：已在车上`+'\n'
           }else{
             message += `京东赚赚：完美上车`+'\n'
            }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}
function createJoy(joyUrl) {
  return new Promise((resolve) => {
    const url = { url: joyUrl }
    $.get(url, (err, resp, data) => {
      try {
        const _data = JSON.parse(data)
         if(_data.msg.indexOf("Exists")!=-1){
             message += `crazyJoy：已在车上`+'\n'
           }else{
             message += `crazyJoy：完美上车`+'\n'
            }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}
async function showMsg() {
  if ($.isNode()){
     $.log(jsname+'\n'+message)
     await notify.sendNotify(jsname, "", message)
    }else{
     $.log(message)
     $.msg(jsname, "", message)
 }

 

 /* return new Promise((resolve) => {
    $.msg($.name, "", $.result.join('\n'));
    resolve();
  });*/
}


// prettier-ignore
function Env(t,s){return new class{constructor(t,s){this.name=t,this.data=null,this.dataFile="box.dat",this.logs=[],this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,s),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient}isLoon(){return"undefined"!=typeof $loon}loaddata(){if(!this.isNode)return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.existsSync(t),i=!e&&this.fs.existsSync(s);if(!e&&!i)return{};{const i=e?t:s;try{return JSON.parse(this.fs.readFileSync(i))}catch{return{}}}}}writedata(){if(this.isNode){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.existsSync(t),i=!e&&this.fs.existsSync(s),o=JSON.stringify(this.data);e?this.fs.writeFileSync(t,o):i?this.fs.writeFileSync(s,o):this.fs.writeFileSync(t,o)}}lodash_get(t,s,e){const i=s.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of i)if(o=Object(o)[t],void 0===o)return e;return o}lodash_set(t,s,e){return Object(t)!==t?t:(Array.isArray(s)||(s=s.toString().match(/[^.[\]]+/g)||[]),s.slice(0,-1).reduce((t,e,i)=>Object(t[e])===t[e]?t[e]:t[e]=Math.abs(s[i+1])>>0==+s[i+1]?[]:{},t)[s[s.length-1]]=e,t)}getdata(t){let s=this.getval(t);if(/^@/.test(t)){const[,e,i]=/^@(.*?)\.(.*?)$/.exec(t),o=e?this.getval(e):"";if(o)try{const t=JSON.parse(o);s=t?this.lodash_get(t,i,""):s}catch(t){s=""}}return s}setdata(t,s){let e=!1;if(/^@/.test(s)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(s),h=this.getval(i),a=i?"null"===h?null:h||"{}":"{}";try{const s=JSON.parse(a);this.lodash_set(s,o,t),e=this.setval(JSON.stringify(s),i),console.log(`${i}: ${JSON.stringify(s)}`)}catch{const s={};this.lodash_set(s,o,t),e=this.setval(JSON.stringify(s),i),console.log(`${i}: ${JSON.stringify(s)}`)}}else e=$.setval(t,s);return e}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,s){return this.isSurge()||this.isLoon()?$persistentStore.write(t,s):this.isQuanX()?$prefs.setValueForKey(t,s):this.isNode()?(this.data=this.loaddata(),this.data[s]=t,this.writedata(),!0):this.data&&this.data[s]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,s=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?$httpClient.get(t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status,s(t,e,i))}):this.isQuanX()?$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t)):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,s)=>{try{const e=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(e,null),s.cookieJar=this.ckjar}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t)))}post(t,s=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),delete t.headers["Content-Length"],this.isSurge()||this.isLoon())$httpClient.post(t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status,s(t,e,i))});else if(this.isQuanX())t.method="POST",$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t));else if(this.isNode()){this.initGotEnv(t);const{url:e,...i}=t;this.got.post(e,i).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t))}}msg(s=t,e="",i="",o){this.isSurge()||this.isLoon()?$notification.post(s,e,i):this.isQuanX()&&$notify(s,e,i),this.logs.push("","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="),this.logs.push(s),e&&this.logs.push(e),i&&this.logs.push(i)}log(...t){t.length>0?this.logs=[...this.logs,...t]:console.log(this.logs.join(this.logSeparator))}logErr(t,s){const e=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();e?$.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):$.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.message)}wait(t){return new Promise(s=>setTimeout(s,t))}done(t=null){const s=(new Date).getTime(),e=(s-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${e} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,s)}
