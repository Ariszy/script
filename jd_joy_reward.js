/*
宠汪汪积分兑换奖品脚本,未完成！未完成！未完成！
每日京豆库存会在0:00、8:00、16:00及时更新。
每个京东账户每天只可兑换一次，商品和京豆数量有限，兑完即止。
 */
const $ = new Env('宠汪汪积分兑换');
//如使用node.js。请在下方单引号内自行填写您抓取的京东Cookie
const Key = '';
//如需双账号签到,此处单引号内填写抓取的"账号2"Cookie, 否则请勿填写
const DualKey = '';
//直接用NobyDa的jd cookie
let cookie = Key ? Key : $.getdata('CookieJD');
const cookie2 = DualKey ? DualKey : $.getdata('CookieJD2');
let UserName = '';
const JD_API_HOST = 'https://jdjoy.jd.com/pet/';
!(async () => {
  if (!cookie) {
    $.msg('【京东账号一】宠汪汪积分兑换奖品失败', '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {"open-url": "https://bean.m.jd.com/"});
  } else {
    UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
    await joyReward();
  }
  await $.wait(1000);
  if (cookie2) {
    cookie = cookie2;
    UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/)[1]);
    await joyReward(cookie2);
  }
})()
    .catch((e) => {
      $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
      $.done();
    })

function joyReward() {
  return new Promise((resolve) => {
    const option = {
      url: `${JD_API_HOST}getExchangeRewards`,
      headers: {
        "Host": "jdjoy.jd.com",
        "Content-Type": "application/json",
        "Cookie": cookie,
        "reqSource": "h5",
        "Connection": "keep-alive",
        "Accept": "*/*",
        "User-Agent": "jdapp;iPhone;9.0.4;13.5.1;e35caf0a69be42084e3c97eef56c3af7b0262d01;network/4g;ADID/3B3AD5BC-B5E6-4A08-B32A-030CD805B5DD;supportApplePay/3;hasUPPay/0;pushNoticeIsOpen/1;model/iPhone11,8;addressid/2005183373;hasOCPay/0;appBuild/167283;supportBestPay/0;jdSupportDarkMode/1;pv/169.3;apprpd/MyJD_Main;ref/MyJdMTAManager;psq/2;ads/;psn/e35caf0a69be42084e3c97eef56c3af7b0262d01|638;jdv/0|iosapp|t_335139774|appshare|CopyURL|1596547194976|1596547198;adk/;app_device/IOS;pap/JA2015_311210|9.0.4|IOS 13.5.1;Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Referer": "https://jdjoy.jd.com/pet/index?un_area=19_1601_50258_51885&lng=113.3259159626279&lat=23.20454858044759",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br"
      },
    }
    $.get(option, (err, resp, data) => {
      try {
        data = JSON.parse(data);
        // console.log('data', data.data.length)
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    });
  })
}
