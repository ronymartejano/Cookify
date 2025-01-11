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
      <v-container fluid>
        <v-row class="responsive-height">
          <!-- Left: Profile Section -->
          <v-col cols="12" md="4" class="profile-section">
            <div class="profile-sidebar">
              <!-- User Avatar -->
              <div class="profile-avatar text-center">
                <v-avatar size="128" color="white">
                  <v-icon size="128">mdi-account</v-icon>
                </v-avatar>
              </div>

              <!-- User Info -->
              <div class="profile-info mt-4">
                <!-- Email Section -->
                <v-row align="center" dense>
                  <v-col>
                    <p class="text-subtitle-1 m-0"><b>Email: </b>{{ user.email }}</p>
                  </v-col>
                </v-row>
                <!-- Name Section -->
                <v-row align="center" dense>
                  <v-col>
                    <h4 class="m-0"><b>Name: </b>{{ user.name }}</h4>
                  </v-col>
                </v-row>
                <!-- Phone Section -->
                <v-row align="center" dense>
                  <v-col>
                    <p class="text-subtitle-1 m-0">
                      <b>Phone Number: </b>{{ user.phone }}
                    </p>
                  </v-col>
                </v-row>
                <v-btn @click="openEditModal"> Edit User Profile </v-btn>
              </div>

              <!-- Logout Button -->
              <div class="logout-button lg:mt-12 lg:pt-12">
                <v-btn block color="error" dark @click="logout">Logout</v-btn>
              </div>
            </div>

            <!-- Edit Profile Modal -->
            <v-dialog v-model="isEditModalOpen" max-width="600">
              <v-card>
                <v-card-title>Edit Profile</v-card-title>
                <v-card-text>
                  <v-form ref="editForm" v-model="isFormValid">
                    <v-text-field
                      v-model="editData.fullname"
                      label="Full Name"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editData.phone"
                      label="Phone Number"
                      required
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="isEditModalOpen = false">Cancel</v-btn>
                  <v-btn color="primary" text @click="saveProfile">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>

          <!-- Right: Recipe Section -->
          <v-col cols="12" md="8" class="recipe-section">
            <div class="recipe-container">
              <v-row dense>
                <v-col
                  v-for="recipe in filteredRecipes"
                  :key="recipe.id"
                  cols="12"
                  md="10"
                  lg="6"
                >
                  <v-card class="pa-4" outlined>
                    <v-card-title
                      class="font-weight-bold d-flex align-center justify-space-between"
                    >
                      <span class="text-small">Made by: {{ recipe.userName }}</span>
                      <v-btn color="red" dark small @click="deleteRecipe(recipe)">
                        Delete
                      </v-btn>
                    </v-card-title>
                    <hr />
                    <v-card-title class="font-weight-bold">{{
                      recipe.title
                    }}</v-card-title>
                    <v-card-subtitle>{{ recipe.description }}</v-card-subtitle>
                    <v-card-text>
                      <div><strong>Ingredients:</strong></div>
                      <ul>
                        <li
                          v-for="(ingredient, index) in recipe.ingredients"
                          :key="index"
                        >
                          {{ ingredient }}
                        </li>
                      </ul>
                      <div><strong>Steps:</strong></div>
                      <ol>
                        <li v-for="(step, index) in recipe.steps" :key="index">
                          {{ step }}
                        </li>
                      </ol>
                      <div><strong>Preparation Time:</strong> {{ recipe.prep_time }}</div>
                      <div><strong>Cost:</strong> ${{ recipe.cost }}</div>
                    </v-card-text>
                    <div class="d-flex justify-space-evenly mt-4">
                      <v-btn color="green" dark @click="openModal(recipe)">
                        View Reviews
                      </v-btn>
                      <v-btn color="blue" dark @click="openAddReviewModal(recipe)">
                        Add Review
                      </v-btn>
                    </div>
                  </v-card>
                </v-col>

                <!-- Modal for reviews -->
                <v-dialog v-model="isModalOpen" max-width="600px">
                  <v-card>
                    <v-card-title class="font-weight-bold">
                      Reviews for {{ selectedRecipe?.title }}
                    </v-card-title>
                    <v-card-text>
                      <v-row dense>
                        <v-col
                          v-for="review in selectedRecipe?.reviews || []"
                          :key="review.id"
                          cols="12"
                        >
                          <div class="mb-2">
                            <strong>{{ review.userName }}</strong>
                          </div>

                          <v-row>
                            <v-col cols="12"
                              ><strong>Type:</strong> {{ review.type }}</v-col
                            >
                            <v-col cols="12"
                              ><strong>Tag:</strong> {{ review.tag_name }}</v-col
                            >
                            <v-col cols="12">
                              <strong>Comment:</strong> {{ review.comment_text }}
                            </v-col>
                            <!-- Delete Button -->
                            <v-btn
                              color="red"
                              text
                              @click="deleteReview(review)"
                              class="mb-2 mx-2"
                            >
                              Delete
                            </v-btn>
                          </v-row>
                          <v-divider class="mt-4"></v-divider>
                        </v-col>
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
                        <v-text-field
                          v-model="newReview.type"
                          :rules="[rules.required]"
                          label="Type"
                          outlined
                          dense
                        ></v-text-field>
                        <v-text-field
                          v-model="newReview.comment_text"
                          :rules="[rules.required]"
                          label="Comment"
                          outlined
                          dense
                        ></v-text-field>
                        <v-text-field
                          v-model="newReview.tag_name"
                          :rules="[rules.required]"
                          label="Tag"
                          outlined
                          dense
                        ></v-text-field>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        color="green"
                        text
                        :disabled="!isFormValid"
                        @click="submitReview"
                      >
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
            </div>
          </v-col>
        </v-row>
      </v-container>

      <!-- Edit Modal -->
    </v-main>
  </v-app>
