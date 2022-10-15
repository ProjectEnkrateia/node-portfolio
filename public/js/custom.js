const log = console.log
log('im working')


const formweather = document.querySelector(".weatherform");
const weathervr = document.querySelector('input')
const responweather = document.querySelector('.weatherinfoOne')
const responweatherTwo = document.querySelector('.weatherinfoTwo')

//responweather.textContent = 'From'

formweather.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = weathervr.value
    responweatherTwo.textContent = 'Loading...'
    responweather.textContent = ''
    fetch(`/getweather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                responweatherTwo.textContent = `${data.error}`
            }
            else {
                responweather.textContent = `${data.forecast}. It is currently ${data.temp}°. It fee like ${data.feel}`
                responweatherTwo.textContent = data.label

            }

            log(data)
            log(data.label)

        })
    })

})
