# This workflow will do a clean install of node dependencies, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: 京喜财富岛

on:
    workflow_dispatch:
    schedule:
        - cron: "*/12 * * * *"
    watch:
        types: [started]
    repository_dispatch:
        types: jx_cfd

jobs:
    build:
        runs-on: ubuntu-latest
        if: github.event.repository.owner.id == github.event.sender.id
        steps:
            - uses: actions/checkout@v1
            - name: Use Node.js 10.x
              uses: actions/setup-node@v1
              with:
                  node-version: 10.x
            - name: npm install
              run: |
                  npm install
            - name: "运行 【京喜财富岛】"
              run: |
                  node jx_cfd.js
              env:
                  JD_COOKIE: ${{ secrets.JD_COOKIE }}
                  JD_DEBUG: ${{ secrets.JD_DEBUG }}
                  PUSH_KEY: ${{ secrets.PUSH_KEY }}
                  BARK_PUSH: ${{ secrets.BARK_PUSH }}
                  BARK_SOUND: ${{ secrets.BARK_SOUND }}
                  TG_BOT_TOKEN: ${{ secrets.TG_BOT_TOKEN }}
                  TG_USER_ID: ${{ secrets.TG_USER_ID }}
                  DD_BOT_TOKEN: ${{ secrets.DD_BOT_TOKEN }}
                  DD_BOT_SECRET: ${{ secrets.DD_BOT_SECRET }}
                  JOY_FEED_COUNT: ${{ secrets.JOY_FEED_COUNT }}
                  JOY_RUN_FLAG: ${{ secrets.JOY_RUN_FLAG }}
