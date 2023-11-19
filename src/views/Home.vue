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

    <!-- Main Content -->
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6">
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
import { VAppBar, VToolbarTitle, VSpacer, VBtn, VMain, VContainer, VRow, VCol, VCard, VCardTitle, VCardText, VCardActions, VFooter } from "vuetify/components";

export default defineComponent({
  name: 'HomeView',
  components: {
    VAppBar,
    VToolbarTitle,
    VSpacer,
    VBtn,
    VMain,
    VContainer,
    VRow,
    VCol,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VFooter
  },
})
</script>

<script setup>
import { useRouter} from "vue-router";

const router = useRouter()
</script>


<style scoped>
/* You can add custom styles here */
</style>
