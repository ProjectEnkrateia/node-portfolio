const log = console.log
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

//Setup Static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

//Define paths for express
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// views path url
app.get('', (req, res) => {
    res.render('index', { title: 'Home', active: 'active' })
})
app.get('/about', (req, res) => {
    res.render('about', { title: 'About', activeab: 'active' })
})
app.get('/apps', (req, res) => {
    res.render('apps', { title: 'Apps', activea: 'active' })
})
app.get('/weather', (req, res) => {
    res.render('weather', { title: 'Weather', activew: 'active' })
})
app.get('/getweather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address, (error, geodata) => {
        if (error) {
            return res.send({
                error
            })
        }
        weather(geodata[0].latitude, geodata[0].longitude, (error, wdata) => {
            res.send({
                'forecast': wdata[0].description,
                'temp': wdata[0].temp,
                'feel': wdata[0].feellike,
                'label': `${geodata[0].name}, ${geodata[0].state} ${geodata[0].country}`,
                'location': req.query.address
            })
        })
    })
})
app.get('/help', (req, res) => {
    res.render('help', { title: 'Help', activeh: 'active' })
})
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'contact', activec: 'active' })
})
app.get('/help/*', (req, res) => {
    res.render('404', { title: 'Article 404', backhome: 'HELP', return: '/help' })
})
app.get('*', (req, res) => {
    res.render('404', { title: '404', backhome: 'HOME', return: '/' })
})
//Development port
app.listen(3000, () => {
    log('Server is up on port 3000.')
})