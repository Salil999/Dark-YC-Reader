module.exports = {
	loadData: async (type, startIndex) => {
		type = type.replace('#', startIndex).replace('#', startIndex + 24)
		console.log('type', type)
		return await (await fetch(type)).json()
	},

	formatText: (item) => {
		const points = item.score === 1 ? '1 point' : item.score + ' points'
		const comments = item.descendants === 1 ? '1 comment' : item.descendants + ' comments'
		return points + ' by ' + item.by + ' | ' + humanDate(item.time) + ' ago' + ' | ' + comments
	},
}
