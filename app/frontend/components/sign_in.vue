<template>
      <v-dialog
      scroll-strategy="none"
        transition="dialog-top-transition"
        max-width="600">
        <template v-slot:activator="{ props }">
          <v-btn
            size="small"
            color="secondary"
            v-bind="props"
            variant="tonal">
            Войти
          </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card class="sign">

  <v-form class="px-3 py-2">
     <div for="email" class="mb-2">Войти на сайт</div>
    <!-- <div class="alert alert-danger" v-if="error">{{ error }}</div> -->
        <v-text-field  class="px-2 pt-2" v-model="email"  :rules="emailRules" type="email" filled id="email" placeholder="email@example.ru">
        </v-text-field>
        <!-- <label for="password">Пароль</label> -->
        <v-text-field class="px-2" v-model="password" type="password" filled id="password" placeholder="Password"></v-text-field>
        <div class="d-flex justify-center">
           <v-btn class="btn btn-primary mb-1" @click="signin">Войти</v-btn>
        </div>
     
      <div>
    </div>
  </v-form>
              
          </v-card>
        </template>
      </v-dialog>
</template>

<script setup lang="ts">
  // import { useRouter, useRoute } from 'vue-router'
  // const router = useRouter()
  // const route = useRoute()  
  
  // import { useNotification } from "@kyvg/vue3-notification";
  // const { notify}  = useNotification()
  import { ref, computed, inject } from 'vue';
  import { useLogStore } from '../../store.js' 
  const plain: any = inject('plain')
  const secured: any = inject('secured')
  const store = useLogStore()

  const email = ref()
  const password = ref()

  const emailRules = reactive([
    v => !!v || 'E-mail необходим для регистрации',
    v => /.+@.+\..+/.test(v) || 'E-mail введен некорректно',
  ])
  const confirmRules = reactive([
    v => !!v || 'нужно ввести пароль',
    v => v.length >= 5 || 'Пароль должен содержать более 6 символов',
                // v => (v || '').indexOf(' ') < 0 ||  'Пробелов не должно быть'
    v => v ==  password.value || "Пароли не совпадают"
  ]) 

  function signin () {
    plain
      .post('/signin', { email: email.value, password: password.value })
      // .then(response => signinSuccessful(response))
      // .catch(error => signinFailed(error))
      .then((response: { data: any }) => {
        // console.log(response.data.message)  
        signinSuccessful(response)
     
      })
      .catch(error => {
        notify({ title: "Ошибка авторизации", type: 'error', text: error.response.data.message});
        // console.log(error.response.data.message)          
      })
  }

  function signinSuccessful (response) {
    notify({ title: "Успешная авторизация", type: 'success'});
    store.unsetLoa()
    if (!response.data.csrf) {
      signupFailed(response)
      return
    }else{
      console.log("me")
      secured
      .get('/me')
      .then(meResponse => {
        console.log(meResponse.data)
        store.setCurrentUser(meResponse.data, response.data.csrf)
        // this.error = ''
        // this.$router.replace('/')
        nextTick(() => {
          router.push({ name: "lobby" });
        })
      })
      .catch(error => console.log(error))
      // this.$router.replace('/')        
    }
  }

  function signinFailed (error) {
    console.log(error)
    store.unsetCurrentUser 
  }  

</script>

<style lang="css">
input:-webkit-autofill { 
    -webkit-background-clip: text;
}

</style>