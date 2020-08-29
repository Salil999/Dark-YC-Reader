const base = require('./base')
const URL = 'https://hacker-news.firebaseio.com/v0/topstories.json?orderBy="$key"&print=pretty&startAt="#"&endAt="#"'

module.exports = {
	loadForIndex: async (index) => {
		return base.loadStoryForIndex(index, URL)
	},
}
