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
              color: black;
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
        <v-btn text to="/homepage">Home</v-btn>
        <v-btn text to="/profile">Profile</v-btn>
        <v-btn text to="/share">Share</v-btn>
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
        <v-list-item to="/homepage">
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
    <v-main
      style="
        background-image: url('@/src/assets/images/bgpreview.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        min-height: 100vh;
      "
    >
      <v-container>
        <h1
          class="text-h5 display-2 text-center font-weight-bold mb-2"
          style="color: black"
        >
          Share your own recipe too.
        </h1>
        <p class="text-center mb-5" style="color: black">
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
            style="
              background-color: rgba(255, 248, 220, 0.6);
              color: black;
              border-radius: 8px;
              margin-bottom: 5px;
            "
          ></v-text-field>

          <v-textarea
            label="Recipe Description"
            v-model="newRecipe.description"
            :rules="[rules.required]"
            outlined
            dense
            style="
              background-color: rgba(255, 248, 220, 0.6);
              color: black;
              border-radius: 8px;
              margin-bottom: 5px;
            "
          ></v-textarea>

          <!-- Ingredients Section -->
          <div class="mb-4">
            <strong style="color: black">Ingredients:</strong>
            <v-row dense>
              <v-col cols="10" lg="11">
                <v-text-field
                  label="Enter ingredient"
                  v-model="newIngredient"
                  outlined
                  dense
                  style="
                    background-color: rgba(255, 248, 220, 0.6);
                    color: black;
                    border-radius: 8px;
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="2" lg="1">
                <v-btn
                  :color="newIngredient ? 'yellow darken-2' : '#FFFFF0'"
                  :disabled="!newIngredient"
                  @click="addIngredient"
                  style="color: black; border-radius: 8px"
                >
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
            <strong style="color: black">Steps:</strong>
            <v-row dense>
              <v-col cols="10" lg="11">
                <v-text-field
                  label="Enter step"
                  v-model="newStep"
                  outlined
                  dense
                  style="
                    background-color: rgba(255, 248, 220, 0.6);
                    color: black;
                    border-radius: 8px;
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="2" lg="1">
                <v-btn
                  :color="newStep ? 'yellow darken-2' : '#FFFFF0'"
                  :disabled="!newStep"
                  @click="addStep"
                  style="color: black; border-radius: 8px"
                >
                  Add
                </v-btn>
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

          <!-- Image Upload -->
          <v-file-input
            label="Recipe Image"
            v-model="newRecipe.image"
            accept="image/*"
            :rules="[rules.required]"
            outlined
            dense
            style="
              background-color: rgba(255, 248, 220, 0.6);
              color: black;
              border-radius: 8px;
              margin-bottom: 5px;
            "
          ></v-file-input>

          <v-text-field
            label="Preparation Time"
            v-model="newRecipe.prep_time"
            :rules="[rules.required]"
            outlined
            dense
            style="
              background-color: rgba(255, 248, 220, 0.6);
              color: black;
              border-radius: 8px;
              margin-bottom: 5px;
            "
          ></v-text-field>

          <v-text-field
            label="Cost"
            v-model="newRecipe.cost"
            :rules="[rules.required, rules.isNumber]"
            outlined
            dense
            type="number"
            style="
              background-color: rgba(255, 248, 220, 0.6);
              color: black;
              border-radius: 8px;
              margin-bottom: 5px;
            "
          ></v-text-field>

          <v-btn
            :color="isFormValid ? 'yellow darken-2' : '#FFFFF0'"
            type="submit"
            :disabled="!isFormValid"
            style="color: black; border-radius: 8px"
          >
            Add Recipe
          </v-btn>
        </v-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { supabase } from "@/utils/supabase";

export default {
  name: "SharePage",
  data() {
    return {
      newRecipe: {
        title: "",
        description: "",
        ingredients: [],
        steps: [],
        prep_time: "",
        cost: "",
        image: null, // Image file
      },
      newIngredient: "",
      newStep: "",
      isFormValid: false,
      rules: {
        required: (value) => !!value || "This field is required.",
        isNumber: (value) =>
          (!isNaN(parseFloat(value)) && isFinite(value)) || "Must be a valid number.",
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
    async uploadImage() {
      if (!this.newRecipe.image) return null;

      const file = this.newRecipe.image;
      const fileName = `${Date.now()}-${file.name}`;

      const { data, error } = await supabase.storage
        .from("recipes_images")
        .upload(fileName, file);

      if (error) {
        console.error("Image upload error:", error.message);
        throw new Error("Failed to upload image.");
      }

      // Get the public URL from the uploaded file
      const { data: publicUrlData, error: urlError } = supabase.storage
        .from("recipes_images")
        .getPublicUrl(fileName);

      if (urlError) {
        console.error("Error generating public URL:", urlError.message);
        throw new Error("Failed to generate image URL.");
      }

      return publicUrlData.publicUrl; // Correct way to access the URL
    },
    async addRecipe() {
      try {
        // Step 1: Upload the image
        const imageUrl = await this.uploadImage();

        // Step 2: Get the logged-in user's ID
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        const userId = userData.user.id;

        // Step 3: Fetch `users_info.id` based on `auth_users_id`
        const { data: userInfo, error: userInfoError } = await supabase
          .from("users_info")
          .select("id")
          .eq("auth_users_id", userId) // Correct column for joining
          .single();

        if (userInfoError) throw userInfoError;

        const usersInfoId = userInfo.id;

        // Step 4: Insert the recipe
        const { error: recipeError } = await supabase.from("recipes").insert([
          {
            title: this.newRecipe.title,
            description: this.newRecipe.description,
            ingredients: this.newRecipe.ingredients,
            steps: this.newRecipe.steps,
            prep_time: this.newRecipe.prep_time,
            cost: parseFloat(this.newRecipe.cost),
            users_info_id: usersInfoId, // Correct ID reference
            image_url: imageUrl, // Add the image URL
          },
        ]);

        if (recipeError) throw recipeError;

        // Reset the form
        this.newRecipe = {
          title: "",
          description: "",
          ingredients: [],
          steps: [],
          prep_time: "",
          cost: "",
          image: null,
        };

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
