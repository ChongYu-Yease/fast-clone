/**
 * 获取仓库名称
 * @param {string} url
 * returns 仓库名称
 */
module.exports = function getWarehouseName(url) {
    // 获取仓库名称 start
    const warehouseNames = url.split('/')
    let warehouseName = warehouseNames.find((item) => item.includes('.git'))
    warehouseName = warehouseName.split('.git')
    warehouseName = warehouseName[0]
    // 获取仓库名称 end
    return warehouseName
}
