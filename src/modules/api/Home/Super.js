import axios from 'axios'
class HomeSuper {
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

  readMessage = (data) => axios.post(`api/v1/user/message/${data.id}/read`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  // postTutorials = (data) => axios.post('api/v1/super/tutorials/add', data, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   }
  // })

  // saveTutorial = (data) => axios.post(`api/v1/super/tutorial/${data.tutorial_id}/save`, data, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   }
  // })

  showTutorials = (data) => axios.get(`api/v1/super/tutorials/${data.category_id}`, data)

  downloadTutorialDoc = (data) => axios.get(`api/v1/super/tutorials/${data.tutorialId}/download/${data.docId}`)

  projectList = (data) => axios.get('api/v1/admin/employees/project_list', data)
  categoryList = (data) => axios.get('api/v1/super/tutorial/category_list', data)

  vacationSendMail = () => axios.get('api/v1/super/vacation/send_mail')
  vacationShowSingle = () => axios.get('api/v1/super/vacation/show_single')
  vacationEditSingle = (data) => axios.post('api/v1/super/vacation/edit_single', data)
  vacationRequest1c = () => axios.get('api/v1/super/vacation/request_1c')
  vacationAccept1c = (data) => axios.post('api/v1/super/vacation/accept_1c', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  importVacationSchedule = (data) => axios.post('api/v1/super/vacation/schedule', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  showVacationSchedules = (data) => axios.get('api/v1/super/vacation/schedules')

  vacationRemoveSchedule = (data) => axios.post('api/v1/super/vacation/schedule/remove', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

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

  showTests = (data) => axios.get('api/v1/super/tests/list')
  testAdd = (data) => axios.post('api/v1/super/tests/add', data)
  testSave = (data) => axios.post(`api/v1/super/tests/test/${data.test_id}/save`, data)
  testDelete = (data) => axios.post(`api/v1/super/tests/test/${data.test_id}/delete`, data)

  showProbationers = () => axios.get('api/v1/super/probation/probationers')
  showProbationersByProject = (data) => axios.get(`api/v1/super/probation/filter-by-project/${data.project_id}`, data)
  showProbationersByFio = (data) => axios.get(`api/v1/super/probation/filter-by-fio/${data.fio}`, data)
  confirmProbation = (data) => axios.post('api/v1/super/probation/confirm', data)
}
export default HomeSuper
