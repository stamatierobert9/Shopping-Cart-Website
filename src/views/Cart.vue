<template>
  <v-container>
    <!-- AppBar -->
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title >TeleShop</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text="" color="white" @click="router.push({ name: 'Home' })">Home</v-btn>
      <v-btn text color="white" @click="router.push({ name: 'Catalog' })">Products</v-btn>
      <v-btn text color="white" @click="router.push({ name: 'CartView' })">Basket</v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row justify="center">
          <!-- Display Cart Items -->
          <v-col cols="12" sm="12" md="10" lg="8" v-for="item in chei" :key="item.product.id">
            <v-card class="mb-3">
              <v-row no-gutters>
                <!-- Product Image -->
                <v-col cols="12" md="4">
                  <v-img :src="item.product.thumbnail" class="product-img"></v-img>
                </v-col>

                <!-- Product Details -->
                <v-col cols="12" md="8" class="product-details">
                  <v-card-title class="product-title">{{ item.product.title }}</v-card-title>
                  <v-card-subtitle>{{ item.product.category }}</v-card-subtitle>
                  <v-card-text>
                    Price: ${{ item.product.price }} <br>
                    Quantity: {{ item.quantity }}
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="red" @click="removeFromCart(item.product.id)">Remove</v-btn>
                  </v-card-actions>
                </v-col>
                <v-col cols="12" md="4" class="d-flex align-center justify-space-between">
                  <v-btn small icon @click="decrementQuantity(item)">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <span>{{ item.quantity }}</span>
                  <v-btn small icon @click="incrementQuantity(item)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <!-- Empty Cart Message -->
          <v-col v-if="!chei.length">
            <v-alert>
              Your cart is empty.
            </v-alert>
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
export default defineComponent({
  name: 'CartView'
})
</script>

<script setup>
  // import { ref } from 'vue';
  import { computed } from "vue";
  import { cart, products, removeFromCart, updateQuantity } from "@/stores/products";
  import router from "@/router";

  const chei = computed(() => Object.entries(cart).map(([id, quantity]) => ({
    product: products.value.find(product => product.id === parseInt(id)),
    quantity
  })));

  const incrementQuantity = (item) => {
    updateQuantity(item.product.id, item.quantity + 1);
    item.quantity++;
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1);
      item.quantity--;
    }
  };
</script>

<style scoped>
.product-img {
  width: 100%;
  height: auto; /* maintain aspect ratio */
  max-height: 250px; /* adjust as needed */
}

.product-details {
  padding: 16px;
}

.product-title {
  font-size: 1.2em; /* Adjust font size */
  white-space: nowrap; /* Keep text in a single line */
  overflow: hidden; /* Hide text overflow */
  text-overflow: ellipsis; /* Show ellipsis for overflowed text */
}
</style>