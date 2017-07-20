const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use((req, res, next) => {

  let now = new Date().toString()
  let log = `${now}: ${req.method} ${req.url}`
  console.log(log)

  fs.appendFile('server.log', log + '/n', err => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })
  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance')
// })

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/', (req, res) => {
  res.render('home', {
    welcomeMessage: 'Hi There!',
    pageTitle: 'Home Page',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page',
  })
})

app.get('/bad', (req, res) => {
  res.send({
    error: 'Unable to fulfill this request'
  })
})

app.get('/help', (req, res) => {
  res.render('help')
})

app.listen(3000, () => {
  console.log('Server Started in Port 3000')
})