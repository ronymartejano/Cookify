import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/Dashboard/DashboardView.vue'
import HomePage from "@/views/HomePage.vue";
import LandingPage from "@/views/LandingPage.vue";
import AboutPage from "@/views/AboutPage.vue";
import SharePage from "@/views/SharePage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import { supabase } from "@/utils/supabase"; // Import Supabase client

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingpage',
      component: LandingPage,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/login',
      name: 'loginpage',
      component: LoginView,
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'aboutpage',
      component: AboutPage,
    },
    {
      path: '/sharepage',
      name: 'sharepage',
      component: SharePage,
    },
    {
      path: '/profile',
      name: 'profilepage',
      component: ProfilePage,
    },
  ],
})

export default router
