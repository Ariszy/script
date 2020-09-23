## github action使用教程说明

 - 可以参考github@ruicky写的 [@ruicky教程](https://ruicky.me/2020/06/05/jd-sign/)
 
### 注意几个地方就行

- **注意fork的是此 [仓库项目](https://github.com/lxk0301/scripts) , 不是@ruicky教程里面的**

- 使用action的时候其中京东的ck,不要放到 jdCookie.js里面，这样别人能看到，不安全，要放到Secrets里面, 添加 JD_COOKIE的时候。 多账号的cookie， 使用`&`隔开，比如 `cookie1&cookie2&cookie3`


- server酱的推送通知服务, 是可选项, 如果需要 自行申请SCKEY,再填入Secrets里面(Name选项输入 `PUSH_KEY` ,Value选项输入申请的 SCKEY)


- cron时间是按国际标准时间来的， 和北京时间不同，里面写16点才表示北京时间0点，具体可参考下面两个链接写cron，还有github action 会有延迟现象，一般会延迟15分钟左右吧。比如设置北京时间16:00运行，action其实要16:15左右才会执行脚本的。

  -  [参考链接一](https://datetime360.com/cn/utc-beijing-time/) ， [参考链接二](http://www.timebie.com/cn/universalbeijing.php)


- 上面 [@ruicky教程](https://ruicky.me/2020/06/05/jd-sign/) 获取ck的方法不对。继续参考我readme里面 [浏览器获取京东cookie教程](https://shimo.im/docs/CTwhjpG6ydvC3qJJ/) 获取ck。
不过这里面获取的ck比较长，可以用下面的脚本，在Chrome浏览器按F12，console里面输入下面脚本按enter回车键，这样子整理出关键的ck已经在你的剪贴板上， 可直接粘贴

    ```
    var CV = '这里单引号里面放 https://shimo.im/docs/CTwhjpG6ydvC3qJJ/ 方法获取的 ck';
    var CookieValue = CV.match(/pt_key=.+?;/) + CV.match(/pt_pin=.+?;/);
    copy(CookieValue);
    ```

- fork过后，acton没有看到运行，是因为.yml文件里面的cron时间未到，如需立马看到效果

  - 手动点击仓库的star按钮即可  

- 提供一种自动更新本仓库的办法，具体可看tg@wukongdada这篇教程 [保持自己github的forks自动和上游仓库同步的教程](http://note.youdao.com/noteshare?id=6cd72de428957d593c129749194b4352)
它可自动PR我仓库最新代码到你自己fork的仓库去

- 下方提供使用到的 **Secrets全集合**

    | Name                    |   归属   | 属性   | 说明                                                         |
    | ----------------------- | :------: | ------ | ------------------------------------------------------------ |
    | `JD_COOKIE`             |   京东   | 必须   | 京东cookie,具体获取参考[Cookie获取教程](https://shimo.im/docs/CTwhjpG6ydvC3qJJ/read) |
    | `PUSH_KEY`              |   微信推送   | 非必须 | cookie失效推送[server酱的微信通知](http://sc.ftqq.com/3.version) |
    | `BARK_PUSH`             |   BARK推送   | 非必须 | cookie失效推送BARK这个APP,此token是https://api.day.app/后面的内容 |
    | `BARK_SOUND`            |   BARK推送   | 非必须 | bark推送声音设置，例如`choo`,具体值请在`bark`-`推送铃声`-`查看所有铃声` |
    | `TG_BOT_TOKEN`          |   telegram推送   | 非必须 | tg推送,填写自己申请[@BotFather](https://t.me/BotFather)的Token,如`10xxx4:AAFcqxxxxgER5uw` , [具体教程](https://github.com/lxk0301/scripts/pull/37#issuecomment-692415594) |
    | `TG_USER_ID`            |   telegram推送   | 非必须 | tg推送,填写[@getuseridbot](https://t.me/getuseridbot)中获取到的纯数字ID, [具体教程](https://github.com/lxk0301/scripts/pull/37#issuecomment-692415594) |
    | `PET_NOTIFY_CONTROL`    | 推送开关  | 非必须 | 控制京东萌宠是否通知,`false`为通知,`true`不通知              |
    | `FRUIT_NOTIFY_CONTROL`  | 推送开关  | 非必须 | 控制京东农场是否通知,`false`为通知,`true`不通知              |
    | `FruitShareCodes`       |  东东农场分享码  | 非必须 | 填写规则请看 [jdFruitShareCodes.js里面的说明](https://github.com/lxk0301/scripts/blob/master/jdFruitShareCodes.js) |
    | `PETSHARECODES`         |  东东萌宠分享码  | 非必须 | 填写规则请看 [jdPetShareCodes.js里面的说明](https://github.com/lxk0301/scripts/blob/master/jdPetShareCodes.js) |
    | `PLANT_BEAN_SHARECODES` |  种豆得豆分享码  | 非必须 | 填写规则请看 [jdPlantBeanShareCodes.js里面的说明](https://github.com/lxk0301/scripts/blob/master/jdPlantBeanShareCodes.js) |
