// import quasar from 'quasar'
/*
export function someMutation (state) {
}
*/
export function SAVE_TOKEN (state, token) {
  // console.log(quasar)
  state.token = token
}

export function SAVE_INFO (state, info) {
  state.info = info
}
