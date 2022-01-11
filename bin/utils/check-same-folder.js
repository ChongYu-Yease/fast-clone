const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
module.exports = async function checkSameFolder() {
    const askResult = await co(function* () {
        return yield prompt(
            `\n${chalk.yellowBright(
                '检测到当前路径下有跟项目重复的文件夹,是否删除?'
            )}\n\n${chalk.greenBright(
                'Y -> 删除重名的文件夹'
            )}\n\n${chalk.greenBright(
                'N -> 保留重名的文件夹并基于当前文件夹创建一个随机的文件夹后缀'
            )}\n`
        )
    })
    return askResult
}
