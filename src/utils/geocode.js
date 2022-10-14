const request = require('postman-request');
const geocode = (address, callback) => {
    //const url = `http://api.positionstack.com/v1/forward?access_key=6906887febc72926cbae335ca350e6b8&query=${encodeURIComponent(address)}&limit=1`
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(address)}&limit=1&appid=816ee35c5bf2c2a68fb2d5eef937a4ef`

    request({ 'url': url, 'json': true }, (error, response, body) => {
        if (error) {
            callback('unable to conect to position stack', undefined)
        } else if (body.error) {
            callback('unable to find location in coordinates', undefined)
        } else if (body.length === 0) {
            callback('please check spelling for address type in!', undefined)
        } else {
            callback(undefined, [
                {
                    "name": body[0].name,
                    "latitude": body[0].lat,
                    "longitude": body[0].lon,
                    "state": body[0].state,
                    "country": body[0].country
                }
            ])
        }
    })
}
module.exports = geocode
