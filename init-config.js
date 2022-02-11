#!/usr/bin/env node

const checkNodeVersion = require('./bin/utils/check-node-version')
checkNodeVersion()

const execa = require('execa')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const inquirer = require('inquirer')
const { re } = require('semver/internal/re')

// 询问用户 cli 测试的 名字
const initQuestions = () => {
	return inquirer.prompt([
		{
			type: 'input',
			name: 'command',
			message: `请输入cli${process.env.NODE_ENV === 'production' ? '发布' : '测试'}指令`,
			validate: function (answer) {
				if (answer.length < 1) {
					return `请输入cli${process.env.NODE_ENV === 'production' ? '发布' : '测试'}指令`
				} else {
					const reg = /^[5A-Za-z0-9-\_]+$/
					if (reg.test(answer)) {
						return true
					} else {
						console.log(
							chalk.redBright(
								`cli${
									process.env.NODE_ENV === 'production' ? '发布' : '测试'
								}指令只能输入英文，数字，下划线，横线`
							)
						)
					}
				}
			}
		}
	])
}
/**
 *
 * @param {package.json里面的k属性} packageKey
 * @returns 当key存在的时候 返回key所对应的value 当key不存在的时候 就返回所有的package.json的内容
 */
const readPackage = async (packageKey) => {
	const packagePath = path.resolve(__dirname, './package.json')
	const packageContent = JSON.parse(await fs.readFileSync(packagePath))
	return packageKey ? packageContent[packageKey] : packageContent
}
/**
 * 修改package.json的内容
 * @param {Object} packageValue
 */
const writePackage = async (packageValue) => {
	const packageContent = await readPackage()
	Object.keys(packageValue).forEach((key) => {
		const value = packageValue[key]
		packageContent[key] = value
	})
	const packagePath = path.resolve(__dirname, './package.json')
	await fs.writeFileSync(packagePath, JSON.stringify(packageContent, null, 4))
}
/**
 * 更新当前的版本号
 * @returns 下一个版本号
 */
const updatePackageVersion = async () => {
	const currentVersion = await readPackage('version')
	const versionParams = currentVersion.split('.')
	let firstNum = Number(versionParams[0])
	let secondNum = Number(versionParams[1])
	let thirdNum = Number(versionParams[2])
	thirdNum++
	if (thirdNum >= 10) {
		thirdNum = 0
		secondNum++
		if (secondNum >= 10) {
			secondNum = 0
			firstNum++
		}
	}
	return `${firstNum}.${secondNum}.${thirdNum}`
}
/**
 * 恢复之前的版本号
 * @returns 上一个版本号
 */
const recoverPackageVersion = async () => {
	const currentVersion = await readPackage('version')
	const versionParams = currentVersion.split('.')
	let firstNum = Number(versionParams[0])
	let secondNum = Number(versionParams[1])
	let thirdNum = Number(versionParams[2])
	thirdNum--
	if (thirdNum < 0) {
		secondNum--
		if (secondNum < 0) {
			firstNum++
		}
	}
	return `${firstNum}.${secondNum}.${thirdNum}`
}

/**
 * 执行npm link
 */
const runLinkCommand = async () => {
	// 执行 npm link 移除全局指令 start

	console.log(chalk.blueBright(`===> 开始安装全局指令 `))

	await execa('npm link', {
		shell: true,
		stdio: [2, 2, 2]
	})

	console.log(chalk.blueBright(`===> 全局指令已安装完成 `))

	// 执行 npm link 移除全局指令 end
}
/**
 * 移除全局指令
 */
const runUnlinkCommand = async (command) => {
	// 执行 npm unlink 移除全局指令 原来下载的cli 指令也会失效 所以采用删除的方式
	console.log(chalk.blueBright('===> 开始移除全局指令'))

	// 获取cli包的地址
	const { stdout } = await execa(`which ${command}`, {
		shell: true
	})

	// 开始执行删除
	await execa(`rm -rf ${stdout}`, {
		shell: true,
		stdio: [2, 2, 2]
	})

	console.log(chalk.blueBright('===> 已移除全局指令'))

	// 执行 npm unlink 移除全局指令 end
}
/**
 * 执行npm install 操作
 */
const runInstallCommand = async () => {
	// 安装依赖包 start

	console.log(chalk.greenBright('===> 开始安装依赖包'))

	await execa('npm install', {
		shell: true,
		stdio: [2, 2, 2]
	})

	console.log(chalk.greenBright('===> 依赖包安装完成'))

	// 安装依赖包 end
}
/**
 * 发布到npm的操作指令
 * 执行发布npm包的操作
 */
const runPublishCommand = async () => {
	await execa('npm --registry https://registry.npmjs.org/ publish', {
		shell: true,
		stdio: [2, 2, 2]
	}).catch(async (error) => {
		if (error.exitCode === 1) {
			const oladVersion = await recoverPackageVersion()
			console.log(chalk.redBright('发布失败，正在回滚package.json 的版本号和'))
			const packageValue = {
				version: oladVersion
			}
			// 修改项目的package.json的内容
			await writePackage(packageValue)
			console.log(chalk.greenBright('package.json 的版本号回滚成功'))
			process.exit(1)
		}
	})
}
/**
 * 创建文件并记录指令
 */
const writeCommandFile = async (command) => {
	const commandFilePath = path.resolve(__dirname, './command-db.json')
	await fs.writeFileSync(commandFilePath, JSON.stringify({ command }, null, 4))
}
/**
 * 读取文件内的指令名称
 */
const readCommandFile = async () => {
	const commandFilePath = path.resolve(__dirname, './command-db.json')
	const commandOption = await fs.readFileSync(commandFilePath)
	return JSON.parse(commandOption)['command']
}
/**
 * 初始化配置
 */
const initConfig = async () => {
	// 判断是不是生产环境
	const isProduction = process.env.NODE_ENV === 'production'
	// 如果是发布
	if (isProduction) {
		const commandName = await readCommandFile()
		// 运行 npm unlink 指令 移除之前link的指令
		await runUnlinkCommand(commandName)
		// 获取下一个版本
		const newVersion = await updatePackageVersion()
		const { command } = await initQuestions()
		const packageValue = {
			version: newVersion,
			bin: {
				[command]: '/bin/index.js'
			}
		}
		// 修改项目的package.json的内容
		await writePackage(packageValue)
		// 发布
		await runPublishCommand()
	} else {
		// 安装依赖
		// await runInstallCommand()

		// 获取cli指令
		const { command } = await initQuestions()
		const packageValue = {
			bin: {
				[command]: '/bin/index.js'
			}
		}
		// 记录指令名称 记录到一个文件里
		await writeCommandFile(command)
		// 修改项目的package.json的内容
		await writePackage(packageValue)
		// 执行 npm link 指令
		await runLinkCommand()
	}
}
initConfig()
