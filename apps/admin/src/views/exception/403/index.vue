<template>
    <a-result status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
        <template #extra>
            <a-button type="primary" @click="handleBack">Back Home</a-button>
        </template>
    </a-result>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

import { error } from "./service";

error()

const router = useRouter()
function handleBack() {
    router.push('/')
}
</script>
<style scoped></style>