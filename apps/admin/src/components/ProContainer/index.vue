<template>

    <a-page-header class="ant-pro-page-header" :title="title" :breadcrumb="{ routes }" v-bind="$attrs">
        <template #extra>
            <slot name="header_extra"></slot>
        </template>
        <slot name="header"></slot>
        <template #footer>
            <slot name="header_footer"></slot>
        </template>
    </a-page-header>

    <slot></slot>

    <ProFooterBar v-if="slots.bar_left || slots.bar_right">
        <template #left>
            <slot name="bar_left"></slot>
        </template>
        <template #right>
            <slot name="bar_right"></slot>
        </template>
    </ProFooterBar>

</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import ProFooterBar from "../ProFooterBar";

const slots = defineSlots()

const route = useRoute()
const routes = route.matched.filter(r => r.path != '/').map(r => ({ path: r.path, breadcrumbName: r.meta.title }))
const title = route.matched.pop()?.meta.title

</script>

<style scoped>
.ant-pro-page-header {
    padding-block-start: 8px;
    padding-block-end: 16px;
    padding-inline-start: 40px;
    padding-inline-end: 40px;

    margin-inline: -40px;
    margin-block-start: -20px;
}

</style>
