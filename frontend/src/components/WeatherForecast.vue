<template>
  <div class="hello mb-8">
    <h3 class="font-bold text-lg w-full">Weather forecast for city</h3>
    <div
      v-if="error !== null"
      class="max-w-sm mx-auto bg-red-100 text-red-900 rounded-xl p-6 shadow-lg mt-4"
    >
      <div class="text-center mb-4">
        <div class="text-2xl font-bold">Error</div>
        <div class="text-sm text-red-700">{{ error.errorMessage }}</div>
      </div>
    </div>
    <div
      v-else-if="weather !== null"
      class="max-w-sm mx-auto bg-gray-100 text-gray-900 rounded-xl p-6 shadow-lg mt-4"
    >
      <div class="flex justify-between items-center mb-4">
        <span class="text-base font-semibold">{{ weather?.latlng }}</span>
        <span class="text-sm">{{ weather?.time || "00: 00" }}</span>
      </div>
      <div class="text-center mb-4">
        <div class="text-5xl font-bold">{{ weather?.temperature }}</div>
        <div class="text-sm text-gray-700">{{ weather?.windCondition }}</div>
      </div>
      <div class="flex justify-between items-center">
        <div
          class="flex items-center space-x-2"
          v-if="weather?.windspeed && weather?.windDirection"
        >
          <img src="@/assets/air.png" alt="Wind" class="w-7" />
          <span>{{ `${weather?.windspeed}, ${weather?.windDirection}` }}</span>
        </div>
        <div class="flex justify-end">
          <img
            src="@/assets/calm-wind.png"
            alt="Wind"
            class="w-7"
            v-if="weather?.imageName === 'calm-wind'"
          />
          <img
            src="@/assets/moderate-wind.png"
            alt="Wind"
            class="w-7"
            v-if="weather?.imageName === 'moderate-wind'"
          />
          <img
            src="@/assets/storm.png"
            alt="Wind"
            class="w-7"
            v-if="weather?.imageName === 'storm'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./weather-forecast.component.ts"></script>

<style></style>
