import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '@/store/auth'
import cart from '@/store/cart'
import products from '@/store/product'
import user from '@/store/user/store'

const store = createStore({
    plugins:[
        createPersistedState()
    ],
    modules:{
        auth, cart, products, userName: user
    }
})

export default store
