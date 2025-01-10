<template>
    <a-list item-layout="horizontal" :data-source="data" class="notification">

        <template #renderItem="{ item }">
            <a-list-item>
                <template #actions>
                    <a v-for="m in item.actions" :key="m.key">{{ m.value }}</a>
                </template>

                <a-list-item-meta :title="item.title" :description="item.description"></a-list-item-meta>
            </a-list-item>
        </template>

    </a-list>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

// const passwordStrength = {
//     strong: <span className="strong"> 强 </span>,
//     medium: <span className="medium"> 中 </span>,
//     weak: <span className="weak"> 弱 Weak</ span >,
// };

const passwordStrength = {
    strong: '强',
    medium: '中',
    weak: '弱 Weak',
};

const data = ref([
    {
        title: '账户密码',
        // description: (
        //     <>
        //     当前密码强度：
        //     { passwordStrength.strong }
        //     </>
        // ),
        description: `当前密码强度：${passwordStrength.strong}`,
        actions: [{ key: "Modify", value: "修改" }],
    },
    {
        title: '密保手机',
        description: `已绑定手机：138****8293`,
        actions: [{ key: "Modify", value: "修改" }],
    },
    {
        title: '密保问题',
        description: '未设置密保问题，密保问题可有效保护账户安全',
        actions: [{ key: "Set", value: "设置" }],
    },
    {
        title: '备用邮箱',
        description: `已绑定邮箱：ant***sign.com`,
        actions: [{ key: "Modify", value: "修改" }],
    },
    {
        title: 'MFA 设备',
        description: '未绑定 MFA 设备，绑定后，可以进行二次确认',
        actions: [{ key: "bind", value: "绑定" }],
    },
]);
</script>

<style>
.notification .ant-list-item {
    padding-inline: 0;
}
</style>
