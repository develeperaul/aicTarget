// import { routes as routesCap } from './modes/capacitor'
// import { routes as routesSpa } from './modes/spa'

// let routes
console.log(process.env)
// if (process.env.MODE === 'capacitor') {
const { routes } = require(`./modes/${process.env.TYPE}`)
// } else if (process.env.MODE === 'spa') {
//   var { routes } = require('./modes/spa')
// }

// console.log(routes)
export default routes
