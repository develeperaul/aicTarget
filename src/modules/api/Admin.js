import axios from 'axios'

class User {
  constructor (hasFake) {
    this.fake = hasFake
  }

  async info () {
    if (this.fake) {
      return axios.get(
        axios.token === '13'
          ? 'https://my-json-server.typicode.com/RomanGaniev/fake-target/user/2'
          : 'https://my-json-server.typicode.com/RomanGaniev/fake-target/user/1'
      )
    }
  }

  sendMessage = (data) => axios.post('api/v1/admin/messages/send', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  verifyDoc = (data) => axios.post('api/v1/admin/employment/verify/doc', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  verifyRegistration = (data) => axios.post('api/v1/admin/employment/verify/registration', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  showNotVerifiedRegistrations = (data) => axios.post('api/v1/admin/employment/applications', data)
  showNotVerifiedRegistrationsByFio = (data) => axios.post('api/v1/admin/employment/filter-by-fio', data)
  showNotVerifiedRegistrationsByProject = (data) => axios.post('api/v1/admin/employment/filter-by-project', data)
  showNotVerifiedRegistrationsByFioAndProject = (data) => axios.post('api/v1/admin/employment/filter-by-fio-and-project', data)

  showOneApplication = (data) => axios.get(`api/v1/admin/employment/application/${data.params.uuid}`, data)

  send1C = (data) => axios.get(`api/v1/admin/employment/application/${data.uuid}/1c`, data)

  projectList = (data) => axios.get('api/v1/admin/employees/project_list', data)

  showEmployees = (data) => axios.post('api/v1/admin/employees', data)
  showSelectedEmployees = (data) => axios.post('api/v1/admin/employees/selected', data)
  showEmployeesByProject = (data) => axios.post('api/v1/admin/employees/filter-by-project', data)
  showEmployeesByFio = (data) => axios.post('api/v1/admin/employees/filter-by-fio', data)
  showEmployeesByFioAndProject = (data) => axios.post('api/v1/admin/employees/filter-by-fio-and-project', data)

  categoryList = (data) => axios.get('api/v1/admin/tutorial/category_list', data)

  postTutorials = (data) => axios.post('api/v1/admin/tutorials/add', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  saveTutorial = (data) => axios.post(`api/v1/admin/tutorial/${data.tutorial_id}/save`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  showTutorials = (data) => axios.get(`api/v1/admin/tutorials/${data.project_id}/${data.category_id}`, data)

  showProjects = (data) => axios.get('api/v1/admin/tests/projects')
  showProjectsTest = (data) => axios.get(`api/v1/admin/tests/project/${data.project_id}/show`)
  testAdd = (data) => axios.post(`api/v1/admin/tests/project/${data.project_id}/save`, data)
  testSave = (data) => axios.post(`api/v1/admin/tests/test/${data.test_id}/save`, data)
  testDelete = (data) => axios.post(`api/v1/admin/tests/test/${data.test_id}/delete`, data)

  downloadDoc = (data) => axios.get(`api/v1/admin/tutorials/${data.tutorialId}/download/${data.docId}`)

  // сообщения за месяц
  showMonthMessage = (data) => axios.get('api/v1/admin/month-messages')

  // удалить сообщения передается id
  removeMonthMessage = (data) => axios.post(`api/v1/admin/month-messages/${data.id}/remove`)
  addMonthMessage = (data) => axios.post('api/v1/admin/month-messages/store', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  importBonusList = (data) => axios.post('api/v1/admin/employees/bonuslist', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  showVacationRequests = () => axios.post('api/v1/admin/vacation/requests')
  showVacationRequestsByFio = (data) => axios.post('api/v1/admin/vacation/filter-by-fio', data)
  showVacationRequestsByProject = (data) => axios.post('api/v1/admin/vacation/filter-by-project', data)
  showVacationRequestsByFioAndProject = (data) => axios.post('api/v1/admin/vacation/filter-by-fio-and-project', data)

  showVacationBlank = (data) => axios.get(`api/v1/admin/vacation/requests/${data.params.uuid}`, data)

  approveVacationBlank = (data) => axios.post('api/v1/admin/vacation/approve', data)

  downloadVacationScan = (data) => axios.get(`api/v1/admin/vacation/${data.blank_id}/download/${data.scan_id}`)
}
export default User
