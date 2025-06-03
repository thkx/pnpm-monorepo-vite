<template>
    <a-layout-header class="ant-pro-layout-header" />
    <a-layout-header class="ant-pro-layout-header ant-pro-layout-header-fixed-header">
        <div class="ant-pro-global-header">
            <Logo :logo="logo" :title="title" />
            <div style="flex: 1 1 0%;"></div>
            <Actions />
        </div>
    </a-layout-header>
</template>

<script lang="ts" setup>
import Logo from './logo.vue';
import Actions from './actions.vue';

defineProps<{ logo: string, title: string }>()
</script>

<style scoped>
.ant-pro-layout-header-fixed-header {
    position: fixed;
    inset-block-start: 0;
    width: 100%;
    z-index: 109;
    inset-inline-end: 0;
    padding-inline: 0;
}

.ant-pro-global-header {
    position: relative;
    background: transparent;
    display: flex;
    align-items: center;
    margin-block: 0;
    margin-inline: 16px;
    height: 56px;
    box-sizing: border-box;
}

.ant-pro-global-header-header-actions {
    display: flex;
    height: 100%;
}

.ant-pro-global-header-header-actions-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-block: 0;
    padding-inline: 2px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    cursor: pointer;
    border-radius: 6px;
}

.ant-pro-global-header-header-actions-item>* {
    padding-inline: 6px;
    padding-block: 6px;
    border-radius: 6px;
}

.ant-pro-global-header-header-actions-item>*:hover {
    background-color: rgba(0, 0, 0, 0.03);
}

.ant-pro-global-header-header-actions-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-inline-start: 16px;
    padding-inline-end: 16px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.45);
}

.ant-pro-global-header-header-actions-avatar>div {
    height: 44px;
    color: rgba(0, 0, 0, 0.45);
    padding-inline: 8px;
    padding-block: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    line-height: 44px;
    border-radius: 6px;
}

.ant-pro-global-header-header-actions-avatar>div:hover {
    background-color: rgba(0, 0, 0, 0.03);
}
</style>
