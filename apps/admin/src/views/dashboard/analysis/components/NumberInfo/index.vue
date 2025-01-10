<template>
    <div :class="`numberInfo numberInfo${theme}`">
        <template v-if="slots.title">
            <div class="numberInfoTitle">
                <slot name="title"></slot>
            </div>
        </template>
        <template v-else>
            <div class="numberInfoTitle" v-if="title">{{ title }}</div>
        </template>

        <template v-if="slots.subTitle">
            <div class="numberInfoSubTitle">
                <slot name="subTitle"></slot>
            </div>
        </template>
        <template v-else>
            <div class="numberInfoSubTitle" v-if="subTitle">{{ subTitle }}</div>
        </template>

        <div class="numberInfoValue" :style="`${gap ? `margin-top: ${gap};` : ''}`">
            <span>
                <template v-if="slots.total">
                    <slot name="total"></slot>
                </template>
                <template v-else>{{ total }}</template>
                <em v-if="suffix" class="suffix">{{ suffix }}</em>
            </span>

            <template v-if="status || subTotal">
                <span class="subTotal">
                    {{ subTotal }}
                    <CaretUpOutlined v-if="status && status === 'up'" />
                    <CaretDownOutlined v-else />
                </span>
            </template>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons-vue";

type NumberInfoProps = {
    title?: string;
    subTitle?: string;
    total?: string;
    status?: 'up' | 'down';
    theme?: string;
    gap?: string;
    subTotal?: number;
    suffix?: string;
};
defineProps<NumberInfoProps>()

const slots = defineSlots()
</script>

<style scoped></style>