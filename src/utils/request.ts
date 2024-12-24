import axios from 'axios'
import { showToast } from 'vant'

const baseURL = import.meta.env.VITE_APP_BASE_API + '/front_api/v1/'
const source = axios.CancelToken.source()

const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  cancelToken: source.token,
})

instance.interceptors.request.use((config: any) => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data'
  }
  config.headers.Authorization = localStorage.access_token
  return config
})

instance.interceptors.response.use(
  (result: any) => {
    console.log(result)
    // if (result.status == 200 && result.data.meta.status == 200) {
    if (result.status == 200 && result.data.meta.status > 0) {
      return result.data.data
    } else {
      showToast(result.data.meta.msg)
    }
  },
  error => {
    const { response: res } = error
    if (res && res.status) {
      switch (res.status) {
        case 404:
          showToast('请求的网址不存在')
          break
        case 401:
          localStorage.removeItem('token')
          showToast('登录已失效，请重新登录')
          location.href = '/login'
          break
        case 400:
          showToast(res.meta.msg)
          break
        case 403:
          showToast('无权访问')
          break
        case 405:
          showToast('无权访问')
          break
        case 406:
          console.log('重复操作~')
          break
        case 409:
          console.log('业务码待处理~')
          break
        case 421:
          console.log('业务码待处理~')
          break
        case 422:
          showToast(res.meta.msg)
          break
        case 429:
          showToast('操作太频繁，请稍后再试')
          break
        case 503:
          showToast('网站维护中，请稍后再试')
          break
        default:
          showToast(`服务器异常(code: ${res.status})`)
          break
      }
    } else {
      if (axios.isCancel(error)) {
        // cancel 之后，同批的请求会走到这里
        console.log('请求已取消')
      } else {
        showToast('请求失败')
      }
    }
    return Promise.reject(res)
  }
)

export default instance
