<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>TeleShop</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <!-- Navigation Buttons -->
      <v-btn @click="router.push({ name: 'Catalog' })" text color="white">Catalog</v-btn>
      <v-btn @click="router.push({ name: 'Home' })" text color="white">Home</v-btn>

      <!-- Cart Button with Badge -->
      <v-btn text color="white" @click="router.push({ name: 'CartView' })">
        <v-badge color="red" :content="cartItemCount">
          <v-icon>mdi-cart</v-icon>
        </v-badge>
        Basket
      </v-btn>
    </v-app-bar>

    <main>
      <RouterView />
    </main>

    <!-- Footer (if needed) -->
    <v-footer color="indigo" app padless>
      <v-col class="text-center white--text" cols="12">
        © 2023 TeleShop
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
import { useRouter } from "vue-router";
import { cart } from "@/stores/products";
import {computed} from "vue";

const router = useRouter()

const cartItemCount = computed(() => {
  return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
});

</script>


<style scoped>
.cart-items {
  text-align: end;
  padding: 16px;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
}
</style>