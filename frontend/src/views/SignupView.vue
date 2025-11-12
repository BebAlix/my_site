<template>
  <div>
    <h1>Créer un compte</h1>
    <form @submit.prevent="submit">
      <input v-model="name" placeholder="Nom" />
      <input v-model="email" placeholder="Email" />
      <input v-model="password" placeholder="Mot de passe" type="password" />
      <button>S'inscrire</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')

const submit = async () => {
  await auth.signup({ name: name.value, email: email.value, password: password.value })
  router.push('/profile')
}
</script>
