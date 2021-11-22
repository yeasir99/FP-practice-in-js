import {Task, compose} from '../../utils/utils'

const getOpenWeather = (zip, apiKey) =>
  `http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&appid=${apiKey}`

const fetchIt = url =>
  Task((rej, res) =>
    fetch(url)
      .then(x => x.json())
      .then(res)
      .catch(rej),
  )

const openWeather = {
  fetch: compose(fetchIt, getOpenWeather),
}

export default openWeather
