import axios from 'axios'

class Auth {
  constructor (hasFake) {
    this.fake = hasFake
  }

  auth (data) {
    if (this.fake) {
      const result = data.email === '1' ? require('../fakedata/auth/auth1') : require('../fakedata/auth/auth2')
      return new Promise((resolve) => setTimeout(() => resolve({ data: result }), 1500))
    }
    return axios.post('api/v1/auth/login', {
      grant_type: 'password',
      client_id: axios.defaults.headers['client-id'],
      client_secret: axios.defaults.headers['client-secret'],
      scope: '',
      username: data.email,
      password: data.password
    })
  }

  registerStep1 (data) {
    if (this.fake) {
      return require('../fakedata/auth/register')
    }
    // console.log(data)
    return axios.post('api/v1/auth/register/1', data)
  }

  registerProjectList = (data) => axios.get('api/v1/auth/register/project_list', data)

  registerStep2Sub1Info = (data) => axios.get('api/v1/auth/register/2/1', data)

  registerStep2Sub1 = (data) => axios.post('api/v1/auth/register/2/1', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  registerStep2Sub2Info = (data) => axios.get('api/v1/auth/register/2/2', data)

  registerStep2Sub2 = (data) => axios.post('api/v1/auth/register/2/2', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  registerStep2Sub3Info = (data) => axios.get('api/v1/auth/register/2/3', data)

  registerStep2Sub3 = (data) => axios.post('api/v1/auth/register/2/3', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  registerStep2Sub4Info = (data) => axios.get('api/v1/auth/register/2/4', data)

  registerStep2Sub4 = (data) => axios.post('api/v1/auth/register/2/4', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  registerStep2Sub5Info = (data) => axios.get('api/v1/auth/register/2/5', data)

  registerStep2Sub5 = (data) => axios.post('api/v1/auth/register/2/5', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  registerStep2Sub6Info = (data) => axios.get('api/v1/auth/register/2/6', data)

  registerStep2Sub6 = (data) => axios.post('api/v1/auth/register/2/6', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  registerStep2Sub7Info = (data) => axios.get('api/v1/auth/register/2/7', data)

  registerStep2Sub7 = (data) => axios.post('api/v1/auth/register/2/7', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  registerStep2Sub8Info = (data) => axios.get('api/v1/auth/register/2/8', data)

  registerStep2Sub8 = (data) => axios.post('api/v1/auth/register/2/8', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  registerStep2Sub9Info = (data) => axios.get('api/v1/auth/register/2/9', data)

  registerStep2Sub9 = (data) => axios.post('api/v1/auth/register/2/9', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  registerStep2Sub10Info = (data) => axios.get('api/v1/auth/register/2/10', data)

  registerStep2Sub10 = (data) => axios.post('api/v1/auth/register/2/10', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  registerFinal = (data) => axios.post('api/v1/auth/register/final', data)

  forgotPassword = (data) => axios.post('api/v1/auth/recovery-password', data)
}
export default Auth
