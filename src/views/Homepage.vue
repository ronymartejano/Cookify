<template>
  <v-app>
    <!-- Navbar -->
    <v-app-bar
      app
      elevate-on-scroll
      sticky
      style="
        z-index: 20;
        background-color: rgb(232, 220, 196, 0.8);
        backdrop-filter: blur(10px); /* Blur effect */
      "
    >
      <v-toolbar-title>
        <div class="d-flex align-center">
          <v-icon size="24" color="rgba(124, 93, 76, 0.8)">mdi-cookie-outline</v-icon>
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
      <div class="d-none d-md-flex text-white">
        <v-btn text to="/homepage">Home</v-btn>
        <v-btn text to="/profile">Profile</v-btn>
        <v-btn text to="/sharepage">Share</v-btn>
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
        background-color: rgb(232, 220, 196, 0.8);
        backdrop-filter: blur(10px); /* Blur effect */
        pointer-events: auto; /* Ensures elements are clickable */
      "
      left
    >
      <v-list class="text-white">
        <v-list-item to="/homepage">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/profile">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item to="/sharepage">
          <v-list-item-title>Share</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main
      :style="{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }"
    >
      <v-container>
        <v-row dense align="center" class="mb-4">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="searchQuery"
              label="Search Recipes"
              outlined
              clearable
              dense
              hide-details
            >
              <template #prepend>
                <v-icon color="rgba(255, 248, 220, 0.6)">mdi-magnify</v-icon>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-select
              v-model="prepTimeFilter"
              :items="prepTimeOptions"
              label="Preparation Time"
              outlined
              dense
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="2">
            <v-select
              v-model="costFilter"
              :items="costOptions"
              label="Cost"
              outlined
              dense
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="2">
            <v-select
              v-model="ingredientsFilter"
              :items="ingredientsOptions"
              label="Ingredients Count"
              outlined
              dense
              hide-details
            ></v-select>
          </v-col>
          <v-btn color="rgba(255, 248, 220, 0.6)" @click="resetFilters">
            Reset Filters
          </v-btn>
        </v-row>

        <!-- Recipe Cards Section -->
        <v-row dense>
          <v-col
            v-for="recipe in filteredRecipes"
            :key="recipe.id"
            cols="12"
            md="18"
            lg="4"
          >
            <v-card
              class="pa-4"
              outlined
              style="background-color: rgb(232, 220, 196, 0.95)"
            >
              <v-card-text
                class="font-weight-bold d-flex align-center justify-space-between"
              >
                <!-- Heart button in the top-right corner -->
                <v-btn
                  icon
                  color="#7c5d46"
                  class="absolute top-right"
                  @click="toggleFavorite(recipe)"
                >
                  <v-icon class="text-white">{{
                    recipe.isFavorite ? "mdi-heart" : "mdi-heart-outline"
                  }}</v-icon>
                </v-btn>
              </v-card-text>
              <hr />
              <v-card-text class="recipe-card">
                <div class="recipe-content mb-4">
                  <img :src="recipe.image_url" height="200px" width="200px" />
                </div>
                <h3>{{ recipe.title }}</h3>
                <h4 class="text-small">Made by: {{ recipe.userName }}</h4>
              </v-card-text>

              <!-- Two flex buttons -->
              <div class="d-flex justify-space-between mt-4 mb-2">
                <v-btn color="#E1C16E" dark style="width: 48%" @click="openModal(recipe)">
                  View Reviews
                </v-btn>
                <v-btn
                  color="#E1C16E"
                  dark
                  style="width: 48%"
                  @click="openAddReviewModal(recipe)"
                >
                  Add Review
                </v-btn>
              </div>

              <!-- View Details Button -->
              <div class="d-flex justify-center">
                <v-btn
                  color="rgba(255, 248, 220, 0.6)"
                  dark
                  style="width: 100%"
                  @click="openDetailsDialog(recipe)"
                >
                  View Details
                </v-btn>
              </div>
            </v-card>
          </v-col>

          <!-- Dialog for View Details -->
          <v-dialog v-model="isDetailsDialogOpen" max-width="600px">
            <v-card class="pa-4">
              <!-- Center the image -->
              <div class="d-flex justify-center mb-4">
                <img :src="selectedRecipe?.image_url" alt="Recipe Image" height="200px" />
              </div>
              <v-card-title class="font-weight-bold">
                {{ selectedRecipe?.title }}
              </v-card-title>
              <v-card-text>{{ selectedRecipe?.description }}</v-card-text>
              <v-card-text>
                <div><strong>Ingredients:</strong></div>
                <ul>
                  <li
                    v-for="(ingredient, index) in selectedRecipe?.ingredients"
                    :key="index"
                  >
                    {{ ingredient }}
                  </li>
                </ul>
                <div><strong>Steps:</strong></div>
                <ol>
                  <li v-for="(step, index) in selectedRecipe?.steps" :key="index">
                    {{ step }}
                  </li>
                </ol>
                <div>
                  <strong>Preparation Time:</strong> {{ selectedRecipe?.prep_time }}
                </div>
                <div><strong>Cost:</strong> ₱{{ selectedRecipe?.cost }}</div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="red" @click="isDetailsDialogOpen = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Modal for reviews -->
          <v-dialog v-model="isModalOpen" max-width="600px">
            <v-card>
              <v-card-title class="font-weight-bold">
                Reviews for {{ selectedRecipe?.title }}
              </v-card-title>
              <v-card-text>
                <v-row dense>
                  <!-- Check if there are reviews -->
                  <template
                    v-if="selectedRecipe?.reviews && selectedRecipe.reviews.length > 0"
                  >
                    <v-col
                      v-for="review in selectedRecipe?.reviews"
                      :key="review.id"
                      cols="12"
                    >
                      <div class="mb-2">
                        <strong>{{ review.first_name }} {{ review.last_name }}</strong>
                      </div>
                      <v-row>
                        <v-col cols="12" class="mt-2">
                          <strong>Comment:</strong> {{ review.review_text }}
                        </v-col>
                        <div style="display: flex; align-items: center; gap: 8px">
                          <strong class="mx-3">Ratings:</strong>
                          <v-rating
                            v-model="review.rating"
                            color="yellow"
                            half-increments
                            readonly
                          ></v-rating>
                        </div>
                      </v-row>
                      <v-btn color="red" dark small @click="deleteReview(review)">
                        Delete
                      </v-btn>
                      <v-divider class="mt-4"></v-divider>
                    </v-col>
                  </template>
                  <!-- Display message when no reviews are found -->
                  <template v-else>
                    <v-col cols="12" class="text-center">
                      <p>
                        No reviews to this recipe, want to share your thoughts about it?
                        Click add review...
                      </p>
                    </v-col>
                  </template>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="red" @click="isModalOpen = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Modal for adding a review -->
          <v-dialog v-model="isAddReviewModalOpen" max-width="600px">
            <v-card>
              <v-card-title class="font-weight-bold">
                Add Review for {{ selectedRecipe?.title }}
              </v-card-title>
              <v-card-text>
                <v-form ref="addReviewForm" v-model="isFormValid">
                  <!-- Text Field for Review -->
                  <v-text-field
                    v-model="newReview.review_text"
                    :rules="[rules.required]"
                    label="Comment"
                    outlined
                    dense
                    @input="validateForm"
                  ></v-text-field>

                  <!-- Rating -->
                  <div style="display: flex; align-items: center; gap: 8px">
                    Selected Rating: {{ newReview.rating }}
                    <v-rating
                      v-model="newReview.rating"
                      color="yellow darken-3"
                      background-color="grey lighten-1"
                      half-increments
                      large
                      :rules="[rules.required]"
                      @change="validateForm"
                    ></v-rating>
                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="green" text :disabled="!isFormValid" @click="submitReview">
                  Submit
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="red" @click="isAddReviewModalOpen = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { supabase } from "@/utils/supabase";
import bgImage from "@/assets/images/bgpreview.jpg";

