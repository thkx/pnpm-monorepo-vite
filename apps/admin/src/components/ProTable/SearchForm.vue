<template>
    <div class="ant-pro-card ant-pro-table-search">
        <a-form ref="formRef" class="ant-pro-query-filter" v-bind="layout" :model="formState" @finish="onFinish">
            <a-row :gutter="24" class="ant-pro-query-filter-row">
                <template v-for="(item, i) of columns" :key="i">
                    <a-col v-show="expand || i <= expandLen1" :span="6">
                        <a-form-item v-if="item.valueType !== 'action'" :name="item.key"
                            :label="item.name || item.title" :rules="item.rules" :tooltip="item.tip">

                            <slot :name="item.key" v-bind="{ form: formState, key: item.key, column: item }"></slot>

                            <template v-if="!slots[item.key]">
                                <a-input v-model:value="formState[item.key]" placeholder="请输入" v-if="!item.valueEnum"
                                    allowClear></a-input>
                                <a-select v-model:value="formState[item.key]" v-else-if="item.valueEnum"
                                    placeholder="请选择" allowClear>
                                    <a-select-option v-for="opt in item.valueEnum" :value="opt[item.key]">
                                        {{ opt.text }}
                                    </a-select-option>
                                </a-select>
                            </template>
                        </a-form-item>
                    </a-col>
                </template>

                <template v-if="expand">
                    <a-col :span="6" v-for="i in expandLen2" :key="i"></a-col>
                </template>
                <template v-else>
                    <template v-if="columns.length < 4">
                        <a-col :span="6" v-for="i in expandLen2" :key="i"></a-col>
                    </template>
                </template>

                <a-col :span="6" style="text-align: right">
                    <a-button @click="reset">重 置</a-button>
                    <a-button style="margin: 0 8px" type="primary" :loading="loading" html-type="submit">查 询</a-button>
                    <a style="font-size: 14px" v-if="columns.length > 4" @click="expand = !expand">
                        <template v-if="expand">
                            展开
                            <UpOutlined />
                        </template>
                        <template v-else>
                            收起
                            <DownOutlined />
                        </template>
                    </a>
                </a-col>
            </a-row>
        </a-form>
    </div>

</template>
<script lang="ts" setup>
import { reactive, ref, defineEmits, useSlots, computed, SetupContext } from 'vue';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import type { FormInstance } from 'ant-design-vue';

import type { ProColumnItem } from './type'

const props = defineProps<{ columns: ProColumnItem[], loading: boolean }>()

const emit = defineEmits(['submit'])

const slots: SetupContext['slots'] = useSlots()

const columns = computed(() => props.columns.filter(r => r.key != 'action'))
const loading = computed(() => props.loading);

const expand = ref(false);
const formRef = ref<FormInstance>();
const formState = reactive<any>({});

const expandLen1 = ref(2)
const expandLen2 = computed(() => (expandLen1.value + 1) - (columns.value.length % 4))

const layout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const reset = () => {
    formRef.value!.resetFields()

    formRef.value!.validate().then((values: any) => {
        onFinish(values)
    })
}

const onFinish = (values: any) => {
    // console.log('Received values of form: ', values);
    // console.log('formState: ', formState);
    // loading.value = true
    emit('submit', values)
};
</script>
<style scoped>
.ant-pro-card {
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    margin-block: 0;
    margin-inline: 0;
    padding-block: 0;
    padding-inline: 0;
    background-color: #ffffff;
    border-radius: 6px;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
}

.ant-pro-table-search {
    margin-block-end: 16px;
    background: #ffffff;
}

.ant-pro-query-filter {
    padding: 24px;
}

.ant-pro-query-filter .ant-form-item {
    margin-bottom: 0;
}

.ant-pro-query-filter-row {
    row-gap: 24px;
}
</style>