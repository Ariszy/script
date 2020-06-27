
/**
 * @fileoverview Template to compose HTTP reqeuest.
 *
 */
const cookie = $prefs.valueForKey('CookieJD');
const name = '京东摇钱树'
const JD_API_HOST = 'https://ms.jr.jd.com/gw/generic/uc/h5/m';
let userInfo = null;
let Task = step();
Task.next();

function* step() {
  userInfo = yield user_info();
  console.log('用户信息', userInfo);
  console.log('用户信息', JSON.stringify(userInfo));
}

function user_info() {
  const body = `reqData=%7B%22sharePin%22%3A%22%22%2C%22shareType%22%3A1%2C%22channelLV%22%3A%22%22%2C%22source%22%3A0%2C%22riskDeviceParam%22%3A%22%7B%5C%22eid%5C%22%3A%5C%22SCTUHAO57J4VK5VZZK347KLZKWSJJVQY3B4SHL24I7XNJDOYEW6XX2GBIKS3F3SPESTOACPMRTAVBQZVERPVWLSMVE%5C%22%2C%5C%22dt%5C%22%3A%5C%22iPhone11%2C8%5C%22%2C%5C%22ma%5C%22%3A%5C%22%5C%22%2C%5C%22im%5C%22%3A%5C%22%5C%22%2C%5C%22os%5C%22%3A%5C%22iOS%5C%22%2C%5C%22osv%5C%22%3A%5C%2213.4.1%5C%22%2C%5C%22ip%5C%22%3A%5C%22112.96.195.152%5C%22%2C%5C%22apid%5C%22%3A%5C%22jdapp%5C%22%2C%5C%22ia%5C%22%3A%5C%22F75E8AED-CB48-4EAC-A213-E8CE4018F214%5C%22%2C%5C%22uu%5C%22%3A%5C%22%5C%22%2C%5C%22cv%5C%22%3A%5C%229.0.0%5C%22%2C%5C%22nt%5C%22%3A%5C%224G%5C%22%2C%5C%22at%5C%22%3A%5C%221%5C%22%2C%5C%22fp%5C%22%3A%5C%226ac83e85e8bad60325c9256c79d9dc0e%5C%22%2C%5C%22token%5C%22%3A%5C%22WP3SV4JYWPIYTZXFLXOZ3GDOWIDJAIRIJUOMFBUCDYHBEJNVTKBHASOUPH3CIVUUZFONQB2T57XU2%5C%22%7D%22%7D`;
  request('login', body);
}
const url = `https://ms.jr.jd.com/gw/generic/uc/h5/m/login?_=1593180766566`;
const method = `POST`;
const headers = {
  'Accept' : `application/json`,
  'Origin' : `https://uua.jr.jd.com`,
  'Accept-Encoding' : `gzip, deflate, br`,
  'Cookie': cookie,
  'Content-Type' : `application/x-www-form-urlencoded;charset=UTF-8`,
  'Host' : `ms.jr.jd.com`,
  'Connection' : `keep-alive`,
  'User-Agent' : `jdapp;iPhone;9.0.0;13.4.1;e35caf0a69be42084e3c97eef56c3af7b0262d01;network/4g;ADID/F75E8AED-CB48-4EAC-A213-E8CE4018F214;supportApplePay/3;hasUPPay/0;pushNoticeIsOpen/1;model/iPhone11,8;addressid/2005183373;hasOCPay/0;appBuild/167237;supportBestPay/0;jdSupportDarkMode/0;pv/1287.19;apprpd/MyJD_GameMain;ref/https%3A%2F%2Fuua.jr.jd.com%2Fuc-fe-wxgrowing%2Fmoneytree%2Findex%2F%3Fchannel%3Dyxhd%26lng%3D113.325843%26lat%3D23.204628%26sid%3D2d98e88cf7d182f60d533476c2ce777w%26un_area%3D19_1601_50258_51885;psq/1;ads/;psn/e35caf0a69be42084e3c97eef56c3af7b0262d01|3485;jdv/0|kong|t_1000170135|tuiguang|notset|1593059927172|1593059927;adk/;app_device/IOS;pap/JA2015_311210|9.0.0|IOS 13.4.1;Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
  'Referer' : `https://uua.jr.jd.com/uc-fe-wxgrowing/moneytree/index/?channel=yxhd&lng=113.325896&lat=23.204600&sid=2d98e88cf7d182f60d533476c2ce777w&un_area=19_1601_50258_51885`,
  'Accept-Language' : `zh-cn`
};

function request(function_id, body={}) {
  const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
  };
  $task.fetch(myRequest).then(response => {
    console.log(response.statusCode + "\n\n" + response.body);
    return JSON.parse(response.body)
  }, reason => {
    console.log(reason.error);
  });
}
function sleep(response) {
  console.log('休息一下');
  setTimeout(() => {
    console.log('休息结束');
    //$hammer.log(response)
    Task.next(response)
  }, 2000);
}