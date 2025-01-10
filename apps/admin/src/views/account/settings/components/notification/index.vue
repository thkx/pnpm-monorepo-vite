<template>
    <a-list item-layout="horizontal" :data-source="data" class="notification">

        <template #renderItem="{ item }">
            <a-list-item>
                <template #actions>
                    <a-switch checked-children="开" un-checked-children="关" v-model:checked="item.checked" />
                </template>

                <a-list-item-meta :title="item.title" :description="item.description">
                </a-list-item-meta>
            </a-list-item>
        </template>

    </a-list>
</template>


<script lang="ts" setup>

import { ref } from 'vue'

const data = ref([
    {
        title: '账户密码',
        description: '其他用户的消息将以站内信的形式通知',
        checked: true,
    },
    {
        title: '系统消息',
        description: '系统消息将以站内信的形式通知',
        checked: true,
    },
    {
        title: '待办任务',
        description: '待办任务将以站内信的形式通知',
        checked: true,
    },
]);
</script>

<style>
.notification .ant-list-item {
    padding-inline: 0;
}
</style>
