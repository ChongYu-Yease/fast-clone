const path = require('path')
const fs = require('fs')
const co = require('co')
const prompt = require('co-prompt')
const deleteFolder = require('./delete-folder')
const chalk = require('chalk')
const ora = require('ora')
/* 
 1. fs.stat  检测是文件还是目录(目录 文件是否存在) 
 2. fs.mkdir  创建目录 （创建之前先判断是否存在） 
 3. fs.writeFile  写入文件(文件不存在就创建,但不能创建目录) 
 4. fs.appendFile 写入追加文件 
 5.fs.readFile 读取文件 
 6.fs.readdir 读取目录 
 7.fs.rename 重命名 
 8. fs.rmdir  删除目录 
 9. fs.unlink 删除文件 
*/

// 返回运行文件所在的目录 __dirname

// 当前命令所在的目录  path.resolve('./')

// 当前命令所在的目录  process.cwd()

/**
 * 检查文件
 * @param {仓库url} url
 * @returns
 */
module.exports = async (url) => {
    console.log('url--url', url)
    const warehouseName = ''
    // 目录列表
    //     const dirList = fs.readdirSync('./')
    //     // 是否存在相同的项目名称
    //     const hasSameFolder = dirList.some((name) => name === folderName)
    //     if (hasSameFolder) {
    //         // 如果有相同的文件夹名称 询问用户
    //         const askResult = await co(function* () {
    //             return yield prompt(
    //                 `
    // ${chalk.yellowBright('检测到当前路径下有跟项目重复的文件夹,是否删除?')}

    //     ${chalk.greenBright('Y -> 删除重名的文件夹')}

    //     ${chalk.greenBright(
    //         'N -> 保留重名的文件夹并基于当前文件夹创建一个随机的文件夹后缀'
    //     )}

    //     `
    //             )
    //         })
    //         if (['y', 'yes'].includes(askResult.toLowerCase())) {
    //             // 当前命令所在的地址
    //             const cliCurrentPath = process.cwd()
    //             const folderPath = path.resolve(cliCurrentPath, folderName)
    //             console.log(`${chalk.green('===> 开始删除重复文件')}\n`)
    //             // 删除文件夹
    //             await deleteFolder(folderPath)
    //             console.log(chalk.green('===> 重复文件删除成功\n'))
    //         } else if (['n', 'no'].includes(askResult.toLowerCase())) {
    //             const currentDate = new Date()
    //             const year = currentDate.getFullYear()
    //             const month = currentDate.getMonth() + 1
    //             const fullMonth = month < 10 ? `0${month}` : month
    //             const date = currentDate.getDate()
    //             const hours = currentDate.getHours()
    //             const minutes = currentDate.getMinutes()
    //             const seconds = currentDate.getSeconds()
    //             folderName = `${folderName} ${year}-${fullMonth}-${date} ${hours}:${minutes}:${seconds}`
    //             console.log(
    //                 `   随机文件后缀已生成，新的项目名称为==>${chalk.greenBright(
    //                     folderName
    //                 )}`
    //             )
    //         } else {
    //             // 当前命令所在的地址
    //             const cliCurrentPath = process.cwd()
    //             const folderPath = path.resolve(cliCurrentPath, folderName)
    //             console.log(`${chalk.green('===> 开始文件删除\n')}`)
    //             // 删除文件夹
    //             await deleteFolder(folderPath)
    //             console.log(chalk.green('===> 文件删除成功\n'))
    //         }
    //     }
    return folderName
}
