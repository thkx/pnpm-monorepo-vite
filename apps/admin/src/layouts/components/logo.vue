<template>

    <div class="ant-pro-global-header-logo ant-pro-global-header-logo-mix">
        <a>
            <img width="auto" height="22" :src="logo"
                alt="logo" />
            <h1>{{ title }}</h1>
        </a>
    </div>

</template>

<script lang="ts" setup>
defineProps<{logo: string, title: string}>()
</script>

<style scoped>
.ant-pro-global-header-logo {
    position: relative;
    margin-inline-end: 16px;
}

.ant-pro-global-header-logo a {
    display: flex;
    align-items: center;
    height: 100%;
    min-height: 22px;
    font-size: 20px;
}

.ant-pro-global-header-logo img {
    height: 28px;
}

.ant-pro-global-header-logo h1 {
    height: 32px;
    margin-block: 0;
    margin-inline: 0;
    margin-inline-start: 8px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.88);
    font-size: 18px;
    line-height: 32px;
}

.ant-pro-global-header-logo-mix {
    display: flex;
    align-items: center;
}
</style>
