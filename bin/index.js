#!/usr/bin/env node

// 大仓库 fast clone https://github.com/ElemeFE/element.git
// 小仓库 fast clone https://github.com/ChongYu-Yease/mini-cli.git
// 大仓库 fast gitclone https://github.com/ElemeFE/element.git
// 小仓库 fast gitclone https://github.com/ChongYu-Yease/mini-cli.git
const { Command } = require('commander')
const program = new Command()
const fs = require('fs')
const path = require('path')
const checkInternet = require('./utils/check-internet') /*检查网路*/
const checkFolder = require('./utils/check-folder') /*检查重复文件*/
const downloadWarehouseByFast = require('./utils/download-warehouse-by-fast') /*通过fast下载仓库*/
const downloadWarehouseByGit = require('./utils/download-warehouse-by-git') /*通过fast下载仓库*/
const packagePath = path.resolve(__dirname, '../package.json')
const packageContent = JSON.parse(fs.readFileSync(packagePath))
const { version } = packageContent

// 输出版本号
program.version(version, '-v,-V,--version')

program.command('clone <url>').action(async (url) => {
    // 检查网络
    await checkInternet()

    // 检查重复文件如果有 给用户提示
    await checkFolder(url)

    // 下载仓库 warehouseName
    await downloadWarehouseByFast(url)
})
program.command('gitclone <url>').action(async (url) => {
    // 检查网络
    await checkInternet()

    // 检查重复文件
    await checkFolder(url)

    await downloadWarehouseByGit(url)
})

program.parse(process.argv)
