const fs = require('fs')

/**
 * 删除文件
 * @param {文件地址} filePath
 */
module.exports = function deleteFolder(filePath) {
    if (fs.existsSync(filePath)) {
        const files = fs.readdirSync(filePath)
        files.forEach((file) => {
            const nextFilePath = `${filePath}/${file}`
            const states = fs.statSync(nextFilePath)
            if (states.isDirectory()) {
                deleteFolder(nextFilePath)
            } else {
                fs.unlinkSync(nextFilePath)
            }
        })
        fs.rmdirSync(filePath)
    }
}
