const URL = 'https://hacker-news.firebaseio.com/v0/item/'
const TOP_STORIES = 'https://hacker-news.firebaseio.com/v0/topstories.json'
const NEW_STORIES = 'https://hacker-news.firebaseio.com/v0/newstories.json'

async function getTopStories() {
	const LIST = document.getElementById('list')
	let topStories = await (await fetch(TOP_STORIES)).json()
	topStories.forEach(async (element) => {
		LIST.appendChild(await createStoryEntry(element))
	})
}

async function createStoryEntry(element) {
	const li = document.createElement('li')
	const title = document.createElement('h1')
	const link = document.createElement('a')
	const description = document.createElement('p')
	const item = await getItem(element)

	link.setAttribute('href', item.url)
	link.setAttribute('target', '_blank')
	link.appendChild(document.createTextNode(item.title))
	title.appendChild(link)
	description.appendChild(
		document.createTextNode(
			`${item.score} points by ${item.by} | ${humanDate(item.time)} ago | ${item.descendants} comments`
		)
	)

	li.appendChild(title)
	li.appendChild(description)
	return li
}

async function getItem(itemId) {
	const id = itemId + '.json'
	return await (await fetch(URL + id)).json()
}

function humanDate(unixTime) {
	const now = Math.floor(new Date().getTime() / 1000)
	const seconds = Math.floor(now - unixTime)

	if (seconds < 60) {
		return seconds === 1 ? `${seconds} second ago` : `${seconds} seconds ago`
	}

	const minutes = Math.floor(seconds / 60)
	if (minutes < 60) {
		return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`
	}

	const hours = Math.floor(minutes / 60)
	if (hours < 24) {
		return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`
	}

	const days = Math.floor(hours / 24)
	if (days < 7) {
		return days === 1 ? `${days} day ago` : `${days} days ago`
	}

	const weeks = Math.floor(days / 7)
	return weeks === 1 ? `${weeks} week ago` : `${weeks} weeks ago`
}
