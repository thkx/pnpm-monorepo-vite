<template>

    <div class="ant-pro-footer-bar"
        :style="`width: calc(100% - ${collapsed ? collapsedWidth : width}px);`">

        <div class="ant-pro-footer-bar-left">
            <slot name="left"></slot>
        </div>
        <div class="ant-pro-footer-bar-right">
            <slot name="right"></slot>
        </div>

    </div>

</template>

<script lang="ts" setup>
import { computed, nextTick, onUnmounted } from 'vue'

import { usePermission } from '@/store/permission';

const permission = usePermission()

const collapsed = computed(() => permission.collapsed.value);
const collapsedWidth = computed(() => permission.collapsedWidth.value);
const width = computed(() => permission.width.value);

function setProperty(data: {key: string, value: string}[]) {
    data.forEach(row => {
        document.getElementById('footerBar')?.style.setProperty(row.key, row.value)
    })
}

onUnmounted(() => {
    setProperty([{key: 'height', value: ''}, {key: 'margin-block-start', value: ''}])
})

nextTick(() => {
    setProperty([{key: 'height', value: '64px'}, {key: 'margin-block-start', value: '32px'}])
})

</script>

<style scoped>
.ant-pro-footer-bar {
    position: fixed;
    inset-inline-end: 0;
    bottom: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    width: 100%;
    padding-inline: 24px;
    padding-block: 0;
    box-sizing: border-box;
    height: 64px;
    line-height: 64px;
    background-color: rgba(255, 255, 255, 0.6);
    border-block-start: 1px solid rgba(5, 5, 5, 0.06);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    color: rgba(0, 0, 0, 0.88);
    transition: all 0.2s ease 0s;
}

.ant-pro-footer-bar-left {
    flex: 1;
    color: rgba(0, 0, 0, 0.88);
}

.ant-pro-footer-bar-right {
    color: rgba(0, 0, 0, 0.88);
    display: flex;
    gap: 8px;
}
</style>