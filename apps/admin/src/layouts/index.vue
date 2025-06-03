<template>
    <ant-d-bg />
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" :collapsedWidth="collapsedWidth"
            :width="width" class="ant-pro-sider-fixed">
            <ant-d-menu />
            <ant-d-collapsed :collapsed="collapsed" @click="() => permission.setCollapsed(!collapsed)" />
        </a-layout-sider>
        <a-layout class="ant-pro-layout-container"
            :style="{ marginLeft: collapsed ? '64px' : '256px', transition: 'all 0.2s, background 0s', position: 'relative' }">

            <ant-d-header :logo="logo" :title="title" />
            <a-layout-content class="ant-pro-layout-content">
                <!-- <router-view v-slot="{ Component }">
                    <transition name="el-fade-in" mode="out-in">
                        <keep-alive :include="cachedViews">
                            <component :is="Component" :key="key" />
                        </keep-alive>
                    </transition>
                </router-view> -->
                <router-view v-slot="{ Component }" :key="key">
                    <keep-alive :include="cachedViews">
                        <Suspense :fallback="null">
                            <component :is="Component" :key="key" />
                        </Suspense>
                    </keep-alive>
                </router-view>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>

            <div id="footerBar"></div>
        </a-layout>
    </a-layout>

</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import AntDBg from './components/bg.vue';
import AntDMenu from './components/menu/index.vue';
import AntDCollapsed from './components/collapsed.vue';
import AntDHeader from './components/header.vue';

import { usePermission } from '@/store/permission';

const permission = usePermission()

const collapsed = computed(() => permission.collapsed.value);
const collapsedWidth = computed(() => permission.collapsedWidth.value);
const width = computed(() => permission.width.value);

const logo = computed(() => permission.logo.value);
const title = computed(() => permission.title.value);

const route = useRoute()
const key = computed(() => {
    // 返回 route.path 和 route.fullPath 有着不同的效果，大多数时候 path 更通用
    return route.path
})

const cachedViews = ref([])

</script>

<style scoped>
.ant-pro-layout-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: transparent;
    position: relative;
    padding-block: 32px;
    padding-inline: 40px;
}

.ant-pro-layout-content-has-page-container {
    padding: 0;
}

:deep(.ant-layout-sider-has-trigger) {
    padding-bottom: 0;
}

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
</style>