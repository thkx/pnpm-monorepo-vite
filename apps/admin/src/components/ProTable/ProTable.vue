<template>
    <SearchForm :columns="($attrs.columns as ProColumnItem[])" :loading="($attrs.loading as boolean)">
        <template v-for="item in ($attrs.columns as ProColumnItem[])" :key="item.key" :name="item.key" v-slot="{ form, key, column }">
            <!-- {{ column }} -->
            <slot v-bind="{ form, key, column }"></slot>
        </template>
        
    </SearchForm>
    <Table v-bind="$attrs">
        <slot name="table"></slot>
    </Table>
</template>
<script lang="ts" setup>
// import { ref } from "vue";

import SearchForm from './SearchForm.vue';
import Table from './Table.vue';

import type { ProColumnItem } from './type'


</script>
<style scoped>

</style>