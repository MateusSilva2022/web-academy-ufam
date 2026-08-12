import axios from 'axios'

export const productsApi = axios.create({
  baseURL: 'https://ranekapi.origamid.dev/json/api',
})


export const favoriteApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// export const favoriteApi = axios.create({
//   baseURL: 'https://67bc820bed4db4ef00331006.mockapi.io',
// })
