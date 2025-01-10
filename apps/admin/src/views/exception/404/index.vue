<template>
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
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