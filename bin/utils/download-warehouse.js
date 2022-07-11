const chalk = require('chalk')
const execa = require('execa') /* 执行指令 */
const getDownloadTime = require('./get-download-time')
const getDownloadOption = require('./get-download-option')

/**
 * 下载仓库
 * @param {string} url
 * @returns
 */

module.exports = async function downloadWarehouse(url) {

	const {
		type,
		downloadShell
	} = getDownloadOption(url)

	getDownloadTime.start()
	switch (type) {
		case 1:
			await execa(downloadShell, {
				shell: true,
				stdio: [2, 2, 2]
			}).catch(() => {
				console.log(chalk.redBright('下载失败！请稍后再试！'))
			})
			break
		case 2:
			await execa(downloadShell, {
				shell: true,
				stdio: [2, 2, 2]
			}).catch(() => {
				console.log(chalk.redBright('下载失败！请稍后再试！'))
			})
			break
		case 3:
			let lineNumber = 1
			const downloadCnpmShell = downloadShell[0]
			const downloadHubShell = downloadShell[1]
			const download91chiShell = downloadShell[2]
			const downloadInitShell = downloadShell[3]
			await execa(downloadHubShell, {
				shell: true,
				stdio: [2, 2, 2]
			}).catch(async (error) => {
				if (error.exitCode === 128) {
					console.log(chalk.redBright(`第${lineNumber}下载路线下载失败，启用第${++lineNumber}下载路线`))
					await execa(download91chiShell, {
						shell: true,
						stdio: [2, 2, 2]
					}).catch(async (error) => {
						if (error.exitCode == 128) {
							console.log(chalk.redBright(`第${lineNumber}下载路线下载失败，启用第${++lineNumber}下载路线`))
							await execa(downloadCnpmShell, {
								shell: true,
								stdio: [2, 2, 2]
							}).catch(async (error) => {
								if (error.exitCode === 128) {
									console.log(chalk.redBright(`第${lineNumber}下载路线下载失败，启用备用下载路线`))
									await execa(downloadInitShell, {
										shell: true,
										stdio: [2, 2, 2]
									}).catch((error) => {
										if (error.exitCode === 128) {
											console.log(
												chalk.redBright('备用下载路线下载失败，请稍后再试')
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
				} else {
					process.exit(1)
				}
			})
			break
		default:
			break
	}

	getDownloadTime.end()

	process.exit(1)
}