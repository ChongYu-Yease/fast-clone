const chalk = require('chalk')
const execa = require('execa') /*执行指令*/
const { promisify } = require('util')
const ora = require('ora')
const getDownloadShell = require('./get-download-option')
/**
 * 思路
 * 1、判断是不是一个正确的路径
 * 2、判断路径当中有没有带来的路径
 * 3、拼接代理路径
 * 4、执行指令
 */

/**
 * 下载仓库
 * @param {仓库地址} url
 * @param {仓库名称} warehouseName
 */
module.exports = async function (url, warehouseName) {
    const { downloadShell, downloadUrl } = getDownloadShell(url)

    // warehouseName 如果由内容 就代表同目录下的文件名称 跟 当前下载的仓库名称重复

    if (!warehouseName) {
        const start = Date.now()

        await execa(downloadShell, {
            shell: true,
            stdio: [2, 2, 2],
        })
        const end = Date.now()

        console.log(
            chalk.greenBright(
                `\nfast下载耗时：${(end - start).toFixed(2)} ms\n`
            )
        )
    } else {
        const spinner = ora(chalk.green('开始下载代码...'))
        // 包装成一个promise方法.
        const download = promisify(require('download-git-repo'))
        // 下载模版
        spinner.start()
        const start = Date.now()
        await download(`direct:${downloadUrl}`, warehouseName, {
            clone: true,
        }).catch((error) => {
            spinner.fail(chalk.red(`${chalk.red(error.message)}`))
            // 退出node进程
            process.exit(1)
        })
        const end = Date.now()
        spinner.succeed(chalk.green('===> 代码下载完成\n'))
        console.log(
            chalk.greenBright(
                `\nfast下载耗时：${(end - start).toFixed(2)} ms\n`
            )
        )
    }
    process.exit(1)
}
