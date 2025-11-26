<template>
  <div>
    <h1>Test API GET</h1>
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApi } from "~/composables/useApi";

const data = ref<string | null>(null);
const api = useApi();

onMounted(async () => {
  data.value = await api.getHello();
});
</script>
