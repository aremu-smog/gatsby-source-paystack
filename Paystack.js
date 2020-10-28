const axios = require('axios').default

class Paystack {
  constructor(secret_key) {
    this.secret_key = secret_key
    this.api = axios.create({
      baseURL: 'https://api.paystack.co',
      headers: {
        Authorization: `Bearer ${secret_key}`
      }
    })
  }

  async products() {
    try {
      const fetchProductsResponse = await this.api.get('/product')
      return fetchProductsResponse.data.data
    } catch (error) {
      console.log(error)
    }
  }

  async customers() {
    try {
      const fetchCustomersResponse = await this.api.get('/customer')
      return fetchCustomersResponse.data.data
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Paystack
