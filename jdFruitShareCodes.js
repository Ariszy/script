/*
水果互助码
此文件为Node.js专用。其他用户请忽略
支持京东N个账号
 */
//云服务器腾讯云函数等NOde.js用户在此处填写京东东农场的好友码。
// github action用户的好友互助码填写到Action->Settings->Secrets->new Secret里面(Name填写 FruitShareCodes(此处的Name必须按此来写,不能随意更改),内容处填写互助码,填写规则如下)
// 同一个京东账号的好友互助码用@符号隔开,不同京东账号之间按Cookie隔开方法,即用&符号隔开,下面给一个示例
// 如: 京东账号1的shareCode1@京东账号1的shareCode2&京东账号2的shareCode1@京东账号2的shareCode2
let FruitShareCodes = [
  '0a74407df5df4fa99672a037eec61f7e@dbb21614667246fabcfd9685b6f448f3@6fbd26cc27ac44d6a7fed34092453f77@61ff5c624949454aa88561f2cd721bf6',//账号一的好友shareCode,不同好友中间用@符号隔开
  '6fbd26cc27ac44d6a7fed34092453f77@61ff5c624949454aa88561f2cd721bf6',//账号二的好友shareCode，不同好友中间用@符号隔开
]
// 判断github action里面是否有水果互助码
if (process.env.FruitShareCodes && process.env.FruitShareCodes.split('&') && process.env.FruitShareCodes.split('&').length > 0) {
  FruitShareCodes = process.env.FruitShareCodes.split('&');
}
for (let i = 0; i < FruitShareCodes.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['FruitShareCode' + index] = FruitShareCodes[i];
}