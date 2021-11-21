import apiKey from './apiKey'
import {Task, compose} from '../../utils/utils'

const getOpenWeather = zip =>
  `http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&appid=${apiKey}`

const fetchIt = url => Task((rej, res) => fetch(url).then(res).catch(rej))

const getWeather = compose(fetchIt, getOpenWeather)

const app = () => {
  const goButton = document.getElementById('go')
  const input = document.getElementById('zip')
  const results = document.getElementById('result')
  console.log(input.value)

  goButton.addEventListener('click', () => {
    const zipCode = input.value.trim()
    getWeather(zipCode).fork(console.error, console.log)
  })
}

app()
