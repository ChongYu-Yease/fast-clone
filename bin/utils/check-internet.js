// 检测网络
const isOnline = require('is-online')
const chalk = require('chalk')
const ora = require('ora')
/**
 * 检查网络
 */
module.exports = async () => {
	const spinner = ora('正在检查网络...').start()
	const online = await isOnline({
		timeout: 1000,
		version: 'v4'
	})
	if (!online) {
		spinner.fail(chalk.red('请检查网络,稍后重试'))

		process.exit(1)
	} else {
		spinner.succeed(chalk.greenBright('网络检测完成'))
	}
}
