const chalk = require('chalk')

module.exports = {
	startTime: null,
	start() {
		this.startTime = Date.now()
	},
	end() {
		const endTime = Date.now()
		console.log(
			`${chalk.greenBright(`下载耗时:${((endTime - this.startTime) / 1000).toFixed(2)} 秒`)}`
		)
	}
}