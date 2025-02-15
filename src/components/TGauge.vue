<template>
  <div class="gauge">
    <svg width="100%" height="100%" viewBox="-100 -100 200 200" xmlns="http://www.w3.org/2000/svg">

      <g class="gauge-fixed">
        <!-- Hub -->
        <circle cx="0" cy="0" :r="props.cfg.hub.radius" :fill="props.cfg.colorPointer"/>


        <!-- Background Arc-->
        <path
            :d="`M ${backArc.x1} ${backArc.y1} A ${props.cfg.colorScale.radius} ${props.cfg.colorScale.radius} 0 ${backArc.sweep} 1 ${backArc.x2} ${backArc.y2}`"
            :stroke-width="props.cfg.colorScale.thickness"
            :stroke="props.cfg.colorScale.colorBack"
            fill="none"
        />


        <!-- Color Scale Arc -->
        <path
            :d="`M ${colorArc.x1} ${colorArc.y1} A ${props.cfg.colorScale.radius} ${props.cfg.colorScale.radius} 0 ${colorArc.sweep} 1 ${colorArc.x2} ${colorArc.y2}`"
            :stroke="colorArc.color"
            :stroke-width="props.cfg.colorScale.thickness"
            fill="none"
        />

        <!--        Trend Arc-->
        <path
            :d="`M ${trendArc.x1} ${trendArc.y1} A ${props.cfg.trendArc.radius} ${props.cfg.trendArc.radius} 0 ${trendArc.large} ${trendArc.sweep} ${trendArc.x2} ${trendArc.y2}`"
            :stroke="trendArc.color"
            :stroke-width="props.cfg.trendArc.thickness"
            fill="none"
        />


        <!-- Major ticks -->
        <line
            v-for="(line, index) in majorTickLines"
            :key="index" :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2"
            :stroke="props.cfg.ticks.major.color"
            :stroke-width="props.cfg.ticks.major.thickness"
        />
        <!-- Minor ticks -->
        <line
            v-for="(line, index) in minorTickLines"
            :key="index" :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2"
            :stroke="props.cfg.ticks.minor.color"
            :stroke-width="props.cfg.ticks.minor.thickness"
        />

        <!--        tick labels-->
        <text
            v-for="(label, index) in tickLabelTexts"
            :key="index" :x="label.x" :y="label.y"
            text-anchor="middle"
            dominant-baseline="middle"

            :font-size="props.cfg.ticks.label.fontSize"
            :fill="props.cfg.ticks.label.color"
        >
          {{ label.text }}
        </text>

        <!--        value label-->
        <text
            x="0"
            :y="props.cfg.label.value.radius"
            text-anchor="middle"
            dominant-baseline="middle"
            :color="props.cfg.label.value.color"
            :font-size="props.cfg.label.value.fontSize"
        >
          {{ props.values.a.toFixed(1) }}
        </text>

        <!--        control value label-->
        <text
            x="0"
            :y="-props.cfg.label.controlValue.radius"
            text-anchor="middle"
            dominant-baseline="middle"
            :color="props.cfg.label.controlValue.color"
            :font-size="props.cfg.label.controlValue.fontSize"
        >
          {{ props.values.d }} {{ props.cfg.label.controlValue.unit }}
        </text>


      <!--        unit label-->
      <text
          x="0"
          :y="props.cfg.label.unit.radius"
          text-anchor="middle"
          dominant-baseline="middle"
          :color="props.cfg.label.unit.color"
          :font-size="props.cfg.label.unit.fontSize"
      >
        {{ props.cfg.label.unit.text }}
      </text>
      </g>




      <!-- Pointer -->
      <g class="gauge-pointer" :transform="`rotate(${angleObject.a} 0 0)`">
        <line
            x1="0"
            y1="0"
            x2="0"
            :y2="-props.cfg.pointer.length"
            :stroke="props.cfg.pointer.color"
            :stroke-width="props.cfg.pointer.thickness"
            stroke-linecap="round"
        />
      </g>

      <!--      Set Point Mark-->
      <g class="gauge-setpoint" :transform="`rotate(${angleObject.b} 0 0)`">
        <polygon :points="trianglePoints" :fill="`${props.cfg.setPointMark.color}`"/>
      </g>

      <!--      &lt;!&ndash; Dynamic Values Display &ndash;&gt;-->
      <!--      <g class="gauge-values">-->
      <!--        <text x="0" y="-40" text-anchor="middle" style="font-size: 16px;">-->
      <!--          Value 1: {{ props.values.a }}-->
      <!--        </text>-->
      <!--        <text x="0" y="0" text-anchor="middle" style="font-size: 16px;">-->
      <!--          Value 2: {{ props.values.b }}-->
      <!--        </text>-->
      <!--        <text x="0" y="40" text-anchor="middle" style="font-size: 16px;">-->
      <!--          Value 3: {{ props.values.c }}-->
      <!--        </text>-->
      <!--      </g>-->

    </svg>
  </div>
</template>

<script setup lang="ts">
import defaultConfig from "../default.js";
import {computed, defineProps} from "vue";



// ✅ Define props correctly
const props = defineProps({
  values: {
    type: Object,
    required: true,
  },
  cfg: {
    type: Object,
    required: false,
    default: () => defaultConfig.gauge,
  }
});

// ✅ Compute the angle based on input values
const computeAngle = (value: number) => {
  const {startValue, endValue, startAngle, endAngle} = props.cfg.scale;

  // Normalize the value in the range [startValue, endValue]
  const ratio = (value - startValue) / (endValue - startValue);

  // Map the ratio to the angle range
  return startAngle + ratio * (endAngle - startAngle);
};