</template>

<script>
import { supabase } from "@/utils/supabase";

export default {
  name: "ProfilePage",
  data() {
    return {
      drawer: false,
      isModalOpen: false,
      isAddReviewModalOpen: false,
      selectedRecipe: null,
      newReview: { type: "", comment_text: "", tag_name: "" },
      isEditModalOpen: false,
      isFormValid: false,
      editData: {
        fullname: "",
        phone: "",
      },
      user: {
        name: "",
        phone: "",
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
      costOptions: ["< $10", "$10-$20", "> $20"],
      ingredientsOptions: ["< 5 Ingredients", "5-10 Ingredients", "> 10 Ingredients"],
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
          (this.costFilter === "< $10" && recipe.cost < 10) ||
          (this.costFilter === "$10-$20" && recipe.cost >= 10 && recipe.cost <= 20) ||
          (this.costFilter === "> $20" && recipe.cost > 20);

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
  },

  methods: {
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
      this.editData.fullname = this.user.name;
      this.editData.phone = this.user.phone;
      this.isEditModalOpen = true;
    },
    async saveProfile() {
      if (this.isFormValid) {
        try {
          // Update user info in Supabase
          await this.updateUserInfo(this.editData);
          // Update local user data
          this.user.name = this.editData.fullname;
          this.user.phone = this.editData.phone;
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
            fullname: data.fullname,
            phone_number: data.phone,
          })
          .eq("user_id", userId);

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
        // Step 1: Get the logged-in user's ID from `auth.users`
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        const userId = userData.user.id;

        // Step 2: Fetch `users_info.id` associated with the logged-in user
        const { data: userInfo, error: userInfoError } = await supabase
          .from("users_info")
          .select("id")
          .eq("user_id", userId)
          .single();

        if (userInfoError) throw userInfoError;

        const usersInfoId = userInfo.id;

        // Step 3: Fetch recipes where `users_info_id` matches the logged-in user's `users_info.id`
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
          users_info (fullname)
        `
          )
          .eq("users_info_id", usersInfoId); // Filter by the logged-in user's `users_info_id`

        if (recipesError) throw recipesError;

        // Step 4: Map the data to include the user's name
        this.recipes = recipes.map((recipe) => ({
          ...recipe,
          userName: recipe.users_info ? recipe.users_info.fullname : "Unknown User",
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

        const { data: userDetails, error } = await supabase
          .from("users_info")
          .select("fullname, email, phone_number")
          .eq("user_id", user.id)
          .single();

        if (error) throw error;

        this.user.name = userDetails.fullname;
        this.user.email = userDetails.email;
        this.user.phone = userDetails.phone_number;
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
        const { data, error } = await supabase
          .from("user_ratings")
          .select(
            `
          id,
          created_at,
          ratings_id (
            type,
            comment_text,
            tag_name
          ),
          recipe_id (
            users_info (
              fullname
            )
          )
        `
          )
          .eq("recipe_id", recipeId);

        if (error) throw error;

        // Map the fetched data
        this.selectedRecipe.reviews = data.map((review) => ({
          id: review.id,
          created_at: review.created_at,
          type: review.ratings_id ? review.ratings_id.type : null,
          comment_text: review.ratings_id ? review.ratings_id.comment_text : null,
          tag_name: review.ratings_id ? review.ratings_id.tag_name : null,
          userName: review.recipe_id?.users_info?.fullname || "Unknown User",
        }));
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
        alert("Failed to fetch reviews. Please try again.");
      }
    },
    openAddReviewModal(recipe) {
      this.selectedRecipe = recipe;
      this.isAddReviewModalOpen = true;
    },

    async submitReview() {
      if (this.$refs.addReviewForm.validate()) {
        try {
          const { data, error } = await supabase
            .from("ratings")
            .insert({
              type: this.newReview.type,
              comment_text: this.newReview.comment_text,
              tag_name: this.newReview.tag_name,
            })
            .select("id")
            .single();

          if (error) throw error;

          await supabase.from("user_ratings").insert({
            ratings_id: data.id,
            recipe_id: this.selectedRecipe.id,
          });

          alert("Added ratings successfully.");
          this.newReview = { type: "", comment_text: "", tag_name: "" };
          this.isAddReviewModalOpen = false;
          this.fetchReviews(this.selectedRecipe.id);
        } catch (error) {
          console.error("Error adding review:", error);
        }
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
          .eq("user_id", userId)
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
          .from("user_ratings")
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
  background-color: #fff; /* Optional: Set background for clarity */
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
</style>
