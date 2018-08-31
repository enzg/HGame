import axios from 'axios'
const LogErr = console.error
export const http$ = async (url, method, paramObj, baseURL = 0) => {
  const config = {
    method: method,
    url: url,
    baseURL: baseURL,
    data: paramObj,
    timeout: 25000
  }
  try {
    return axios(config)
      .then(ret => { return ret.data })
      .catch(err => {
        LogErr('http operation error start:', Date.now())
        LogErr('request baseUrl:', baseURL)
        LogErr('request url:', url)
        LogErr('data send:', paramObj)
        LogErr('error detail:', err.stack)
        LogErr('http operation error end')
        if (err.code == 'ECONNABORTED' && err.message.indexOf('timeout') != -1) {
          return Promise.resolve({ code: 503 })
        }
        return Promise.resolve({code:-1})
      })
  } catch (error) {
    LogErr('http error start:', Date.now())
    LogErr('request baseUrl:', baseURL)
    LogErr('request url: ', url)
    LogErr('data send:', paramObj)
    LogErr('error detail:', error.stack)
    LogErr('http error end')
    return Promise.resolve({ code: -1 })
  }
}
export const post$ = async (url, paramObj, baseURL = 0) => {
  return http$(url, 'post', paramObj, baseURL)
}
export const get$ = async (url, paramObj, baseURL = 0) => {
  return http$(url, 'get', paramObj, baseURL)
}
export const delay$ = async ms => new Promise(resolve => setTimeout(resolve, ms))