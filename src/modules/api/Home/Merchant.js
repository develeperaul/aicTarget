import axios from 'axios'
class HomeMerchant {
  constructor (hasFake) {
    this.fake = hasFake
  }

  getActual = () => axios.get('api/v1/user/messages?type=actual')
  getDeleted = () => axios.get('api/v1/user/messages?type=deleted')
  deleteMessage = (data) => axios.post(`api/v1/user/message/${data.id}/delete`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  restoreMessage = (data) => axios.post(`api/v1/user/message/${data.id}/restore`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  showMessage = (data) => axios.get(`api/v1/user/message/${data.id}`)

  readMessage = (data) => axios.post(`api/v1/user/message/${data.id}/read`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  // downloadDoc = (data) => axios.get(`api/v1/user/message/${data.id}/download/${data.docId}`)

  showTests = (data) => axios.get('api/v1/user/tests/list')
  testAccept = (data) => axios.post(`api/v1/user/tests/test/${data.test_id}/accept`, data)
  showTutorials = (data) => axios.get(`api/v1/user/tutorials/${data.category_id}`, data)
  showVideoMaterials = (data) => axios.get('api/v1/user/tutorials/video-materials', data)
  downloadTutorialDoc = (data) => axios.get(`api/v1/user/tutorials/${data.tutorialId}/download/${data.docId}`)
  categoryList = (data) => axios.get('api/v1/user/tutorial/category_list', data)

  toVac = (data) => axios.post('api/v1/user/medical/to', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  fromVac = () => axios.post('api/v1/user/medical/from', {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  showPeriods = (data) => axios.get(`api/v1/user/vacation/${data.year}/show_periods`)

  sendVacationBlanks = (data) => axios.post('api/v1/user/vacation/blanks/send', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export default HomeMerchant
