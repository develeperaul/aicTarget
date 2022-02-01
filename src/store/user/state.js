import { LocalStorage } from 'quasar'

export default function () {
  return {
    info: null,
    token: LocalStorage.getItem('token') || null
  }
}
