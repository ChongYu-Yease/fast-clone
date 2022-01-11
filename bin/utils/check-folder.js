const fs = require('fs')
const chalk = require('chalk')
const getWarehouseName = require('./get-warehouse-name')
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

/**
 * 检查文件
 * @param {仓库url} url
 * @returns
 */
module.exports = async (url) => {
    // 通过url获取仓库名称
    const warehouseName = getWarehouseName(url)
    // 读取当前目录下所有文件列表
    const dirList = fs.readdirSync('./')
    // 是否存在相同的项目名称
    const hasSameFolder = dirList.some((name) => name === warehouseName)
    if (hasSameFolder) {
        console.log(chalk.redBright('检测到当前目录下存在相同的文件名'))
        process.exit(1)
    }
}
