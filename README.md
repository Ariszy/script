![Anurag’s github stats](https://github-readme-stats.vercel.app/api?username=lxk0301&show_icons=true&theme=merko)

## 京东薅羊毛工具（活动入口：京东app->我的->游戏与互动->查看更多）

1.  京东水果([jd_fruit.js](https://raw.githubusercontent.com/lxk0301/scripts/master/jd_fruit.js))
2.  东东萌宠([jd_pet.js](https://raw.githubusercontent.com/lxk0301/scripts/master/jd_pet.js))
3.  宠汪汪([jd_joy.js](https://raw.githubusercontent.com/lxk0301/scripts/master/jd_joy.js))
4.  种豆得豆([jd_plantBean.js](https://raw.githubusercontent.com/lxk0301/scripts/master/jd_plantBean.js))
5.  天天加速([jd_speed.js](https://raw.githubusercontent.com/lxk0301/scripts/master/jd_speed.js))
6.  摇钱树([jd_moneyTree.js](https://raw.githubusercontent.com/lxk0301/scripts/master/jd_moneyTree.js))
7.  宠汪汪兑换奖品([jd_joy_reward.js](https://raw.githubusercontent.com/lxk0301/scripts/master/jd_joy_reward.js))
8.  取关京东店铺和商品([jd_unsubscribe.js](https://raw.githubusercontent.com/lxk0301/scripts/master/jd_unsubscribe.js))
9.  京小超([jd_superMarket.js](https://raw.githubusercontent.com/lxk0301/scripts/master/jd_superMarket.js))
10. 京小超兑换奖品([jd_blueCoin.js](https://raw.githubusercontent.com/lxk0301/scripts/master/jd_blueCoin.js))
11. 宠汪汪偷好友狗粮与积分([jd_joy_steal.js](https://raw.githubusercontent.com/lxk0301/scripts/master/jd_joy_steal.js))
12. 进店领豆([jd_shop.js](https://raw.githubusercontent.com/lxk0301/scripts/master/jd_shop.js))
13. 摇京豆([jd_club_lottery.js](https://raw.githubusercontent.com/lxk0301/scripts/master/jd_club_lottery.js))
14. 全名开红包([jd_redPacket.js](https://raw.githubusercontent.com/lxk0301/scripts/master/jd_redPacket.js))
15. 京东多合一签到([jd_bean_sign.js](https://raw.githubusercontent.com/lxk0301/scripts/master/jd_bean_sign.js)) 【自用，Node.js专用，核心脚本是JD_DailyBonus.js， IOS软件用户请使用NobyDa的 [JD_DailyBonus.js](https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js) 】

**脚本兼容: [QuantumultX](https://apps.apple.com/us/app/quantumult-x/id1443988620), [Surge](https://apps.apple.com/us/app/surge-4/id1442620678), [Loon](https://apps.apple.com/us/app/loon/id1373567447), JSBox, Node.js**

**TODO**

- [x] 完善京小超脚本[jd_superMarket.js](https://raw.githubusercontent.com/lxk0301/scripts/master/jd_superMarket.js)

## 食用方法

### 方法一：本地安装Node.js，下载本库脚本(不推荐)

  - 缺点：需要手动运行脚本，不能自动定时运行脚本


### 方法二：云服务器，腾讯云函数等等

  - 需自行有云服务器，云函数等

  - 腾云云函数使用 [简要说明](iCloud.md)
        
### 方法三：GitHub action(推荐，iOS/安卓用户都可用)

 - 使用教程暂且可看 [这里](githubAction.md)

#### 注：以上三种运行机制都是nodejs，故您需仔细阅读下面几点


  - 如果使用方法一与方法二，需自行提供京东cookie填写到 [jdCookie.js](https://github.com/lxk0301/scripts/blob/master/jdCookie.js) 里面

  - 方法三京东cookie不要！不要！不要！填写到 [jdCookie.js](https://github.com/lxk0301/scripts/blob/master/jdCookie.js) 里面
   
  - 获取京东cookie教程可参考 [浏览器获取京东cookie教程](https://github.com/lxk0301/scripts/blob/master/backUp/GetJdCookie.md) , [插件获取京东cookie教程](https://github.com/lxk0301/scripts/blob/master/backUp/GetJdCookie2.md)
    

### 方法四：iOS系统的代理软件（QuantumultX, Surge, Loon）

#### 以下内容只针对iOS用户

#### ios使用多个京东账号，需要使用BoxJs保存多会话进行切换 

##### BoxJs简单说明可看作者[BoxJs仓库地址](https://github.com/chavyleung/scripts/)

使用box可以实现远程订阅助力好友(需订阅此 [链接](https://raw.githubusercontent.com/lxk0301/scripts/master/lxk0301.boxjs.json))

- [BoxJs使用教程](https://chavyleung.gitbook.io/boxjs/)

- [BoxJs教程视频](https://youtu.be/eIpBrRxiy0w)


【用box订阅的好处】

 1、脚本也可以远程挂载。京东活动助力功能的分享码只需在box里面填写。以后只需远程更新就行。

 2、所有脚本的cookie都可以备份，方便你迁移到其他支持box的软件。

 3、box可以支持多账号

#### 最后，农场萌宠种豆得豆互相助力可进此[telegram讨论组](https://t.me/JD_fruit_pet)

### 特别感谢(排名不分先后)：
* [@NobyDa](https://github.com/NobyDa)

* [@chavyleung](https://github.com/chavyleung)

* [@liuxiaoyucc](https://github.com/liuxiaoyucc)

* [@Zero-S1](https://github.com/Zero-S1)

* [@uniqueque](https://github.com/uniqueque)


* [@nzw9314](https://github.com/nzw9314)
