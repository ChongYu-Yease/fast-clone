#!/usr/bin/env node
/*测试指令*/
//fast clone https://github.com/ChongYu-Yease/cli-template.git
const { Command } = require('commander')
const program = new Command()
const fs = require('fs')
const path = require('path')

const checkInternet = require('./utils/check-internet') /*检查网路*/
const checkFolder = require('./utils/check-folder') /*检查重复文件*/
const downloadWarehouse = require('./utils/download-warehouse') /*下载仓库*/
const packagePath = path.resolve(__dirname, '../package.json')
const packageContent = JSON.parse(fs.readFileSync(packagePath))
const { version } = packageContent
// 输出版本号
program.version(version, '-v,-V,--version')

program.command('clone <url>').action(async (url) => {
    // 检查网络
    await checkInternet()
    // 检查重复文件
    await checkFolder(url)
    // 下载仓库
    await downloadWarehouse(url)
})

program.parse(process.argv)
