<template>
    <!-- Main Content -->
    <v-main>
      <!-- Breadcrumb -->
      <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :to="item.to" :disabled="item.disabled">{{ item.text }}</v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>

      <div>
        <v-btn
            v-for="category in categories"
            :key="category"
            @click="filterByCategory(category)"
            class="pa-2 ma-1"
        >
          {{ category }}
        </v-btn >
        <v-btn @click="clearFilter">Show All</v-btn>
      </div>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="text-h4 py-4">Our Products</h1>
          </v-col>
        </v-row>

        <v-row no-gutters>
            <v-col
                v-for="product in filteredProducts"
                :key="product.id"
                cols="12"
                sm="4"
                @click="goToProductPage(product.id)"
            >
              <v-sheet class="ma-3 pa-3">
                <v-card class="product">
                  <v-img :src="product.thumbnail" height="200px" />
                  <v-card-title><h2>{{ product.brand }}</h2></v-card-title>
                  <v-card-subtitle><h4>${{ product.price }}</h4></v-card-subtitle>
                  <v-card-text>{{ product.description }}</v-card-text>
                </v-card>
              </v-sheet>
            </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: 'CatalogView',
})
</script>

<script setup>
import { ref, computed, onMounted } from "vue";
import {fetchProductsFromDB, getUniqueCategories, products} from "@/stores/products";
import { useRouter } from "vue-router";


const router = useRouter();
const selectedCategory = ref(null);
const categories = computed(() => getUniqueCategories(products.value));

onMounted(() => {
  fetchProductsFromDB();
});

const filterByCategory = (category) => {
  selectedCategory.value = category;
};

const filteredProducts = computed(() => {
  if (!selectedCategory.value) {
    return products.value; // Return all products if no category is selected
  }
  if (!Array.isArray(products.value)) {
    return []; // Return an empty array if products.value is not an array
  }
  return products.value.filter(product => product.category === selectedCategory.value);
});

const clearFilter = () => {
  selectedCategory.value = null;
};

const goToProductPage = (id) => {
  router.push({ name: 'ProductView', params: { id } });
};

const breadcrumbs = computed(() => [
  { text: 'Home', to: '/' },
  { text: 'Catalog', to: '/Products' },
]);
</script>


<style scoped>

</style>