<template>
  <div class="not-found">
    <h1>404 - Page introuvable</h1>
    <p>La page que vous cherchez n'existe pas.</p>
    <router-link to="/">Retour à l'accueil</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NotFound',
}
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}
</style>
