import { createRouter, createWebHistory } from 'vue-router'
import store from "../store"
import Login from "../views/Login.vue"

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/registration",
    name: "Registration",
    component: () => import(/* webpackChunkName: "registration" */ "../views/Registration.vue")
  },
  {
    path: "/add-new-event",
    name: "AddNewEvent",
    component: () => import(/* webpackChunkName: "events" */ "../views/AddNewEvent.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters.getLoginStatus) next();
      else next({ name: from.name });
    }
  },
  {
    path: "/edit-event/:id",
    name: "EditEvent",
    component: () => import(/* webpackChunkName: "events" */ "../views/EditEvent.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters.getLoginStatus) next();
      else next({ name: from.name });
    }
  },
  {
    path: "/edit-event-page",
    name: "EditEventPage",
    component: () => import(/* webpackChunkName: "events" */ "../views/EditEventPage.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters.getLoginStatus) next();
      else next({ name: from.name });
    }
  },
  {
    path: "/events-list",
    name: "EventsList",
    component: () => import(/* webpackChunkName: "events" */ "../views/EventsList.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters.getLoginStatus) next();
      else next({ name: from.name });
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
