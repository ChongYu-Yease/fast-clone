const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const checkSameFolder = require('./check-same-folder')
const getWarehouseName = require('./get-warehouse-name')
const deleteFolder = require('./delete-folder')
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
    // 通过url获取仓库名称
    let warehouseName = getWarehouseName(url)
    // 目录列表
    const dirList = fs.readdirSync('./')
    // 是否存在相同的项目名称
    const hasSameFolder = dirList.some((name) => name === warehouseName)
    if (!hasSameFolder) return
    // 如果有相同的文件夹名称 询问用户
    const askResult = await checkSameFolder()
    if (['y', 'yes'].includes(askResult.toLowerCase())) {
        // 当前命令所在的地址
        const cliCurrentPath = process.cwd()
        const folderPath = path.resolve(cliCurrentPath, warehouseName)
        console.log(`${chalk.green('===> 开始删除文件')}\n`)
        // 删除文件夹
        await deleteFolder(folderPath)
        console.log(chalk.green('===> 文件删除成功\n'))
    } else if (['n', 'no'].includes(askResult.toLowerCase())) {
        const currentDate = new Date()
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth() + 1
        const fullMonth = month < 10 ? `0${month}` : month
        const date = currentDate.getDate()
        const hours = currentDate.getHours()
        const minutes = currentDate.getMinutes()
        const seconds = currentDate.getSeconds()
        warehouseName = `${warehouseName} ${year}-${fullMonth}-${date} ${hours}:${minutes}:${seconds}`
        console.log(
            `随机文件后缀已生成，新的项目名称为 ==> ${chalk.greenBright(
                warehouseName
            )}`
        )
        return warehouseName
    } else {
        // 当前命令所在的地址
        const cliCurrentPath = process.cwd()
        const folderPath = path.resolve(cliCurrentPath, warehouseName)
        console.log(`${chalk.green('===> 开始文件删除\n')}`)
        // 删除文件夹
        await deleteFolder(folderPath)
        console.log(chalk.green('===> 文件删除成功\n'))
    }
}
