<template>
  <v-app>
    <!-- Navbar -->
    <v-app-bar
      app
      elevate-on-scroll
      sticky
      style="
        z-index: 20;
        background-color: rgba(255, 248, 220, 0.6);
        backdrop-filter: blur(10px);
      "
    >
      <v-toolbar-title>
        <div class="d-flex align-center">
          <v-icon size="24" color="#FFBF00">mdi-cookie-outline</v-icon>
          <span
            class="font-weight-bold"
            style="color: #3e4e3a; margin-left: 8px; font-size: 0.9rem"
          >
            CooKify
          </span>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-none d-md-flex">
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/about">About</v-btn>
        <v-btn text to="/login">Login</v-btn>
        <v-btn text to="/register">Signup</v-btn>
      </div>
      <v-btn icon class="d-md-none" @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sidebar Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      style="background-color: rgba(255, 248, 220, 0.6); backdrop-filter: blur(10px)"
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
        style="display: flex; justify-content: center; align-items: center"
      >
        <v-card
          v-show="mobile"
          elevation="10"
          style="
            width: 100%; /* Full width for mobile */
            max-width: 400px;
            height: auto; /* Adjust height automatically */
            overflow-y: auto;
            background-color: rgba(255, 248, 220, 0.6);
            backdrop-filter: blur(10px);
          "
          class="pt-10"
        >
          <v-card-text class="text-center">
            Register now to start your culinary journey!
          </v-card-text>
          <v-card-text>
            <v-card-text>
              <AlertNotification
                :form-success-message="formAction.formSuccessMessage"
                :form-error-message="formAction.formErrorMessage"
              />
              <v-form ref="refVForm" @submit.prevent="onFormSubmit">
                <v-text-field
                  v-model="formData.FirstName"
                  :rules="[requiredValidator]"
                  label="First Name"
                  variant="outlined"
                  clearable
                  class="mt-2"
                ></v-text-field>

                <v-text-field
                  v-model="formData.LastName"
                  :rules="[requiredValidator]"
                  label="Last Name"
                  variant="outlined"
                  clearable
                  class="mt-2"
                ></v-text-field>

                <v-text-field
                  v-model="formData.email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                  variant="outlined"
                  clearable
                  class="mt-2"
                ></v-text-field>

                <v-text-field
                  v-model="formData.password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :rules="[requiredValidator, passwordValidator]"
                  label="Password"
                  variant="outlined"
                  clearable
                  class="mt-2"
                  :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                ></v-text-field>

                <v-text-field
                  v-model="formData.confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :rules="[
                    requiredValidator,
                    (v) => confirmedValidator(v, formData.password),
                  ]"
                  label="Confirm Password"
                  variant="outlined"
                  clearable
                  class="mt-2"
                  :append-inner-icon="
                    isConfirmPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'
                  "
                  @click:append-inner="
                    isConfirmPasswordVisible = !isConfirmPasswordVisible
                  "
                ></v-text-field>

                <v-btn type="submit" block color="#FDDA0D" class="mt-4"> Register </v-btn>
                <div class="mt-4 text-center">
                  <span>Already have an account? </span>
                  <router-link
                    to="/"
                    class="login-link"
                    style="font-weight: bold; color: #e4d00a"
                  >
                    Click here to Login
                  </router-link>
                </div>
              </v-form>
            </v-card-text>
          </v-card-text>
        </v-card>

        <v-card
          v-show="!mobile"
          elevation="10"
          style="
            width: 400px; /* Fixed width for larger screens */
            height: 60vh; /* Fixed height for larger screens */
            overflow-y: auto;
            background-color: rgba(255, 248, 220, 0.6);
            backdrop-filter: blur(10px);
            position: fixed;
            right: 16px; /* Align to the right */
            top: 50%; /* Center vertically */
            transform: translateY(-50%); /* Adjust for perfect vertical centering */
          "
        >
          <v-card-text class="text-center">
            <img src="@/assets/images/cookifybr2.png" height="200px" />
            <h3>Register now to start your culinary journey!</h3>
          </v-card-text>
          <v-card-text>
            <AlertNotification
              :form-success-message="formAction.formSuccessMessage"
              :form-error-message="formAction.formErrorMessage"
            />
            <v-form ref="refVForm" @submit.prevent="onFormSubmit">
              <v-text-field
                v-model="formData.FirstName"
                :rules="[requiredValidator]"
                label="First Name"
                variant="outlined"
                clearable
                class=""
              ></v-text-field>

              <v-text-field
                v-model="formData.LastName"
                :rules="[requiredValidator]"
                label="Last Name"
                variant="outlined"
                clearable
                class="mt-2"
              ></v-text-field>

              <v-text-field
                v-model="formData.email"
                :rules="[requiredValidator, emailValidator]"
                label="Email"
                variant="outlined"
                clearable
                class="mt-2"
              ></v-text-field>

              <v-text-field
                v-model="formData.password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :rules="[requiredValidator, passwordValidator]"
                label="Password"
                variant="outlined"
                clearable
                class="mt-2"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              ></v-text-field>

              <v-text-field
                v-model="formData.confirmPassword"
                :type="isConfirmPasswordVisible ? 'text' : 'password'"
                :rules="[
                  requiredValidator,
                  (v) => confirmedValidator(v, formData.password),
                ]"
                label="Confirm Password"
                variant="outlined"
                clearable
                class="mt-2"
                :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
              ></v-text-field>

              <v-btn type="submit" block color="#E1C16E" class="mt-4"> Register </v-btn>
              <div class="mt-4 text-center">
                <span>Already have an account? </span>
                <router-link
                  to="/login"
                  class="login-link"
                  style="font-weight: bold; color: white"
                >
                  Click here to Login
                </router-link>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AppLayout from "@/components/layout/AppLayout.vue";
