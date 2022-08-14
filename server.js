const express = require('express')
const server = express()
const hbs = require('express-handlebars')
const fs = require('fs')

server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')

function readData(callback) {
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    const viewData = JSON.parse(data)
    if (err) {
      console.log('Whoops, couldn`t read that!')
    } else {
      callback(viewData)
    }
  })
}

function writeData(viewData) {
  const story = JSON.stringify(viewData, null, 2)
  fs.writeFile('./data.json', story, (err) => {
    if (err) {
      console.log('Whoops, couldn`t write that!')
    } else {
      console.log('Thanks for the story!')
    }
  })
}

server.get('/', (req, res) => {
  readData((viewData) => {
    res.render('home', viewData)
  })
})

server.get('/contribute', (req, res) => {
  const fields = {
    title: '',
    description: '',
    summary: '',
    externalURL: '',
  }
  res.render('contribute', fields)
})

server.get('/:id', (req, res) => {
  readData((viewData) => {
    let story = viewData.stories.find((story) => story.id == req.params.id)
    res.render('story', story)
  })
})

server.post('/newStory', (req, res) => {
  readData((viewData) => {
    const newId = viewData.stories.length + 1
    const newStory = {
      id: newId,
      title: req.body.title,
      homeImage: '/images/puppy1.jpg',
      description: req.body.description,
      summary: req.body.summary,
      summaryImage: '/images/puppy1.jpg',
      externalURL: req.body.externalURL,
    }
    viewData.stories.push(newStory)
    writeData(viewData)
    res.render('story', newStory)
  })
})

module.exports = server
