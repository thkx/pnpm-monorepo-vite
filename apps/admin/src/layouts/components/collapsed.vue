<template>
    <div class="ant-pro-sider-collapsed-button" :class="{ 'ant-pro-sider-collapsed-button-collapsed': props.collapsed }">
        <svg width="1em" height="1em" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <path
                d="M6.432 7.967a.448.448 0 01-.318.133h-.228a.46.46 0 01-.318-.133L2.488 4.85a.305.305 0 010-.43l.427-.43a.293.293 0 01.42 0L6 6.687l2.665-2.699a.299.299 0 01.426 0l.42.431a.305.305 0 010 .43L6.432 7.967z">
            </path>
        </svg>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ collapsed: boolean }>()
</script>

<style scoped>
.ant-pro-sider-collapsed-button {
    position: absolute;
    /* inset-block-start: 18px; */
    inset-block-start: 72px;
    z-index: 101;
    width: 24px;
    height: 24px;
    text-align: center;
    border-radius: 40px;
    inset-inline-end: -13px;
    transition: transform 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.25);
    background-color: #ffffff;
    box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(25, 15, 15, 0.07), 0 0 1px 0 rgba(0, 0, 0, 0.08);
}

.ant-pro-sider-collapsed-button>svg {
    transition: transform 0.3s;
    transform: rotate(90deg);
}

.ant-pro-sider-collapsed-button-collapsed>svg {
    transform: rotate(-90deg);
}
</style>
