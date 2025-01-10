<template>

    <template v-if="isChildren">
        <a-sub-menu :key="route.path" popupClassName="ant-pro-sub-menu" :popupOffset="[0, 16]">
            <template #title>
                <span>
                    <component v-if="meta && meta.icon" :is="(Icons as any)[meta?.icon]" />
                    <span>{{ meta?.title }}</span>
                </span>
            </template>

            <Menu v-for="item in children" :key="item.path" :route="item" />
        </a-sub-menu>
    </template>

    <a-menu-item v-else :key="route.path">
        <AntDMenuLike :to="route.path">
            <component v-if="meta && meta?.icon" :is="(Icons as any)[meta?.icon]" />
            <span>{{ meta?.title }}</span>
        </AntDMenuLike>
    </a-menu-item>

</template>

<script lang="ts" name="Menu" setup>
import { computed } from 'vue'
import { type RouteRecordRaw } from 'vue-router';
import * as Icons from '@ant-design/icons-vue';

import AntDMenuLike from './menu-link.vue';

const props = defineProps<{ route: RouteRecordRaw }>()

const route = computed(() => props.route)

const children = computed(() => route.value.children)
const isChildren = computed(() => children.value && children.value.length > 0)

const meta = computed(() => route.value.meta)

</script>

<style scoped></style>
