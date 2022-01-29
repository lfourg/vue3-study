<template>
  <div :style="fontstyle">
    <div class="rate" @mouseout="mouseout">
      <span @mouseover="mouseover(num)" v-for="num in 5" :key="num">☆</span>
      <span class="hollow" :style="fontwidth">
        <span
          @mouseover="mouseover(num)"
          @click="onRate(num)"
          v-for="num in 5"
          :key="num"
          >★</span
        >
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, defineEmits } from "vue";
let props = defineProps({
  modelValue:Number,
  theme: { type: String, default: "orange" },
});

let width = ref(props.modelValue);

function mouseover(i) {
  width.value = i;
}
function mouseout() {
  width.value = props.modelValue;
}
let emits = defineEmits(["update:modelValue"]); // 定义emits
function onRate(i) {
  //emits("update-rate", i);
  emits('update:modelValue',i)
}

const fontstyle = computed(() => {
  return `color:${props.theme};`;
});
const fontwidth = computed(() => {
  return `width:${width.value}em;`;
});
</script>

<style scoped>
.rate {
  position: relative;
  display: inline-block;
  text-align: left;
}
.rate > span.hollow {
  position: absolute;
  display: inline-block;
  left: 0;
  top: 0;
  width: 0;
  overflow: hidden;
}
</style>
