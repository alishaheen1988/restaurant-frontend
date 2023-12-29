<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumb">
      <template v-slot:prepend>
        <v-icon size="small" icon="$vuetify"></v-icon>
      </template>
    </v-breadcrumbs>
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
            <EditCategoryPopup :id="cat.id" :name="cat.name" :description="cat.description" :discount_percentage="cat.discount_percentage" />
            <DeletePopup v-if="!!this.id" type="categories" :id="cat.id" :name="cat.name" />
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
            <EditItemPopup :id="item.id" :name="item.name" :description="item.description" :discount_percentage="item.discount_percentage" :price="item.price" />
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
import EditCategoryPopup from '@/components/EditCategoryPopup.vue'
import AddItemPopup from '@/components/AddItemPopup.vue'
import EditItemPopup from '@/components/EditItemPopup.vue'
import DeletePopup from '@/components/DeletePopup.vue'
export default defineComponent({
  name: 'Home',
  props: ['id'],
  components: { AddCategoryPopup, AddItemPopup, DeletePopup, EditCategoryPopup, EditItemPopup },
  data() {
    return {
      mainStore: useMainStore(),
      
    }
  },
  computed: {
    currentCategory() {
      return this.id ? this.mainStore.restaurant_menu.find((a) => (a.id == this.id)) : null;
    },
    subCategories() {

      return this.mainStore.restaurant_menu.filter((a) => a.parent_id == (this.id || null));
    },
    items() {
      return this.currentCategory ? JSON.parse(this.currentCategory.cat_items || []) : []
    },
    breadcrumb(){
      if (this.currentCategory) {
        let bc = [
          {
            title: this.currentCategory.name,
            disabled: true,
            to: this.id+"",
          }
        ]
        let iterator = this.currentCategory;
        while (iterator.parent_id) {
          iterator = this.mainStore.restaurant_menu.find((a) => a.id == iterator.parent_id);
          bc = [
            {
              title: iterator.name,
              disabled: false,
              to: iterator.id+""
            }
          ].concat(bc);

        }
        bc=[
            {
              title: 'My Menu',
              disabled: false,
              to: "/"
            }
          ].concat(bc);
        return bc;
      }
      else return [];
    }
  },
  mounted() {
    this.mainStore.getRestaurantMenu();
  }
});
</script>
