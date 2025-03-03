<script setup lang="ts">
import { ref } from "vue";
import type { Weather } from "@/types/index.ts";
import WeatherResult from "@/components/WeatherResult.vue";

const isInputEmpty = ref(false)
const isGeoAPIError = ref(false)
const pending = ref(false)

const cityInput = ref<string | null>(null)

const weather = ref<Weather>({
 city: null,
 country: null,
 temperature: null
})

const fetchWeather = async (latitude: number, longitude: number): Promise<void> => {

 try {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
  )
  const data = await response.json()
  weather.value.temperature = data.current_weather.temperature
 } catch (e) {
  console.error("Error fetching weather data:", e)
 }
}

const onSubmit = async (): Promise<void> => {

 if (!cityInput.value) {
  isInputEmpty.value = true
  return
 }

 pending.value = true

 try {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput.value}&count=1`
  )
  const data = await response.json()

  if (!data.results) {
   isGeoAPIError.value = true
   return
  }

  const { latitude, longitude, country } = data.results[0]

  weather.value.country = country
  weather.value.city = cityInput.value

  await fetchWeather(latitude, longitude)
 } catch (e) {
  isGeoAPIError.value = true
 } finally {
  pending.value = false
 }
}

const reset = () => {
 isInputEmpty.value = false
 isGeoAPIError.value = false
 weather.value.city = null
 weather.value.country = null
 weather.value.temperature = null
}
</script>

<template>
 <main class="flex justify-center items-center h-screen w-full">

  <div class="w-1/4">
   <form @submit.prevent="onSubmit">

    <div class="flex flex-col items-center gap-6 mb-8">
     <img
       src="@/assets/logo.svg"
       alt="Hoteza" />
     <p class="font-semibold text-xl">
      Forecast Hub
     </p>
    </div>

    <div class="relative">
     <input
       v-model.trim="cityInput"
       placeholder="Enter your city"
       class="w-full py-2.5 mb-6 bg-transparent border-b border-tBorder outline-none placeholder-tPlaceholder"
       :class="{ 'border-tError placeholder-tError': isInputEmpty || isGeoAPIError }"
       @input="reset"
       type="text"/>

     <span
       v-if="isInputEmpty"
       class="absolute text-tError right-0 translate-y-1/2">
     *
    </span>
    </div>

    <button
      :disabled="pending"
      type="submit"
      class="w-full py-2.5 bg-tButtonBg rounded-lg flex justify-center items-center">
     <span v-if="pending" class="loader"/>
     <span v-else>Weather Now</span>
    </button>
   </form>

   <div class="relative h-6 w-full mt-8">
    <p
      v-if="isInputEmpty"
      class="absolute left-0 right-0 text-center text-tError opacity-0 transition-opacity duration-300"
      :class="{ 'opacity-100': isInputEmpty }">
     Please enter the city
    </p>

    <p
      v-if="isGeoAPIError"
      class="absolute left-0 right-0 text-center text-tError opacity-0 transition-opacity duration-300"
      :class="{ 'opacity-100': isGeoAPIError }">
     City not found
    </p>

    <WeatherResult
      v-if="weather.temperature"
      :weather="weather"/>

   </div>
  </div>

 </main>
</template>

<style scoped>
.loader {
 border: 3px solid rgba(255, 255, 255, 0.3);
 border-top: 3px solid white;
 border-radius: 50%;
 width: 24px;
 height: 24px;
 animation: spin 1s linear infinite;
}

@keyframes spin {
 0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
}
</style>