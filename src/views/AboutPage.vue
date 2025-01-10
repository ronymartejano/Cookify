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
              color: white;
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
                    color: white;
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

            <h1 class="text-center font-weight-bold mb-6" style="color: white">
              Discover CooKify: Eat Smart, Live Better!
            </h1>
            <p class="text-center mb-10" style="font-size: 1.2rem; color: white">
              Welcome to Cookify – your ultimate culinary companion! Are you tired of the
              same old meals and looking for a way to spice up your dining experience?
              Cookify is here to transform your kitchen into a world of flavor and
              creativity.
            </p>
            <p style="color: white">
              With Cookify, we do more than just recommend recipes. We understand that
              food is deeply tied to emotions. Whether you're feeling adventurous,
              nostalgic, or in need of comfort, Cookify curates the perfect dish to match
              your mood. Simply tell us how you feel, and we’ll whip up a personalized
              culinary adventure just for you.
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card outlined class="mb-6">
              <v-card-title class="font-weight-bold">Why CooKify?</v-card-title>
              <v-card-text
                >Mood-Based Recipes: Our unique algorithm selects recipes that resonate
                with your emotions. Endless Variety: From classic comfort foods to exotic
                new cuisines, there’s always something exciting to try. Easy to Use: A
                seamless interface designed to make meal planning fun and effortless.
                Inspiration on Demand:Get out of your cooking rut and discover new
                favorites with just a few taps.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card outlined class="mb-6">
              <v-card-title class="font-weight-bold"
                >Budget-Friendly Recipes</v-card-title
              >
              <v-card-text
                >Tired of the same old dinner? Let our app whip up a culinary adventure!
                Tell us your mood, and we'll find the perfect recipe. Cooking should be
                fun, not frustrating. Discover delicious recipes tailored to your taste
                and cravings. Feeling adventurous? Spin the Wheel of Fortune and uncover a
                surprise recipe! You might just discover your new favorite dish.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-card outlined class="mb-6">
              <v-card-title class="font-weight-bold">Share & Discover</v-card-title>
              <v-card-text>
                Where cravings meet creativity. Explore a world of flavors with our recipe
                generator, and let your culinary journey begin. Cook with a smile! Our app
                is your playful culinary companion, offering exciting recipes and making
                cooking a joyful experience.".</v-card-text
              >
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card outlined class="mb-6">
              <v-card-title class="font-weight-bold">Nutritional Insights</v-card-title>
              <v-card-text
                >Feeling adventurous? Spin the Wheel of Fortune and uncover a surprise
                recipe! You might just discover your new favorite dish. Unlock your inner
                chef! Our app is your personal culinary guide, offering delicious recipes
                and inspiring your next kitchen masterpiece. Say goodbye to mealtime
                boredom! Our app provides endless inspiration with personalized recipes,
                making cooking fun and easy.</v-card-text
              >
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card outlined class="mb-6">
              <v-card-title class="font-weight-bold">Save Your Favorites</v-card-title>
              <v-card-text
                >Found a recipe that caught your eye? Save it effortlessly with just one
                click and keep it securely stored in your Favorites List. Whether it’s a
                dish you want to try later or a go-to recipe you can’t get enough of, your
                Favorites List ensures easy access anytime, making meal planning and
                cooking more convenient than ever.</v-card-text
              >
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-8">
          <v-col cols="12" class="text-center">
            <p style="font-size: 1.1rem; color: white">
              Cookify isn’t just an app – it’s your partner in creating memorable meals
              and experiences. Let us guide you through a world of flavors, one mood at a
              time. So, what are you craving today?
            </p>
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
/* Apply the background image to the desired container */

.font-weight-bold {
  font-size: 0.9rem;
}

.text-center {
  text-align: center;
}
</style>
