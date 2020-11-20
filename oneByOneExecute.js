const exec = require("child_process").execSync;
const fs = require("fs");
const axios = require("axios");
const smartReplace = require("./smartReplace");

// 公共变量
const Secrets = {
    JD_COOKIE: process.env.JD_COOKIE, //cokie,多个用&隔开即可
    SyncUrl: process.env.SYNCURL, //签到地址,方便随时变动
    PUSH_KEY: process.env.PUSH_KEY, //server酱推送消息
    BARK_PUSH: process.env.BARK_PUSH, //Bark推送
    TG_BOT_TOKEN: process.env.TG_BOT_TOKEN, //TGBot推送Token
    TG_USER_ID: process.env.TG_USER_ID, //TGBot推送成员ID
};
let CookieJDs = [];

async function downFile() {
    let response = await axios.get(Secrets.SyncUrl);
    let content = response.data;
    await fs.writeFileSync("./temp.js", content, "utf8");
}

async function changeFiele(content, cookie) {
    let newContent = await smartReplace.replaceWithSecrets(content, Secrets, cookie);
    await fs.writeFileSync("./execute.js", newContent, "utf8");
}

async function executeOneByOne() {
    const content = await fs.readFileSync("./temp.js", "utf8");
    for (var i = 0; i < CookieJDs.length; i++) {
        console.log(`正在执行第${i + 1}个账号签到任务`);
        await changeFiele(content, CookieJDs[i]);
        console.log("替换变量完毕");
        try {
            await exec("node execute.js", { stdio: "inherit" });
        } catch (e) {
            console.log("执行异常:" + e);
        }
        console.log("执行完毕");
    }
}

async function start() {
    console.log(`当前执行时间:${new Date().toString()}`);
    if (!Secrets.JD_COOKIE) {
        console.log("请填写 JD_COOKIE 后在继续");
        return;
    }
    if (!Secrets.SyncUrl) {
        console.log("请填写 SYNCURL 后在继续");
        return;
    }
    CookieJDs = Secrets.JD_COOKIE.split("&");
    console.log(`当前共${CookieJDs.length}个账号需要签到`);
    // 下载最新代码
    await downFile();
    console.log("下载代码完毕");
    await executeOneByOne();
    console.log("全部执行完毕");
}

start();
