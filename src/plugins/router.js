import Vue from 'vue';

import VueRouter from "vue-router";

const About = () => import(/* webpackChunkName: "about" */ '@/views/About.vue');
const AboutAppBar = () => import(/* webpackChunkName: "about" */ '@/views/app-bars/AboutAppBar.vue');
const TimelineView = () => import(/* webpackChunkName: "about" */ '@/views/about/TimelineView.vue');
const EventsView = () => import(/* webpackChunkName: "about" */ '@/views/about/EventsView.vue');
const InfoView = () => import(/* webpackChunkName: "about" */ '@/views/about/InfoView.vue');

const Admin = () => import(/* webpackChunkName: "admin" */ '@/views/Admin.vue');
const AdminAppBar = () => import(/* webpackChunkName: "admin" */ '@/views/app-bars/AdminAppBar.vue');
const ActionsView = () => import(/* webpackChunkName: "admin" */ '@/views/admin/ActionsView.vue');
const AssetsView = () => import(/* webpackChunkName: "admin" */ '@/views/admin/AssetsView.vue');
const InviteView = () => import(/* webpackChunkName: "admin" */ '@/views/admin/InviteView.vue');
const PhotosView = () => import(/* webpackChunkName: "admin" */ '@/views/admin/PhotosView.vue');
const ProposeContractView = () => import(/* webpackChunkName: "admin" */ '@/views/admin/ProposeContractView.vue');
const SettingsView = () => import(/* webpackChunkName: "admin" */ '@/views/admin/SettingsView.vue');

const Guestbook = () => import('@/views/Guestbook.vue');
const Dashboard = () => import('@/views/Dashboard.vue');
const DefaultAppBar = () => import('@/views/app-bars/DefaultAppBar.vue');
const Help = () => import('@/views/Help.vue');


const routes = [
  {
    path: '/about', components: {
      default: About,
      appBar: AboutAppBar,
    },
      children: [
        {path: '', component: InfoView},
        {path: 'timeline', component: TimelineView},
        {path: 'events', component: EventsView},
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
  {path: '*', redirect: '/dashboard'}
]

Vue.use(VueRouter);

export const router = new VueRouter({routes, mode: 'history'});