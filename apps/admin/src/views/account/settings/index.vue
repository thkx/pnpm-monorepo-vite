<template>
    <div class="settings" ref="settingsRef">
        <div class="leftMenu">
            <a-menu v-model:selectedKeys="state.selectedKeys" :mode="state.mode" :items="getMenu()"
                @click="handleClick" />
        </div>
        <div class="right">
            <div class="title">{{ menuMap[state.selectedKeys[0]] }}</div>
            <Base v-if="state.selectedKeys[0] === 'base'" />
            <Security v-if="state.selectedKeys[0] === 'security'" />
            <Binding v-if="state.selectedKeys[0] === 'binding'" />
            <Notification v-if="state.selectedKeys[0] === 'notification'" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'

import Base from './components/base/index.vue'
import Security from './components/security/index.vue'
import Binding from './components/binding/index.vue'
import Notification from './components/notification/index.vue'

const settingsRef = ref()

const menuMap: Record<string, string> = {
    base: '基本设置',
    security: '安全设置',
    binding: '账号绑定',
    notification: '新消息通知',
};

const getMenu = () => {
    return Object.keys(menuMap).map((item) => ({ key: item, label: menuMap[item] }));
};

const state = reactive({
    mode: 'inline',
    selectedKeys: ['base'],
})

function handleClick({ key }: any) {
    state.selectedKeys = [key]
}

</script>
<style scoped>
.settings {
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 16px;
    padding-bottom: 16px;
    background-color: #ffffff;
}

.settings .leftMenu {
    width: 224px;
    border-right: 1px solid rgba(5, 5, 5, 0.06);
}

.settings .right {
    flex: 1;
    padding: 8px 40px;
}

.settings .right .title {
    margin-bottom: 12px;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
}
</style>