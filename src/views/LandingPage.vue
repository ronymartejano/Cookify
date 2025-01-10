<template>
  <v-app>
    <!-- Navbar -->
    <v-app-bar
      app
      elevate-on-scroll
      sticky
      style="
        z-index: 20;
        background-color: rgba(255, 248, 220, 0.6); /* Transparent background */
        backdrop-filter: blur(10px); /* Blur effect */
      "
    >
      <v-toolbar-title>
        <div class="d-flex align-center">
          <v-icon size="24" color="#FFBF00">mdi-cookie-outline</v-icon>
          <span
            class="font-weight-bold"
            style="
              color: #3e4e3a;
              margin-left: 8px;
              font-size: 0.9rem;
              white-space: normal;
              overflow: visible;
            "
          >
            CooKify
          </span>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Show buttons for larger screens -->
      <div class="d-none d-md-flex">
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/about">About</v-btn>
        <v-btn text to="/login">Login</v-btn>
        <v-btn text to="/register">Signup</v-btn>
      </div>

      <!-- Hamburger menu for smaller screens -->
      <v-btn icon class="d-md-none" @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sidebar Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      style="
        z-index: 9999;
        background-color: rgba(255, 248, 220, 0.6); /* Transparent background */
        backdrop-filter: blur(10px); /* Blur effect */
        pointer-events: auto; /* Ensures elements are clickable */
      "
      left
    >
      <v-list>
        <v-list-item to="/">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/about">
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>
        <v-list-item to="/login">
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
        <v-list-item to="/register">
          <v-list-item-title>Signup</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Page Content -->
    <v-main
      style="
        background-image: url('/src/assets/images/log-in-backg.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        min-height: 100vh;
      "
    >
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-toolbar-title class="text-center" style="width: 100%">
              <div class="d-flex justify-center align-center" style="line-height: 1.2">
                <v-icon size="30" color="#FFBF00" style="margin-right: 8px"
                  >mdi-cookie-outline</v-icon
                >
                <span
                  class="font-weight-bold"
                  style="
                    color: #3e4e3a;
                    margin-left: 8px;
                    font-size: 2.5rem;
                    line-height: 1.2;
                    white-space: nowrap;
                  "
                >
                  CooKify
                </span>
              </div>
            </v-toolbar-title>

            <h1 class="text-center font-weight-bold mb-6" style="color: #3e4e3a">
              Discover CooKify: Eat Smart, Live Better!
            </h1>
            <p class="text-center mb-10" style="font-size: 1.2rem; color: #5d6f61">
              Welcome to Cookify – your ultimate culinary companion! Are you tired of the
              same old meals and looking for a way to spice up your dining experience?
              Cookify is here to transform your kitchen into a world of flavor and
              creativity.
            </p>
          </v-col>
        </v-row>

        <!-- Icons and Features Section -->
        <v-row class="mt-10" justify="center">
          <v-col cols="12" md="4" class="text-center">
            <v-icon size="48" color="#FF5733">mdi-silverware-fork-knife</v-icon>
            <h3 class="font-weight-bold mt-2" style="color: #3e4e3a">Easy Recipes</h3>
            <p style="color: #5d6f61">
              Find quick and easy recipes tailored to your taste.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon size="48" color="#C70039">mdi-currency-usd</v-icon>
            <h3 class="font-weight-bold mt-2" style="color: #3e4e3a">Budget-Friendly</h3>
            <p style="color: #5d6f61">Enjoy delicious meals without breaking the bank.</p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon size="48" color="#FFC300">mdi-food-apple-outline</v-icon>
            <h3 class="font-weight-bold mt-2" style="color: #3e4e3a">Healthy Options</h3>
            <p style="color: #5d6f61">
              Explore healthy recipes for a balanced lifestyle.
            </p>
          </v-col>
        </v-row>

        <v-row class="mt-10">
          <v-col cols="12" class="text-center">
            <v-btn
              color="#FFBF00"
              text
              large
              class="text-white"
              style="background-color: #ff5733; border-radius: 8px"
              to="/login"
            >
              Explore Recipes Now!
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer
      app
      style="
        background-color: rgba(255, 248, 220, 0.6); /* Transparent background */
        backdrop-filter: blur(10px); /* Blur effect */
        z-index: 10;
      "
    >
      <v-container>
        <v-row justify="space-between" align="center">
          <v-col cols="12" md="4" class="text-black text-center text-md-left">
            <p>&copy; {{ new Date().getFullYear() }} CooKify. All Rights Reserved.</p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon color="black">mdi-facebook</v-icon>
            <v-icon color="black" class="mx-3">mdi-twitter</v-icon>
            <v-icon color="black">mdi-instagram</v-icon>
          </v-col>
          <v-col cols="12" md="4" class="text-black text-center text-md-right">
            <p>Privacy Policy | Terms of Service</p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false, // Controls the sidebar drawer visibility
    };
  },
};
</script>

<style scoped>
.font-weight-bold {
  font-size: 0.9rem;
}
.text-center {
  text-align: center;
}
p,
h3,
span,
h1 {
  color: white !important;
}
</style>
