<template>

    <a-page-header class="ant-pro-page-header" :title="title" :breadcrumb="{ routes }" v-bind="$attrs">
        <template #extra>
            <slot name="extra"></slot>
        </template>
        <slot></slot>
        <template #footer>
            <slot name="footer"></slot>
        </template>
    </a-page-header>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute()
const routes = route.matched.filter(r => r.path != '/').map(r => ({ path: r.path, breadcrumbName: r.meta.title }))
// const title = route.matched.pop()?.meta.title
const title = route.matched[route.matched.length - 1]?.meta.title

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