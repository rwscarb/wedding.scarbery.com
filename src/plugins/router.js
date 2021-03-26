import Vue from 'vue';

import VueRouter from "vue-router";

import About from "@/views/About.vue";
import Admin from "@/views/Admin.vue";
import Guestbook from "@/views/Guestbook.vue";
import Dashboard from "@/views/Dashboard.vue";
import DefaultAppBar from '@/views/app-bars/DefaultAppBar.vue';
import AdminAppBar from '@/views/app-bars/AdminAppBar.vue';
import InviteView from '@/views/admin/InviteView.vue';
import ProposeContractView from '@/views/admin/ProposeContractView.vue';
import AssetsView from '@/views/admin/AssetsView.vue';
import ActionsView from '@/views/admin/ActionsView.vue';
import SettingsView from '@/views/admin/SettingsView.vue';
import AboutAppBar from '@/views/app-bars/AboutAppBar.vue';
import TimelineView from '@/views/about/TimelineView.vue';
import EventsView from '@/views/about/EventsView.vue';
import PhotosView from '@/views/admin/PhotosView.vue';
import Help from '@/views/Help.vue';


const routes = [
  {
    path: '/about', components: {
      default: About,
      appBar: AboutAppBar,
    },
      children: [
        {path: 'timeline', component: TimelineView},
        {path: 'events', component: EventsView},
        {path: '', redirect: 'timeline'}
      ]
  },
  {
    path: '/admin', components: {
      default: Admin,
      appBar: AdminAppBar,
    },
    children: [
      {path: 'invite', component: InviteView},
      {path: 'contract', component: ProposeContractView},
      {path: 'assets', component: AssetsView},
      {path: 'actions', component: ActionsView},
      {path: 'settings', component: SettingsView},
      {path: '', redirect: 'invite'}
    ]
  },
  {
    path: '/dashboard', components: {
      default: Dashboard,
      appBar: DefaultAppBar
    }
  },
  {
    path: '/guest-book', components: {
      default: Guestbook,
      appBar: DefaultAppBar
    }
  },
  {
    path: '/photos', components: {
      default: PhotosView,
      appBar: DefaultAppBar
    }
  },
  {
    path: '/help', components: {
      default: Help,
      appBar: DefaultAppBar
    }
  },
  {path: '*', redirect: '/guest-book'}
]

Vue.use(VueRouter);

export const router = new VueRouter({routes});