import axios from 'axios'

class User {
  constructor (hasFake) {
    this.fake = hasFake
  }

  async info () {
    // if (this.fake) {
    return axios.get(
      axios.token === '13'
        ? 'https://my-json-server.typicode.com/RomanGaniev/fake-target/user/2'
        : 'https://my-json-server.typicode.com/RomanGaniev/fake-target/user/1'
    )
    // return require('../fakedata/user/info')
    // }
  }

  showInfo = (data) => axios.get('api/v1/user/me', data)

  requestCert = (data) => axios.post('api/v1/user/sheet/request', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  paymentForm = (data) => axios.post('api/v1/user/sheet/paymentform', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  replacementShow = (data) => axios.get('api/v1/super/replacement/show', data)

  replacementAccept = (data) => axios.post('api/v1/super/replacement/accept', data)

  showMessage = (data) => axios.get(`api/v1/user/message/${data.id}`)
  downloadDoc = (data) => axios.get(`api/v1/user/message/${data.id}/download/${data.docId}`)

  saveDismissal = (data) => axios.post('api/v1/user/dismissal', data)
  saveMe = (data) => axios.post('api/v1/user/me', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  resendPhotos = (data) => axios.post('api/v1/user/message/employment', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export default User
