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

  async getProducts() {
    try {
      const fetchProductsResponse = await this.api.get('/product')
      return fetchProductsResponse.data.data
    } catch (error) {
      console.log(error)
    }
  }

  async getProductOptions(product_id) {
    try {
      const fetchProductOptionsResponse = await this.api.get(
        `/product/${product_id}/option`
      )

      return fetchProductOptionsResponse.data.data
    } catch (error) {
      console.log(error)
    }
  }

  async getProductVariants(product_id) {
    try {
      const fetchProductVariantsResponse = await this.api.get(
        `product/${product_id}/variant?id=${product_id}`
      )
      return fetchProductVariantsResponse.data.data
    } catch (error) {
      console.log(error)
    }
  }

  async getCustomers() {
    try {
      const fetchCustomersResponse = await this.api.get('/customer')
      return fetchCustomersResponse.data.data
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Paystack
