<template>
    <a v-if="isExternal(props.to)" :href="props.to" target="_blank" rel="noopener">
        <slot />
    </a>
    <router-link v-else :to="props.to">
        <slot />
    </router-link>
</template>

<script lang="ts" setup>
import { isExternal } from '@pnpm-monorepo-vite/utils';

interface Props {
    to: string
}

const props = defineProps<Props>()
</script>