<template>
    <div style="min-width: 220px; height: 100%;">
        <div style="height: 100%;">
            <div style="display: flex; align-items: center; height: 100%; justify-content: flex-end;">
                <div class="ant-pro-global-header-header-actions">
                    <div class="ant-pro-global-header-header-actions-item">
                        <div style="display: flex;height: 26px;">
                            <QuestionCircleOutlined />
                        </div>

                    </div>
                    <div class="ant-pro-global-header-header-actions-item">

                        <a-dropdown placement='bottomRight' :getPopupContainer="getPopupContainer">
                            <span
                                style="cursor: pointer; padding: 12px; display: inline-flex; align-items: center; justify-content: center; font-size: 18px; vertical-align: middle;">
                                <i class="anticon">
                                    <svg viewBox="0 0 24 24" focusable="false" width="1em" height="1em"
                                        fill="currentColor" aria-hidden="true">
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path
                                            d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z ">
                                        </path>
                                    </svg>
                                </i>
                            </span>
                            <template #overlay>
                                <a-menu @click="handleMenuClick" v-model:selectedKeys="selectedKeys">
                                    <a-menu-item key="🇧🇩">
                                        <a href="javascript:;"><span aria-label="বাংলা">🇧🇩</span>বাংলা</a>
                                    </a-menu-item>
                                    <a-menu-item key="🇺🇸">
                                        <a href="javascript:;"><span aria-label="English">🇺🇸</span>English</a>
                                    </a-menu-item>
                                    <a-menu-item key="🇮🇷">
                                        <a href="javascript:;"><span aria-label="فارسی">🇮🇷</span>فارسی</a>
                                    </a-menu-item>

                                    <a-menu-item key="🇮🇩">
                                        <a href="javascript:;"><span aria-label="Bahasa Indonesia">🇮🇩</span>Bahasa Indonesia</a>
                                    </a-menu-item>
                                    <a-menu-item key="🇯🇵">
                                        <a href="javascript:;"><span aria-label="日本語">🇯🇵</span>日本語</a>
                                    </a-menu-item>
                                    <a-menu-item key="🇧🇷">
                                        <a href="javascript:;"><span aria-label="Português">🇧🇷</span>Português</a>
                                    </a-menu-item>
                                    <a-menu-item key="🇨🇳">
                                        <a href="javascript:;"><span aria-label="简体中文">🇨🇳</span>简体中文</a>
                                    </a-menu-item>
                                    <a-menu-item key="🇭🇰">
                                        <a href="javascript:;"><span aria-label="繁體中文">🇭🇰</span>繁體中文</a>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>

                    <span class="ant-pro-global-header-header-actions-avatar">

                        <a-dropdown :getPopupContainer="getPopupContainer">

                            <div>
                                <a-avatar :src="info.avatar"
                                    style="width: 28px; height: 28px; line-height: 28px; font-size: 18px;">
                                </a-avatar>
                                <span style="margin-inline-start: 8px;">
                                    <span class="anticon">{{ info.name }}</span>
                                </span>
                            </div>

                            <template #overlay>
                                <a-menu @click="handleMenuClick">
                                    <a-menu-item key="Logout">
                                        <LogoutOutlined />
                                        <span style="margin-left: 10px;">退出登录</span>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { QuestionCircleOutlined, LogoutOutlined } from '@ant-design/icons-vue';

import type { MenuProps } from 'ant-design-vue';
import { useRouter } from 'vue-router';

import { useUserStore } from '@/store/user'

const router = useRouter()
const selectedKeys = ref(['1'])

const userStore = useUserStore()

const info = computed(() => userStore.info.value)

function getPopupContainer(triggerNode: any) {
    return triggerNode
}

const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log(e.key)
    if (e.key === 'Logout') {
        console.log(e.key)
        userStore.logout()
        router.push('/login')
    }
}

</script>

<style scoped>
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
