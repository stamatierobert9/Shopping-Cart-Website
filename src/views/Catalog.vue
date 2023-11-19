<template>
  <v-container>
    <!-- AppBar -->
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>TeleShop</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="white"
             @click="router.push({ name: 'Home' })"
      >Home</v-btn>
      <v-btn text color="white"
             @click="router.push({ name: 'Catalog' })"
      >Products</v-btn>
      <v-btn text color="white"
             @click="router.push({ name: 'CartView' })"
      >Basket</v-btn>
    </v-app-bar>

    <div>
      <v-btn
          v-for="category in categories"
          :key="category"
          @click="filterByCategory(category)"
      >
        {{ category }}
      </v-btn>
      <v-btn @click="clearFilter">Show All</v-btn>
    </div>

    <!-- Main Content -->
    <v-main>
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
              <v-sheet class="ma-2 pa-2">
                <v-card class="product">
                  <v-img :src="product.thumbnail" height="200px" />
                  <v-card-title>{{ product.brand }}</v-card-title>
                  <v-card-subtitle>${{ product.price }}</v-card-subtitle>
                  <v-card-text>{{ product.description }}</v-card-text>
                </v-card>
              </v-sheet>
            </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer color="indigo" app padless>
      <v-col class="text-center white--text" cols="12">
        © 2023 TeleShop
      </v-col>
    </v-footer>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
// import ProductItem from "@/components/ProductItem.vue";
export default defineComponent({
  name: 'CatalogView',
}

)
</script>

<script setup>
import { ref, computed, onMounted } from "vue";
import {fetchProductsFromDB, getUniqueCategories, products} from "@/stores/products";
import { useRouter } from "vue-router";

const router = useRouter();
const selectedCategory = ref(null);

const categories = computed(() => getUniqueCategories(products.value));

onMounted(() => {
  console.log('CatalogView mounted');
  fetchProductsFromDB();
});

const filterByCategory = (category) => {
  selectedCategory.value = category;
};

const filteredProducts = computed(() => {
  if (!selectedCategory.value || !Array.isArray(products.value)) {
    return [];
  }
  return products.value.filter(product => product.category === selectedCategory.value);
});


const clearFilter = () => {
  selectedCategory.value = null;
};

const goToProductPage = (id) => {
  router.push({ name: 'ProductView', params: { id } });
};

// Inside your script setup or mounted hook
console.log(products.value);

</script>


<style scoped>

</style>