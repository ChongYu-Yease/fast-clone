/**
 *
 * @param {用户输入的仓库下载路径} url
 * @returns {
 *              downloadCnpmShell:cnmp的下载指令
 *              download91chiShell:91chi的下载指令
 *              downloadHubShell:hub的下载指令
 *              cnpmDownloadUrl:cnpm的下载地址
 *              chiDownloadUrl:91chi的下载地址
 *              hubDownloadUrl:hub的下载地址
 *          }
 */

module.exports = function getDownloadOption(url) {
    /**
     * 国内加速通道
     * https://hub.fastgit.org/ChongYu-Yease/mini-cli.git
     * https://github.com.cnpmjs.org/ChongYu-Yease/mini-cli.git
     * https://github.91chi.fun//https://github.com/ChongYu-Yease/mini-cli.git
     */
    const isHub = url.includes('https://hub.fastgit.org/')
    const isCnpmjs = url.includes('https://github.com.cnpmjs.org/')
    const is91chi = url.includes('https://github.91chi.fun')

    if (isHub || isCnpmjs || is91chi) {
        if (isHub) {
            const hubUrlParams = url.split('hub.fastgit.org/')
            const warehouseSuffix = hubUrlParams[hubUrlParams.length - 1]
            return {
                downloadCnpmShell: `git clone https://github.com.cnpmjs.org/${warehouseSuffix}`,
                download91chiShell: `git clone https://github.91chi.fun//https://github.com/${warehouseSuffix}`,
                downloadHubShell: `git clone ${url}`,
                cnpmDownloadUrl: `https://github.com.cnpmjs.org/${warehouseSuffix}`,
                chiDownloadUrl: `https://github.91chi.fun//https://github.com/${warehouseSuffix}`,
                hubDownloadUrl: url,
            }
        }
        if (isCnpmjs) {
            const cnpmUrlParams = url.split('github.com.cnpmjs.org/')
            const warehouseSuffix = cnpmUrlParams[cnpmUrlParams.length - 1]
            return {
                downloadCnpmShell: `git clone ${url}`,
                download91chiShell: `git clone https://github.91chi.fun//https://github.com/${warehouseSuffix}`,
                downloadHubShell: `git clone https://hub.fastgit.org/${warehouseSuffix}`,
                cnpmDownloadUrl: url,
                chiDownloadUrl: `https://github.91chi.fun//https://github.com/${warehouseSuffix}`,
                hubDownloadUrl: `https://hub.fastgit.org/${warehouseSuffix}`,
            }
        }

        if (is91chi) {
            const chiUrlParams = url.split(
                'https://github.91chi.fun//https://github.com/'
            )
            const warehouseSuffix = chiUrlParams[chiUrlParams.length - 1]
            return {
                downloadCnpmShell: `git clone https://github.com.cnpmjs.org/${warehouseSuffix}`,
                download91chiShell: `git clone https://github.91chi.fun//https://github.com/${warehouseSuffix}`,
                downloadHubShell: `git clone https://hub.fastgit.org/${warehouseSuffix}`,
                cnpmDownloadUrl: `https://github.com.cnpmjs.org/${warehouseSuffix}`,
                chiDownloadUrl: url,
                hubDownloadUrl: `https://hub.fastgit.org/${warehouseSuffix}`,
            }
        }
    } else {
        const urlParams = url.split('https://github.com/')
        const warehouseSuffix = urlParams[urlParams.length - 1]
        return {
            downloadCnpmShell: `git clone https://github.com.cnpmjs.org/${warehouseSuffix}`,
            download91chiShell: `git clone https://github.91chi.fun//https://github.com/${warehouseSuffix}`,
            downloadHubShell: `git clone https://hub.fastgit.org/${warehouseSuffix}`,
            cnpmDownloadUrl: `https://github.com.cnpmjs.org/${warehouseSuffix}`,
            chiDownloadUrl: `https://github.91chi.fun//https://github.com/${warehouseSuffix}`,
            hubDownloadUrl: `https://hub.fastgit.org/${warehouseSuffix}`,
        }
    }
}
