<template>
    <a-menu class="ant-pro-sider-fixed-mix" v-model:selectedKeys="state.selectedKeys" :inlineIndent="16" mode="inline"
        theme="light" :open-keys="state.openKeys" @openChange="onOpenChange">
        <ant-d-menu v-for="route in state.routes" :key="route.path" :route="route" />
    </a-menu>

</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'

import AntDMenu from './menu.vue';

import { usePermission } from '@/store/permission';

const permission = usePermission()

const route = useRoute()

// const selectedKeys = computed(() => [route.path])
const openKeys = computed(() => route.matched.map(r => r.path).filter((_, i) => {
    return i !== route.matched.length-1
}))

// console.log(openKeys.value)

const state = reactive({
    rootSubmenuKeys: permission.rootSubmenuKeys,
    openKeys: openKeys.value,
    routes: permission.routes,

    selectedKeys: [route.path],
});

const onOpenChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);
    if (state.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
        state.openKeys = openKeys;
    } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
    }
};

</script>

<style scoped></style>
