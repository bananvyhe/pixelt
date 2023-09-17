import { defineStore } from "pinia";
export const useLogStore = defineStore(
  'logStore', 
   () => {
    const test = ref("test")
    const currentUser = ref()
    const signedIn = ref()
    const ctsrf = ref()
    const tsignedIn = computed(() => signedIn.value)
    const tctsrf = computed(() => ctsrf.value)

    function setCurrentUser (currentUser, csrf) { 
      currentUser.value = currentUser.id
      signedIn.value = true
      ctsrf.value = csrf
    }

    function unsetCurrentUser () {
      currentUser.value = ""
      signedIn.value = false
      ctsrf.value = ""
    }

    return {
      tctsrf,
      unsetCurrentUser,
      setCurrentUser,
      currentUser,
      signedIn,
      ctsrf,
      tsignedIn,
    }
  },
  {
    persist: true,
  },
)