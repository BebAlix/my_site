<template>
  <div class="min-h-screen">
    <!-- Hero section -->
    <section class="flex flex-col justify-center items-center text-center p-10">
      <img src="/avatar.png" class="w-32 h-32 rounded-full shadow-lg" />
      <h1 class="text-6xl font-extrabold mb-6 tracking-tight">
        <span>Ewen Quesnel</span>
      </h1>

      <p class="text-xl text-gray-300 max-w-2xl">
        Apprenti développeur web, passionné par l’apprentissage et déterminé à
        me spécialiser dans le backend.
      </p>

      <div class="mt-8 flex gap-4">
        <UButton color="primary" size="lg"> Voir mes projets </UButton>
        <UButton color="gray" size="lg"> Contact </UButton>
      </div>
    </section>

    <!-- Skills -->
    <section class="py-16 px-6">
      <h2 class="text-4xl font-bold text-center mb-10">Compétences</h2>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <UCard class="p-6 bg-neutral-800 text-gray-200">
          <h3 class="text-2xl font-bold mb-3">Backend</h3>
          <p>Node.js, NestJS, API REST,</p>
        </UCard>

        <UCard class="p-6 bg-neutral-800 text-gray-200">
          <h3 class="text-2xl font-bold mb-3">DevOps</h3>
          <p>Docker, CI/CD, Linux, NGINX</p>
        </UCard>

        <UCard class="p-6 bg-neutral-800 text-gray-200">
          <h3 class="text-2xl font-bold mb-3">Bases de données</h3>
          <p>Prisma, PostgreSQL</p>
        </UCard>
      </div>
    </section>

    <!-- Footer -->
    <footer class="text-center text-gray-500 py-6">
      © {{ new Date().getFullYear() }} — Tous droits réservés
    </footer>
  </div>
</template>

<script setup>
// Page statique
</script>

<style scoped></style>
