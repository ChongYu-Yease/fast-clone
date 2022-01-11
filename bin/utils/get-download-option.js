/**
 * 进行地址代理
 * @param {不带代理的url} url
 */

module.exports = function downloadOption(url) {
    // 如果包含 cnpmjs.org 此url 无需加速
    let downloadShell
    if (url.includes('cnpmjs.org')) {
        downloadShell = `git clone ${url}`
        return {
            downloadShell: downloadShell,
            downloadUrl: url,
        }
    } else {
        // 在github.com后面添加 cnpmjs.org
        const urlParams = url.split('github.com')
        const downloadUrl = `${urlParams[0]}github.com.cnpmjs.org${urlParams[1]}`
        downloadShell = `git clone ${downloadUrl}`
        return {
            downloadShell: downloadShell,
            downloadUrl: downloadUrl,
        }
    }
}
