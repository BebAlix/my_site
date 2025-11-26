<template>
  <nav class="bg-indigo-600 text-white p-4 flex justify-between items-center">
    <!-- Logo / titre -->
    <div class="text-lg font-bold">
      <router-link to="/">MonApp</router-link>
    </div>

    <!-- Liens de navigation -->
    <ul class="flex gap-4 items-center">
      <li v-if="!auth.token">
        <router-link to="/signup" class="px-2 py-1 hover:underline block">Signup</router-link>
      </li>
      <li v-if="!auth.token">
        <router-link to="/login" class="px-2 py-1 hover:underline block">Login</router-link>
      </li>
      <li v-if="auth.token">
        <router-link to="/profile" class="px-2 py-1 hover:underline block">Profile</router-link>
      </li>
      <li v-if="auth.token">
        <button @click="logout" class="px-2 py-1 hover:underline">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>
