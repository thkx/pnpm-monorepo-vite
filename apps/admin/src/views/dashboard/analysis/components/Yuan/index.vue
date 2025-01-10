<template>
    <span>¥ {{ numeral(val).format('0,0') }}</span>
</template>

<script lang="ts" setup>
import numeral from 'numeral';

defineProps<{ val: string | number }>()

</script>
<style scoped></style>
