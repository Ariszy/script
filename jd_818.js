/*
京东手机狂欢城活动，每日可获得30+以上京豆（其中20京豆是往期奖励，需第一天参加活动后，第二天才能拿到）
活动时间10.21日-11.12日结束，活动23天，保底最少可以拿到690京豆
活动地址: https://rdcseason.m.jd.com/#/index

更新日期：2020-10-21

其中有20京豆是往期奖励，需第一天参加活动后，第二天才能拿到！！！！


每天0/6/12/18点逛新品/店铺/会场可获得京豆，京豆先到先得
往期奖励一般每天都能拿20京豆

注：脚本运行会给我提供的助力码助力，介意者可删掉脚本第48行helpCode里面的东西。留空即可（const helpCode = []）;

支持京东双账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
// quantumultx
[task_local]
#京东手机狂欢城
1 0-18/6 * * * https://raw.githubusercontent.com/lxk0301/scripts/master/jd_818.js, tag=京东手机狂欢城, enabled=true
// Loon
[Script]
cron "1 0-18/6 * * *" script-path=https://raw.githubusercontent.com/lxk0301/scripts/master/jd_818.js,tag=京东手机狂欢城
// Surge
京东手机狂欢城 = type=cron,cronexp=1 0-18/6 * * *,wake-system=1,timeout=20,script-path=https://raw.githubusercontent.com/lxk0301/scripts/master/jd_818.js
 */
const $ = new Env('京东手机狂欢城');

const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';

//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '';
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr.push($.getdata('CookieJD'));
  cookiesArr.push($.getdata('CookieJD2'));
}

const JD_API_HOST = 'https://rdcseason.m.jd.com/api/';
const activeEndTime = '2020/11/13 01:00:00';
const helpCode = [
  "0f5232fe-c15f-41bc-9c12-012fbb1b4ec5",
  "131cb822-0602-4de6-84d1-5eb025b4522b",
  "55b880fe-968d-4d3c-9ad6-901f022db114",
  "3964a720-45b1-47fe-bd71-5ed59c5f1ef7",
  "ab142b66-b35b-4a07-90d3-4afd8b20da55",
  "2e9bf385-5970-47c4-b46a-fdeff39f3971",
  "b6dc6d17-466a-4a9e-8e20-7741993355af",
  "5eb00d42-2737-48ef-ad20-397dcef6947d",
  "245ec67d-0bd6-4ba2-95e2-eeb02290a0f8",
  "f19ff7f7-0ad4-45d5-8c0b-ae75aead3546",
  "5d57f9ac-5f6a-4ebd-88de-8d83feb5028d",
  "9ba9260a-b75d-4d62-8cf9-e7f5a5e11f2d",
  "8e66f648-e1b4-4a82-863d-9ee03f86dd54",
  "99641b5e-6ab4-4e45-ba71-5230e1ecd18c",
  "e5dec4f9-4aa6-4fe7-b561-12376f5e92f1",
  "1bc4d5dd-1861-4633-8a65-8f060b634472",
  "e4ec2df5-36b1-4f57-b2e7-7c6bf7dd03e5",
  "822d762c-606a-4825-b7b7-275e017f36fd",
  "2dcb416a-7ef3-49c6-bd7a-52e373087b92",
  "1f2ebccb-ca94-4061-9c3d-b2ec5a0bf4ee",
  "e1d159cf-733e-42ef-9316-a19949f7755f",
  "9df83fce-18d1-411a-9205-ca0714c11aa3",
  "b4c77297-ddcb-4c42-89f7-ab7df3cbf308",
  "59ef1465-f389-470e-b90e-6e5eaccdd420",
  "ef8e31e6-f89c-4a96-ab20-a442ae82ea96",
  "492e45b8-5043-42b8-a1ae-567d49b98f91",
  "5242c383-ffbb-46a7-b268-eab22c111044",
  "4eb76832-3eaf-4791-8c82-98d1522882e6",
  "7d592442-fe86-4147-a8ad-7c4b2bd233cc",
  "00336d69-fe57-45df-8b7b-ea5df17607a0",
  "76a77c8e-15e2-42e5-ae10-e873aaea9b3f",
  "7437cf01-2f2a-4f29-bf13-82929854a993",
  "df552290-c2a1-4987-8f15-2faed6536474","187f60ed-6539-4b12-b82c-18a875a9c53f","f7fe01da-6a4f-4f2f-9697-046a89d599d7","7c117795-cf1b-4152-833e-ad1487526381","6230fde3-f2a4-497f-8800-044d842a8ead","83e17f11-a4dd-4697-9ca2-9f7c23564131","9423b241-8e20-423e-a2fb-cc987992f2fa","b836c7c9-8da5-4a58-bda9-74765cbbc568","01a4b9f3-86d0-4523-9cb0-8b13220e065d","f1c745ef-7483-486a-9738-22c6e60ffc92","a4b1d604-1e4c-43fc-9cd4-80617e4d27d6","71fb64f7-3a44-4d82-93b8-0da55f286c52","ba264bdb-3ae8-49a0-9f10-ddb110d10e20","16709049-6be6-499c-9cca-7c95acf9bc7d","46bc321b-5946-4750-81c2-e97d0434462b","f22f33d5-994f-4033-9564-30e73f097d86","483102af-56e8-48f3-95d4-b988981990d5","36d2f5ee-004b-472b-9f5e-003cf8a058bf","da2fbe2d-771b-43d0-b73b-dc52683f68f1","74c70086-4852-462f-808d-af36e0fafce1","29e80016-06ae-4ec1-886b-aa07d80f3955","2029f76c-7ac3-4718-a8a3-5bc7aa258a1f","eb5c4a5e-2d30-4e87-a05c-ce3084086e55","3c591a04-ab6b-46e7-b6fe-64b3e9f8c570","e91c0bcd-b934-4d46-83e3-59cb3b753d49","55f8b7c7-2255-44e2-9fd8-b67475932b55","09120a8e-c0df-433c-b3ac-b1630598210f"]
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {"open-url": "https://bean.m.jd.com/"});
    return;
  }
  $.temp = [];
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
      $.index = i + 1;
      console.log(`\n开始【京东账号${$.index}】${$.UserName}\n`);
      message = '';
      subTitle = '';
      await JD818();
      // await getHelp();
      // await doHelp();
    }
  }
  console.log($.temp)
})()
    .catch((e) => {
      $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
      $.done();
    })
