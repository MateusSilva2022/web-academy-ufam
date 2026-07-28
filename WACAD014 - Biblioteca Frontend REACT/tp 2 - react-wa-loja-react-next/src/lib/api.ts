import axios from 'axios'

export const productsApi = axios.create({
  baseURL: 'https://ranekapi.origamid.dev/json/api',
})


export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
