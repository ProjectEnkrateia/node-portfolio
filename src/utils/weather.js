const request = require('postman-request');
const weather = (lats, long, callback) => {
    //const url = `http://api.weatherstack.com/current?access_key=9f2ff87b9320cb542a3ea6a432c5487b&query=${lats},${long}&units=f`
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lats}&lon=${long}&appid=816ee35c5bf2c2a68fb2d5eef937a4ef&units=imperial`
    request({ 'url': url, 'json': true }, (error, response, body) => {
        if (error) {
            callback('unable to conect to weather stack', undefined, undefined)
        } else if (body.error) {
            callback('unable to find location', undefined, undefined)
        } else {
            callback(undefined, [
                {
                    "temp": body.main.temp,
                    "feellike": body.main.feels_like,
                    "description": body.weather[0].description
                }
            ])
        }
    })
}
module.exports = weather

