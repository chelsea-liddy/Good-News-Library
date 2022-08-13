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

server.get('/', (req, res) => {
  readData((viewData) => {
    res.render('home', viewData)
  })
})

module.exports = server
