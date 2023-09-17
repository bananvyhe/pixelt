<template>
  <v-layout >
    <v-app-bar density="compact" class="topmenu py-0">
      <v-container  class="d-flex align-center py-0 my-0" >
        <v-btn  @click="store.increment">войти</v-btn>
        +{{store.tsignedIn}}+ 
        <div v-if="store.tsignedIn == false" class="d-flex"> 
          <signup></signup>
        </div>
        <div v-if="store.tsignedIn == true" class="d-flex align-center">
          <v-btn
            color="primary" 
            size="x-small" 
            @click="signOut">выйти
          </v-btn> 
        </div>
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
const plain: any = inject('plain')
const secured: any = inject('secured')
const store = useLogStore()
function signOut(){
  secured
  .delete('/signin')
  .then(response => {
    store.unsetCurrentUser()
  })
}
</script>
<style scoped>
  
</style>