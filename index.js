import TGauge from "./src/components/TGauge.vue";

export default TGauge; // ✅ Export the Vue component properly

export { TGauge }; // ✅ Also allow named export


import defaultConfig from "./src/default.js";
export { defaultConfig };