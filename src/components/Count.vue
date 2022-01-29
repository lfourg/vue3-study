<template>
    <div>
        {{count}}--{{double}}
        <button @click="add">add</button>
        <button @click="doubleAdd">double add</button>
    </div>
</template>

<script setup>
import {computed} from 'vue';
import {useStore} from 'vuex';

let store = useStore()
let count = computed(()=>store.state.count)
let double = computed(()=>store.getters.double)

function add(){
    store.commit('add')
}
function doubleAdd(){
    store.dispatch('asyncAdd')
}
</script>