/**
 *
 * @param {用户输入的仓库下载路径} url
 * @returns {
 *              type 仓库类型 1:gitlab 2:码云 3:github
 *              downloadCnpmShell:cnmp的下载指令
 *              download91chiShell:91chi的下载指令
 *              downloadHubShell:hub的下载指令
 *              cnpmDownloadUrl:cnpm的下载地址
 *              chiDownloadUrl:91chi的下载地址
 *              hubDownloadUrl:hub的下载地址
 *          }
 */

module.exports = function getDownloadOption(url) {
	if (url.includes('gitlab')) {
		// 如果下载地址是gitlab 大概率走的是公司的内网 无需加速
		return {
			type: 1,
			downloadShell: `git clone ${url}`
		}
	} else if (url.includes('gitee')) {
		// 从码云下载项目 无需加速
		return {
			type: 2,
			downloadShell: `git clone ${url}`
		}
	} else {
		const isHub = url.includes('https://hub.fastgit.org')
		const isCnpmjs = url.includes('https://github.com.cnpmjs.org')
		const is91chi = url.includes('https://github.91chi.fun')
		if (isHub || isCnpmjs || is91chi) {
			if (isCnpmjs) {
				const cnpmUrlParams = url.split('github.com.cnpmjs.org/')
				const warehouseSuffix = cnpmUrlParams[cnpmUrlParams.length - 1]

				return {
					type: 3,
					downloadShell: [
						`git clone ${url}`,
						`git clone https://hub.fastgit.org/${warehouseSuffix}`,
						`git clone https://github.91chi.fun//https://github.com/${warehouseSuffix}`,
						`git clone https://github.com/${warehouseSuffix}`
					]
				}
			}
			if (isHub) {
				const hubUrlParams = url.split('hub.fastgit.org/')
				const warehouseSuffix = hubUrlParams[hubUrlParams.length - 1]

				return {
					type: 3,
					downloadShell: [
						`git clone https://github.com.cnpmjs.org/${warehouseSuffix}`,
						`git clone ${url}`,
						`git clone https://github.91chi.fun//https://github.com/${warehouseSuffix}`,
						`git clone https://github.com/${warehouseSuffix}`
					]
				}
			}

			if (is91chi) {
				const chiUrlParams = url.split('https://github.91chi.fun//https://github.com/')
				const warehouseSuffix = chiUrlParams[chiUrlParams.length - 1]

				return {
					type: 3,
					downloadShell: [
						`git clone https://github.com.cnpmjs.org/${warehouseSuffix}`,
						`git clone https://hub.fastgit.org/${warehouseSuffix}`,
						`git clone ${url}`,
						`git clone https://github.com/${warehouseSuffix}`
					]
				}
			}
		} else {
			const urlParams = url.split('https://github.com/')
			const warehouseSuffix = urlParams[urlParams.length - 1]
			return {
				type: 3,
				downloadShell: [
					`git clone https://github.com.cnpmjs.org/${warehouseSuffix}`,
					`git clone https://github.91chi.fun//https://github.com/${warehouseSuffix}`,
					`git clone https://hub.fastgit.org/${warehouseSuffix}`,
					`git clone ${url}`
				]
			}
		}
	}
}