// ✅ Ensure computed object accesses values correctly
const angleObject = computed(() => ({
  a: computeAngle(props.values.a),
  b: computeAngle(props.values.b),
  c: computeAngle(props.values.c),
}));

const colorArc = computed(() => {
  const startAngle = props.cfg.scale.startAngle;
  const endAngle = angleObject.value.a;

  const startRad = deg2rad(startAngle);
  const endRad = deg2rad(endAngle);
  const r = props.cfg.colorScale.radius;

  return {
    x1: r * Math.cos(startRad),
    y1: r * Math.sin(startRad),
    x2: r * Math.cos(endRad),
    y2: r * Math.sin(endRad),
    sweep: endAngle - startAngle > 180 ? 1 : 0,
    color: temp2color(props.values.a),
  };
});

const backArc = computed(() => {
  const startAngle = props.cfg.scale.startAngle;
  const endAngle = props.cfg.scale.endAngle;

  const startRad = deg2rad(startAngle);
  const endRad = deg2rad(endAngle);
  const r = props.cfg.colorScale.radius;

  return {
    x1: r * Math.cos(startRad),
    y1: r * Math.sin(startRad),
    x2: r * Math.cos(endRad),
    y2: r * Math.sin(endRad),
    sweep: endAngle - startAngle > 180 ? 1 : 0,
  };
});



const trendArc = computed(() => {
  const startAngle = angleObject.value.a;
  const endAngle = angleObject.value.c;

  const startRad = deg2rad(startAngle);
  const endRad = deg2rad(endAngle);
  const r = props.cfg.trendArc.radius;



  return {
    x1: r * Math.cos(startRad),
    y1: r * Math.sin(startRad),
    x2: r * Math.cos(endRad),
    y2: r * Math.sin(endRad),
    sweep: endAngle > startAngle ? 1 : 0,
    large: 0,
    color: endAngle > startAngle ? props.cfg.trendArc.colorUp : props.cfg.trendArc.colorDown,
    // color: temp2color(props.values.c),

  };


})


function multiplesInRange(start: number, end: number, resolution: number): number[] {
  if (resolution <= 0 || start > end) {
    return []; // Return empty array for invalid inputs
  }

  // Find the first multiple of resolution >= start
  let firstMultiple = Math.ceil(start / resolution) * resolution;

  // Generate the array of multiples up to `end`
  let result: number[] = [];
  for (let multiple = firstMultiple; multiple <= end; multiple += resolution) {
    result.push(multiple);
  }

  return result;
}

function deg2rad(deg: number): number {
  return ((deg - 90) * Math.PI) / 180;
}

const majorTicks = computed(() =>
    multiplesInRange(props.cfg.scale.startValue, props.cfg.scale.endValue, props.cfg.ticks.major.resolution)
        .map(value => ({
          value,
          angle: deg2rad(computeAngle(value)) // Removed extra semicolon
        }))
);

const minorTicks = computed(() =>
    multiplesInRange(props.cfg.scale.startValue, props.cfg.scale.endValue, props.cfg.ticks.minor.resolution)
        .map(value => ({
          value,
          angle: deg2rad(computeAngle(value)),
        }))
);
const tickLabels = computed(() => {
  return multiplesInRange(props.cfg.scale.startValue, props.cfg.scale.endValue, props.cfg.ticks.label.resolution)
      .map(value => ({
        value,
        angle: deg2rad(computeAngle(value)),
      }))
});

const majorTickLines = computed(() => {
  const c = props.cfg.ticks.major;
  return majorTicks.value.map(({angle}) => ({
    x1: Math.cos(angle) * c.radius,
    y1: Math.sin(angle) * c.radius,
    x2: Math.cos(angle) * (c.radius + c.length),
    y2: Math.sin(angle) * (c.radius + c.length),
  }));
});

const minorTickLines = computed(() => {
  const c = props.cfg.ticks.minor;
  return minorTicks.value.map(({angle}) => ({
    x1: Math.cos(angle) * c.radius,
    y1: Math.sin(angle) * c.radius,
    x2: Math.cos(angle) * (c.radius + c.length),
    y2: Math.sin(angle) * (c.radius + c.length),
  }));
});

const tickLabelTexts = computed(() => {
  const c = props.cfg.ticks.label;
  if (!tickLabels.value) return []; // Ensure tickLabels is defined

  return tickLabels.value.map(({angle, value}) => {
    return {
      text: String(value), // Convert value to a string explicitly
      x: Math.cos(angle) * c.radius,
      y: Math.sin(angle) * c.radius,
    };
  });
});


const side = 10;
const height = computed(() => (Math.sqrt(3) / 2) * side);
const trianglePoints = computed(() => {
  const x1 = 0, y1 = -props.cfg.setPointMark.radius; // Top corner at (0,0)
  const x2 = side / 2, y2 = -props.cfg.setPointMark.radius - height.value; // Bottom right
  const x3 = -side / 2, y3 = -props.cfg.setPointMark.radius - height.value; // Bottom left
  return `${x1},${y1} ${x2},${y2} ${x3},${y3}`;
});



const temp2color = (v, a = 1) => {
  const v0 = 10, v1 = 30;
  const rl = Math.min(1, Math.max(0, (v - v0) / (v1 - v0))); // Normalize & clamp value
  return `hsla(${200 * (1 - rl)}, 80%, 50%, ${a})`;
};


</script>

<style scoped>
.gauge {
  background-color: #ffffff; /* Set the container background */
  color: #000000; /* Set text color */
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

circle {
  stroke: #555; /* Outline stroke color */
}

text {
  fill: #333; /* Color of the text */
}
</style>
