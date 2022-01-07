/**
 * 下载仓库
 */
const execa = require('execa') /*执行指令*/
/**
 * 思路
 * 1、判断是不是一个正确的路径
 * 2、判断路径当中有没有带来的路径
 * 3、拼接代理路径
 * 4、执行指令
 */

/**
 *
 * @param {仓库地址} url
 */
module.exports = function (url) {
    if (!url.includes('cnpmjs.org')) {
        const urlParams = url.split('github.com')
        const downloadUrl = `${urlParams[0]}github.com.cnpmjs.org${urlParams[1]}`
        const downloadShell = `git clone ${downloadUrl}`
        await execa(downloadShell, {
            shell: true,
            stdio: [2, 2, 2],
        })
    } else {
    }
}
