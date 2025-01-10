<template>
    <a-list item-layout="horizontal" :data-source="data" class="notification">

        <template #renderItem="{ item }">
            <a-list-item>
                <template #actions>
                    <a key="Bind">绑定</a>
                </template>

                <a-list-item-meta :title="item.title" :description="item.description">
                    <template #avatar>
                        <component :is="item.avatar" :class="item.class" />
                    </template>
                </a-list-item-meta>
            </a-list-item>
        </template>

    </a-list>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
import { AlipayOutlined, DingdingOutlined, TaobaoOutlined } from '@ant-design/icons-vue'

const data = ref([
    {
        title: '绑定淘宝',
        description: '当前未绑定淘宝账号',
        avatar: TaobaoOutlined,
        class: 'taobao',
    },
    {
        title: '绑定支付宝',
        description: '当前未绑定支付宝账号',
        avatar: AlipayOutlined,
        class: 'alipay',
    },
    {
        title: '绑定钉钉',
        description: '当前未绑定钉钉账号',
        avatar: DingdingOutlined,
        class: 'dingding',
    },
]);
</script>

<style>
.notification .ant-list-item {
    padding-inline: 0;
}
</style>
