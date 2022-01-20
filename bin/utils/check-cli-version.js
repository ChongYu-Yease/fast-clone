const semver = require('semver')
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const { promisify } = require('util')
const uploadCliVersion = require('./upload-cli-version')
const fs = require('fs')
const path = require('path')
const packagePath = path.resolve(__dirname, '../../package.json')
const { name, version } = JSON.parse(fs.readFileSync(packagePath))
const ora = require('ora')
/**
 * 检查线上最新的脚手架版本号
 */
module.exports = async function checkCliVersion() {
    const spinner = ora(chalk.green('正在检查版本'))
    spinner.start()
    const request = promisify(require('request'))
    const result = await request({
        url: `https://registry.npmjs.org/${name}`,
        timeout: 3000,
    }).catch(() => {
        spinner.fail(chalk.red(`版本检查失败请重试一次`))
        process.exit(1)
    })
    spinner.succeed(chalk.green(`版本检查完成\n`))
    const { body, statusCode } = result
    if (statusCode === 200) {
        const parseBody = JSON.parse(body)
        // 获取最新的cli版本
        const latestVersion = parseBody['dist-tags'].latest
        // 当前版本号
        const currentVersion = version
        // 版本号对比
        const hasNewVersion = semver.lt(currentVersion, latestVersion)
        if (hasNewVersion) {
            console.log(
                `${chalk.yellow(`A newer version of ${name} is available\n`)}
最新版本: ${chalk.green(latestVersion)}\n
当前版本: ${chalk.red(currentVersion)}\n
                `
            )
            const uploadResult = await co(function* () {
                return yield prompt(`Do you want to update the ${name} ? [Y/N]`)
            })
            if (['y', 'yes'].includes(uploadResult.toLowerCase())) {
                await uploadCliVersion(latestVersion)
            } else if (['n', 'no'].includes(uploadResult.toLowerCase())) {
                console.log(chalk.red('已放弃版本更新'))
            }
        }
    } else {
        console.log(chalk.yellowBright('获取版本号失败，跳过更新\n'))
    }
}
