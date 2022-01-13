#!/usr/bin/env node

const checkNodeVersion = require('./bin/utils/check-node-version')
checkNodeVersion()
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const execa = require('execa')
const inquirer = require('inquirer')

// 询问用户 cli 测试的 名字
const initQuestions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'shellName',
            message: '请输入cli测试指令',
            validate: function (answer) {
                if (answer.length < 1) {
                    return '请输入cli测试指令'
                } else {
                    const reg = /^[5A-Za-z0-9-\_]+$/
                    if (reg.test(answer)) {
                        return true
                    } else {
                        console.log(
                            chalk.redBright(
                                'cli名称只能输入英文，数字，下划线，横线'
                            )
                        )
                    }
                }
            },
        },
    ])
}
/**
 * 修改package.json的内容
 * @param {Object} packageContent
 * @param {Object} answers
 */
const writePackage = function (packageContent, answers) {
    Object.keys(answers).forEach((key) => {
        const value = answers[key]
        packageContent[key] = value
    })
    const packagePath = path.resolve(__dirname, './package.json')
    fs.writeFileSync(packagePath, JSON.stringify(packageContent, null, 4))
}
/**
 *
 * @param {当前package.json的版本号} currentVersion
 * @returns 下一个版本号
 */
const updateVersion = (currentVersion) => {
    const nums = currentVersion.split('.')
    let firstNum = Number(nums[0])
    let secondNum = Number(nums[1])
    let thirdNum = Number(nums[2])
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
 *
 * @param {package.json里面的k属性} packageKey
 * @returns 当key存在的时候 返回key所对应的value 当key不存在的时候 就返回所有的package.json的内容
 */
const getPackage = (packageKey) => {
    const packagePath = path.resolve(__dirname, './package.json')
    const packageContent = JSON.parse(fs.readFileSync(packagePath))
    return packageKey ? packageContent[packageKey] : packageContent
}
/**
 * 初始化配置
 */
const initConfig = async () => {
    // 判断是不是生产环境
    const isProduction = process.env.NODE_ENV === 'production'
    // 发布
    if (isProduction) {
        // 读取项目的package.json的内容
        const packageContent = getPackage()

        // 更新版本号
        const newVersion = updateVersion(packageContent.version)

        const answers = {
            version: newVersion,

            bin: {
                fast: '/bin/index.js',
            },
        }

        // 修改项目的package.json的内容
        await writePackage(packageContent, answers)

        // 执行 npm unlink 移除全局指令 start
        // const unlinkCommand = 'npm unlink'

        // await execa(unlinkCommand, {
        //     shell: true,
        //     stdio: [2, 2, 2],
        // })

        // console.log(chalk.blueBright('===> 已移除全局指令\n'))

        // 执行 npm unlink 移除全局指令 end
        const publishCommand =
            'npm --registry https://registry.npmjs.org/ publish'
        await execa(publishCommand, {
            shell: true,
            stdio: [2, 2, 2],
        })
    } else {
        // 安装依赖包 start
        console.log(chalk.greenBright('\n===> 开始安装依赖包\n'))
        const installCommand = 'npm install'

        await execa(installCommand, {
            shell: true,
            stdio: [2, 2, 2],
        })
        console.log(chalk.greenBright('\n===> 依赖包安装完成\n'))
        // 安装依赖包 end

        // 获取cli指令
        const { shellName } = await initQuestions()

        // 读取项目的package.json的内容
        const packageContent = getPackage()

        const answers = {
            bin: {
                [shellName]: '/bin/index.js',
            },
        }

        // 修改项目的package.json的内容
        await writePackage(packageContent, answers)

        // 执行 npm unlink 移除全局指令 start
        // const unlinkCommand = 'npm unlink'

        // await execa(unlinkCommand, {
        //     shell: true,
        //     stdio: [2, 2, 2],
        // })
        // console.log(chalk.blueBright('\n===> 已移除全局指令\n'))
        // 执行 npm unlink 移除全局指令 end

        // 执行 npm link 移除全局指令 start
        const linkCommand = 'npm link'

        await execa(linkCommand, {
            shell: true,
            stdio: [2, 2, 2],
        })
        console.log(chalk.blueBright(`\n===> 已安装全局指令 ${shellName}\n`))

        // 执行 npm link 移除全局指令 end
    }
}
initConfig()
