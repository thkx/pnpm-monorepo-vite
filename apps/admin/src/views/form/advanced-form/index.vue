<template>
    <ProPageHeader>
        高级表单常见于一次性输入和提交大批量数据的场景。
    </ProPageHeader>

    <ProFooterBar>
        <template #right>
            <a-space>
                <span class="errorIcon" style="padding: 0;" v-if="errorFields.length > 0">
                    <a-popover title="表单校验信息" overlayClassName="errorPopover" trigger="click"
                        :getPopupContainer="getPopupContainer">
                        <template #content>
                            <li class="errorListItem" v-for="err in errorFields" @click="scrollToField(err.name[0])">
                                <CloseCircleOutlined class="errorIcon" />
                                <div class="errorMessage">{{ err.errors[0] }}</div>
                                <div class="errorField">{{ fieldLabels[err.name[0] as Key] }}</div>
                            </li>
                        </template>
                        <CloseCircleOutlined />
                    </a-popover>
                    {{ errorFields.length }}
                </span>
                <a-button @click="resetForm">重置</a-button>
                <a-button type="primary" :loading="loading" @click="onFinish">提交</a-button>
            </a-space>
        </template>
    </ProFooterBar>

    <a-form layout="vertical" :model="formState" ref="formRef" :rules="rules">
        <a-card title="仓库管理" class="card" :bordered="false">

            <a-row :gutter="16">
                <a-col :lg="6" :md="12" :sm="24">
                    <a-form-item :label="fieldLabels.name" name="name">
                        <a-input v-model:value="formState.name" placeholder="请输入仓库名称" allowClear />
                    </a-form-item>
                </a-col>
                <a-col :xl="{ span: 6, offset: 2, }" :lg="{ span: 8, }" :md="{ span: 12, }" :sm="24">
                    <a-form-item :label="fieldLabels.url" name="url">
                        <a-input v-model:value="formState.url" addon-before="Http://" addon-after=".com"
                            placeholder="请输入" allowClear />
                    </a-form-item>
                </a-col>
                <a-col :xl="{ span: 8, offset: 2, }" :lg="{ span: 10, }" :md="{ span: 24, }" :sm="24">
                    <a-form-item :label="fieldLabels.owner" name="owner">
                        <a-select v-model:value="formState.owner" placeholder="请选择管理员" allowClear>
                            <a-select-option v-for="item in users" :key="item.value" :value="item.value">{{
                                item.label
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :lg="6" :md="12" :sm="24">
                    <a-form-item :label="fieldLabels.approver" name="approver">
                        <a-select v-model:value="formState.approver" placeholder="请选择审批员" allowClear>
                            <a-select-option v-for="item in users" :key="item.value" :value="item.value">{{
                                item.label
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :xl="{ span: 6, offset: 2, }" :lg="{ span: 8, }" :md="{ span: 12, }" :sm="24">
                    <a-form-item :label="fieldLabels.dateRange" name="dateRange">
                        <a-range-picker v-model:value="formState.dateRange" style="width: 100%;" format="YYYY-MM-DD"
                            valueFormat="YYYY-MM-DD" />
                    </a-form-item>
                </a-col>
                <a-col :xl="{ span: 8, offset: 2, }" :lg="{ span: 10, }" :md="{ span: 24, }" :sm="24">
                    <a-form-item :label="fieldLabels.type" name="type">
                        <a-select v-model:value="formState.type" placeholder="请选择仓库类型" allowClear>
                            <a-select-option v-for="item in types" :key="item.value" :value="item.value">{{
                                item.label
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>

        </a-card>

        <a-card title="任务管理" class="card" :bordered="false">
            <a-row :gutter="16">
                <a-col :lg="6" :md="12" :sm="24">
                    <a-form-item :label="fieldLabels.name2" name="name2">
                        <a-input v-model:value="formState.name2" placeholder="请输入" allowClear />
                    </a-form-item>
                </a-col>
                <a-col :xl="{ span: 6, offset: 2, }" :lg="{ span: 8, }" :md="{ span: 12, }" :sm="24">
                    <a-form-item :label="fieldLabels.url2" name="url2">
                        <a-input v-model:value="formState.url2" placeholder="请输入" allowClear />
                    </a-form-item>
                </a-col>
                <a-col :xl="{ span: 8, offset: 2, }" :lg="{ span: 10, }" :md="{ span: 24, }" :sm="24">
                    <a-form-item :label="fieldLabels.owner2" name="owner2">
                        <a-select v-model:value="formState.owner2" placeholder="请选择管理员" allowClear>
                            <a-select-option v-for="item in users" :key="item.value" :value="item.value">{{
                                item.label
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :lg="6" :md="12" :sm="24">
                    <a-form-item :label="fieldLabels.approver2" name="approver2">
                        <a-select v-model:value="formState.approver2" placeholder="请选择审批员" allowClear>
                            <a-select-option v-for="item in users" :key="item.value" :value="item.value">{{
                                item.label
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :xl="{ span: 6, offset: 2, }" :lg="{ span: 8, }" :md="{ span: 12, }" :sm="24">
                    <a-form-item :label="fieldLabels.dateRange2" name="dateRange2">
                        <a-time-picker v-model:value="formState.dateRange2" value-format="HH:mm:ss" style="width: 100%;"
                            placeholder="提醒时间" />
                    </a-form-item>
                </a-col>
                <a-col :xl="{ span: 8, offset: 2, }" :lg="{ span: 10, }" :md="{ span: 24, }" :sm="24">
                    <a-form-item :label="fieldLabels.type2" name="type2">
                        <a-select v-model:value="formState.type2" placeholder="请选择仓库类型" allowClear>
                            <a-select-option v-for="item in types" :key="item.value" :value="item.value">{{
                                item.label
                            }}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-card>

        <a-card title="成员管理" :bordered="false">
            <a-form-item name="members" :autoLink="false">
                <TableForm v-model:data="formState.members"></TableForm>
            </a-form-item>
        </a-card>

    </a-form>

</template>
<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue';

import { CloseCircleOutlined } from '@ant-design/icons-vue';

import type { Rule } from 'ant-design-vue/es/form';

import ProPageHeader from '@/components/ProPageHeader';
import ProFooterBar from '@/components/ProFooterBar';

import TableForm from './components/TableForm.vue'

import { TableFormDateType, ErrorField, Params, Key } from './data.d';
import { fakeAdvancedForm } from './service';
import { message } from 'ant-design-vue';

type FormState = {
    formState: Params;
    rules: Record<string, Rule[]>;
    errorFields: ErrorField[];
    loading: boolean;
}

const formRef = ref()

const users = [{ label: '付晓晓', value: 'xiao' }, { label: '周毛毛', value: 'mao' }]
const types = [{ label: '私密', value: 'private' }, { label: '公开', value: 'public' }]

const fieldLabels: Omit<Params, 'members'> = {
    name: '仓库名',
    url: '仓库域名',
    owner: '仓库管理员',
    approver: '审批人',
    dateRange: '生效日期',
    type: '仓库类型',
    name2: '任务名',
    url2: '任务描述',
    owner2: '执行人',
    approver2: '责任人',
    dateRange2: '生效日期',
    type2: '任务类型',
};

const tableData: TableFormDateType[] = [
    {
        key: '1',
        workId: '00001',
        name: 'John Brown',
        department: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        workId: '00002',
        name: 'Jim Green',
        department: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        workId: '00003',
        name: 'Joe Black',
        department: 'Sidney No. 1 Lake Park',
    },
];

const state = reactive<FormState>({
    formState: {
        name: undefined,
        url: undefined,
        owner: undefined,
        approver: undefined,
        dateRange: undefined,
        type: undefined,
        name2: undefined,
        url2: undefined,
        owner2: undefined,
        approver2: undefined,
        dateRange2: undefined,
        type2: undefined,
        members: tableData,
    },
    rules: {
        name: [{ required: true, message: '请输入仓库名称', trigger: 'blur' }],
        url: [{ required: true, message: '请输入', trigger: 'blur' }],
        owner: [{ required: true, message: '请选择管理员', trigger: 'change' }],
        approver: [{ required: true, message: '请选择审批员', trigger: 'change' }],
        dateRange: [{ required: true, message: '请选择生效日期', trigger: 'change' }],
        type: [{ required: true, message: '请选择仓库类型', trigger: 'change' }],
        name2: [{ required: true, message: '请输入', trigger: 'blur' }],
        url2: [{ required: true, message: '请输入', trigger: 'blur' }],
        owner2: [{ required: true, message: '请选择管理员', trigger: 'change' }],
        approver2: [{ required: true, message: '请选择审批员', trigger: 'change' }],
        dateRange2: [{ required: true, message: '请选择', trigger: 'change' }],
        type2: [{ required: true, message: '请选择仓库类型', trigger: 'change' }],
    },
    errorFields: [],
    loading: false,
})

const { formState, rules, errorFields, loading } = toRefs(state)

function getPopupContainer(trigger: HTMLElement) {
    if (trigger && trigger.parentNode) {
        return trigger.parentNode as HTMLElement;
    }
    return trigger;
}

function scrollToField(fieldKey: string) {
    const labelNode = document.querySelector(`label[for="form_item_${fieldKey}"]`);
    if (labelNode) {
        labelNode.scrollIntoView(true);
    }
};

const onFinish = () => {
    errorFields.value = []
    formRef.value.validate().then(async (valid: any) => {
        console.log('valid', valid)
        loading.value = true

        const [err, resp] = await fakeAdvancedForm(valid)
        if (!err) {
            message.success(resp?.message)
        }

        loading.value = false

    }).catch((error: any) => {
        // console.log('error', error)
        errorFields.value = error.errorFields
    })
}

const resetForm = () => {
    formRef.value.resetFields();
    errorFields.value = []
};

</script>

<style>
.errorPopover .ant-popover-inner-content {
    min-width: 256px !important;
    max-height: 290px !important;
    padding: 0 !important;
    overflow: auto !important;
}
</style>

<style scoped>
.card {
    margin-bottom: 24px;
}

.errorIcon {
    color: #ff4d4f;
    cursor: pointer;
    float: left;
    margin-top: 4px;
    padding-bottom: 22px;
}

.errorIcon span.anticon {
    margin-right: 4px;
}

.errorListItem {
    padding: 8px 16px;
    list-style: none;
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);
    cursor: pointer;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
}

.errorListItem:hover {
    background: rgba(0, 0, 0, 0.15);
}

.errorListItem:last-child {
    border: 0;
}

.errorField {
    margin-top: 2px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
}
</style>