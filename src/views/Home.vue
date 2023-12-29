<template>
  <v-container>
    <h2>{{ currentCategory?.name }}</h2>
    <div v-if="!!this.id" class="my-5 mx-5">
      <v-row class="mt-5 mx-5" justify="start">
        <v-col cols="2" v-if="!!currentCategory && currentCategory.level < 4 && (!items || !items.length)">
          <AddCategoryPopup :parent_id="currentCategory?.id" />
        </v-col>
        <v-col cols="2" v-if="!!subCategories && !subCategories.length">
          <AddItemPopup :category_id="currentCategory?.id" />
        </v-col>
      </v-row>

    </div>
    <v-row v-if="!!subCategories && subCategories.length" class="mt-5 mx-5" justify="start">
      <v-col cols="3" v-for="cat in subCategories" :key="cat.id">
        <v-card class="mx-auto" max-width="400" :title="cat.name"
          :subtitle="'discount: ' + (cat.discount_percentage || 0) + ' %'" prepend-icon="mdi-folder-outline">
          <v-card-text>{{ cat.description }}</v-card-text>
          <v-card-actions>
            <v-btn flat color="green" router :to="'/' + cat.id">
              <span>Show Details</span>
              <v-icon right>mdi-view-dashboard</v-icon>
            </v-btn>
            <DeletePopup  v-if="!!this.id"  type="categories" :id="cat.id" :name="cat.name"/>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="!!items && items.length" class="mt-5 mx-5" justify="start">
      <v-col cols="3" v-for="item in items" :key="item.id">
        <v-card class="mx-auto" max-width="400" :title="item.name"
          :subtitle="'discount: ' + (item.discount_percentage || 0) + ' %'" prepend-icon="mdi-food">
          <v-card-text>{{ item.description }}</v-card-text>
          <v-card-text>Price: {{ item.price }}</v-card-text>
          <v-card-actions>
            <DeletePopup type="items" :id="item.id" :name="item.name" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { useMainStore } from '@/stores'
import AddCategoryPopup from '@/components/AddCategoryPopup.vue'
import AddItemPopup from '@/components/AddItemPopup.vue'
import DeletePopup from '@/components/DeletePopup.vue'
export default defineComponent({
  name: 'Home',
  props: ['id'],
  components: { AddCategoryPopup, AddItemPopup,DeletePopup },
  data() {
    return {
      mainStore: useMainStore(),
    }
  },
  computed: {
    currentCategory() {
      return  this.id ? this.mainStore.restaurant_menu.find((a) => (a.id == this.id)):null;
    },
    subCategories() {

      return this.mainStore.restaurant_menu.filter((a) => a.parent_id == (this.id || null));
    },
    items() {
      return this.currentCategory ? JSON.parse(this.currentCategory.cat_items || []) : []
    }
  },
  mounted() {
    this.mainStore.getRestaurantMenu();
  }
});
</script>
