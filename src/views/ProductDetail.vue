<template>
  <v-container>
    <!-- AppBar -->
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>TeleShop</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="white" @click="router.push({ name: 'Home' })">Home</v-btn>
      <v-btn text color="white" @click="router.push({ name: 'Catalog' })">Products</v-btn>
      <v-btn text color="white" @click="router.push({ name: 'CartView' })">Basket</v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="text-h4 py-4">{{ getProduct.title }}</h1>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="6">
            <v-img :src="getProduct.thumbnail" height="300px" />
          </v-col>
          <v-col cols="12" sm="6">
            <p>Brand: {{ getProduct.brand }}</p>
            <p>Category: {{ getProduct.category }}</p>
            <p>Description: {{ getProduct.description }}</p>
            <h2>Price: ${{ getProduct.price }}</h2>
            <v-btn color="primary" @click="addToCart(getProduct.id)">Add to cart</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer color="indigo" app padless>
      <v-col class="text-center white--text" cols="12">
        © 2023 Your Company Name
      </v-col>
    </v-footer>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: 'ProductDetails'
})
</script>

<script setup>
import {computed, onMounted} from "vue";
import { fetchProductsFromDB, products } from "@/stores/products";
import { useRouter, useRoute } from "vue-router";
import { addToCart } from "@/stores/products";

const router = useRouter();
const route = useRoute();

onMounted(() => {
  fetchProductsFromDB();
});

const getProduct = computed(() => {
  const productId = route.params.id; // Adjust according to your route setup
  return products.value.find(product => product.id === Number(productId));
});
</script>

<style scoped>
.product {
  display: flex;
  margin-top: 50px;
}

.product-image {
  margin-right: 24px;
}

</style>