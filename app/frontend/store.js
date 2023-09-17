import { defineStore } from "pinia";
export const useLogStore = defineStore(
  'logStore', 
   () => {
    const test = ref("test")
    const currentUser = ref()
    const signedIn = ref()
    const ctsrf = ref()
    const tsignedIn = computed(() => signedIn.value)

    function setCurrentUser (currentUser, csrf) { 
      currentUser.value = currentUser.id
      signedIn.value = true
      ctsrf.value = csrf
    }
    return {
      currentUser,
      signedIn,
      ctsrf,
      tsignedIn,
      ttest,
    }
  },
  {
    persist: true,
  },
)