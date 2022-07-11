#!/usr/bin/env node

const checkNodeVersion = require('./utils/check-node-version')
checkNodeVersion()
const {
    Command
} = require('commander')
const program = new Command()
const getPackage = require('./utils/get-package')
const checkCliVersion = require('./utils/check-cli-version')
const checkInternet = require('./utils/check-internet') /* 检查网络 */
const checkFolder = require('./utils/check-folder') /* 检查重复文件 */
const downloadWarehouse = require('./utils/download-warehouse') /* 下载仓库 */

const {
    version
} = getPackage()
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
    await downloadWarehouse(url)
})

program.parse(process.argv)