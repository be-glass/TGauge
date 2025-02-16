<script setup>
import Demo from "@/components/Demo.vue";
</script>

<template>


  <main>
    <Demo/>
  </main>
</template>

<style scoped>
main {
  background-color: #ffffff; /* Set the container background */
  color: #000000; /* Set text color */
  width: 100vw;
  height: 100vh;

  display: flex; /* Optional: If you need content inside demo-container centered */
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  overflow: hidden; /* Completely hides scrollbars and disables scrolling */

}
</style>
