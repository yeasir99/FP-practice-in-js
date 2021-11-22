import apiKey from './apiKey'
import openWeather from './openWeather'

// Pure stuff

const createLi = data => `<li>
  <h2>data: ${data.dt_txt}</h2>
  <div>
  <p>temp: ${data.main.temp}</p>
  <p>temp max: ${data.main.temp_max}</p>
  <p>temp min: ${data.main.temp_min}</p>
  </div>
  </li>`

const getWearher = zipCode =>
  openWeather
    .fetch(zipCode, apiKey)
    .map(x => x.list)
    .map(list => list.map(({dt_txt, main}) => ({dt_txt, main})))
    .map(data => data.map(createLi))

// impure stuff

const app = () => {
  const goButton = document.getElementById('go')
  const input = document.getElementById('zip')
  const results = document.getElementById('result')
  goButton.addEventListener('click', () => {
    const zipCode = input.value.trim()
    getWearher(zipCode).fork(console.error, html => {
      results.innerHTML = html
    })
    input.value = ''
  })
}

app()
