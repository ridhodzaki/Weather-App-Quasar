import { boot } from 'quasar/wrappers'
import axios from 'axios'
import config from './config'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const url = 'https://api.tomorrow.io/v4/'
const urlOpenWeather = 'https://api.openweathermap.org/data/2.5/'
const api = axios.create({ baseURL: url })
const apiOpenWeather = axios.create({ baseURL: urlOpenWeather })
const key = config.key
const keyOpenWeather = config.keyOpenWeather

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
  app.config.globalProperties.$apiOpenWeather = apiOpenWeather
  app.config.globalProperties.$key = key
  app.config.globalProperties.$keyOpenWeather = keyOpenWeather
})

export { api }
