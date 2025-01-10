<template>
    <div class="login">
        <div style="width: 42px;height: 42px;line-height: 42px;position: fixed;right: 16px;border-radius: 6px;">
            <a-dropdown placement='bottomRight' :getPopupContainer="getPopupContainer">
                <span
                    style="cursor: pointer; padding: 12px; display: inline-flex; align-items: center; justify-content: center; font-size: 18px; vertical-align: middle;color: #000;">
                    <i class="anticon">
                        <svg viewBox="0 0 24 24" focusable="false" width="1em" height="1em" fill="currentColor"
                            aria-hidden="true">
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path
                                d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z ">
                            </path>
                        </svg>
                    </i>
                </span>
                <template #overlay>
                    <a-menu @click="handleMenuClick" v-model:selectedKeys="selectedKeys">
                        <a-menu-item key="1">
                            <a href="javascript:;">1st menu item</a>
                        </a-menu-item>
                        <a-menu-item key="2">
                            <a href="javascript:;">2nd menu item</a>
                        </a-menu-item>
                        <a-menu-item key="3">
                            <a href="javascript:;">3rd menu item</a>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
        <div style="flex: 1 1 0%;padding: 32px 0px;">
            <div class="ant-pro-form-login-container">
                <div class="ant-pro-form-login-top">
                    <div class="ant-pro-form-login-header ">
                        <span class="ant-pro-form-login-logo ">
                            <img alt="logo" src="https://preview.pro.ant.design/logo.svg">
                        </span>
                        <span class="ant-pro-form-login-title ">Ant Design</span>
                    </div>
                    <div class="ant-pro-form-login-desc ">Ant Design 是西湖区最具影响力的 Web 设计规范</div>
                </div>

                <div class="ant-pro-form-login-main" style="width: 328px; min-width: 280px; max-width: 75vw;">
                    <a-form :model="formState" name="normal_login" @finish="onFinish" @finishFailed="onFinishFailed">

                        <a-tabs v-model:activeKey="activeKey" centered>
                            <a-tab-pane key="1" tab="账户密码登录"></a-tab-pane>
                            <a-tab-pane key="2" tab="手机号登录"></a-tab-pane>
                        </a-tabs>

                        <template v-if="activeKey == '1'">
                            <a-form-item name="username" :rules="[{ required: true, message: '用户名是必填项！' }]">
                                <a-input v-model:value="formState.username" size="large"
                                    placeholder="用户名: admin or user">
                                    <template #prefix>
                                        <UserOutlined />
                                    </template>
                                </a-input>
                            </a-form-item>

                            <a-form-item name="password" :rules="[{ required: true, message: '密码是必填项！' }]">
                                <a-input-password v-model:value="formState.password" size="large"
                                    placeholder="密码: ant.design">
                                    <template #prefix>
                                        <LockOutlined />
                                    </template>
                                </a-input-password>
                            </a-form-item>
                        </template>

                        <template v-if="activeKey == '2'">
                            <a-form-item name="username" :rules="[{ required: true, message: '手机号是必填项！' }]">
                                <a-input v-model:value="formState.username" size="large" placeholder="请输入手机号！">
                                    <template #prefix>
                                        <MobileOutlined />
                                    </template>
                                </a-input>
                            </a-form-item>

                            <a-form-item name="password" :rules="[{ required: true, message: '验证码是必填项！' }]">

                                <a-space>
                                    <a-input v-model:value="formState.password" size="large" placeholder="请输入验证码！">
                                        <template #prefix>
                                            <LockOutlined />
                                        </template>
                                    </a-input>
                                    <a-button size="large" :loading="visible" :disabled="visible"
                                        @click="handleCode">获取验证码</a-button>
                                </a-space>

                            </a-form-item>

                        </template>

                        <a-form-item style="margin-bottom: 24px;">
                            <a-form-item name="remember" no-style>
                                <a-checkbox v-model:checked="formState.remember">自动登录</a-checkbox>
                            </a-form-item>
                            <a style="float: right;" href="">忘记密码 ?</a>
                        </a-form-item>

                        <a-form-item>
                            <a-button type="primary" size="large" html-type="submit" :loading="loading"
                                style="width: 100%;">
                                登 录
                            </a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>

        </div>

        <a-layout-footer :style="{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.88)' }">
            <div class="ant-pro-global-footer">
                Ant Design ©2018 Created by Ant UED
            </div>
        </a-layout-footer>
    </div>

</template>
<script lang="ts" setup>
import { toRefs, reactive } from 'vue';
import { UserOutlined, LockOutlined, MobileOutlined } from '@ant-design/icons-vue';
import type { MenuProps } from 'ant-design-vue';

import { useRouter, useRoute } from 'vue-router';

import { LoginFormState } from '@/types/login'

import { useUserStore } from '@/store/user'

type LoginState = {
    activeKey: string,
    selectedKeys: string[]
    visible: boolean
    loading: boolean
    formState: LoginFormState
}

const router = useRouter()
const query = useRoute().query
const userStore = useUserStore()

const state = reactive<LoginState>({
    activeKey: '1',
    selectedKeys: ['1'],
    visible: false,
    loading: false,
    formState: {
        username: 'admin',
        password: 'ant.design',
        remember: true,
    }
})

const { activeKey, selectedKeys, visible, loading, formState } = toRefs(state)

const onFinish = (values: LoginFormState) => {
    // console.log('Success:', values);
    loading.value = true
    userStore.login(values).then((value) => {
        loading.value = false

        const redirect = query.redirect as string
        const path = redirect || '/'
        !value && router.push(path)
    })
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

function getPopupContainer(triggerNode: any) {
    return triggerNode
}

const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log(e.key)
    if (e.key === 'Logout') {
        console.log(e.key)
    }
}

const handleCode = () => {
    visible.value = !visible.value

    setTimeout(() => {
        visible.value = !visible.value
    }, 2000);
}
</script>
<style scoped>
.login {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background-image: url(https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr);
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
}

.ant-pro-form-login-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    padding-inline: 32px;
    padding-block: 24px;
    overflow: auto;
    background: inherit;
}

.ant-pro-form-login-top {
    text-align: center;
}

.ant-pro-form-login-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    line-height: 44px;
}

.ant-pro-form-login-logo {
    width: 44px;
    height: 44px;
    margin-inline-end: 16px;
    vertical-align: top;
}

.ant-pro-form-login-logo img {
    width: 100%;
}

.ant-pro-form-login-title {
    position: relative;
    inset-block-start: 2px;
    font-weight: 600;
    font-size: 33px;
    color: #000;
}

.ant-pro-form-login-desc {
    margin-block-start: 12px;
    margin-block-end: 40px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
}

.ant-pro-form-login-main {
    min-width: 328px;
    max-width: 580px;
    margin: 0 auto;
}
</style>