export default {
  name: "ProfilePage",
  data() {
    return {
      bgImage,
      isDetailsDialogOpen: false, // Tracks if the details dialog is open
      drawer: false,
      isModalOpen: false,
      isAddReviewModalOpen: false,
      selectedRecipe: null,
      favoriteShoes: [], // Array to store favorite shoes
      newReview: { review_text: "", rating: 0 },
      isEditModalOpen: false,
      isFormValid: false,
      editData: {
        first_name: "",
        last_name: "",
      },
      user: {
        first_name: "",
        last_name: "",
        email: "",
      },
      recipes: [],
      dialog: {
        visible: false,
        field: "",
        value: "",
        userId: null,
      },
      rules: {
        required: (value) => !!value || "This field is required.",
      },
      searchQuery: "",
      prepTimeFilter: null,
      costFilter: null,
      ingredientsFilter: null,
      prepTimeOptions: ["< 15 mins", "15-30 mins", "> 30 mins"],
      costOptions: ["< ₱100", "₱101-₱200", "> ₱201"],
      ingredientsOptions: ["< 5 Ingredients", "5-10 Ingredients", "> 10 Ingredients"],
      selectedRecipe: {
        reviews: [], // Initialize reviews as an empty array
        title: "", // Add brand property if used
      },
    };
  },

  computed: {
    filteredRecipes() {
      return this.recipes.filter((recipe) => {
        const matchesSearchQuery =
          recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          recipe.description.toLowerCase().includes(this.searchQuery.toLowerCase());

        const matchesPrepTime =
          !this.prepTimeFilter ||
          (this.prepTimeFilter === "< 15 mins" && recipe.prep_time.includes("15")) ||
          (this.prepTimeFilter === "15-30 mins" && recipe.prep_time.includes("30")) ||
          (this.prepTimeFilter === "> 30 mins" && parseInt(recipe.prep_time) > 30);

        const matchesCost =
          !this.costFilter ||
          (this.costFilter === "< ₱100" && recipe.cost < 100) ||
          (this.costFilter === "₱101-₱200" && recipe.cost >= 101 && recipe.cost <= 200) ||
          (this.costFilter === "> ₱201" && recipe.cost > 201);

        const matchesIngredients =
          !this.ingredientsFilter ||
          (this.ingredientsFilter === "< 5 Ingredients" &&
            recipe.ingredients.length < 5) ||
          (this.ingredientsFilter === "5-10 Ingredients" &&
            recipe.ingredients.length >= 5 &&
            recipe.ingredients.length <= 10) ||
          (this.ingredientsFilter === "> 10 Ingredients" &&
            recipe.ingredients.length > 10);

        return matchesSearchQuery && matchesPrepTime && matchesCost && matchesIngredients;
      });
    },
  },

  mounted() {
    this.fetchUserDetails();
    this.fetchRecipes();
    this.fetchFavoriteRecipes();
    // Call fetchReviews only if selectedRecipe has a valid recipe_id
    this.$nextTick(() => {
      if (this.recipes.length > 0) {
        this.selectedRecipe = this.recipes[0]; // Default to the first recipe
        this.fetchReviews(this.selectedRecipe.id); // Pass the ID to fetchReviews
      } else {
        console.log("No recipes available to fetch reviews.");
      }
    });
  },

  methods: {
    resetFilters() {
      this.searchQuery = ""; // Clear search query
      this.prepTimeFilter = null; // Clear preparation time filter
      this.costFilter = null; // Clear cost filter
      this.ingredientsFilter = null; // Clear ingredients filter
    },
    openDetailsDialog(recipe) {
      this.selectedRecipe = recipe; // Set the selected recipe
      this.isDetailsDialogOpen = true; // Open the dialog
    },
    async toggleFavorite(recipes) {
      try {
        // Step 1: Fetch the logged-in user's session
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          console.error("Error fetching authenticated user:", authError);
          alert("Please log in to toggle favorites.");
          return;
        }

        console.log("Logged-in user:", user);

        // Step 2: Fetch the user's `users_info` ID
        const { data: userInfo, error: userInfoError } = await supabase
          .from("users_info")
          .select("id")
          .eq("auth_users_id", user.id)
          .single();

        if (userInfoError || !userInfo?.id) {
          console.error("Failed to fetch user info:", userInfoError);
          alert("Failed to fetch user profile. Please ensure your profile is complete.");
          return;
        }

        console.log("Fetched user info ID:", userInfo.id);

        if (recipes.isFavorite) {
          // Step 3: Remove from favorites
          const { error: userFavoriteError } = await supabase
            .from("user_favorites")
            .delete()
            .eq("recipe_id", recipes.id)
            .eq("users_info_id", userInfo.id);

          if (userFavoriteError) {
            console.error("Error removing favorite:", userFavoriteError);
            alert("Failed to remove favorite.");
            return;
          }

          console.log(`Removed recipe ID ${recipes.id} from favorites.`);
        } else {
          // Step 3a: Add to the `favorites` table
          const { data: favorite, error: favoriteError } = await supabase
            .from("favorites")
            .insert({
              recipe_title: recipes.title, // Correctly reference the recipe title
            })
            .select("id") // Return the inserted record's ID
            .single();

          if (favoriteError || !favorite) {
            console.error("Error inserting into favorites table:", favoriteError);
            alert("Failed to add to favorites.");
            return;
          }

          console.log("Inserted into favorites table:", favorite.id);

          // Step 3b: Link to `user_favorites`
          const { error: userFavoriteError } = await supabase
            .from("user_favorites")
            .insert({
              recipe_id: recipes.id,
              users_info_id: userInfo.id,
              favorite_id: favorite.id, // Link to the `favorites` table entry
              created_at: new Date().toISOString(),
            });

          if (userFavoriteError) {
            console.error("Error linking favorite to user:", userFavoriteError);
            alert("Failed to link favorite.");
            return;
          }

          console.log(`Linked favorite ID ${favorite.id} to user.`);
        }

        // Step 4: Toggle favorite state
        recipes.isFavorite = !recipes.isFavorite;

        alert(
          recipes.isFavorite
            ? "Added to favorites successfully!"
            : "Removed from favorites successfully!"
        );
      } catch (error) {
        console.error("Unexpected error toggling favorite:", error);
        alert("An unexpected error occurred.");
      }
    },

    async fetchFavoriteRecipes() {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          console.error("Error fetching authenticated user:", authError);
          alert("Please log in to view your favorite recipes.");
          return;
        }

        const { data: userInfo, error: userInfoError } = await supabase
          .from("users_info")
          .select("id")
          .eq("auth_users_id", user.id)
          .single();

        if (userInfoError || !userInfo?.id) {
          console.error("Failed to fetch user info:", userInfoError);
          alert("Failed to fetch user profile. Please ensure your profile is complete.");
          return;
        }

        const { data: userFavorites, error: favoritesError } = await supabase
          .from("user_favorites")
          .select("recipe_id")
          .eq("users_info_id", userInfo.id);

        if (favoritesError || !userFavorites?.length) {
          console.warn(
            "No favorite recipes found or error fetching favorites:",
            favoritesError
          );
          this.favoriteRecipes = [];
          return;
        }

        const recipeIds = userFavorites.map((fav) => fav.recipe_id);
        const { data: favoriteRecipes, error: recipesError } = await supabase
          .from("recipes")
          .select("*")
          .in("id", recipeIds);

        if (recipesError || !favoriteRecipes?.length) {
          console.warn("Error fetching recipes or no recipes found:", recipesError);
          this.favoriteRecipes = [];
          return;
        }

        // Set favorite recipes
        this.favoriteRecipes = favoriteRecipes.map((recipe) => ({
          ...recipe,
          isFavorite: true,
        }));

        // Update the recipes list to include `isFavorite`
        this.recipes = this.recipes.map((recipe) => ({
          ...recipe,
          isFavorite: this.favoriteRecipes.some((fav) => fav.id === recipe.id),
        }));

        console.log("Favorite recipes updated in main list:", this.recipes);
      } catch (error) {
        console.error("Unexpected error fetching favorite recipes:", error.message);
        alert("Failed to fetch favorite recipes. Please try again.");
      }
    },
    async deleteReview(review) {
      try {
        // Log review ID for debugging
        console.log("Deleting review with ID:", review.id);

        // Direct deletion query
        const { error: deleteError } = await supabase
          .from("user_ratings")
          .delete()
          .eq("id", review.id); // Match the primary key (id)

        if (deleteError) {
          console.error("Error deleting review:", deleteError);
          alert("Failed to delete review from database.");
        } else {
          // Update the local state after successful deletion
          this.selectedRecipe.reviews = this.selectedRecipe.reviews.filter(
            (r) => r.id !== review.id
          );
          alert("Review deleted successfully.");
        }
      } catch (err) {
        console.error("Error deleting review:", err.message);
        alert(err.message || "Failed to delete review.");
      }
    },
    openEditModal() {
      // Populate modal with current user data
      this.editData.first_name = this.user.first_name;
      this.editData.last_name = this.user.last_name;
      this.isEditModalOpen = true;
    },
    async saveProfile() {
      if (this.isFormValid) {
        try {
          // Update user info in Supabase
          await this.updateUserInfo(this.editData);
          // Update local user data
          this.user.first_name = this.editData.first_name;
          this.user.last_name = this.editData.last_name;
          this.isEditModalOpen = false;
        } catch (error) {
          console.error("Failed to update user info:", error);
        }
      }
    },
    async updateUserInfo(data) {
      try {
        // Step 1: Fetch the currently logged-in user
        const { data: userResponse, error: userError } = await supabase.auth.getUser();
        if (userError || !userResponse?.user?.id) {
          throw new Error("Failed to fetch user ID.");
        }

        const userId = userResponse.user.id;

        // Step 2: Update the user info in the `users_info` table
        const { error } = await supabase
          .from("users_info")
          .update({
            first_name: data.first_name,
            last_name: data.last_name,
          })
          .eq("auth_users_id", userId);

        if (error) {
          throw error;
        }

        alert("User info successfully updated!");
        window.onload = () => {
          location.reload(); // Refresh the page when it loads
        };
      } catch (error) {
        console.error("Error updating user info in Supabase:", error.message);
        throw error; // Re-throw the error to handle it in the caller function
      }
    },
    async fetchRecipes() {
      try {
        // Step 1: Fetch all recipes along with their associated user's information
        const { data: recipes, error: recipesError } = await supabase
          .from("recipes")
          .select(
            `
        id,
        title,
        description,
        ingredients,
        steps,
        prep_time,
        cost,
        image_url,
        users_info (first_name, last_name)
      `
          );

        if (recipesError) throw recipesError;

        // Step 2: Map the data to include the user's full name
        this.recipes = recipes.map((recipe) => ({
          ...recipe,
          userName: recipe.users_info
            ? `${recipe.users_info.first_name} ${recipe.users_info.last_name}`
            : "Unknown User",
        }));
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
        alert("Failed to fetch recipes. Please try again.");
      }
    },
    async fetchUserDetails() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;

        // Fetch user's first and last name from the users_info table
        const { data: userDetails, error: userDetailsError } = await supabase
          .from("users_info")
          .select("first_name, last_name")
          .eq("auth_users_id", user.id)
          .single();
        if (userDetailsError) throw userDetailsError;

        // Assign first and last name
        this.user.first_name = userDetails.first_name;
        this.user.last_name = userDetails.last_name;

        // Assign email from auth.users table
        this.user.email = user.email;
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    },
    openModal(recipe) {
      this.selectedRecipe = recipe;
      this.fetchReviews(recipe.id);
      this.isModalOpen = true;
    },

    async fetchReviews(recipeId) {
      try {
        if (!recipeId) {
          console.error("Invalid recipeIds provided:", recipeId);
          this.selectedRecipe.reviews = [];
          return;
        }

        const { data, error } = await supabase
          .from("user_reviews")
          .select(
            `
        id,
        created_at,
        review_id (
          review_text,
          rating
        ),
        recipe_id,
        users_info:users_info_id (
          first_name,
          last_name
        )
      `
          )
          .eq("recipe_id", recipeId);

        if (error) throw error;

        if (!data || data.length === 0) {
          console.log("No reviews found for this recipe.");
          this.selectedRecipe.reviews = [];
          return;
        }

        console.log("Fetched reviews data:", data);

        this.selectedRecipe.reviews = data.map((review) => ({
          id: review.id,
          created_at: review.created_at,
          review_text: review.review_id?.review_text || "No review text provided",
          rating: review.review_id?.rating || 0,
          first_name: review.users_info?.first_name || "Anonymous",
          last_name: review.users_info?.last_name || "Anonymous",
        }));
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
        alert("Failed to fetch reviews. Please try again.");
      }
    },
    openAddReviewModal(recipe) {
      this.selectedRecipe = recipe; // Store the selected recipe
      this.isAddReviewModalOpen = true; // Open the modal
    },
    async submitReview() {
      try {
        // Ensure a recipe is selected
        if (!this.selectedRecipe || !this.selectedRecipe.id) {
          throw new Error("No recipe selected for review.");
        }

        // Ensure the review text and rating are provided
        if (!this.newReview.review_text || this.newReview.rating <= 0) {
          throw new Error("Review text and rating are required.");
        }

        // Get the logged-in user's details
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError)
          throw new Error(`Failed to fetch user details: ${userError.message}`);
        if (!userData || !userData.user || !userData.user.id) {
          throw new Error("Invalid user data.");
        }

        const userId = userData.user.id;

        // Fetch `users_info.id` associated with the logged-in user
        const { data: userInfo, error: userInfoError } = await supabase
          .from("users_info")
          .select("id")
          .eq("auth_users_id", userId)
          .single();
        if (userInfoError)
          throw new Error(`Failed to fetch user info: ${userInfoError.message}`);
        if (!userInfo || !userInfo.id) {
          throw new Error("User info not found.");
        }

        const usersInfoId = userInfo.id;

        // Insert into the "reviews" table
        const { data: reviewData, error: reviewError } = await supabase
          .from("reviews")
          .insert({
            review_text: this.newReview.review_text,
            rating: this.newReview.rating,
            created_at: new Date().toISOString(),
          })
          .select("id")
          .single();
        if (reviewError)
          throw new Error(`Failed to insert review: ${reviewError.message}`);
        if (!reviewData || !reviewData.id) {
          throw new Error("Review insertion failed.");
        }

        console.log("Inserted review ID:", reviewData.id);

        // Link the review with the recipe and user in "user_reviews"
        const { error: userReviewError } = await supabase.from("user_reviews").insert({
          review_id: reviewData.id,
          recipe_id: this.selectedRecipe.id,
          users_info_id: usersInfoId,
          created_at: new Date().toISOString(),
        });
        if (userReviewError)
          throw new Error(`Failed to link user review: ${userReviewError.message}`);

        // Refresh reviews for the selected recipe after adding
        await this.fetchReviews(this.selectedRecipe.id);

        // Clear the new review form and close the modal
        this.newReview = { review_text: "", rating: 0 };
        this.isAddReviewModalOpen = false;

        // Display success message
        alert("Review added successfully!");
      } catch (error) {
        console.error("Error adding review:", error.message || error);
        alert("Failed to submit review. Please try again.");
      }
    },

    async logout() {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        this.$router.push("/login");
        console.log("User logged out successfully.");
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
    },
    async deleteRecipe(recipe) {
      try {
        console.log("Deleting recipe:", recipe); // Debugging: Check recipe data

        // Get the logged-in user's session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const userId = session?.user?.id;
        if (!userId) throw new Error("User not logged in.");

        // Fetch the `users_info.id` based on the logged-in user's `auth.users.id`
        const { data: userInfo, error: userInfoError } = await supabase
          .from("users_info")
          .select("id")
          .eq("auth_users_id", userId)
          .single();

        if (userInfoError) throw userInfoError;
        const usersInfoId = userInfo?.id;

        console.log("Recipe ID:", recipe.id); // Debugging: Log recipe ID
        console.log("User Info ID from Database:", usersInfoId); // Debugging: Log fetched users_info.id

        // Validate recipe ID and users_info.id
        if (!recipe.id || !usersInfoId) {
          throw new Error("Invalid recipe data. Recipe ID or user info ID is missing.");
        }

        // Delete user ratings related to the recipe (no filtering by user_id)
        const { error: ratingsError } = await supabase
          .from("user_reviews")
          .delete()
          .eq("recipe_id", recipe.id); // Delete ratings associated with this recipe

        if (ratingsError) throw ratingsError;

        // Delete the recipe based on `users_info.id`
        const { error: recipeError } = await supabase
          .from("recipes")
          .delete()
          .eq("id", recipe.id) // Match the recipe by ID
          .eq("users_info_id", usersInfoId); // Ensure it belongs to the user via users_info.id

        if (recipeError) throw recipeError;

        // Remove the deleted recipe from the local state
        this.recipes = this.recipes.filter((r) => r.id !== recipe.id);

        alert("Recipe deleted successfully.");
      } catch (err) {
        console.error("Error deleting recipe:", err.message);
        alert("Failed to delete recipe. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
.profile-avatar {
  margin-bottom: 20px;
}
.profile-info p,
.profile-info h4 {
  margin: 0;
}
.profile-section {
  background-color: #f4f4f4;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.profile-sidebar {
  width: 100%;
  padding-top: 100px;
}

.profile-avatar {
  margin-bottom: 16px;
}

.logout-button {
  margin-top: 16px;
  width: 100%;
}
/* For modern browsers (hide scrollbar visually) */
.v-application::-webkit-scrollbar {
  display: none; /* Hide scrollbar for WebKit browsers */
}

.v-application {
  -ms-overflow-style: none; /* Hide scrollbar for IE/Edge */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
}

.recipe-section {
  height: 100%; /* Ensure it takes full column height */
}

.recipe-container {
  height: calc(100% - 32px); /* Adjust for padding if necessary */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 16px; /* Add padding for aesthetics */
  background-color: rgb(232, 220, 196, 0.95);
  border-radius: 8px; /* Optional: Rounded edges */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow */
}

/* Hide scrollbar (optional) */
.recipe-container::-webkit-scrollbar {
  display: none;
}

.recipe-container {
  -ms-overflow-style: none; /* Hide scrollbar for IE/Edge */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
}
.responsive-height {
  height: 90vh;
}

@media (max-width: 600px) {
  /* Adjust breakpoint as needed */
  .responsive-height {
    height: 60vh;
  }
  .profile-sidebar {
    padding-top: 0px;
  }
  .text-small {
    font-size: 0.8rem;
  }
}
.recipe-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px; /* Optional: Adds space between the image and text */
}

img {
  border-radius: 8px; /* Optional: Add rounded corners to the image */
}
</style>
