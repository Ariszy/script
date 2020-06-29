//jd免费水果 搬的https://github.com/liuxiaoyucc/jd-helper/blob/a6f275d9785748014fc6cca821e58427162e9336/fruit/fruit.js

// [task_local]
// #jd免费水果
// cron "1 0 7,12,18 * * *" script-path=https://raw.githubusercontent.com/iepngs/Script/master/jd/fruit.js,tag=jd免费水果
//兼容surge和Loon等软件功能 by@iepngs
//新增和维护功能 by@lxk0301
const $hammer = (() => {
  const isRequest = "undefined" != typeof $request,
      isSurge = "undefined" != typeof $httpClient,
      isQuanX = "undefined" != typeof $task;

  const log = (...n) => { for (let i in n) console.log(n[i]) };
  const alert = (title, body = "", subtitle = "", link = "", option) => {
    if (isSurge) return $notification.post(title, subtitle, body, link);
    if (isQuanX) return $notify(title, subtitle, (link && !body ? link : body), option);
    log("==============📣系统通知📣==============");
    log("title:", title, "subtitle:", subtitle, "body:", body, "link:", link);
  };
  const read = key => {
        if (isSurge) return $persistentStore.read(key);
        if (isQuanX) return $prefs.valueForKey(key);
      },
      write = (key, val) => {
        if (isSurge) return $persistentStore.write(key, val);
        if (isQuanX) return $prefs.setValueForKey(key, val);
      };
  const request = (method, params, callback) => {
    /**
     *
     * params(<object>): {url: <string>, headers: <object>, body: <string>} | <url string>
     *
     * callback(
     *      error,
     *      {status: <int>, headers: <object>, body: <string>} | ""
     * )
     *
     */
    let options = {};
    if (typeof params == "string") {
      options.url = params;
    } else {
      options.url = params.url;
      if (typeof params == "object") {
        params.headers && (options.headers = params.headers);
        params.body && (options.body = params.body);
      }
    }
    method = method.toUpperCase();

    const writeRequestErrorLog = function (m, u) {
      return err => {
        log("=== request error -s--");
        log(`${m} ${u}`, err);
        log("=== request error -e--");
      };
    }(method, options.url);

    if (isSurge) {
      const _runner = method == "GET" ? $httpClient.get : $httpClient.post;
      return _runner(options, (error, response, body) => {
        if (error == null || error == "") {
          response.body = body;
          callback("", response);
        } else {
          writeRequestErrorLog(error);
          callback(error, "");
        }
      });
    }
    if (isQuanX) {
      options.method = method;
      $task.fetch(options).then(
          response => {
            response.status = response.statusCode;
            delete response.statusCode;
            callback("", response);
          },
          reason => {
            writeRequestErrorLog(reason.error);
            callback(reason.error, "");
          }
      );
    }
  };
  const done = (value = {}) => {
    if (isQuanX) return isRequest ? $done(value) : null;
    if (isSurge) return isRequest ? $done(value) : $done();
  };
  return { isRequest, isSurge, isQuanX, log, alert, read, write, request, done };
})();


//京东接口地址
const JD_API_HOST = 'https://api.m.jd.com/';

//直接用NobyDa的jd cookie
const cookie = $hammer.read('CookieJD')
const name = '京东水果'
//助力好友分享码(最多4个,否则后面的助力失败),原因:京东农场每人每天只有四次助力机会
var shareCodes = [ // 这个列表填入你要助力的好友的shareCode
  'a6f686a9f6aa4c80977370b03681c553',
  'f92cb56c6a1349f5a35f0372aa041ea0',
  'a9360baeceb04c9baaaa109f5d428d3c',
  '61ff5c624949454aa88561f2cd721bf6',
  '40dbf12bb7ea4b8eb772741afe2125da'
]
// 添加box功能
// 【用box订阅的好处】
// 1️⃣脚本也可以远程挂载了。助力功能只需在box里面设置助力码。
// 2️⃣所有脚本的cookie都可以备份，方便你迁移到其他支持box的软件。
let isBox = false //默认没有使用box
const boxShareCodeArr = ['jd_fruit1', 'jd_fruit2', 'jd_fruit3', 'jd_fruit4'];
isBox = boxShareCodeArr.some((item) => {
  const boxShareCode = $hammer.read(item);
  return (boxShareCode !== undefined && boxShareCode !== null && boxShareCode !== '');
});
if (isBox) {
  shareCodes = [];
  for (const item of boxShareCodeArr) {
    if ($hammer.read(item)) {
      shareCodes.push($hammer.read(item));
    }
  }
}
var Task = step();
Task.next();

let farmTask = null;
// let farmInfo = null;

function* step() {
  //
  let message = '';
  let subTitle = '';

  if (!cookie) {
    return $hammer.alert(name, '请先获取cookie\n直接使用NobyDa的京东签到获取');
  }

  let farmInfo = yield flyTask_state();
  console.log(`初始化信息：${JSON.stringify(farmInfo)}`)
  $hammer.alert(name)
  $hammer.done();
}

function flyTask_state() {
  const functionId = arguments.callee.name.toString();
  const body = {
    "source":"game"
  }
  request(functionId, body)
}
/**
 * 初始化农场, 可获取果树及用户信息
 */
function initForFarm() {
  let functionId = arguments.callee.name.toString();
  request(functionId);
}
function _jsonpToJson(v) {
  return v.match(/{.*}/)[0]
}
function request(function_id, body = {}) {
  $hammer.request('GET', taskurl(function_id, body), (error, response) => {
    error ? $hammer.log("Error:", error) : sleep(JSON.parse(_jsonpToJson(response)));
  })
}

function sleep(response) {
  console.log('休息一下');
  setTimeout(() => {
    $hammer.log('休息结束');
    // $hammer.log(response)
    Task.next(response)
  }, 2000);
}

function taskurl(function_id, body = {}) {
  return {
    url: `${JD_API_HOST}?appid=memberTaskCenter&functionId=${function_id}&body=${escape(JSON.stringify(body))}&jsonp=__jsonp1593330783690&_=${new Date().getTime()}`,
    headers: {
      Cookie: cookie,
      UserAgent: `Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1`,
    }
  }
}

function taskPostUrl(function_id, body = {}) {
  return {
    url: JD_API_HOST,
    body: `functionId=${function_id}&body=${JSON.stringify(body)}&appid=wh5`,
    headers: {
      Cookie: cookie,
    }
  }
}
