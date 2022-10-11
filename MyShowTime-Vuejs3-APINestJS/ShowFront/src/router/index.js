import { createRouter, createWebHashHistory } from 'vue-router'
import HomeUser from '../views/HomeUser.vue'
import HomeAdmin from '../views/HomeAdmin.vue'
import EditCustomer from '@/components/admin/EditCustomer'
import CreateCustomer from '@/components/admin/CreateCustomer'
import SaleReview from '@/components/admin/SaleReview'
import Signin from '@/components/customer/Signin'
import Signup from '@/components/customer/Signup'
import UpdateProfile from '@/components/customer/UpdateProfile'
import GetCustomerId from '@/components/customer/GetCustomerId'
import CreateEvent from '@/components/event/CreateEvent'
import EditEvent from '@/components/event/EditEvent'
import GetEventId from '@/components/event/GetEventId'

const routes = [
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
    meta: {
      requiresNoAuth: true,
    },
  },

  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      requiresNoAuth: true,
    },
  },

  {
    path: '/',
    name: 'HomeUser',
    component: HomeUser,
  },

  {
    path: '/homeadmin',
    name: 'HomeAdmin',
    component: HomeAdmin,
    meta: {
      admin: true,
    },
  },
  {
    path: '/salereview',
    name: 'SaleReview',
    component: SaleReview,
    meta: {
      admin: true,
    },
  },

  {
    path: '/createcustomer',
    name: 'CreateCustomer',
    component: CreateCustomer,
    meta: {
      admin: true,
    },
  },
  {
    path: '/editcustomer/:id',
    name: 'EditCustomer',
    component: EditCustomer,
    meta: {
      admin: true,
    },
  },

  {
    path: '/updateprofile/:id',
    name: 'UpdateProfile',
    component: UpdateProfile,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/getcustomerid/:id',
    name: 'GetCustomerId',
    component: GetCustomerId,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/createevent',
    name: 'CreateEvent',
    component: CreateEvent,
    meta: {
      admin: true,
    },
  },
  {
    path: '/editevent/:id',
    name: 'EditEvent',
    component: EditEvent,
    meta: {
      admin: true,
    },
  },
  {
    path: '/geteventid/:id',
    name: 'GetEventId',
    component: GetEventId,
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

router.beforeEach((to, from, next) => {
  const loggedIn = sessionStorage.getItem('userId')
  const admin = sessionStorage.getItem('status') == 1 ? true : false

  console.log(loggedIn)
  console.log(admin)

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next({ name: 'HomeUser' })
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.admin)) {
    if (!admin) {
      next({ name: 'HomeUser' })
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.requiresNoAuth)) {
    if (loggedIn) {
      next({ name: 'HomeUser' })
    } else {
      next()
    }
  } else {
    next()
  }
})
