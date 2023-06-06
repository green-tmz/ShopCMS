import axios from 'axios'
import { SET_PRODUCTS_MUTATIONS } from './types'

export default {
  async getProducts (context, { text }) {

    const { data } = await axios.get('/api/products/all')

    context.commit(SET_PRODUCTS_MUTATIONS, data.products)

    // context.dispatch('log', text)
  },
  log(ctx, payload) {
    console.log(payload)
  }
}