async function JD818() {
  await getHelp();
  await listGoods();//逛新品
  await shopInfo();//逛店铺
  await listMeeting();//逛会场
  await $.wait(1000);
  //再次运行一次，避免出现遗漏的问题
  await listGoods();//逛新品
  await shopInfo();//逛店铺
  await listMeeting();//逛会场
  await doHelp();
  await myRank();//领取往期排名奖励
  await getListJbean();
  await getListRank();
  await getListIntegral();
  await showMsg()
}
function listMeeting() {
  const options = {
    'url': `${JD_API_HOST}task/listMeeting?t=${Date.now()}`,
    'headers': {
      'Host': 'rdcseason.m.jd.com',
      'Accept': 'application/json, text/plain, */*',
      'Connection':' keep-alive',
      'Cookie': cookie,
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.14(0x17000e2a) NetType/4G Language/zh_CN',
      'Accept-Language': 'zh-cn',
      'Referer': `https://rdcseason.m.jd.com/?reloadWQPage=t_${Date.now()}`,
      'Accept-Encoding': 'gzip, deflate, br'
    }
  }
  return new Promise((resolve) => {
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          // console.log('ddd----ddd', data.code)
          if (data.code === 200 && data.data.meetingList) {
            let integralNum = 0, jdNum = 0;
            for (let item of data.data.meetingList) {
              let res = await browseMeeting(item.id);
              if (res.code === 200) {
                let res2 = await getMeetingPrize(item.id);
                integralNum += res2.data.integralNum * 1;
                jdNum += res2.data.jdNum * 1;
              }
              // await browseMeeting('1596206323911');
              // await getMeetingPrize('1596206323911');
            }
            console.log(`逛会场--获得积分:${integralNum}`)
            console.log(`逛会场--获得京豆:${jdNum}`)
        }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
function listGoods() {
  const options = {
    'url': `${JD_API_HOST}task/listGoods?t=${Date.now()}`,
    'headers': {
      'Host': 'rdcseason.m.jd.com',
      'Accept': 'application/json, text/plain, */*',
      'Connection':' keep-alive',
      'Cookie': cookie,
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.14(0x17000e2a) NetType/4G Language/zh_CN',
      'Accept-Language': 'zh-cn',
      'Referer': `https://rdcseason.m.jd.com/?reloadWQPage=t_${Date.now()}`,
      'Accept-Encoding': 'gzip, deflate, br'
    }
  }
  return new Promise( (resolve) => {
    $.get(options, async (err, resp, data) => {
      try {
        // console.log('data1', data);
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.code === 200 && data.data.goodsList) {
            let integralNum = 0, jdNum = 0;
            for (let item of data.data.goodsList) {
              let res = await browseGoods(item.id);
              if (res.code === 200) {
                let res2 = await getGoodsPrize(item.id);
                // console.log('逛新品领取奖励res2', res2);
                integralNum += res2.data.integralNum * 1;
                jdNum += res2.data.jdNum * 1;
              }
            }
            console.log(`逛新品获得积分:${integralNum}`)
            console.log(`逛新品获得京豆:${jdNum}`)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  });
}
function shopInfo() {
  const options = {
    'url': `${JD_API_HOST}task/shopInfo?t=${Date.now()}`,
    'headers': {
      'Host': 'rdcseason.m.jd.com',
      'Accept': 'application/json, text/plain, */*',
      'Connection':' keep-alive',
      'Cookie': cookie,
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.14(0x17000e2a) NetType/4G Language/zh_CN',
      'Accept-Language': 'zh-cn',
      'Referer': `https://rdcseason.m.jd.com/?reloadWQPage=t_${Date.now()}`,
      'Accept-Encoding': 'gzip, deflate, br'
    }
  }
  return new Promise( (resolve) => {
    $.get(options, async (err, resp, data) => {
      try {
        // console.log('data1', data);
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.code === 200 && data.data) {
            let integralNum = 0, jdNum = 0;
            for (let item of data.data) {
              let res = await browseShop(item.shopId);
              // console.log('res', res)
              // res = JSON.parse(res);
              // console.log('res', res.code)
              if (res.code === 200) {
                // console.log('---')
                let res2 = await getShopPrize(item.shopId);
                // console.log('res2', res2);
                // res2 = JSON.parse(res2);
                integralNum += res2.data.integralNum * 1;
                jdNum += res2.data.jdNum * 1;
              }
            }
            console.log(`逛店铺获得积分:${integralNum}`)
            console.log(`逛店铺获得京豆:${jdNum}`)
          }
        }
        // console.log('data1', data);
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    })
  })

}
function browseGoods(id) {
  const options = {
    "url": `${JD_API_HOST}task/browseGoods?t=${Date.now()}&skuId=${id}`,
    "headers": {
      "Host": "rdcseason.m.jd.com",
      "Accept": "application/json, text/plain, */*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1",
      "Accept-Language": "zh-cn",
      "Referer": "https://rdcseason.m.jd.com/",
      "Accept-Encoding": "gzip, deflate, br"
    }
  }
  return new Promise( (resolve) => {
    $.get(options, (err, resp, data) => {
      try {
        // console.log('data1', data);
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
        }
        // console.log('data1', data);
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

function getGoodsPrize(id) {
  const options = {
    "url": `${JD_API_HOST}task/getGoodsPrize?t=${Date.now()}&skuId=${id}`,
    "headers": {
      "Host": "rdcseason.m.jd.com",
      "Accept": "application/json, text/plain, */*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1",
      "Accept-Language": "zh-cn",
      "Referer": "https://rdcseason.m.jd.com/",
      "Accept-Encoding": "gzip, deflate, br"
    }
  }
  return new Promise( (resolve) => {
    $.get(options, (err, resp, data) => {
      try {
        // console.log('data1', data);
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
function browseShop(id) {
  const options2 = {
    "url": `${JD_API_HOST}task/browseShop`,
    "body": `shopId=${id}`,
    "headers": {
      "Host": "rdcseason.m.jd.com",
      "Accept": "application/json, text/plain, */*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1",
      "Accept-Language": "zh-cn",
      "Referer": "https://rdcseason.m.jd.com/",
      "Accept-Encoding": "gzip, deflate, br"
    }
  }
  return new Promise( (resolve) => {
    $.post(options2, (err, resp, data) => {
      try {
        // console.log('data1', data);
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
function getShopPrize(id) {
  const options = {
    "url": `${JD_API_HOST}task/getShopPrize`,
    "body": `shopId=${id}`,
    "headers": {
      "Host": "rdcseason.m.jd.com",
      "Accept": "application/json, text/plain, */*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1",
      "Accept-Language": "zh-cn",
      "Referer": "https://rdcseason.m.jd.com/",
      "Accept-Encoding": "gzip, deflate, br"
    }
  }
  return new Promise( (resolve) => {
    $.post(options, (err, resp, data) => {
      try {
        // console.log('getShopPrize', data);
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

function browseMeeting(id) {
  const options2 = {
    "url": `${JD_API_HOST}task/browseMeeting`,
    "body": `meetingId=${id}`,
    "headers": {
      "Host": "rdcseason.m.jd.com",
      "Accept": "application/json, text/plain, */*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1",
      "Accept-Language": "zh-cn",
      "Referer": "https://rdcseason.m.jd.com/",
      "Accept-Encoding": "gzip, deflate, br"
    }
  }
  return new Promise( (resolve) => {
    $.post(options2, (err, resp, data) => {
      try {
        // console.log('点击浏览会场', data);
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
function getMeetingPrize(id) {
  const options = {
    "url": `${JD_API_HOST}task/getMeetingPrize`,
    "body": `meetingId=${id}`,
    "headers": {
      "Host": "rdcseason.m.jd.com",
      "Accept": "application/json, text/plain, */*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1",
      "Accept-Language": "zh-cn",
      "Referer": "https://rdcseason.m.jd.com/",
      "Accept-Encoding": "gzip, deflate, br"
    }
  }
  return new Promise( (resolve) => {
    $.post(options, (err, resp, data) => {
      try {
        // console.log('getMeetingPrize', data);
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
function myRank() {
  return new Promise(resolve => {
    const options = {
      "url": `${JD_API_HOST}task/myRank?t=${Date.now()}`,
      "headers": {
        "Host": "rdcseason.m.jd.com",
        "Accept": "application/json, text/plain, */*",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1",
        "Accept-Language": "zh-cn",
        "Referer": "https://rdcseason.m.jd.com/",
        "Accept-Encoding": "gzip, deflate, br"
      }
    }
    $.jbeanNum = '';
    $.get(options, async (err, resp, data) => {
      try {
        // console.log('查询获奖列表data', data);
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.code === 200 && data.data.myHis) {
            for (let i = 0; i < data.data.myHis.length; i++) {
              $.date = data.data.myHis[0].date;
              if (data.data.myHis[i].status === '21') {
                await $.wait(1000);
                console.log('开始领奖')
                let res = await saveJbean(data.data.myHis[i].id);
                // console.log('领奖结果', res)
                if (res.code === 200 && res.data.rsCode === 200) {
                  // $.jbeanNum += Number(res.data.jbeanNum);
                  console.log(`${data.data.myHis[i].date}日奖励领取成功${JSON.stringify(res.data.jbeanNum)}`)
                }
              }
              if (i === 0 && data.data.myHis[i].status === '22') {
                $.jbeanNum = data.data.myHis[i].prize;
              }
            }
            // for (let item of data.data.myHis){
            //   if (item.status === '21') {
            //     await $.wait(1000);
            //     console.log('开始领奖')
            //     let res = await saveJbean(item.id);
            //     // console.log('领奖结果', res)
            //     if (res.code === 200 && res.data.rsCode === 200) {
            //       $.jbeanNum += Number(res.data.jbeanNum);
            //     }
            //   }
            // }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function saveJbean(id) {
  return new Promise(resolve => {
    const options = {
      "url": `${JD_API_HOST}task/saveJbean`,
      "body": `prizeId=${id}`,
      "headers": {
        "Host": "rdcseason.m.jd.com",
        "Accept": "application/json, text/plain, */*",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1",
        "Accept-Language": "zh-cn",
        "Referer": "https://rdcseason.m.jd.com/",
        "Accept-Encoding": "gzip, deflate, br"
      }
    }
    $.post(options, (err, resp, data) => {
      try {
        // console.log('领取京豆结果', data);
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
async function doHelp() {
  for (let item of helpCode) {
    const helpRes = await toHelp(item.trim());
    if (helpRes.data.status === 5) {
      console.log(`助力机会已耗尽，跳出助力`);
      break;
    } else if (helpRes.data.status === 2) {
      console.log(`助力机会失效，跳出`);
      break;
    }
  }
}

function toHelp(code) {
  return new Promise(resolve => {
    const options = {
      "url": `${JD_API_HOST}task/toHelp`,
      "body": `shareId=${code}`,
      "headers": {
        "Host": "rdcseason.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": "https://rdcseason.m.jd.com",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": cookie,
        "Connection": "keep-alive",
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "jdapp;iPhone;9.1.0;14.0;e35caf0a69be42084e3c97eef56c3af7b0262d01;network/4g;supportApplePay/3;hasUPPay/0;pushNoticeIsOpen/1;model/iPhone11,8;addressid/2005183373;hasOCPay/0;appBuild/167348;supportBestPay/0;jdSupportDarkMode/0;pv/252.3;apprpd/Home_Main;ref/JDWebViewController;psq/2;ads/;psn/e35caf0a69be42084e3c97eef56c3af7b0262d01|695;jdv/0|kong|t_2010957099_|jingfen|3b5422e836e74037862fea3dcf1a6802|1600647811440|1600647814;adk/;app_device/IOS;pap/JA2015_311210|9.1.0|IOS 14.0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Referer": "https://rdcseason.m.jd.com/",
        "Content-Length": "44",
        "Accept-Language": "zh-cn"
      }
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          console.log(`助力结果:${data}`);
          data = JSON.parse(data);
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function getHelp() {
  return new Promise(resolve => {
    const options = {
      "url": `${JD_API_HOST}task/getHelp?t=${Date.now()}`,
      "headers": {
        "Host": "rdcseason.m.jd.com",
        "Accept": "application/json, text/plain, */*",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "User-Agent": "jdapp;iPhone;9.1.0;14.0;e35caf0a69be42084e3c97eef56c3af7b0262d01;network/4g;supportApplePay/3;hasUPPay/0;pushNoticeIsOpen/1;model/iPhone11,8;addressid/2005183373;hasOCPay/0;appBuild/167348;supportBestPay/0;jdSupportDarkMode/0;pv/255.2;apprpd/Home_Main;ref/JDMainPageViewController;psq/1;ads/;psn/e35caf0a69be42084e3c97eef56c3af7b0262d01|701;jdv/0|kong|t_2010957099_|jingfen|3b5422e836e74037862fea3dcf1a6802|1600647811440|1600647814;adk/;app_device/IOS;pap/JA2015_311210|9.1.0|IOS 14.0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Accept-Language": "zh-cn",
        "Referer": "https://rdcseason.m.jd.com",
        "Accept-Encoding": "gzip, deflate, br"
      }
    }
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.code === 200) {
            console.log(`\n您的助力码shareId(互助码每天都是变化的)\n\n"${data.data.shareId}",\n`);
            $.temp.push(data.data.shareId);
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
//获取当前活动总京豆数量
function getListJbean() {
  return new Promise(resolve => {
    const options = {
      "url": `${JD_API_HOST}task/listJbean?pageNum=1`,
      "headers": {
        "Host": "rdcseason.m.jd.com",
        "Accept": "application/json, text/plain, */*",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "User-Agent": "jdapp;iPhone;9.1.0;14.0;e35caf0a69be42084e3c97eef56c3af7b0262d01;network/4g;supportApplePay/3;hasUPPay/0;pushNoticeIsOpen/1;model/iPhone11,8;addressid/2005183373;hasOCPay/0;appBuild/167348;supportBestPay/0;jdSupportDarkMode/0;pv/255.2;apprpd/Home_Main;ref/JDMainPageViewController;psq/1;ads/;psn/e35caf0a69be42084e3c97eef56c3af7b0262d01|701;jdv/0|kong|t_2010957099_|jingfen|3b5422e836e74037862fea3dcf1a6802|1600647811440|1600647814;adk/;app_device/IOS;pap/JA2015_311210|9.1.0|IOS 14.0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Accept-Language": "zh-cn",
        "Referer": "https://rdcseason.m.jd.com",
        "Accept-Encoding": "gzip, deflate, br"
      }
    }
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.code === 200) {
            $.jbeanCount = data.data.jbeanCount;
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function getListIntegral() {
  return new Promise(resolve => {
    const options = {
      "url": `${JD_API_HOST}task/listIntegral?pageNum=1`,
      "headers": {
        "Host": "rdcseason.m.jd.com",
        "Accept": "application/json, text/plain, */*",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "User-Agent": "jdapp;iPhone;9.1.0;14.0;e35caf0a69be42084e3c97eef56c3af7b0262d01;network/4g;supportApplePay/3;hasUPPay/0;pushNoticeIsOpen/1;model/iPhone11,8;addressid/2005183373;hasOCPay/0;appBuild/167348;supportBestPay/0;jdSupportDarkMode/0;pv/255.2;apprpd/Home_Main;ref/JDMainPageViewController;psq/1;ads/;psn/e35caf0a69be42084e3c97eef56c3af7b0262d01|701;jdv/0|kong|t_2010957099_|jingfen|3b5422e836e74037862fea3dcf1a6802|1600647811440|1600647814;adk/;app_device/IOS;pap/JA2015_311210|9.1.0|IOS 14.0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Accept-Language": "zh-cn",
        "Referer": "https://rdcseason.m.jd.com",
        "Accept-Encoding": "gzip, deflate, br"
      }
    }
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.code === 200) {
            $.integralCount = data.data.integralCount;
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

//查询今日累计积分与排名
function getListRank() {
  return new Promise(resolve => {
    const options = {
      "url": `${JD_API_HOST}task/listRank?t=${Date.now()}`,
      "headers": {
        "Host": "rdcseason.m.jd.com",
        "Accept": "application/json, text/plain, */*",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "User-Agent": "jdapp;iPhone;9.1.0;14.0;e35caf0a69be42084e3c97eef56c3af7b0262d01;network/4g;supportApplePay/3;hasUPPay/0;pushNoticeIsOpen/1;model/iPhone11,8;addressid/2005183373;hasOCPay/0;appBuild/167348;supportBestPay/0;jdSupportDarkMode/0;pv/255.2;apprpd/Home_Main;ref/JDMainPageViewController;psq/1;ads/;psn/e35caf0a69be42084e3c97eef56c3af7b0262d01|701;jdv/0|kong|t_2010957099_|jingfen|3b5422e836e74037862fea3dcf1a6802|1600647811440|1600647814;adk/;app_device/IOS;pap/JA2015_311210|9.1.0|IOS 14.0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Accept-Language": "zh-cn",
        "Referer": "https://rdcseason.m.jd.com",
        "Accept-Encoding": "gzip, deflate, br"
      }
    }
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.code === 200) {
            if (data.data.my) {
              $.integer = data.data.my.integer;
              $.num = data.data.my.num;
            }
            if (data.data.last) {
              $.lasNum = data.data.last.num;
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function showMsg() {
  if (Date.now() > new Date(activeEndTime).getTime()) {
    $.msg($.name, '活动已结束', `该活动累计获得京豆：${$.jbeanCount}个\niOS用户请删除此脚本\ngithub action用户请删除.github/workflows/jd_818.yml文件\n如果帮助到您可以点下🌟STAR鼓励我一下,谢谢\n咱江湖再见\nhttps://github.com/lxk0301/scripts`, {"open-url": "https://github.com/lxk0301/scripts"});
    if ($.isNode()) notify.sendNotify($.name + '活动已结束', `请删除此脚本\ngithub action用户请删除.github/workflows/jd_818.yml文件\n如果帮助到您可以点下🌟STAR鼓励我一下,谢谢\n咱江湖再见\n https://github.com/lxk0301/scripts`)
  } else {
    $.msg($.name, `京东账号${$.index} ${$.UserName}`, `${$.jbeanCount ? `${$.integer ? `今日获得积分：${$.integer}个\n` : ''}${$.num ? `今日排名：${$.num}\n` : ''}今日参数人数：${$.lasNum}人\n累计获得京豆：${$.jbeanCount}个🐶\n` : ''}${$.jbeanCount ? `累计获得积分：${$.integralCount}个\n` : ''}${$.jbeanNum ? `${$.date}日奖品：${$.jbeanNum}\n` : ''}具体详情点击弹窗跳转后即可查看`, {"open-url": "https://rdcseason.m.jd.com/#/hame"});
  }
}
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
