import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import HomePage from "@/views/Homepage.vue";
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
      path: '/login',
      name: 'loginpage',
      component: LoginView,
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: HomePage,
      meta: { requiresAuth: true }, // Add metadata to protect this route
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
      meta: { requiresAuth: true }, // Add metadata to protect this route
    },
    {
      path: '/profile',
      name: 'profilepage',
      component: ProfilePage,
      meta: { requiresAuth: true }, // Add metadata to protect this route
    },
  ],
})


router.beforeEach(async (to, from, next) => {
  const { data: { user } } = await supabase.auth.getUser(); // Check if user is logged in

  if (to.matched.some((record) => record.meta.requiresAuth)) {
      // Route requires authentication
      if (!user) {
          console.log("Redirecting to /login (authentication required)");
          return next("/login");
      }
  } else {
      // Routes accessible without authentication
      if (user && ["/", "/about", "/login", "/register"].includes(to.path)) {
          console.log("Redirecting to /home (user is logged in)");
          return next("/profile");
      } else if (!user && to.path === "/butnotregisteredpath") {
          console.log("Redirecting to / (unauthenticated user on restricted path)");
          return next("/");
      }
  }

  next(); // Proceed to the requested route
});


export default router
