<script>
import bgImage from "@/assets/images/bgunlock.jpg";
export default {
  data() {
    return {
      bgImage,
    };
  },
};
</script>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AppLayout from "@/components/layout/AppLayout.vue";
import { useDisplay } from "vuetify";
import cookifyImage from "@/assets/images/cookifybr2.png";
import { supabase } from "@/utils/supabase";
import { requiredValidator, emailValidator } from "@/utils/validators";
const drawer = ref(false);

// Mobile responsiveness
const { mobile } = useDisplay();

// Router instance
const router = useRouter();

// Form references
const refVForm = ref();

// Password visibility toggle
const visible = ref(false);

// Form fields and validation rules
const formDataDefault = {
  email: "",
  password: "",
};
const formData = ref({ ...formDataDefault });

// Form actions and messages
const formAction = ref({
  formProcess: false,
  formErrorMessage: "",
  formSuccessMessage: "",
});

// Handle Login
// Handle Login
const handleLogin = async () => {
  // Start processing
  formAction.value = {
    ...formAction.value,
    formProcess: true,
    formErrorMessage: "",
    formSuccessMessage: "",
  };

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.value.email,
      password: formData.value.password,
    });

    if (error) {
      formAction.value.formErrorMessage = error.message || "Invalid login credentials.";
    } else if (data) {
      formAction.value.formSuccessMessage = "Login successful! Redirecting...";
      setTimeout(() => router.push({ name: "homepage" }), 1500); // Redirect to 'homepage'
    }
  } catch {
    formAction.value.formErrorMessage = "An error occurred. Please try again later.";
  } finally {
    // Stop processing
    formAction.value.formProcess = false;
  }
};

// Validate form and submit
const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) {
      handleLogin();
    }
  });
};
</script>

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

    <v-main
      :style="{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }"
    >
      <v-container
        class="fill-height"
        style="
          display: flex;
          justify-content: center; /* Center horizontally */
          align-items: center; /* Center vertically */
        "
      >
        <v-card
          elevation="10"
          :style="{
            width: mobile ? '100%' : '400px',
            height: mobile ? 'auto' : '60vh',
            maxWidth: '400px',
            overflowY: 'auto',
            backgroundColor: 'rgba(255, 248, 220, 0.6)',
            backdropFilter: 'blur(10px)',
            position: mobile ? 'static' : 'fixed',
            right: mobile ? 'auto' : '16px',
            top: mobile ? 'auto' : '50%',
            transform: mobile ? 'none' : 'translateY(-50%)',
          }"
        >
          <v-card-text class="text-center">
            <img src="@/assets/images/cookifybr2.png" height="200px" />
            <h3>Login now to start your culinary journey!</h3>
          </v-card-text>
          <v-card-text>
            <v-form ref="refVForm" @submit.prevent="onFormSubmit">
              <!-- Email Field -->
              <v-text-field
                v-model="formData.email"
                :rules="[requiredValidator, emailValidator]"
                prepend-inner-icon="mdi-email-outline"
                label="Email"
                type="email"
                variant="outlined"
                clearable
                class="mt-2"
              ></v-text-field>

              <!-- Password Field -->
              <v-text-field
                v-model="formData.password"
                :type="visible ? 'text' : 'password'"
                :rules="[requiredValidator]"
                label="Enter password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                clearable
                class="mt-4"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="visible = !visible"
              ></v-text-field>

              <!-- Error Message -->
              <v-alert
                v-if="formAction.formErrorMessage"
                type="error"
                class="mt-4"
                closable
                dense
              >
                {{ formAction.formErrorMessage }}
              </v-alert>

              <!-- Success Message -->
              <v-alert
                v-if="formAction.formSuccessMessage"
                type="success"
                class="mt-4"
                closable
                dense
              >
                {{ formAction.formSuccessMessage }}
              </v-alert>

              <!-- Login Button -->
              <v-btn
                class="mt-4"
                type="submit"
                block
                color="#E1C16E"
                elevation="2"
                :loading="formAction.formProcess"
              >
                Login
              </v-btn>

              <!-- Register Redirect Button -->
              <div class="mt-4 text-center">
                <span>Don't have an account? </span>
                <router-link
                  to="/register"
                  class="register-link"
                  style="font-weight: bold; color: #e1c16e"
                  >Click here to Register</router-link
                >
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
