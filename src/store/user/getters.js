/*
export function someGetter (state) {
}
*/
export function info (state) {
  return state.info || {
    username: ''
  }
}
