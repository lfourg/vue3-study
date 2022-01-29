<template>
    <component :is="comp"></component>
</template>

<script setup>

import {computed} from 'vue';
import {useRouter} from './index';

let router = useRouter()

const comp = computed(()=>{
    const route = router.routes.find((route)=>{
        return route.path === router.current.value
    })
    return router?.component || null;
})

</script>