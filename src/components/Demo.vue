<script setup lang="ts">
import { reactive } from "vue";
import TGauge from "@/components/TGauge.vue";
import Slider from "@/components/Slider.vue"; // Import the Slider component

// Create a single reactive object to store all values
const gaugeValues = reactive({
  a: -1,
  b: -2,
  c: -3,
  d: -4,
  // a: 5,
  // b: 15,
  // c: 25,
  // d: 35,
  room: 123,
  name: "Guest",
  channel: "ABC",
});
</script>

<template>
  <main>
    <div class="dashboard">
      <!-- Pass the reactive object to the TGauge component -->
      <TGauge :values="gaugeValues" />
    </div>
    <div class="sliders">
      <!-- Bind the sliders directly to the object properties -->
      <Slider v-model="gaugeValues.a" />
      <Slider v-model="gaugeValues.b" />
      <Slider v-model="gaugeValues.c" />
      <Slider v-model="gaugeValues.d" />
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
