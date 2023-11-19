<template>
  <v-app>
  <header>
    <v-toolbar dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>TeleShop</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-sheet
          class="mx-auto"
          max-width="600"
      >
        <v-slide-group
            show-arrows
        >
          <v-slide-group-item
              v-for="n in categories"
              :key="n"
              v-slot="{ isSelected, toggle }"
          >
            <v-btn
                class="ma-2"
                rounded
                :color="isSelected ? 'primary' : undefined"
                @click="toggle"
            >
               {{ n }}
            </v-btn>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>

      <v-spacer></v-spacer>

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

      <v-btn flat
          @click="router.push({ name: 'CartView' })"
      >
        <v-badge
            color="blue"
            :content="cart.length"
        >
          <v-icon>
            shopping_cart
          </v-icon>
          Basket
        </v-badge>
      </v-btn>
    </v-toolbar>
  </header>
  <main>
    <RouterView />
  </main>
  </v-app>
</template>

<script setup>
import { useRouter } from "vue-router";
import { cart } from "@/stores/products";
import {categories} from "@/stores/products";

const router = useRouter()
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