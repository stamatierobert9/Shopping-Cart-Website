<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>TeleShop</v-toolbar-title>

      <!-- Search Bar -->
      <v-text-field
          v-model="searchQuery"
          @input="filterProducts"
          hide-details
          prepend-icon="$edit"
          single-line
          placeholder="Search products"
          clearable
      ></v-text-field>

      <!-- Display Search Results -->
      <div v-if="filteredProducts.length">
        <div v-for="product in filteredProducts" :key="product.id">
          <v-list-item @click="goToProductPage(product.id)">
            <v-list-item-content>
              <v-list-item-title>{{ product.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </div>

      <v-spacer></v-spacer>

      <!-- Navigation and Cart -->
      <v-btn @click="router.push({ name: 'Catalog' })" text color="white">Catalog</v-btn>
      <v-btn @click="router.push({ name: 'Home' })" text color="white">Home</v-btn>
      <v-btn text color="white" @click="router.push({ name: 'CartView' })">
        <v-badge
            color="red"
            class="pa-2"
            :content="cartItemCount">
          <v-icon
              icon="$vuetify"
              size="large"
              color="succes"
          ></v-icon>
        </v-badge>
        Basket
      </v-btn>
    </v-app-bar>

    <main>
      <RouterView />
    </main>

    <!-- Footer -->
    <v-footer color="indigo" app padless>
      <v-col class="text-center white--text" cols="12">
        © 2023 TeleShop
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { cart, products, fetchProductsFromDB } from "@/stores/products";

const router = useRouter();
const searchQuery = ref('');
const filteredProducts = ref([]);

// Fetch products on component mount
fetchProductsFromDB();

const cartItemCount = computed(() => {
  return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
});

const filterProducts = () => {
  if (searchQuery.value.length >= 2) {
    filteredProducts.value = products.value.filter(product => {
      const query = searchQuery.value.toLowerCase();
      return product.title.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query);
    });
  } else {
    filteredProducts.value = [];
  }
};

const goToProductPage = (id) => {
  router.push({ name: 'ProductView', params: { id } });
}
</script>

<style scoped>
.cart-items {
  text-align: end;
  padding: 16px;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
}

.search-results {
  position: absolute;
  z-index: 100;
  background-color: white;
  width: 100%;
}
</style>
