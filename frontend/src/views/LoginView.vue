<template>
  <div>
    <h1>Connexion</h1>
    <form @submit.prevent="submit">
      <input v-model="email" placeholder="Email" />
      <input v-model="password" placeholder="Mot de passe" type="password" />
      <button>Se connecter</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

console.log('API URL utilisée :', import.meta.env.VITE_API_URL)
const submit = async () => {
  console.log('coucou')
  console.log('API URL utilisée :', import.meta.env.VITE_API_URL)
  await auth.login(email.value, password.value)
  router.push('/profile')
}
</script>
