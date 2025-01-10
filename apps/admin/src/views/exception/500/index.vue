<template>
    <a-result status="500" title="500" sub-title="Sorry, the server is wrong.">
        <template #extra>
            <a-button type="primary" @click="handleBack">Back Home</a-button>
        </template>
    </a-result>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function handleBack() {
    router.push('/')
}
</script>
<style scoped></style>