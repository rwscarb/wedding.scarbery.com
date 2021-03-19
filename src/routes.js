import VueRouter from "vue-router";

import About from "@/views/About.vue";
import Admin from "@/views/Admin.vue";
import Guestbook from "@/views/Guestbook.vue";


const routes = [
  { path: '/about', component: About },
  { path: '/admin', component: Admin },
  { path: '/guest-book', component: Guestbook },
  { path: '*', redirect: '/guest-book'}
]

export const router = new VueRouter({routes});