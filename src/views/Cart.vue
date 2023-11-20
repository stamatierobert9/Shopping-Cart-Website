<template>
  <!-- Main Content -->
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row justify="center">
        <!-- Display Cart Items -->
        <v-col cols="12" v-for="item in chei" :key="item.product.id">
          <v-card class="mb-3 cart-item">

              <!-- Product Image -->
              <v-col cols="12" md="3">
                <v-img :src="item.product.thumbnail" class="product-img"></v-img>
              </v-col>

              <!-- Product Details -->
              <v-col cols="20" md="6" class="product-details">
                <v-card-title class="product-title">{{ item.product.title }}</v-card-title>
                <v-card-subtitle>{{ item.product.category }}</v-card-subtitle>
                <v-card-text>
                  Price: ${{ item.product.price }}
                </v-card-text>
              </v-col>

              <!-- Quantity Controls -->
              <v-col cols="6" md="2" class="quantity-controls">
                <v-btn
                    icon="$minus"
                    @click="decrementQuantity(item)">
                </v-btn>
                <span>{{ item.quantity }}</span>
                <v-btn
                    icon="$plus"
                    @click="incrementQuantity(item)">
                </v-btn>
              </v-col>

              <!-- Remove Button -->
              <v-col cols="6" md="3">
                <v-btn color="red" @click="removeFromCart(item.product.id)">Remove</v-btn>
              </v-col>
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
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: 'CartView'
})
</script>

<script setup>
  import { computed } from "vue";
  import { cart, products, removeFromCart, updateQuantity } from "@/stores/products";

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
.cart-item {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.product-img {
  width: 100%;
  max-height: 200px;
}

.product-details {
  padding: 16px;
  flex-grow: 1;
}

.product-title {
  font-size: 1.4em; /* Make title larger */
  margin-bottom: 8px; /* Add space below title */
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 8px 0; /* Add padding for better spacing */
}
</style>
