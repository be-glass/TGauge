<script setup lang="ts">
import { reactive } from "vue";
import Gauge from "@/components/Gauge.vue";
import Slider from "@/components/Slider.vue"; // Import the Slider component

// Create a single reactive object to store all values
const gaugeValues = reactive({
  a: 30,
  b: 50,
  c: 70,
});
</script>

<template>
  <main>
    <div class="dashboard">
      <!-- Pass the reactive object to the Gauge component -->
      <Gauge :values="gaugeValues" />
    </div>
    <div class="sliders">
      <!-- Bind the sliders directly to the object properties -->
      <Slider v-model="gaugeValues.a" />
      <Slider v-model="gaugeValues.b" />
      <Slider v-model="gaugeValues.c" />
    </div>
  </main>
</template>

<style scoped>
.dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60%;
}

.sliders {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}
</style>
