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
  'e6315530-dbdd-4d99-9f53-22682be605a9',
  'a6c915ee-207e-4d2a-9b50-fabed4504834',
  'a86a36af-5e10-46ac-9718-907e1bb3b0b7',
  'ba7c27d9-fd8f-4fed-ac77-a8f4cb1b6b03',
  'a308f016-48cb-4d68-8bb5-613d86616bf0',
  'de76309f-a155-4b54-81fe-5b87c7eb250d',
  "357a2f62-24eb-4a8c-a1bf-e15c99b9b12e",
  "61952c20-666c-48f2-a612-5664e790a1f7",
  "3a1762d9-00d6-48d2-a15e-260cfe00e9f3",
  "2bd8141e-d5e6-469f-81e5-284b5702f475",
  "09e58900-735b-4c24-bff1-74004cf34a64",
  "9b67730d-6b89-4c2f-8f95-75723f4f75df",
  "a1784daa-31e2-4fc2-83a1-766c66622c45",
  "c87ac1ae-77df-4fa3-8895-db2f32fd7b1e",
  "c6ff9bd3-296d-4bf9-8a5a-523cd72df6cb",
  "49ee613c-8d20-40d3-9d05-a4a15a114cd1",
  "dc6efa0a-cd35-4dd2-9ff9-b5d9bf0a15eb",
  '9246acfc-03c2-44bd-8abe-516101e6b07c',
  '29503370-fd3d-4f4b-bff3-483ac5e18447',
  '5e199233-1348-4caf-b1ab-97b765830fcb',
  'c2243e72-df24-4fff-8c66-a22af6756094',
  '7f32cc29-ba75-48fa-8200-813596a6415b',
  "693ff6f1-328d-491d-be77-d23b1205764c",
  "dfdec19e-9b9e-44b2-a0e9-05d4840d462c",
  "0a14dbfd-0325-4df5-ade5-7b7ed02e0e1a",
  "2de96c3a-7429-4714-be44-dc194e05d580",
  "c613b058-8a51-4ee2-adc6-f6cd2e8f4ccf",
  "492e45b8-5043-42b8-a1ae-567d49b98f91",
  "278cc6ce-8088-456d-ab5b-bbfea69e5215",
  "1c5bb35b-2a73-45fb-baf7-2c4112b3988f",
  "a6beb2f5-3f86-498d-a2f2-84cdb0de28e9",
  "bcf839d2-154d-461a-acd6-ee6e97d5119b",
  "d17dd145-db93-400e-9f7b-b8464bc37b65",
  "8fc6ba5a-e4a4-447d-890b-b5a5ba592a03",
  "d3ec3859-7999-4c88-89a8-844f14427f71",
  "0fb7b9fc-c4ba-4408-a728-f8e98ef1bf9b",
  "0b0bf805-f649-4dd7-a1f5-7a002ef49b37",
  "c4797680-dd46-43f4-a244-6f57ac7d9e5c",
  "567cce4f-f1d6-46d2-b7af-07ff50d0c8b5",
  "75c0df29-1f2e-455c-b840-24e7ae538a7e",
  "5c5bfbae-a746-47f2-926d-fdb0353e10cc",
  "3d5dd26b-8369-42de-b123-fc74b91b8646",
  "bb708470-aee0-41d8-a7b6-882d36488321",
  "953b49d8-84ca-46fe-ac19-bd4ef4c1b8fa",
  "0f352785-b882-4965-9101-9fe7b1094721",
  "d33386cf-725e-4f50-b3bd-fcfd7d0707b1",
  "c63cc46c-4d1a-4329-96c0-39ac2d0d75b1",
  "468a627d-3c95-4440-971b-f73ec8926370",
  "a075bafc-a949-438f-8f25-9f3536ea46a8",
  "516821eb-ae6e-4db9-bd91-372b64e5c62a",
  "e9bd0af5-0999-4048-9c0f-d4ec691dd338",
  "c87d18db-daf3-4cf7-8fc7-fc73e88a282c",
  "4ec73a82-1b7e-4167-988b-0087187d2fae",
  "04604622-4e76-4656-90db-dcce078af27b",
  "34742af8-4c19-43ef-a7fe-ec52e474ce18",
  "70d5ff4d-79d5-43a2-9699-c9bde4358cfb",
  "92588512-c581-4986-818f-4e3421e37666",
  "a9b84832-1b52-4f3b-87e6-2c630662b7c4",
  "5243f3c8-68c0-444b-a687-9be7dc89e887",
  "6ada3d37-2af8-429f-be2a-34c2138c112e",
  "613c69d9-bfb9-4b8b-ba7e-639fac347b16",
  "600f8821-decd-4499-b689-3165b4835bbc",
  "032cf534-2840-435b-94c3-cf2b7fb3c21b",
  "c6ae55e9-8a18-4b41-ac7a-07c518c58601",
  'a2caced1-8c0c-4b2d-b1d7-7fdb33edf384',
]
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
async function showMsg() {
  if (Date.now() > new Date(activeEndTime).getTime()) {
    $.msg($.name, '活动已结束', `该活动累计获得京豆：${$.jbeanCount}个\niOS用户请删除此脚本\ngithub action用户请删除.github/workflows/jd_818.yml文件\n如果帮助到您可以点下🌟STAR鼓励我一下,谢谢\n咱江湖再见\nhttps://github.com/lxk0301/scripts`, {"open-url": "https://github.com/lxk0301/scripts"});
    if ($.isNode()) await notify.sendNotify($.name + '活动已结束', `请删除此脚本\ngithub action用户请删除.github/workflows/jd_818.yml文件\n如果帮助到您可以点下🌟STAR鼓励我一下,谢谢\n咱江湖再见\n https://github.com/lxk0301/scripts`)
  } else {
    $.msg($.name, `京东账号${$.index} ${$.UserName}`, `${$.jbeanCount ? `${$.integer ? `今日获得积分：${$.integer}个\n` : ''}${$.num ? `今日排名：${$.num}\n` : ''}今日参数人数：${$.lasNum}人\n累计获得京豆：${$.jbeanCount}个🐶\n` : ''}${$.jbeanCount ? `累计获得积分：${$.integralCount}个\n` : ''}${$.jbeanNum ? `${$.date}日奖品：${$.jbeanNum}\n` : ''}具体详情点击弹窗跳转后即可查看`, {"open-url": "https://rdcseason.m.jd.com/#/hame"});
  }
}
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
