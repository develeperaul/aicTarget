import axios from 'axios'

class MerchantBonuses {
  constructor (hasFake) {
    this.fake = hasFake
  }

  getBonuses = (data) => axios.get('api/v1/user/bonuses')
}
export default MerchantBonuses