import { useDisplay } from "vuetify";
import cookifyImage from "@/assets/images/cookifybr2.png";
import { supabase } from "@/utils/supabase";
import AlertNotification from "@/components/common/AlertNotification.vue";
import bgImage from "@/assets/images/bgunlock.jpg"; // Import the image

import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from "@/utils/validators";

// Mobile responsiveness
const { mobile } = useDisplay();

// Router instance
const router = useRouter();

// Form references and defaults
const refVForm = ref();
const formData = ref({
  FirstName: "",
  LastName: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const formAction = ref({
  formProcess: false,
  formErrorMessage: "",
  formSuccessMessage: "",
});

// Password visibility toggles
const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

// Handle form submission
const onSubmit = async () => {
  // Reset the form process state
  formAction.value = { formProcess: true, formErrorMessage: "", formSuccessMessage: "" };

  try {
    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email: formData.value.email,
      password: formData.value.password,
      options: {
        data: {
          FirstName: formData.value.FirstName,
          LastName: formData.value.LastName,
        },
      },
    });

    if (error) {
      // Display error messages if registration fails
      formAction.value.formErrorMessage = error.message;
      console.error("Error during registration:", error);
      return;
    }

    // Extract user ID after successful registration
    const userId = data?.user?.id;
    if (userId) {
      // Insert FirstName and LastName into users_info table
      const { error: insertError } = await supabase.from("users_info").insert({
        auth_users_id: userId,
        first_name: formData.value.FirstName,
        last_name: formData.value.LastName,
      });

      if (insertError) {
        console.error("Error inserting into users_info:", insertError);
        formAction.value.formErrorMessage = "Error saving additional user info.";
        return;
      }

      // Success message
      formAction.value.formSuccessMessage = "Registration successful! Redirecting...";

      // 1. Reset validation state before clearing form data
      refVForm.value.resetValidation();

      // 2. Clear form data
      Object.assign(formData.value, {
        FirstName: "",
        LastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect after 3 seconds
      setTimeout(() => router.push({ name: "loginpage" }), 3000);
    } else {
      formAction.value.formErrorMessage = "Error retrieving user ID.";
    }
  } catch (err) {
    formAction.value.formErrorMessage = "An error occurred. Please try again later.";
    console.error("Unexpected error:", err);
  } finally {
    formAction.value.formProcess = false;
  }
};

// Validate and Submit Form
const onFormSubmit = async () => {
  const valid = await refVForm.value.validate();
  if (valid) {
    await onSubmit();
  } else {
    formAction.value.formErrorMessage =
      "Please correct the errors in the form before submitting.";
  }
};
</script>
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
