const fs = require('fs')
const path = require('path')
/**
 * 获取package的属性
 * @params {string} packageKey package.json 里面的属性
 * @returns packageKey存在的时候 就返回packageKey 所对应的值 否则 返回全部的package.json的内容
 */
module.exports = function getPackage(packageKey) {
    const packagePath = path.resolve(__dirname, '../../package.json')
    const packageContent = JSON.parse(fs.readFileSync(packagePath))
    return packageKey ? packageContent[packageKey] : packageContent
}
