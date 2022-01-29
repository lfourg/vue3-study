<template>
  <h1>这是首页</h1>
  <button @click="toggle">全屏</button>
  <Rate v-model="score" @update-rate="update" />
  <Count />
  <div>鼠标位置：x:{{ x }} y:{{ y }}</div>
  <Todolist />
</template>

<script setup>
import { ref } from "vue";
import Todolist from "../components/Todolist.vue";
import Todolist2 from '../components/Todo';
import Rate from "../components/Rate.vue";
import Count from '../components/Count.vue';
import { useMouse } from "../utils/mouse";
import { useFullscreen } from "@vueuse/core";
let { x, y } = useMouse();

const { isFullscreen, enter, exit, toggle } = useFullscreen();

let score = ref(0);
function update(num) {
  score.value = num;
}

</script>
<style scoped>
</style>
