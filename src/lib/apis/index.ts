import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const customAxios = axios.create({
  baseURL: `${BASE_URL}`,
})
