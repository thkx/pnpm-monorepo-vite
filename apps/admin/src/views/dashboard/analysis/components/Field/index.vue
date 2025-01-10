<template>
    <div class="field">
        <span class="label">{{ label }}</span>
        <span class="number">{{ value }}</span>
    </div>
</template>

<script lang="ts" setup>
defineProps<{ label: string, value: string }>()

</script>
<style scoped>
.field {
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.field .label,
.field .number {
    font-size: 14px;
    line-height: 22px;
}

.field .number {
    margin-left: 8px;
    color: rgba(0, 0, 0, 0.88);
}
</style>