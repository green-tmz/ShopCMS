import { createWebHistory, createRouter } from 'vue-router'
import store from '@/store'

/* Guest Component */
const Login = () => import('@/modules/user/pages/Login.vue')
const Register = () => import('@/modules/user/pages/Register.vue')
const ResetPass = () => import('@/modules/user/pages/ResetPass.vue')
const Home = () => import('@/modules/product/pages/Home.vue')
const Category = () => import('@/modules/product/pages/Category.vue')
const About = () => import('@/modules/product/pages/About.vue')
const Cart = () => import('@/modules/cart/pages/Cart.vue')
const Product = () => import('@/modules/product/pages/Product.vue')
/* Guest Component */

/* Layouts */
const DahboardLayout = () => import('@/components/layouts/Default.vue')
/* Layouts */

/* Authenticated Component */
const Profile = () => import('@/modules/user/pages/Profile.vue')
/* Authenticated Component */

const routes = [
    {name: "home", path: "/", component: Home,
        meta: {middleware: "guest", title: 'Главная'}},

    {name: "category", path: "/category", component: Category,
        meta: {middleware: "guest", title: 'Категории'}},

    {name: "about", path: "/about", component: About,
        meta: {middleware: "guest",title: 'О компании'}},

    {name: "cart", path: "/cart", component: Cart,
        meta: {middleware: "guest", title: 'Корзина'}},

    {
        path: '/product/:id',
        name: 'Product',
        component: Product,
        meta: {
            middleware: "guest",
            title: 'Товар'
        }
    },
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: 'Вход'
        }
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {
            middleware: "guest",
            title: 'Регистрация'
        }
    },
    {
        name: "reset-pass",
        path: "/reset-pass",
        component: ResetPass,
        meta: {
            middleware: "guest",
            title: 'Восстановление пароля'
        }
    },
    {
        path: "/dashboard",
        component: DahboardLayout,
        meta: {
            middleware: "auth"
        },
        children: [
            {
                name: "profile",
                path: '/profile',
                component: Profile,
                meta: {
                    title: 'Профиль'
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.middleware == "auth") {
        if (store.state.auth.authenticated) {
            next()
        } else {
            next({ name: "login" })
        }
    } else {
        next()
    }
})

export default router
