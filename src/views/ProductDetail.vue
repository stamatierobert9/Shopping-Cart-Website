<template>

    <!-- Main Content -->
    <v-main>
      <v-container>

        <!-- Breadcrumb -->
        <v-breadcrumbs :items="breadcrumbs">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :to="item.to" :disabled="item.disabled">{{ item.text }}</v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>

        <!-- Product Details -->
        <v-row>
          <v-col cols="12">
            <h1 class="text-h1 py-4"> <b>{{ getProduct.title }}</b></h1>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="6" class="pa-2">
            <v-img :src="getProduct.thumbnail" height="300px" />
          </v-col>
          <v-col cols="12" sm="6">
            <h3><b>Brand</b>: {{ getProduct.brand }}</h3>
            <h4><b>Category</b>: {{ getProduct.category }}</h4>
            <p>Description: {{ getProduct.description }}</p>
            <h2>Price: ${{ getProduct.price }}</h2>
            <v-btn color="primary" @click="addToCart(getProduct.id)">Add to cart</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  <v-snackbar v-model="snackbar" :timeout="2000" color="success" class="custom-snackbar" >
    {{ snackbarText }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: 'ProductDetails'
})
</script>

<script setup>
import {computed, onMounted} from "vue";
import {fetchProductsFromDB, products, snackbarText, snackbar} from "@/stores/products";
import { useRoute } from "vue-router";
import { addToCart } from "@/stores/products";

const route = useRoute();

onMounted(() => {
  fetchProductsFromDB();
});

const getProduct = computed(() => {
  const productId = route.params.id; // Adjust according to your route setup
  return products.value.find(product => product.id === Number(productId));
});

const breadcrumbs = computed(() => [
  { text: 'Home', to: '/' },
  { text: 'Catalog', to: '/Products' },
  { text: getProduct.value.title, disabled: true }
]);
</script>

<style scoped>
.product {
  display: flex;
  margin-top: 50px;
}

.product-image {
  margin-right: 24px;
}

.custom-snackbar {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 2000; /* Ensure it is above other content */
}

</style>