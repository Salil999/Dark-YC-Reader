const express = require('express')
const hn_api = require('./scripts/hacker_news')
const TOP_STORIES = require('./scripts/top_stories')

const PORT = process.env.PORT || 3000
const app = express()
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/styles'))

app.get('/top/:index', async (req, res) => {
	const index = parseInt(req.params.index)
	return await loadStoryForIndex(res, 'index', index)
})

app.get('/', (req, res) => {
	return res.redirect('/top/0')
})

app.get('*', (req, res) => {
	res.send('Wrong page?')
})

async function loadStoryForIndex(res, page, index) {
	console.log('index', index, 'typeof index', typeof index)
	const stories = await hn_api.loadData(hn_api.URL.TOP_STORIES, index)
	console.log('stories', stories)
	const data = []
	for (const story in stories) {
		const item = await hn_api.getItem(stories[story])
		data.push({
			title: item['title'],
			subtext: hn_api.formatText(item),
			url: item['url'],
		})
	}
	// console.log(data)
	res.render(page, {
		data: data,
	})
}

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
