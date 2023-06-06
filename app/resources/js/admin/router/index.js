import { createWebHistory, createRouter } from 'vue-router'
import store from '@/admin/store'

/* Guest Component */
const Login = () => import('@/admin/components/Login.vue')
/* Guest Component */

/* Authenticated Component */
const Dashboard = () => import('@/admin/modules/dashboard/Dashboard.vue')
const Products = () => import('@/admin/modules/product/pages/Products.vue')
const ProductsAdd = () => import('@/admin/modules/product/pages/Add.vue')
const ProductsEdit = () => import('@/admin/modules/product/pages/Edit.vue')
/* Authenticated Component */


const routes = [
    {
        name: "admin-login",
        path: "/admin/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: 'Вход'
        }
    },
    {
        name: "dashboard",
        path: "/admin/dashboard",
        component: Dashboard,
        meta: {
            title: 'Панель управления'
        }
    },
    {
        name: "products",
        path: "/admin/products",
        component: Products,
        meta: {
            title: 'Товары'
        }
    },
    {
        name: "products-add",
        path: "/admin/products/add",
        component: ProductsAdd,
        meta: {
            title: 'Добавление товара'
        }
    },
    {
        name: "products-edit",
        path: "/admin/products/:id",
        component: ProductsEdit,
        meta: {
            title: 'Редактирование товара'
        }
    },
    // {
    //     path: "/admin",
    //     component: DahboardLayout,
    //     meta: {
    //         middleware: "admin"
    //     },
    //     children: [
    //         {
    //             name: "dashboard",
    //             path: '/admin/dashboard',
    //             component: Dashboard,
    //             meta: {
    //                 title: 'Панель управления'
    //             }
    //         }
    //     ]
    // }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.middleware == "admin") {
        if (store.state.auth.authenticated) {
            next()
        } else {
            next({ name: "admin-login" })
        }
    } else {
        next()
    }
})

export default router
