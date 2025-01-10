<template>
    <a-card :loading="loading" :bodyStyle="{ padding: '20px 24px 8px 24px' }">

        <div class="chartCard">
            <div class="chartTop" :class="{ chartTopMargin: !slots.content && !slots.footer }">
                <div class="avatar" v-if="avatar">{{ avatar }}</div>
                <div class="avatar" v-else>
                    <slot name="avatar"></slot>
                </div>
                <div class="metaWrap">
                    <div class="meta">
                        <span>{{ title }}</span>
                        <span class="action">
                            <slot name="action"></slot>
                        </span>
                    </div>
                    <div class="total" v-if="typeof total == 'function'">{{ total() }}</div>
                    <div class="total" v-else-if="total">{{ total }}</div>
                    <div class="total" v-else>
                        <slot name="total"></slot>
                    </div>
                </div>
            </div>

            <div v-if="slots.content" class="content" :style="{ height: contentHeight || 'auto' }">
                <div :class="{ contentFixed: !!contentHeight }">
                    <slot name="content"></slot>
                </div>
            </div>

            <div v-if="slots.footer" class="footer" :class="{ footerMargin: !slots.content }">
                <slot name="footer"></slot>
            </div>
        </div>
    </a-card>

</template>

<script lang="ts" setup>

import { CardProps } from 'ant-design-vue/es/card/Card';

export type ChartCardProps = {
    title: string;
    // action?: string | number;
    total?: string | number | (() => string | number);
    // footer?: boolean;
    // content?: boolean;
    contentHeight?: string;
    avatar?: string;
} & CardProps;

defineProps<ChartCardProps>()

const slots = defineSlots()

// console.log(slots)

// const state = reactive({

// })

</script>
<style scoped>
.chartCard {
    position: relative;
}

.chartCard .chartTop {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.chartCard .chartTopMargin {
    margin-bottom: 12px;
}

.chartCard .chartTopHasMargin {
    margin-bottom: 20px;
}

.chartCard .metaWrap {
    float: left;
}

.chartCard .avatar {
    position: relative;
    top: 4px;
    float: left;
    margin-right: 20px;
}

.chartCard .avatar img {
    border-radius: 100%;
}

.chartCard .meta {
    /* height: 22px;
	color: @text-color-secondary;
	font-size: @font-size-base;
	line-height: 22px; */

    height: 22px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 22px;
}

.chartCard .action {
    position: absolute;
    top: 4px;
    right: 0;
    line-height: 1;
    cursor: pointer;
}

.chartCard .total {
    height: 38px;
    margin-top: 4px;
    margin-bottom: 0;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.88);
    font-size: 30px;
    line-height: 38px;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
}

.chartCard .content {
    position: relative;
    width: 100%;
    margin-bottom: 12px;
}

.chartCard .contentFixed {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
}

.chartCard .footer {
    margin-top: 8px;
    padding-top: 9px;
    border-top: 1px solid rgba(5, 5, 5, 0.06);
}

.chartCard .footer>* {
    position: relative;
}

.chartCard .footerMargin {
    margin-top: 20px;
}
</style>
