<template>
  <v-layout >
    <v-app-bar density="compact" class="topmenu py-0">
      <v-container  class="d-flex align-center py-0 my-0" >
        <!-- <v-btn  @click="store.increment">войти</v-btn> -->
        <div v-if="store.tsignedIn == false" class="d-flex"> 
          <signin></signin>
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
        <div class="d-flex flex-column ">
          <div >программирование дизайн</div>
          <div class="text-caption">Ruby on Rails + Vue.js</div>
        </div>

      </v-container>
    </v-app-bar>
  </v-layout>
<notifications position="bottom left"  >
<!--     <template #body="props">
    <div class="my-notification">
      <p class="title">
        {{ props.item.title }}
      </p>
      <button class="close" @click="close">
        <i class="fa fa-fw fa-close"></i>
      </button>
      <div v-html="props.item.text"/>
    </div>
  </template> -->
</notifications>  
</template>
<script setup lang="ts">
import iconUrl from './src/svg/baseline-mail-outline.svg?component'
import Signup from './components/sign_up.vue';
import Signin from './components/sign_in.vue';
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