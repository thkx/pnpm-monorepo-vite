<template>
    <div class="trendItem">
        <span>
            <slot></slot>
        </span>

        <span :class="`${flag}`">
            <CaretUpOutlined v-if="flag === 'up'" />
            <CaretDownOutlined v-else />
        </span>

    </div>
</template>

<script lang="ts" setup>
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue';

defineProps<{ flag: 'up' | 'down' }>()

</script>
<style scoped>
.trendItem {
    display: inline-block;
    font-size: 14px;
    line-height: 22px;
}

.trendItem .up,
.trendItem .down {
    position: relative;
    top: 1px;
    margin-left: 4px;
}

/* .trendItem .up span,
.trendItem .down span {
    font-size: 12px;
    transform: scale(0.83);
} */

.trendItem .up {
    color: #f5222d;
}

.trendItem .down {
    top: -1px;
    color: #52c41a;
}

/* .trendItem.trendItemGrey .up,
.trendItem.trendItemGrey .down {
    color: @text-color;
} */

.trendItem.reverseColor .up {
    color: #52c41a;
}

.trendItem.reverseColor .down {
    color: #f5222d;
}
</style>