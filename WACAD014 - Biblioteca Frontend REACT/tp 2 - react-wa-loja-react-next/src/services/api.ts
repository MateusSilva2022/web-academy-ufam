import axios from 'axios'

export const productsApi = axios.create({
  baseURL: 'https://ranekapi.origamid.dev/json',
})

export const favoriteApi = axios.create({
  baseURL: 'https://67bc820bed4db4ef00331006.mockapi.io',
})