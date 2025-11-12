<template>
  <div v-if="auth.user">
    <h1>Mon Profil</h1>

    <form @submit.prevent="submitUpdate">
      <!-- Nom -->
      <div>
        <label for="name">Nom</label>
        <input id="name" v-model="name" :placeholder="auth.user?.name || 'Votre nom'" />
      </div>

      <!-- Email -->
      <div>
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          v-model="email"
          :placeholder="auth.user?.email || 'Votre email'"
        />
      </div>

      <!-- Password -->
      <div>
        <label for="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="Nouveau mot de passe"
        />
      </div>

      <button type="submit">Mettre à jour</button>
    </form>

    <button @click="logout">Se déconnecter</button>
  </div>
  <div v-else>
    <p>Chargement du profil...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

interface ProfileUpdate {
  name?: string
  email?: string
  password?: string
}

const auth = useAuthStore()
const router = useRouter()

// Champs du formulaire
const name = ref('')
const email = ref('')
const password = ref('')

// Réinitialiser les champs quand l'utilisateur change
watch(
  () => auth.user,
  (user) => {
    if (user) {
      name.value = ''
      email.value = ''
      password.value = ''
    }
  },
  { immediate: true },
)

// Déconnexion
const logout = () => {
  auth.logout()
  router.push('/login')
}

// Soumission du formulaire
const submitUpdate = async () => {
  if (!auth.user) return

  const payload: ProfileUpdate = {}

  if (name.value.trim()) payload.name = name.value.trim()
  if (email.value.trim()) payload.email = email.value.trim()
  if (password.value.trim()) payload.password = password.value.trim()

  if (Object.keys(payload).length === 0) {
    alert('Aucun champ à mettre à jour.')
    return
  }

  try {
    await auth.updateProfile(payload)
    alert('Profil mis à jour avec succès !')

    if (payload.name) auth.user.name = payload.name
    if (payload.email) auth.user.email = payload.email
    // mot de passe n’est pas stocké
  } catch (err) {
    console.error(err)
    alert('Erreur lors de la mise à jour du profil.')
  }

  name.value = ''
  email.value = ''
  password.value = ''
}

// Charger le profil si pas déjà fait
if (!auth.user) {
  auth.fetchProfile()
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  gap: 1rem;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>
