<template>
    <div class="row">
        <div class="label" v-if="title">
            <span>{{ title }}</span>
        </div>

        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>

defineProps<{ title?: string }>()
</script>

<style scoped>
.row {
    display: flex;
    width: 100%;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px dashed rgba(5, 5, 5, 0.06);
}

.row .label {
    flex: 0 0 auto;
    margin-right: 24px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    text-align: right;
}

.row .label span {
    display: inline-block;
    height: 32px;
    line-height: 32px;
}

.row .label span::after {
    content: '：';
}

.content {
    flex: 1 1 0;
}
</style>
