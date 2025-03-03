<script setup lang="ts">
import type { Weather } from "@/types";

defineProps<{ weather: Weather }>()

</script>

<template>
 <div class="w-full p-4 mt-8 bg-tCardBg rounded-lg">
  <p>Exploring: {{ weather.city }}</p>
  <p>Country: {{ weather.country }}</p>
  <p>Current temperature: {{ `${weather.temperature}°C` }}</p>
 </div>
</template>