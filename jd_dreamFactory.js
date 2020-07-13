/*
京东京喜工厂
 */
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
const JD_API_HOST = 'https://wq.jd.com';

//直接用NobyDa的jd cookie
const cookie = $hammer.read('CookieJD')
const name = '京喜工厂';
const Task = step()
Task.next();
function* step() {
  const startTime = Date.now();
  let message = '';
  let subTitle = '';
  yield userInfo();
  const end = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n完成${name}脚本耗时:  ${end} 秒\n`);
}

function userInfo() {
  const url = `${JD_API_HOST}/dreamfactory/userinfo/GetUserInfo?zone=dream_factory&pin=&sharePin=&shareType=&materialTuanPin=&materialTuanId=&sceneval=2`;
  request(url).then((response) => {
    try {
      // taskInfo = res.data.result.taskInfos;
      console.log(`初始化信息:${JSON.stringify(response)}`);
      Task.next();
    } catch (e) {
      console.log(e);
      console.log('初始化任务异常');
    }
  })
}

//等待一下
function sleep(s) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, s * 1000);
  })
}

async function request(function_id, body = {}) {
  await sleep(2); //歇口气儿, 不然会报操作频繁
  return new Promise((resolve, reject) => {
    $hammer.request('GET', taskurl(function_id,body), (error, response) => {
      if(error){
        $hammer.log("Error:", error);
      }else{
        // console.log(response)
        resolve(JSON.parse(response.body));
      }
    })
  })
}

function taskurl(url, body) {
  return {
    url,
    headers: {
      'Cookie' : cookie,
      'Host': 'wq.jd.com',
      'Accept': '*/*',
      'Connection': 'keep-alive',
      'User-Agent': 'jdapp;iPhone;9.0.4;13.5.1;;Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
      'Accept-Language': 'zh-cn',
      'Referer': 'https://wqsd.jd.com/pingou/dream_factory/index.html',
      'Accept-Encoding': 'gzip, deflate, br',
    }
  }
}