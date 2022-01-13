#!/usr/bin/env node

const checkNodeVersion = require('./utils/check-node-version')
checkNodeVersion()

// 大仓库 fast clone https://github.com/ElemeFE/element.git
// 小仓库 fast clone https://github.com/ChongYu-Yease/mini-cli.git
const { Command } = require('commander')
const program = new Command()
const getPackage = require('./utils/get-package')
const checkCliVersion = require('./utils/check-cli-version')
const checkInternet = require('./utils/check-internet') /*检查网路*/
const checkFolder = require('./utils/check-folder') /*检查重复文件*/
const downloadWarehouseByFast = require('./utils/download-warehouse-by-fast') /*通过fast下载仓库*/

const { version } = getPackage()
// 输出版本号
program.version(version, '-v,-V,--version')

program.command('clone <url>').action(async (url) => {
    // 检查网络
    await checkInternet()
    // 检查cli版本
    await checkCliVersion()

    // 检查重复文件如果有 给用户提示
    await checkFolder(url)

    // 下载仓库 warehouseName
    await downloadWarehouseByFast(url)
})

program.parse(process.argv)
