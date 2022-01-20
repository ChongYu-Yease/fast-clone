const chalk = require('chalk')
const execa = require('execa') /*执行指令*/
const getDownloadOption = require('./get-download-option')

/**
 * 下载仓库
 * @param {用户输入的仓库地址} url
 */

module.exports = async function downloadWarehouse(url) {
    const { type, downloadShell } = getDownloadOption(url)
    const start = Date.now()
    switch (type) {
        case 1:
            await execa(downloadShell, {
                shell: true,
                stdio: [2, 2, 2],
            }).catch(() => {
                console.log(chalk.redBright('\n下载失败！请稍后再试！\n'))
            })
            break
        case 2:
            await execa(downloadShell, {
                shell: true,
                stdio: [2, 2, 2],
            }).catch(() => {
                console.log(chalk.redBright('\n下载失败！请稍后再试！\n'))
            })
            break
        case 3:
            const downloadCnpmShell = downloadShell[0]
            const downloadHubShell = downloadShell[1]
            const download91chiShell = downloadShell[2]
            await execa(downloadCnpmShell, {
                shell: true,
                stdio: [2, 2, 2],
            }).catch(async (error) => {
                if (error.exitCode === 128) {
                    console.log(
                        chalk.redBright('第一路线下载失败，启用第二下载路线')
                    )
                    await execa(downloadHubShell, {
                        shell: true,
                        stdio: [2, 2, 2],
                    }).catch(async (error) => {
                        if (error.exitCode == 128) {
                            console.log(
                                chalk.redBright(
                                    '第二路线下载失败，启用第三下载路线'
                                )
                            )
                            await execa(download91chiShell, {
                                shell: true,
                                stdio: [2, 2, 2],
                            }).catch((error) => {
                                if (error.exitCode === 128) {
                                    console.log(
                                        chalk.redBright(
                                            '第三路线下载失败，请稍后重试'
                                        )
                                    )
                                    process.exit(1)
                                } else {
                                    process.exit(1)
                                }
                            })
                        } else {
                            process.exit(1)
                        }
                    })
                } else {
                    process.exit(1)
                }
            })
            break
        default:
            break
    }

    const end = Date.now()

    console.log(
        `\n${chalk.greenBright(
            `下载耗时:${((end - start) / 1000).toFixed(2)} 秒`
        )}\n`
    )
    process.exit(1)
}
