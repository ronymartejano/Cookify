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
      style="
        background-image: url('/src/assets/images/log-in-backg.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        min-height: 100vh;
      "
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

              <v-btn type="submit" block color="#FDDA0D" class="mt-4"> Register </v-btn>
              <div class="mt-4 text-center">
                <span>Already have an account? </span>
                <router-link
                  to="/login"
                  class="login-link"
                  style="font-weight: bold; color: #e4d00a"
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
import { useDisplay } from "vuetify";
import { supabase } from "@/utils/supabase";
import AlertNotification from "@/components/common/AlertNotification.vue";
import cookifyImage from "@/assets/images/cookifybr2.png";
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from "@/utils/validators";

const drawer = ref(false);
const { mobile } = useDisplay();
const router = useRouter();

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

const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

const onSubmit = async () => {
  // Same logic as your script
};

const onFormSubmit = async () => {
  const valid = await refVForm.value.validate();
  if (valid) await onSubmit();
  else formAction.value.formErrorMessage = "Please fix form errors before submitting.";
};
</script>
