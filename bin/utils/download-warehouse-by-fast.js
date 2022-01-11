const chalk = require('chalk')
const execa = require('execa') /*执行指令*/
const getDownloadOption = require('./get-download-option')

/**
 * 下载仓库
 * @param {用户输入的仓库地址} url
 */

module.exports = async function (url) {
    const {
        downloadCnpmShell,
        download91chiShell,
        downloadHubShell,
        // cnpmDownloadUrl,
        // chiDownloadUrl,
        // hubDownloadUrl,
    } = getDownloadOption(url)

    const start = Date.now()

    const downloadCnpmResult = await execa(downloadCnpmShell, {
        shell: true,
        stdio: [2, 2, 2],
    })

    if (downloadCnpmResult.failed) {
        console.log(chalk.redBright('第一路线下载失败，启用第二下载路线'))
        const downloadHubResult = await execa(downloadHubShell, {
            shell: true,
            stdio: [2, 2, 2],
        })
        if (downloadHubResult.failed) {
            console.log(chalk.redBright('第二路线下载失败，启用第三下载路线'))
            const download91chiResult = await execa(download91chiShell, {
                shell: true,
                stdio: [2, 2, 2],
            })
            if (download91chiResult.failed) {
                console.log(chalk.redBright('第三路线下载失败，请稍后重试'))
                process.exit(1)
            }
        }
    }

    const end = Date.now()

    console.log(
        chalk.greenBright(
            `\nfast下载耗时:${((end - start) / 1000).toFixed(2)} 秒\n`
        )
    )
    process.exit(1)
}
