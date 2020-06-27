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
let userInfo = null;
let gen = entrance();
gen.next();
function* entrance() {
  if (!cookie) {
    return $hammer.alert("京东萌宠", '请先获取cookie\n直接使用NobyDa的京东签到获取');
  }
  yield user_info();
  // yield sign();//签到
  console.log(`userInfo: ${JSON.stringify(userInfo)}\n`)
  yield dayWork(userInfo);//做任务
  yield harvest(userInfo);//收获
}


function user_info() {
  console.log('初始化萌宠信息');
  const data = 'reqData=%7B%22sharePin%22%3A%22%22%2C%22shareType%22%3A1%2C%22channelLV%22%3A%22%22%2C%22source%22%3A0%2C%22riskDeviceParam%22%3A%22%7B%5C%22eid%5C%22%3A%5C%22SCTUHAO57J4VK5VZZK347KLZKWSJJVQY3B4SHL24I7XNJDOYEW6XX2GBIKS3F3SPESTOACPMRTAVBQZVERPVWLSMVE%5C%22%2C%5C%22dt%5C%22%3A%5C%22iPhone11%2C8%5C%22%2C%5C%22ma%5C%22%3A%5C%22%5C%22%2C%5C%22im%5C%22%3A%5C%22%5C%22%2C%5C%22os%5C%22%3A%5C%22iOS%5C%22%2C%5C%22osv%5C%22%3A%5C%2213.4.1%5C%22%2C%5C%22ip%5C%22%3A%5C%22112.96.195.152%5C%22%2C%5C%22apid%5C%22%3A%5C%22jdapp%5C%22%2C%5C%22ia%5C%22%3A%5C%22F75E8AED-CB48-4EAC-A213-E8CE4018F214%5C%22%2C%5C%22uu%5C%22%3A%5C%22%5C%22%2C%5C%22cv%5C%22%3A%5C%229.0.0%5C%22%2C%5C%22nt%5C%22%3A%5C%224G%5C%22%2C%5C%22at%5C%22%3A%5C%221%5C%22%2C%5C%22fp%5C%22%3A%5C%226ac83e85e8bad60325c9256c79d9dc0e%5C%22%2C%5C%22token%5C%22%3A%5C%22WP3SV4JYWPIYTZXFLXOZ3GDOWIDJAIRIJUOMFBUCDYHBEJNVTKBHASOUPH3CIVUUZFONQB2T57XU2%5C%22%7D%22%7D'
  request('login', data).then((res) => {
    console.log(`登录信息:${JSON.stringify(res)}\n`);
    if (res && res.resultCode === 0) {
      console.log('resultCode为0')
      if (res.resultData.data) {
        console.log('res.resultData.data有值')
        userInfo = res.resultData.data;
        gen.next();
        // dayWork(res.resultData.data)
      }
    } else {
      console.log('走了else')
    }
  });
}
function sign() {
  console.log('每日签到')
  const data = 'reqData={"source":2,"workType":1,"opType":2}';
  request('doWork', data).then((res) => {
    console.log(`签到结果:${JSON.stringify(res)}`);
    // gen.next();
  });
}
function dayWork(userInfo) {
  console.log(`开始做任务userInfo了\n`)
  const data = 'reqData={"source":2,"linkMissonIds":["666","667"],"LinkMissonIdValues":[7,7]}';
  request('dayWork', data).then((response ) => {
    console.log(`做任务结果:${JSON.stringify(response)}\n`)
    let canTask = [];
    if (response.resultCode === 0) {
      if (response.resultData.code === '200') {
        response.resultData.data.map((item) => {
          if (item.prizeType === 2) {
            canTask.push(item);
          }
        })
      }
    }
    console.log(`canTask::${canTask}\n`)
    console.log(`canTask::${JSON.stringify(canTask)}\n`)
    for (let item of canTask) {
      if (item.workType === 1) {
        //  签到任务
        if (item.workStatus === 0) {
          sign();
        } else if (item.workStatus === 2) {
          console.log(`签到任务已经做过`)
        }
      } else if (item.workType === 2) {
        // 分享任务
        if (item.workStatus === 0) {
          share();
        } else if (item.workStatus === 2) {
          console.log(`分享任务已经做过`)
        }
      }
    }
    gen.next();
  })
}

