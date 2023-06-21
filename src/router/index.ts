import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { ShoppingBag, Wallet, Chicken } from '@element-plus/icons-vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'name',
    // 路由默认跳转
    redirect: '/Login'
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue'),
    //数据统计
    children: [  //住户统计
      {
        path: '/HouseholdStatistics',
        name: "HouseholdStatistics",
        meta: {
          name: '住户统计',
          icon: ShoppingBag
        },
        component: () => import('../views/home/childrens/HouseholdStatistics.vue'),
        children: [{
          //住户展示
          path: '/HouseholdInformation',
          name: "HouseholdInformation",
          component: () => import('../views/home/childrens/HouseholdInformation.vue'),
          meta: {
            name: '住户展示',
          },
        }, {
          //住户修改
          path: '/HouseholdModification',
          name: "HouseholdModification",
          component: () => import('../views/home/childrens/HouseholdModification.vue'),
          meta: {
            name: '住户修改'
          },
        },]
      }, {
        path: '/DataStatistics',
        name: "DataStatistics",
        component: () => import('../views/home/childrens/DataStatistics.vue'),
        meta: {
          name: '数据统计',
          icon: Wallet

        },
      },
      // 缴费记录{
      {
        path: '/PaymentManagement',
        name: "PaymentManagement",
        meta: {
          name: '缴费记录',
          icon: Chicken
        },
        component: () => import('../views/home/childrens/PaymentManagement.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})


export default router
