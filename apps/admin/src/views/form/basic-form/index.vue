<template>
    <ProPageHeader>
        表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。
    </ProPageHeader>
    <a-card :bordered="false">
        <a-form ref="formRef" :model="formState" :rules="rules" layout="vertical"
            style="margin: 8px auto auto;max-width: 600px;">
            <a-form-item label="标题" name="title">
                <a-input v-model:value="formState.title" placeholder="给目标起个名字" />
            </a-form-item>

            <a-form-item label="起止日期" name="date">
                <a-range-picker v-model:value="formState.date" picker="date" :placeholder="['开始日期', '结束日期']"
                    format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" />
            </a-form-item>

            <a-form-item label="目标描述" name="goal">
                <a-textarea v-model:value="formState.goal" :row="3" placeholder="请输入你的阶段性工作目标" />
            </a-form-item>

            <a-form-item label="衡量标准" name="standard">
                <a-textarea v-model:value="formState.standard" :row="3" placeholder="请输入衡量标准" />
            </a-form-item>

            <a-form-item name="client" tooltip="目标的服务对象">
                <template #label>
                    <span>
                        客户
                        <em style="color: rgba(0, 0, 0, 0.65);font-style: normal;">（选填）</em>
                    </span>
                </template>
                <a-input v-model:value="formState.client" placeholder="请描述你服务的客户，内部客户直接 @姓名／工号" />
            </a-form-item>

            <a-form-item name="invites">
                <template #label>
                    <span>
                        邀评人
                        <em style="color: rgba(0, 0, 0, 0.65);font-style: normal;">（选填）</em>
                    </span>
                </template>
                <a-input v-model:value="formState.invites" placeholder="请直接 @姓名／工号，最多可邀请 5 人" />
            </a-form-item>

            <a-form-item name="weight">
                <template #label>
                    <span>
                        权重
                        <em style="color: rgba(0, 0, 0, 0.65);font-style: normal;">（选填）</em>
                    </span>
                </template>
                <a-input-number v-model:value="formState.weight" placeholder="请输入" :min="0" :max="100"
                    :formatter="(value: number | string) => `${value || 0}%`"
                    :parser="(value: string) => Number(value ? value.replace('%', '') : '0')" />
            </a-form-item>

            <a-form-item label="目标公开" name="publicType" help="客户、邀评人默认被分享">
                <a-radio-group v-model:value="formState.publicType">
                    <a-radio value="1">公开</a-radio>
                    <a-radio value="2">部分公开</a-radio>
                    <a-radio value="3">不公开</a-radio>
                </a-radio-group>
            </a-form-item>

            <a-form-item label="" name="publicUsers" v-if="formState.publicType === '2'">
                <a-select v-model:value="formState.publicUsers" placeholder="请选择">
                    <a-select-option value="1">同事甲</a-select-option>
                    <a-select-option value="2">同事乙</a-select-option>
                    <a-select-option value="3">同事丙</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item>
                <a-button type="primary" @click="onSubmit">提交</a-button>
                <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue';
import { message } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';

import ProPageHeader from '@/components/ProPageHeader';

import { Params } from './data.d'
import { fakeSubmitForm } from './service'

const formRef = ref();

type FormState = {
    formState: Params;
    rules: Record<string, Rule[]>;
}

const state = reactive<FormState>({
    formState: {
        title: '',
        date: [],
        goal: '',
        standard: '',
        client: '',
        invites: '',
        weight: '',
        publicType: '',
        publicUsers: '',
    },
    rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        date: [{ required: true, message: '请选择起止日期', trigger: 'change' }],
        goal: [{ required: true, message: '请输入目标描述', trigger: 'blur' }],
        standard: [{ required: true, message: '请输入衡量标准', trigger: 'blur' }]
    }
})

const { formState, rules } = toRefs(state)

const onSubmit = async () => {

    try {
        const valid = await formRef.value.validate()

        let [err, resp] = await fakeSubmitForm(valid)
        if (!err) {
            message.success(resp?.message!)
        }

    } catch (error) {
        console.log(error)

    }
};
const resetForm = () => {
    formRef.value.resetFields();
};
</script>
<style scoped></style>