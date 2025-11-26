<template>
  <main>
    <h1>Blog</h1>
    <article v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body.slice(0, 100) }}</p>
      <p>
        <NuxtLink :to="`/blog/${post.id}`">Lire la suite</NuxtLink>
      </p>
    </article>
  </main>
</template>

<script setup lang="ts">
const { data: posts } = await useFetch(
  "https://jsonplaceholder.typicode.com/posts"
);
</script>
