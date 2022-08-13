const express = require('express')
const server = express()
const hbs = require('express-handlebars')

server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

server.engine('hbs', hbs.engine({ extname: 'hbs' }))

module.exports = server
