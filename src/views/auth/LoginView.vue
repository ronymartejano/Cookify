<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'
import cookifyImage from '@/assets/images/cookifybr2.png'
import { supabase } from '@/utils/supabase'
import { requiredValidator, emailValidator } from '@/utils/validators'

// Mobile responsiveness
const { mobile } = useDisplay()

// Router instance
const router = useRouter()

// Form references
const refVForm = ref()

// Password visibility toggle
const visible = ref(false)

// Form fields and validation rules
const formDataDefault = {
  email: '',
  password: '',
}
const formData = ref({ ...formDataDefault })

// Form actions and messages
const formAction = ref({
  formProcess: false,
  formErrorMessage: '',
  formSuccessMessage: '',
})

// Handle Login
const handleLogin = async () => {
  // Start processing
  formAction.value = {
    ...formAction.value,
    formProcess: true,
    formErrorMessage: '',
    formSuccessMessage: '',
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.value.email,
      password: formData.value.password,
    })

    if (error) {
      formAction.value.formErrorMessage = error.message || 'Invalid login credentials.'
    } else if (data) {
      formAction.value.formSuccessMessage = 'Login successful! Redirecting...'
      setTimeout(() => router.push({ name: 'dashboard' }), 1500)
    }
  } catch {
    formAction.value.formErrorMessage = 'An error occurred. Please try again later.'
  } finally {
    // Stop processing
    formAction.value.formProcess = false
  }
}

// Validate form and submit
const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) {
      handleLogin()
    }
  })
}
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row justify="start">
        <v-col cols="12" sm="8" md="6" class="ml-0">
          <!-- Image Card -->
          <v-card
            class="mx-auto"
            elevation="15"
            :height="mobile ? '210' : '210'"
            :image="cookifyImage"
          ></v-card>

          <v-card class="text-center" elevation="10">
            <v-card-text style="font-size: 100%; color: black">
              Login now to start your culinary journey!
            </v-card-text>
          </v-card>

          <!-- Login Form -->
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
              class="mt-10"
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
            <v-alert v-if="formAction.formErrorMessage" type="error" class="mt-4" closable dense>
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
              color="deep-purple-lighten-3"
              elevation="2"
              :loading="formAction.formProcess"
            >
              Login
            </v-btn>

            <!-- Register Redirect Button -->
            <div class="mt-4 text-center">
              <span>Don't have an account? </span>
              <router-link to="/register" class="register-link" style="font-weight: bold"
                >Click here to Register</router-link
              >
            </div>
          </v-form>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>
