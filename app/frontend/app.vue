<template>
  <v-layout >
    <v-app-bar density="compact" class="topmenu py-0">
      <v-container  class="d-flex align-center py-0 my-0" >
        <v-btn  @click="store.increment">войти</v-btn>
        +{{store.tsignedIn}}+ 
        <signup></signup>
        <v-btn density="default" icon="mdi-open-in-new">
          <iconUrl/>
        </v-btn>
        <v-spacer></v-spacer>
        Ruby on Rails + Vue.js
      </v-container>
    </v-app-bar>
  </v-layout>
</template>
<script setup lang="ts">
import iconUrl from './src/svg/baseline-mail-outline.svg?component'
import Signup from './components/sign_up.vue';
import { useLogStore } from './store.js'
const store = useLogStore()
</script>
<style scoped>
  
</style>