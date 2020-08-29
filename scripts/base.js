const fetch = require('node-fetch')
const BASE_URL = 'https://hacker-news.firebaseio.com/v0/item/'
const URL = {}

class Story {
	static URL = {
		TOP_STORIES:
			'https://hacker-news.firebaseio.com/v0/topstories.json?orderBy="$key"&print=pretty&startAt="#"&endAt="#"',
		NEW_STORIES:
			'https://hacker-news.firebaseio.com/v0/newstories.json?orderBy="$key"&print=pretty&startAt="#"&endAt="#"',
		BEST_STORIES:
			'https://hacker-news.firebaseio.com/v0/beststories.json?orderBy="$key"&print=pretty&startAt="#"&endAt="#"',
		SHOW_STORIES:
			'https://hacker-news.firebaseio.com/v0/showstories.json?orderBy="$key"&print=pretty&startAt="#"&endAt="#"',
		ASK_STORIES:
			'https://hacker-news.firebaseio.com/v0/askstories.json?orderBy="$key"&print=pretty&startAt="#"&endAt="#"',
		JOB_STORIES:
			'https://hacker-news.firebaseio.com/v0/jobstories.json?orderBy="$key"&print=pretty&startAt="#"&endAt="#"',
	}

	constructor(urlType) {
		this.urlType = urlType
	}

	async loadItem(itemId) {
		const id = itemId + '.json'
		return await (await fetch(BASE_URL + id)).json()
	}

	async loadStoryForIndex(startIndex, url) {
		const rangeUrl = url.replace('#', startIndex).replace('#', startIndex + 24)
		return await (await fetch(URL[rangeUrl])).json()
	}
}

module.exports = {
	humanizeDate: (unixTime) => {
		const now = Math.floor(new Date().getTime() / 1000)
		const seconds = Math.floor(now - unixTime)

		if (seconds < 60) {
			return seconds === 1 ? `${seconds} second` : `${seconds} seconds`
		}

		const minutes = Math.floor(seconds / 60)
		if (minutes < 60) {
			return minutes === 1 ? `${minutes} minute` : `${minutes} minutes`
		}

		const hours = Math.floor(minutes / 60)
		if (hours < 24) {
			return hours === 1 ? `${hours} hour` : `${hours} hours`
		}

		const days = Math.floor(hours / 24)
		if (days < 7) {
			return days === 1 ? `${days} day` : `${days} days`
		}

		const weeks = Math.floor(days / 7)
		return weeks === 1 ? `${weeks} week` : `${weeks} weeks`
	},
}
