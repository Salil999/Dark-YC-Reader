const express = require('express')
const session = require('express-session')
const API = require('./scripts/stories/api')

const PORT = process.env.PORT || 3000
const app = express()
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/styles'))
app.use(session({secret: 'secret'}))

app.get('/:story/:index', async (req, res) => {
	const index = parseInt(req.params.index)
	const storyURL = API.getURL(req.params.story)
	req.session.previous = JSON.parse(JSON.stringify(req.params))
	const page = req.params.story === 'top' ? 'index' : req.params.story
	await loadStoryForIndex(res, page, index, storyURL)
})

app.get('/next', async (req, res) => {
	const index = parseInt(req.session.previous.index)
	res.redirect('/' + req.session.previous.story + '/' + (index + 1))
})

app.get('/previous', async (req, res) => {
	const index = parseInt(req.session.previous.index)
	if (index === 0) {
		res.redirect('/' + req.session.previous.story + '/' + 0)
	} else {
		res.redirect('/' + req.session.previous.story + '/' + (index - 1))
	}
})

app.get('/', (req, res) => {
	return res.redirect('/top/0')
})

app.get('*', (req, res) => {
	res.send('Wrong page?')
})

async function loadStoryForIndex(res, page, index, story) {
	const stories = await API.loadStoryForIndex(index, story)
	const data = []
	for (const story in stories) {
		const item = await API.loadItem(stories[story])
		data.push({
			title: item['title'],
			subtext: API.formatText(item),
			url: item['url'],
		})
	}
	res.render(page, { data: data })
}

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
