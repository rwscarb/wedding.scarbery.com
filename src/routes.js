import VueRouter from "vue-router";
import Admin from "@/views/Admin.vue";
import Guestbook from "@/views/Guestbook.vue";


const routes = [
  { path: '/admin', component: Admin },
  { path: '/guest-book', component: Guestbook },
  { path: '*', redirect: '/guest-book'}
]

export const router = new VueRouter({routes});