function harvest(userInfo) {
  console.log(`收获的操作:${JSON.stringify(userInfo)}`)
}
function share() {
  console.log(`开始做分享任务了\n`)
  const data = 'reqData={"source":0,"workType":2,"opType":1}';
  request('doWork', data).then(res => {
    console.log(`分享111:${JSON.stringify(res)}`)
    setTimeout(() => {
      const data2 = 'reqData={"source":0,"workType":2,"opType":2}';
      request('doWork', data2).then(res => {
        console.log(`分享222:${JSON.stringify(res)}`)
      })
    }, 2000)
  })
  // await sleep(3);

}
//等待一下
function sleep(s) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, s * 1000);
  })
}
// function request(function_id, body = {}) {
//   $hammer.request('GET', taskurl(function_id, body), (error, response) => {
//     error ? $hammer.log("Error:", error) : sleep(JSON.parse(response.body));
//   })
// }
// function taskurl(function_id, body = {}) {
//   return {
//     url: `${JD_API_HOST}/${function_id}?_=${new Date().getTime()*1000}&reqData=${escape(JSON.stringify(body))}`,
//     headers: {
//       'Cookie': cookie,
//       'Host': 'ms.jr.jd.com',
//       'Accept': 'application/json',
//       'Origin': 'https://uuj.jr.jd.com',
//       'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
//       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//       'Referer': 'https://uuj.jr.jd.com/wxgrowing/moneytree7/index.html?channellv=sy',
//       'Accept-Language': 'zh-CN,en-US;q=0.8',
//       'X-Requested-With': 'com.jd.jrapp',
//     }
//   }
// }


async function request(function_id, body = {}) {
  await sleep(2); //歇口气儿, 不然会报操作频繁
  return new Promise((resolve, reject) => {
    $hammer.request('POST', taskurl(function_id,body), (error, response) => {
      if(error){
        $hammer.log("Error:", error);
      }else{
        console.log('response', response)
        resolve(JSON.parse(response));
      }
    })
  })
  // $hammer.request('POST', taskurl(function_id, body), (error, response) => {
  //   error ? $hammer.log("Error:", error) : sleep(JSON.parse(response));
  // })
}

function taskurl(function_id, body) {
  return {
    url: JD_API_HOST + '/' + function_id + '?_=' + new Date().getTime()*1000,
    body: `${body}`,
    headers: {
      'Accept' : `application/json`,
      'Origin' : `https://uua.jr.jd.com`,
      'Accept-Encoding' : `gzip, deflate, br`,
      'Cookie' : cookie,
      'Content-Type' : `application/x-www-form-urlencoded;charset=UTF-8`,
      'Host' : `ms.jr.jd.com`,
      'Connection' : `keep-alive`,
      'User-Agent' : `jdapp;iPhone;9.0.0;13.4.1;e35caf0a69be42084e3c97eef56c3af7b0262d01;network/4g;ADID/F75E8AED-CB48-4EAC-A213-E8CE4018F214;supportApplePay/3;hasUPPay/0;pushNoticeIsOpen/1;model/iPhone11,8;addressid/2005183373;hasOCPay/0;appBuild/167237;supportBestPay/0;jdSupportDarkMode/0;pv/1287.19;apprpd/MyJD_GameMain;ref/https%3A%2F%2Fuua.jr.jd.com%2Fuc-fe-wxgrowing%2Fmoneytree%2Findex%2F%3Fchannel%3Dyxhd%26lng%3D113.325843%26lat%3D23.204628%26sid%3D2d98e88cf7d182f60d533476c2ce777w%26un_area%3D19_1601_50258_51885;psq/1;ads/;psn/e35caf0a69be42084e3c97eef56c3af7b0262d01|3485;jdv/0|kong|t_1000170135|tuiguang|notset|1593059927172|1593059927;adk/;app_device/IOS;pap/JA2015_311210|9.0.0|IOS 13.4.1;Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
      'Referer' : `https://uua.jr.jd.com/uc-fe-wxgrowing/moneytree/index/?channel=yxhd&lng=113.325896&lat=23.204600&sid=2d98e88cf7d182f60d533476c2ce777w&un_area=19_1601_50258_51885`,
      'Accept-Language' : `zh-cn`
    }
  }
}