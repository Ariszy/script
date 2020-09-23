- **腾云云函数使用,我说下面几点:**

    - 先下本仓库脚本,然后本地 npm install 下载好依赖包

    - 其中npm install 的使用,需要本地pc安装node.js可自行搜索安装

    - 腾讯云那边使用的时候,选择上传本地文件夹(因为在线下载的依赖包会有问题)，如下图

        ![Snipaste_2020-08-28_09-31-42.png](icon/Snipaste_2020-08-28_09-31-42.png)

    - 其中index.js文件,需要下面这样子写,其中require里面,你需要的是哪个脚本,就写那个脚本的名称.

        ```
        'use strict';
        exports.main_handler = async (event, context, callback) => {
            require('./jd_speed.js')
        }
        ```
      
        ![txy.png](icon/txy.png)