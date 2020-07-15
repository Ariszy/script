/*
京东京喜工厂
未完，待续
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
const cookie = $hammer.read('CookieJD');
let shareCodes = [
    'V5LkjP4WRyjeCKR9VRwcRX0bBuTz7MEK0-E99EJ7u0k=',
];
let factoryId, productionId, userTaskStatusList, dailyTask = [], produceTask = [];
const name = '京喜工厂';
let message = '';
let subTitle = '';
const Task = step()
Task.next();
function* step() {
  const startTime = Date.now();
  yield userInfo();
  yield collectElectricity();
  yield investElectric();
  yield taskList();
  //yield produceTaskFun();//生产任务
  const end = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n完成${name}脚本耗时:  ${end} 秒\n`);
  $hammer.alert(name, message, subTitle);
}

function produceTaskFun() {
  for (let item of produceTask) {
    if (item.awardStatus !== 1) {
      if (item.completedTimes >= item.targetTimes) {
        const url = `/newtasksys/newtasksys_front/Award?source=dreamfactory&bizCode=dream_factory&taskId=${item.taskId}&sceneval=2&g_login_type=1`;
        request(url).then((res) => {
          console.log(`每日任务完成结果${JSON.stringify(res)}}`);
          try {
            if (res.ret === 0) {
              console.log(`${item.taskName}任务完成`)
            }
          } catch (e) {
            console.log(`${item.taskName}任务异常`)
          }
        })
      }
    }
  }
  Task.next();
}

// 收取发电机的电力
function collectElectricity() {
 const url = `/dreamfactory/generator/CollectCurrentElectricity?zone=dream_factory&apptoken=&pgtimestamp=&phoneID=&factoryid=${factoryId}&doubleflag=1&sceneval=2`;
 request(url).then((res) => {
   try {
     if (res.ret === 0) {
       console.log(`成功从发电机收取${res.data.CollectElectricity}电力`);
     }
     Task.next();
   } catch (e) {
     console.log('收集电力异常')
   }
 })
}
// 投入电力
function investElectric() {
  const url = `/dreamfactory/userinfo/InvestElectric?zone=dream_factory&productionId=${productionId}&sceneval=2&g_login_type=1`;
  request(url).then((res) => {
    try {
      if (res.ret === 0) {
        console.log(`成功投入电力${res.data.investElectric}电力`);
        message += `【投入电力】${res.data.investElectric}`;
      } else {
        console.log(`投入失败，${res.message}`);
      }
      Task.next();
    } catch (e) {
      console.log('收集电力异常')
    }
  })
}
// 初始化任务
function taskList() {
  const url = `/newtasksys/newtasksys_front/GetUserTaskStatusList?source=dreamfactory&bizCode=dream_factory&sceneval=2&g_login_type=1`;
  request(url).then((res) => {
    try {
      //console.log(`${JSON.stringify(res)}`)
      //console.log(res)
      if (res.ret === 0) {
        userTaskStatusList = res.data.userTaskStatusList;
        for (let item of res.data.userTaskStatusList) {
          if (item.dateType === 2) {
            dailyTask.push(item);
          }
          if (item.dateType === 1) {
            produceTask.push(item);
          }
        }
        Task.next();
      }
    } catch (e) {
      console.log('初始化任务异常')
    }
  }).catch((error) => {
    console.log(error)
  })
}
//初始化个人信息
function userInfo() {
  const url = `/dreamfactory/userinfo/GetUserInfo?zone=dream_factory&pin=&sharePin=&shareType=&materialTuanPin=&materialTuanId=&sceneval=2`;
  request(url).then((response) => {
    try {
      // taskInfo = res.data.result.taskInfos;
      if (response.ret === 0) {
        const { data } = response;
        // !data.productionList && !data.factoryList
        if (data.factoryList && data.productionList) {
          const production = data.productionList[0];
          const factory = data.factoryList[0];
          factoryId = factory.factoryId;//工厂ID
          productionId = production.productionId;//商品ID
          subTitle = data.user.pin;
          console.log(`\n我的分享码\n${data.user.encryptPin}\n`);
          // console.log(`进度：${(production.investedElectric/production.needElectric).toFixed(2) * 100}%\n`);
          message += `【生产进度】${((production.investedElectric / production.needElectric) * 100).toFixed(2)}%\n`;
          Task.next();
        } else {
          return $hammer.alert(name, '\n【提示】此账号京喜工厂活动未开始\n请手动去京东APP->游戏与互动->查看更多->京喜工厂 开启活动\n');
        }
      } else {
        Task.return();
      }
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

async function request(url, body = {}) {
  await sleep(2); //歇口气儿, 不然会报操作频繁
  return new Promise((resolve, reject) => {
    $hammer.request('GET', taskurl(url, body), (error, response) => {
      if(error){
        $hammer.log("Error:", error);
      }else{
        //console.log(response.body)
        resolve(JSON.parse(response.body));
      }
    })
  })
}

function taskurl(url, body) {
  return {
    url: `${JD_API_HOST}${url}`,
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