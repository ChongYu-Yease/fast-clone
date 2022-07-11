const execa = require('execa')
const fs = require('fs')
const path = require('path')
const packagePath = path.resolve(__dirname, '../../package.json')
const {
	name
} = JSON.parse(fs.readFileSync(packagePath))
const chalk = require('chalk')

/**
 * 将依赖包更新到指定的版本号
 * @param {最新的版本号} latestVersion
 */
module.exports = async function (latestVersion) {
	// 强制安装最新指定版本的依赖包
	const shellCommand = `npm --registry https://registry.npmjs.org/  install ${name}@${latestVersion} -g`
	console.log(chalk.green(`正在更新fast-clone版本`))
	await execa(shellCommand, {
		shell: true,
		stdio: [2, 2, 2] //添加下载动画
	}).catch(() => {
		console.log(chalk.green(`fast-clone更新失败`))
	})
	console.log(chalk.green(`fast-clone更新完成`))
}