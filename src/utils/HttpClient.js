import axios from 'axios'
import join from 'url-join'
import {
  apiUrl,
  NOT_CONNECT_NETWORK,
  NETWORK_CONNECTION_MESSAGE,
  TOKEN,
  LOGIN_STATUS,
} from '../constants'

const isAbsoluteURLRegex = /^(?:\w+:)\/\//

axios.interceptors.request.use(
  async (config) => {
    if (!isAbsoluteURLRegex.test(config.url)) {
      const jwtToken = await localStorage.getItem(TOKEN)
      if (jwtToken !== null) {
        config.headers = {
          ...config.headers,
          Authorization: jwtToken,
        }
      }
      config.url = join(apiUrl, config.url)
    }
    // import จาก Excel (/bulk) ทำหลายร้อยแถวใน transaction เดียว 20 วินาทีไม่พอ
    // หน้าเว็บเคยขึ้น error ทั้งที่ backend บันทึกสำเร็จ
    config.timeout = /\/bulk(\/|$|\?)/.test(config.url) ? 180000 : 20000
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // debugger
    console.log(
      'Axios Interceptor error: ',
      JSON.stringify(error, undefined, 2),
    )
    if (error.message === 'Request failed with status code 501') {
      localStorage.setItem(LOGIN_STATUS, 'nok')
      window.location.href = '/login'
      return error
    } else if (axios.isCancel(error)) {
      return Promise.reject(error)
    } else if (!error.response) {
      return Promise.reject({
        code: NOT_CONNECT_NETWORK,
        message: NETWORK_CONNECTION_MESSAGE,
      })
    }
    return Promise.reject(error)
  },
)

export const httpClient = axios
