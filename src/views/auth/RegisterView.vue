<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useDisplay } from 'vuetify'
import cookifyImage from '@/assets/images/cookifybr2.png'
import { supabase } from '@/utils/supabase'
import AlertNotification from '@/components/common/AlertNotification.vue'
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'

// Mobile responsiveness
const { mobile } = useDisplay()

// Router instance
const router = useRouter()

// Form references and defaults
const refVForm = ref()
const formData = ref({
  FirstName: '',
  LastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})
const formAction = ref({
  formProcess: false,
  formErrorMessage: '',
  formSuccessMessage: '',
})

// Password visibility toggles
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)

// Handle form submission
const onSubmit = async () => {
  // Reset the form process state
  formAction.value = { formProcess: true, formErrorMessage: '', formSuccessMessage: '' }

  try {
    const { error } = await supabase.auth.signUp({
      email: formData.value.email,
      password: formData.value.password,
      options: {
        data: {
          FirstName: formData.value.FirstName,
          LastName: formData.value.LastName,
        },
      },
    })

    if (error) {
      // Display error messages if registration fails
      formAction.value.formErrorMessage = error.message
      console.error('Error during registration:', error)
    } else {
      // Success message
      formAction.value.formSuccessMessage = 'Registration successful! Redirecting...'

      // 1. Reset validation state before clearing form data
      refVForm.value.resetValidation()

      // 2. Clear form data
      Object.assign(formData.value, {
        FirstName: '',
        LastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      })

      // Redirect after 3 seconds
      setTimeout(() => router.push({ name: 'login' }), 3000)
    }
  } catch (err) {
    formAction.value.formErrorMessage = 'An error occurred. Please try again later.'
    console.error('Unexpected error:', err)
  } finally {
    formAction.value.formProcess = false
  }
}

// Validate and Submit Form
const onFormSubmit = async () => {
  const valid = await refVForm.value.validate()
  if (valid) {
    await onSubmit()
  } else {
    formAction.value.formErrorMessage = 'Please correct the errors in the form before submitting.'
  }
}
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row justify="start">
        <v-col cols="12" sm="8" md="6">
          <!-- Image Banner -->
          <v-card
            class="mx-auto"
            elevation="15"
            :style="{ height: mobile ? '150px' : '210px' }"
            :image="cookifyImage"
          ></v-card>

          <v-card class="text-center" elevation="10">
            <v-card-text style="font-size: 100%; color: black">
              Register now to start your culinary journey!
            </v-card-text>
          </v-card>

          <!-- Alert Notifications -->
          <AlertNotification
            class="mt-8"
            :form-success-message="formAction.formSuccessMessage"
            :form-error-message="formAction.formErrorMessage"
          ></AlertNotification>

          <!-- Registration Form -->
          <v-form class="mt-5" ref="refVForm" @submit.prevent="onFormSubmit">
            <v-row class="mt-6">
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="formData.FirstName"
                  :rules="[requiredValidator]"
                  label="First Name"
                  variant="outlined"
                  clearable
                  :disabled="formAction.formProcess"
                  aria-label="First Name"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="formData.LastName"
                  :rules="[requiredValidator]"
                  label="Last Name"
                  variant="outlined"
                  clearable
                  :disabled="formAction.formProcess"
                  aria-label="Last Name"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-text-field
              v-model="formData.email"
              :rules="[requiredValidator, emailValidator]"
              label="Email"
              variant="outlined"
              clearable
              class="mt-4"
              :disabled="formAction.formProcess"
              aria-label="Email Address"
            ></v-text-field>

            <v-text-field
              v-model="formData.password"
              :type="isPasswordVisible ? 'text' : 'password'"
              :rules="[requiredValidator, passwordValidator]"
              label="Password"
              variant="outlined"
              clearable
              class="mt-4"
              :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
              :disabled="formAction.formProcess"
              aria-label="Password"
            ></v-text-field>

            <v-text-field
              v-model="formData.confirmPassword"
              :type="isConfirmPasswordVisible ? 'text' : 'password'"
              :rules="[requiredValidator, (v) => confirmedValidator(v, formData.password)]"
              label="Confirm Password"
              variant="outlined"
              clearable
              class="mt-4"
              :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
              :disabled="formAction.formProcess"
              aria-label="Confirm Password"
            />

            <v-btn
              type="submit"
              block
              color="deep-purple-lighten-3"
              class="mt-4"
              :loading="formAction.formProcess"
              :disabled="formAction.formProcess"
            >
              Register
            </v-btn>

            <div class="mt-4 text-center">
              <span>Already have an account? </span>
              <router-link to="/" class="login-link" style="font-weight: bold">
                Click here to Login
              </router-link>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>
