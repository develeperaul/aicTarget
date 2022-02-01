import { LocalStorage } from 'quasar'
import axios from 'axios'

import Api from 'modules/api'
const apiUser = new Api('User')

export function saveToken ({ commit }, token) {
  axios.token = token
  LocalStorage.set('token', token)
  commit('SAVE_TOKEN', token)
}
export async function fetchInfo ({ commit }) {
  return new Promise((resolve, reject) => {
    //   console.log(apiUser)
    // console.log('1')
    apiUser.call('showInfo')
      .then(async ({ data }) => {
        console.log(data)
        // console.log('2')
        //
        commit('SAVE_INFO', data.data)
        resolve()
      //     //   console.log(res)
      //     //   return res
      })
      .catch(() => {
        reject()
      })
  })
}
