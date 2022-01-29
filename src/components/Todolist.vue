<template>
  <div>
    <transition name="fade">
      <div v-if="isnull" style="color: red">大兄弟，你啥也没输入</div>
    </transition>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear()">清理</button>
    <ul v-if="todos.length">
      <transition-group name="flip-list" tag="ul">
        <li v-for="(todo, index) in todos" :key="index">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ done: todo.done }">{{ todo.title }}</span>
        </li>
      </transition-group>
    </ul>
    <div v-else>暂无数据</div>
    <div>
      全选<input type="checkbox" v-model="allDone" />
      <span>{{ active }}/{{ all }}</span>
    </div>
  </div>
</template>

<script setup>
import { useTodos } from "./Todolist.js";

let { title, todos, addTodo, clear, active, all, allDone, isnull } = useTodos();
</script>

<style scoped lang="scss">
$padding:18px;
$white:#fff;
li {
  list-style: none;
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 0.5s;
}
.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s linear;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
