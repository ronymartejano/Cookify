<template>
  <v-app>
    <!-- Navbar -->
    <v-app-bar app color="#c8e6c9" elevate-on-scroll sticky style="z-index: 20">
      <v-toolbar-title>
        <div class="d-flex align-center">
          <v-icon size="24" color="green">mdi-leaf</v-icon>
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
            Campus Nourish
          </span>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Show buttons for larger screens -->
      <div class="d-none d-md-flex">
        <v-btn text to="/home">Home</v-btn>
        <v-btn text to="/profile">Profile</v-btn>
        <v-btn text to="/share">Share</v-btn>
      </div>

      <!-- Hamburger menu for smaller screens -->
      <v-btn icon class="d-md-none" @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sidebar Drawer -->
    <v-navigation-drawer v-model="drawer" app temporary color="#c8e6c9" left>
      <v-list>
        <v-list-item to="/home">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/profile">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item to="/share">
          <v-list-item-title>Share</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Page Content -->
    <v-main>
      <v-container>
        <h1 class="text-h5 display-2 text-center font-weight-bold mb-2">
          Share your own recipe too.
        </h1>
        <p class="text-center mb-5">
          Add and create recipes on your own and share it with others!
        </p>

        <!-- Recipe Form Section -->
        <v-form ref="recipeForm" v-model="isFormValid" @submit.prevent="addRecipe">
          <v-text-field
            label="Recipe Title"
            v-model="newRecipe.title"
            :rules="[rules.required]"
            outlined
            dense
          ></v-text-field>

          <v-textarea
            label="Recipe Description"
            v-model="newRecipe.description"
            :rules="[rules.required]"
            outlined
            dense
          ></v-textarea>

          <!-- Ingredients Section -->
          <div class="mb-4">
            <strong>Ingredients:</strong>
            <v-row dense>
              <v-col cols="10" lg="11">
                <v-text-field
                  label="Enter ingredient"
                  v-model="newIngredient"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="2" lg="1">
                <v-btn color="success" :disabled="!newIngredient" @click="addIngredient">
                  Add
                </v-btn>
              </v-col>
            </v-row>

            <ul>
              <li v-for="(ingredient, index) in newRecipe.ingredients" :key="index">
                {{ ingredient }}
                <v-icon
                  small
                  color="red"
                  class="ml-2 cursor-pointer"
                  @click="removeIngredient(index)"
                >
                  mdi-close
                </v-icon>
              </li>
            </ul>
          </div>

          <!-- Steps Section -->
          <div class="mb-4">
            <strong>Steps:</strong>
            <v-row dense>
              <v-col cols="10" lg="11">
                <v-text-field
                  label="Enter step"
                  v-model="newStep"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="2" lg="1">
                <v-btn color="success" :disabled="!newStep" @click="addStep"> Add </v-btn>
              </v-col>
            </v-row>

            <ol>
              <li v-for="(step, index) in newRecipe.steps" :key="index">
                {{ step }}
                <v-icon
                  small
                  color="red"
                  class="ml-2 cursor-pointer"
                  @click="removeStep(index)"
                >
                  mdi-close
                </v-icon>
              </li>
            </ol>
          </div>

          <v-text-field
            label="Preparation Time"
            v-model="newRecipe.prep_time"
            :rules="[rules.required]"
            outlined
            dense
          ></v-text-field>

          <v-text-field
            label="Cost"
            v-model="newRecipe.cost"
            :rules="[rules.required, rules.isNumber]"
            outlined
            dense
            type="number"
          ></v-text-field>

          <v-btn color="success" type="submit" :disabled="!isFormValid">
            Add Recipe
          </v-btn>
        </v-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { supabase } from "@/utils/supabase"; // Adjust the import path as necessary

export default {
  name: "SharePage",
  data() {
    return {
      drawer: false,
      newRecipe: {
        title: "",
        description: "",
        ingredients: [],
        steps: [],
        prep_time: "",
        cost: "",
      },
      newIngredient: "",
      newStep: "",
      isFormValid: false, // Tracks form validity
      rules: {
        required: (value) => !!value || "This field is required.",
        isNumber: (value) =>
          (!isNaN(parseFloat(value)) && isFinite(value)) || "Must be a valid number.",
        maxLength: (max) => (value) =>
          value?.length <= max || `Max ${max} characters allowed.`,
        positiveNumber: (value) => parseFloat(value) > 0 || "Must be a positive number.",
      },
    };
  },
  methods: {
    addIngredient() {
      if (this.newIngredient.trim() !== "") {
        this.newRecipe.ingredients.push(this.newIngredient.trim());
        this.newIngredient = "";
      }
    },
    removeIngredient(index) {
      this.newRecipe.ingredients.splice(index, 1);
    },
    addStep() {
      if (this.newStep.trim() !== "") {
        this.newRecipe.steps.push(this.newStep.trim());
        this.newStep = "";
      }
    },
    removeStep(index) {
      this.newRecipe.steps.splice(index, 1);
    },
    async addRecipe() {
      try {
        // Step 1: Check for cooldown in localStorage
        const cooldownKey = "addRecipeCooldown";
        const lastAddedTimestamp = localStorage.getItem(cooldownKey);
        const currentTimestamp = Date.now();

        if (lastAddedTimestamp && currentTimestamp - lastAddedTimestamp < 60000) {
          const remainingTime = Math.ceil(
            (60000 - (currentTimestamp - lastAddedTimestamp)) / 1000
          );
          alert(`Please wait ${remainingTime} seconds before adding another recipe.`);
          return;
        }

        // Step 2: Get the logged-in user's ID from `auth.users`
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        const userId = userData.user.id;

        // Step 3: Fetch `users_info.id` associated with the current user
        const { data: userInfo, error: userInfoError } = await supabase
          .from("users_info")
          .select("id")
          .eq("user_id", userId)
          .single();

        if (userInfoError) throw userInfoError;

        const usersInfoId = userInfo.id;

        // Step 4: Insert the recipe into the `recipes` table with `users_info_id`
        const { error: recipeError } = await supabase.from("recipes").insert([
          {
            title: this.newRecipe.title,
            description: this.newRecipe.description,
            ingredients: this.newRecipe.ingredients,
            steps: this.newRecipe.steps,
            prep_time: this.newRecipe.prep_time,
            cost: parseFloat(this.newRecipe.cost),
            users_info_id: usersInfoId, // Add `users_info_id` to the recipe
          },
        ]);

        if (recipeError) throw recipeError;

        // Step 5: Reset the form
        this.newRecipe = {
          title: "",
          description: "",
          ingredients: [],
          steps: [],
          prep_time: "",
          cost: "",
        };

        // Step 6: Set cooldown in localStorage
        localStorage.setItem(cooldownKey, Date.now());

        alert("Recipe added successfully!");
      } catch (error) {
        console.error("Error adding recipe:", error.message);
        alert("Failed to add recipe. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: #2c3e50;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
