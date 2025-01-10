<template>
    <div class="ant-pro-card">
        <div class="ant-pro-card-body" style="padding-block-start: 0px;">
            <div class="ant-pro-table-list-toolbar">
                <Toolbar v-bind="$attrs" v-model:size="size" v-model:columns="columns" @reload="reload">
                    <template #toolbar>
                        <slot name="toolbar"></slot>
                    </template>
                </Toolbar>
            </div>

            <a-alert v-if="selectedRows && selectedRows.length > 0" class="ant-pro-table-alert" type="info" @close="handleAlertClose">
                <template #message>
                    <span style="font-size: 14px;color: rgba(0, 0, 0, 0.45);">已选择 {{ selectedRows.length }} 项</span>
                </template>
                <template #closeText>
                    <a style="font-size: 14px;">取消选择</a>
                </template>
            </a-alert>

            <a-table v-bind="$attrs" :size="size[0]" :columns="columns">

                <template #customFilterDropdown="customFilterDropdown">
                    <slot name="customFilterDropdown" v-bind="{ customFilterDropdown }"></slot>
                </template>

                <template #customFilterIcon="{ filtered, column }">
                    <slot name="customFilterIcon" v-bind="{ filtered, column }"></slot>
                </template>

                <template #emptyText>
                    <slot name="emptyText"></slot>
                </template>

                <template #expandColumnTitle>
                    <slot name="expandColumnTitle"></slot>
                </template>

                <template #headerCell="{ title, column }">
                    <slot name="headerCell" v-bind="{ title, column }"></slot>
                </template>

                <template #bodyCell="{ text, record, index, column }">
                    <slot name="bodyCell" v-bind="{ text, record, index, column }"></slot>
                </template>

                <template #summary>
                    <slot name="summary"></slot>
                </template>
                <!-- <template #title>
                    
                </template> -->
            </a-table>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import Toolbar from './toolbar.vue';

const selectedRows = defineModel('selectedRows', { type: Array })
const columns = defineModel('columns', { type: Array<any> })

defineProps<{reload: () => void}>()

const size = ref<string[]>(['middle'])

function handleAlertClose() {
    // console.log(item)
    // props.selectedRows
    // emit('update:selectedRows', [])
    selectedRows.value = []
}
</script>
<style scoped>
.ant-pro-card {
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    margin-block: 0;
    margin-inline: 0;
    padding-block: 0;
    padding-inline: 0;
    background-color: #ffffff;
    border-radius: 6px;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
}

.ant-pro-card .ant-pro-card-body {
    display: block;
    box-sizing: border-box;
    height: 100%;
    padding-inline: 24px;
    padding-block: 16px;
}

.ant-pro-table-list-toolbar {
    line-height: 1;
}

.ant-pro-table-alert {
    margin-block-end: 16px;
    background-color: rgba(0, 0, 0, 0.02);
    border-radius: 6px;
    border: none;
    padding-block: 12px;
    padding-inline: 24px;
}
</style>