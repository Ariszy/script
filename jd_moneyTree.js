// 测试版
// 1、收金果
// 2、每日签到
// 3、分享
// 其他功能待测试
// cron */6 * * * *   # 表示每6分钟收取一次，自行设定运行间隔

const $hammer = (() => {
  const isRequest = "undefined" != typeof $request,
      isSurge = "undefined" != typeof $httpClient,
      isQuanX = "undefined" != typeof $task;

  const log = (...n) => { for (let i in n) console.log(n[i]) };
  const alert = (title, body = "", subtitle = "", link = "") => {
    if (isSurge) return $notification.post(title, subtitle, body, link);
    if (isQuanX) return $notify(title, subtitle, (link && !body ? link : body));
    log("==============📣系统通知📣==============");
    log("title:", title, "subtitle:", subtitle, "body:", body, "link:", link);
  };
  const read = key => {
    if (isSurge) return $persistentStore.read(key);
    if (isQuanX) return $prefs.valueForKey(key);
  };
  const write = (val, key) => {
    if (isSurge) return $persistentStore.write(val, key);
    if (isQuanX) return $prefs.setValueForKey(val, key);
  };
  const request = (method, params, callback) => {
    /**
     *
     * params(<object>): {url: <string>, headers: <object>, body: <string>} | <url string>
     *
     * callback(
     *      error,
     *      <response-body string>?,
     *      {status: <int>, headers: <object>, body: <string>}?
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
          callback("", body, response);
        } else {
          writeRequestErrorLog(error);
          callback(error);
        }
      });
    }
    if (isQuanX) {
      options.method = method;
      $task.fetch(options).then(
          response => {
            response.status = response.statusCode;
            delete response.statusCode;
            callback("", response.body, response);
          },
          reason => {
            writeRequestErrorLog(reason.error);
            callback(reason.error);
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

//直接用NobyDa的jd cookie
const cookie = $hammer.read('CookieJD')
const name = '京东摇钱树'
const JD_API_HOST = 'https://ms.jr.jd.com/gw/generic/uc/h5/m';
let Task = step();
Task.next();

function* step() {
  let userInfo = yield user_info();
  console.log('用户信息', userInfo);
}
function user_info() {
  const data = '{"shareType":1,"source":0,"riskDeviceParam":"{\\\\"fp\\\\":\\\\"\\\\",\\\\"eid\\\\":\\\\"\\\\",\\\\"sdkToken\\\\":\\\\"\\\\",\\\\"sid\\\\":\\\\"\\\\"}"}'
  request('login', data);
}


function sleep(response) {
  console.log('休息一下');
  setTimeout(() => {
    $hammer.log('休息结束');
    // $hammer.log(response)
    Task.next(response)
  }, 2000);
}
function request(function_id, body = {}) {
  $hammer.request('GET', taskurl(function_id, body), (error, response) => {
    error ? $hammer.log("Error:", error) : sleep(JSON.parse(response.body));
  })
}
function taskurl(function_id, body = {}) {
  return {
    url: `${JD_API_HOST}/${function_id}?reqData=${escape(JSON.stringify(body))}`,
    headers: {
      Cookie: cookie,
      UserAgent: `Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1`,
    }
  }
}


// function request(function_id, body = {}) {
//   $hammer.request('POST', taskurl(function_id, body), (error, response) => {
//     error ? $hammer.log("Error:", error) : sleep(JSON.parse(response));
//   })
// }
//
// function taskurl(function_id, body) {
//   // console.log(`${JD_API_HOST}?functionId=${function_id}&body=${escape(JSON.stringify(body))}&appid=ld&client=apple&clientVersion=&networkType=&osVersion=&uuid=`)
//   return {
//     // url: `${JD_API_HOST}?functionId=${function_id}&body=${escape(JSON.stringify(body))}&appid=ld&client=apple&clientVersion=&networkType=&osVersion=&uuid=`,
//     url: JD_API_HOST + '/' + function_id + '?_=' + new Date().getTime()*1000,
//     body: `${body}`,
//     headers: {
//       Cookie: cookie,
//       UserAgent: `Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1`,
//     }
//   }
// }