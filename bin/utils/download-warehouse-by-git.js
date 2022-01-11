const chalk = require('chalk')
const execa = require('execa') /*执行指令*/
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
 */
module.exports = async function (url) {
    const downloadShell = `git clone ${url}`

    const start = Date.now()

    await execa(downloadShell, {
        shell: true,
        stdio: [2, 2, 2],
    })

    const end = Date.now()

    console.log(
        chalk.greenBright(
            `\ngit下载耗时:${((end - start) / 1000).toFixed(2)} 秒\n`
        )
    )

    process.exit(1)
}
