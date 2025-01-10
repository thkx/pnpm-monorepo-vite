<template>
    <div>
        <div class="description">{{ content }}</div>
        <div class="extra">
            <a-avatar :src="avatar" size="small" />
            <a :href="href">{{ owner }}</a> 发布在 <a :href="href">{{ href }}</a>
            <em>{{ dayjs(updatedAt).format('YYYY-MM-DD HH:mm') }}</em>
        </div>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

defineProps<{ content: string; avatar: string; href: string; owner: string; updatedAt: Date | number }>()
</script>


<style scoped>
.description {
    max-width: 720px;
    line-height: 22px;
}

.extra {
    margin-top: 16px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 22px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.extra>em {
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.25);
    font-style: normal;
}
</style>
