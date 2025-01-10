<script setup>
import { ref } from 'vue'

// Example data for the dashboard
const welcomeMessage = ref('Welcome to your Dashboard!')
const stats = ref([
  { title: 'Recipes', count: 120 },
  { title: 'Favorites', count: 45 },
  { title: 'Comments', count: 30 },
])
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-5" elevation="2">
          <h1>{{ welcomeMessage }}</h1>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="stat in stats" :key="stat.title" cols="12" sm="4">
        <v-card class="pa-5" elevation="2">
          <h2>{{ stat.title }}</h2>
          <p>{{ stat.count }}</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
