import * as Axios from 'axios'

export const axios = Axios.create({
  baseURL: `https://mp.synergy.ru/`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.api+json',
  },
})
