<template>
    <!-- Main Content -->
    <v-main>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="12">
            <v-card class="elevation-12" color="grey lighten-4">
              <v-card-title class="headline">
                Welcome to Our Shop
              </v-card-title>
              <v-card-text>
                Browse our wide selection of products and find what you need!
              </v-card-text>
              <v-card-actions>
                <v-btn
                    color="primary"
                    @click="router.push({ name: 'Catalog' })"
                >Shop Now</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
    </v-main>

    <v-carousel>
      <v-carousel-item v-for="product in products" :key="product.id">
        <v-card>
          <v-img :src="product.thumbnail"></v-img>
          <v-card-title>{{ product.title }}</v-card-title>
          <v-card-subtitle>${{ product.price }}</v-card-subtitle>
        </v-card>
      </v-carousel-item>
    </v-carousel>
</template>

<script>
import { defineComponent } from "vue";
import { VBtn, VMain, VRow, VCol, VCard, VCardTitle, VCardText, VCardActions } from "vuetify/components";

export default defineComponent({
  name: 'HomeView',
  components: {
    VBtn,
    VMain,
    VRow,
    VCol,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions
  },
})
</script>

<script setup>
import { useRouter} from "vue-router";
// import {onMounted, ref} from "vue";
import {products} from "@/stores/products";

const router = useRouter()

// const products = ref([]);
//
// onMounted(async () => {
//   products.value = await fetchProductsFromDB();
// });

</script>


<style scoped>
</style>
