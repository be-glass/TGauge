<script setup>
import { ref, defineProps, defineEmits } from "vue";

// Accept modelValue from the parent
const props = defineProps({
  modelValue: Number, // Ensure type consistency
});

// Emit event for v-model
const emit = defineEmits(["update:modelValue"]);

// Emit the updated value when the slider moves
const updateValue = (event) => {
  const numericValue = Math.min(Math.max(Number(event.target.value), 0), 100); // Clamp
  emit("update:modelValue", numericValue); // Emit clamped value
};
</script>

<template>
  <input
      type="range"
      min="0"
      max="40"
      :value="modelValue"
      @input="updateValue"
  />
</template>
