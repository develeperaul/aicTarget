import Vue from 'vue'
import axios from 'axios'

import { LocalStorage, Notify } from 'quasar'

axios.token = LocalStorage.getItem('token')
// axios.defaults.baseURL = 'http://ace-target.local/'
axios.defaults.baseURL = 'https://atconnect.ru'

axios.defaults.headers['client-id'] = 1
// axios.defaults.headers['client-secret'] = '0o2pUmazzwTOGKSy3vxI2bDV6CTMlnfUxNMzdIQB'
axios.defaults.headers['client-secret'] = 'VJOsUvJWoCLX7X9lJKKmZIj98iON8oPuB1G2fwr3'
// axios.defaults.headers['client-id'] = 6
// axios.defaults.headers['client-secret'] = '19MHJER6XZje2gd4G6az1c2ICjnV017JjzTnDSdN'
axios.defaults.headers['Content-Type'] = 'application/json'

axios.interceptors.request.use(config => {
  // config.headers.common.origin = axios.defaults.baseURL
  if (axios.token) {
    config.headers.common.authorization = `Bearer ${axios.token}`
  }

  return config
})
axios.dataURLtoBlob = (dataurl) => {
  var arr = dataurl.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
axios.toDataURL = (url, callback) => {
  var xhr = new XMLHttpRequest()
  xhr.onload = function () {
    var reader = new FileReader()
    reader.onloadend = function () {
      callback(reader.result)
    }
    reader.readAsDataURL(xhr.response)
  }
  xhr.open('GET', url)
  xhr.responseType = 'blob'
  xhr.send()
}

axios.errorHandler = (errors) => {
  // const errors_format = []

  errors = errors.response.data

  if (errors.errors) {
    console.log(errors, errors.errors)
    const messages = Object.values(errors.errors)
    messages.forEach((array) => {
      array.forEach((message) => {
        Notify.create({
          type: 'negative',
          message: message
        })
        // console.log(message)
        // errors_format.push({
        //   label:
        // })
        // Toast.open({
        //   duration: 5000,
        //   message,
        //   position: 'is-bottom',
        //   queue: false,
        //   type: 'is-danger'
        // })
      })
    })
  } else {
    Notify.create({
      type: 'negative',
      message: errors.message
    })
    // console.log(errors.message)
    // Toast.open({
    //   duration: 5000,
    //   message: errors.message,
    //   position: 'is-bottom',
    //   queue: false,
    //   type: 'is-danger'
    // })
  }
}
Vue.prototype.$axios = axios
