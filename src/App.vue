<template>
  <header>
    <v-toolbar>
      <v-btn
          @click="router.push({ name: 'Catalog' })"
          color="primary"
          variant="elevated"
      >Catalog
      </v-btn>
      <v-btn
          @click="router.push({ name: 'Home' })"
          color="primary"
          variant="elevated"
      >Home
      </v-btn>

      <v-btn icon="$vuetify"
          @click="router.push({ name: 'CartView' })"
          color="primary"
          variant="elevated"
      >{{ store.cart.length }}
      </v-btn>
    </v-toolbar>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { useRouter } from "vue-router";
import { productsStore } from "@/stores/products";

const router = useRouter()
const store = productsStore()
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