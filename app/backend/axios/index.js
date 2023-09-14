import axios from 'axios'
import { useLogStore } from '../../store.js'
import ls from 'localstorage-slim';  
// const logStore = useLogStore();
// const API_URL = window.location.href 
const API_URL = window.APP_CONFIG.apiUrl;
// const API_URL = 'http://localhost:3000'
// const API_URL = 'https://farmspot.ru'
const securedAxiosInstance = axios.create({ 
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json',
  }
})

const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json',
  }
})

 
securedAxiosInstance.interceptors.request.use(config => {
  const method = config.method.toUpperCase()
  const logStore = useLogStore()
  // const logStore =  ls.get('account').ctsrf
  if (method !== 'OPTIONS' && method !== 'GET') { 
    console.log("interceptors.request")

    console.log( logStore.tctsrf )
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': logStore.tctsrf 
    }
  }
  return config
})

securedAxiosInstance.interceptors.response.use(null, error => {

  if (error.response && error.response.config && error.response.status === 401) {
      const store = ls.get('account').ctsrf
    const logStore = useLogStore()
    console.log("refresh send")
    console.log(logStore.tctsrf)
    // In case 401 is caused by expired access cookie - we'll do refresh request
    return plainAxiosInstance.post('/refresh', {}, { headers: { 'X-CSRF-TOKEN': store } })
      .then(response => {
            console.log("interceptors.response11")
        // logStore.refresh(response.data.csrf) 
        // const logStore = useLogStore();
        // logStore.setctsrf(response.data.csrf)
        console.log(response.data.csrf)
        logStore.setctsrf(response.data.csrf)
        console.log(logStore.tctsrf)
        let retryConfig = error.response.config
        retryConfig.headers['X-CSRF-TOKEN'] = logStore.tctsrf
        return plainAxiosInstance.request(retryConfig)
      }).catch(error => {
        const logStore = useLogStore();
        logStore.unsetCurrentUser()
 
        // redirect to signin in case refresh request fails
        // location.replace('/')
        return Promise.reject(error)
      })
  } else {
    return Promise.reject(error)
  }
})

export { securedAxiosInstance, plainAxiosInstance }