## 1.安装 Node.js 环境

[下载地址](https://nodejs.org/zh-tw/download/ )

根据自己的操作系统下载

傻瓜式安装，一直下一步即可。



## 2.下载源码

![BclSld.png](https://s1.ax1x.com/2020/11/04/BclSld.png)

点击红框处下载压缩包

## 3.安装依赖、增加入口文件、增加cookie

压缩包解压后进入项目文件夹

- Windows 用户按住  **shift** 点击右键，点击 **在此处打开命令窗口**
- Mac 用户通过终端，自行进入该文件夹

在命令行内输入 `npm i `，等待运行完成。

此时，项目文件夹内会多出一个 `node_modules`文件夹

 **增加入口文件**

方案一：同一个仓库下同一个时间，执行多个脚本

在项目文件夹内新建 `index.js`

编辑文件

```javascript
'use strict';
exports.main_handler = async (event, context, callback) => {
  require('./jd_xtg1.js') //这里写你想要的脚本
  require('./jd_xtg2.js') //这里写你想要的脚本
  require('./jd_xtg3.js') //这里写你想要的脚本
}

```
此时，同一时间点下，会同时执行多个脚本，触发器触发后，index.js文件中require()下的所有脚本都会被执行

方案二：同一个仓库下不同的时间点，分别执行不同的脚本（类似GitHub Action执行机制）

在项目文件夹内新建 `index.js`

编辑文件

```javascript
'use strict';
exports.main_handler = async (event, context, callback) => {
    for (const v of event["Message"].split("\r\n")) {
        console.log(v);
        require(`./${v}.js`)
    }
}

```

此时触发管理按照下图中进行设置，附加信息选择“是”，内容填写需要传递执行的具体脚本文件名，以回车键换行。触发器触发后，附加信息栏内的脚本会被执行，设置多个不同时间点的触发器达到类似GitHub Action的效果


[![B20KxI.png](https://s1.ax1x.com/2020/11/05/B20KxI.png)](https://imgchr.com/i/B20KxI)
[![BRCG0H.png](https://s1.ax1x.com/2020/11/05/BRCG0H.png)](https://imgchr.com/i/BRCG0H)

注意：方案一与方案二不能混合到同一个index.js文件中使用，同一个仓库下，二者只能选择其一


 **增加cookie**

打开项目文件内的 `jdCookie.js`

在最上面的 `CookieJDs`里写入 cookie ，多个账号以逗号分隔

例如

```javascript
let CookieJDs = [
  'pt_key=xxx;pt_pin=xxx;', 
  'pt_key=zzz;pt_pin=zzz;',
  'pt_key=aaa;pt_pin=xxxaaa
]
```



## 4.上传至腾讯云

[腾讯云函数地址]( https://console.cloud.tencent.com/scf/index )

登录后，点击管理控制台

![Bc1c5T.png](https://s1.ax1x.com/2020/11/04/Bc1c5T.png)

点击 函数服务->新建

![Bc1TVx.png](https://s1.ax1x.com/2020/11/04/Bc1TVx.png)

下一步

![Bc1xsA.png](https://s1.ax1x.com/2020/11/04/Bc1xsA.png)

把整个项目文件夹都上传上去，点完成



## 5.设置触发器

点击刚创建的函数

![BcGa8O.png](https://s1.ax1x.com/2020/11/04/BcGa8O.png)

点击如图所示

![BcGvM4.png](https://s1.ax1x.com/2020/11/04/BcGvM4.png)

![UTOOLS1604471299130.png](https://img01.sogoucdn.com/app/a/100520146/f8d70ea4f8e08d9e87ec8c13474f22c3)

关于触发周期中的自定义触发周期，使用的是 Cron表达式，这个自行学习下吧

[Corn文档](https://cloud.tencent.com/document/product/583/9708#cron-.E8.A1.A8.E8.BE.BE.E5.BC.8F  )



点击提交，所有流程就结束了。
