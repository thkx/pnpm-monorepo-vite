<template>
    <a-modal v-model:open="open" title="新建规则" :width="640" :bodyStyle="{ padding: '32px 40px 48px' }">
        <template #footer>
            <a-button type="primary" @click="handleDone" v-if="current == 0">下一步</a-button>
            <template v-if="current == 1">
                <a-button @click="current = 0">上一步</a-button>
                <a-button type="primary" @click="handleDone">下一步</a-button>
            </template>

            <template v-if="current == 2">
                <a-button @click="current = 1">上一步</a-button>
                <a-button type="primary" :loading="loading" @click="handleOk">确 定</a-button>
            </template>

        </template>

        <a-row>
            <a-col :span="24">
                <a-steps size="small" :current="current" :items="items"></a-steps>
            </a-col>
        </a-row>

        <a-row style="margin-left: -12px; margin-right: -12px;">
            <a-col :span="24" style="padding-left: 12px; padding-right: 12px;">
                <div style="width: max-content;min-width: 420px;max-width: 100%;margin: auto;margin-block-start: 32px;">
                    <a-form layout="vertical" :model="form" ref="formRef">
                        <template v-if="current == 0">
                            <a-form-item label="规则名称" name="name" :rules="[{ required: true, message: '规则名称为必填项' }]">
                                <a-input v-model:value="form.name" placeholder="请输入" />
                            </a-form-item>
                            <a-form-item label="规则描述" name="desc"
                                :rules="[{ required: true, min: 5, message: '请输入至少五个字符！' }]">
                                <a-textarea v-model:value="form.desc" placeholder="请输入" :rows="4" />
                            </a-form-item>
                        </template>
                        <template v-if="current == 1">
                            <a-form-item label="监控对象" name="target">
                                <a-select v-model:value="form.target" placeholder="请选择"
                                    :options="[{ value: '0', label: '表一' }, { value: '1', label: '表二' }]" />
                            </a-form-item>
                            <a-form-item label="规则模板" name="template">
                                <a-select v-model:value="form.template" placeholder="请选择"
                                    :options="[{ value: '0', label: '规则模板一' }, { value: '1', label: '规则模板二' }]" />
                            </a-form-item>
                            <a-form-item label="规则类型" name="type">
                                <a-radio-group v-model:value="form.type" name="radioGroup">
                                    <a-radio value="0">强</a-radio>
                                    <a-radio value="1">弱</a-radio>
                                </a-radio-group>
                            </a-form-item>

                        </template>
                        <template v-if="current == 2">
                            <a-form-item label="开始时间" name="time" :rules="[{ required: true, message: '请选择开始时间！' }]">
                                <a-date-picker v-model:value="form.time" format="YYYY-MM-DD HH:mm:ss"
                                    show-time placeholder="请选择" style="width: 100%" />
                            </a-form-item>
                            <a-form-item label="监控对象" name="frequency">
                                <a-select v-model:value="form.frequency" placeholder="请选择"
                                    :options="[{ value: 'month', label: '月' }, { value: 'week', label: '周' }]" />
                            </a-form-item>
                        </template>
                    </a-form>
                </div>
            </a-col>
        </a-row>
    </a-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue';

import dayjs from 'dayjs';

type FromType = { name: string, desc: string, target: string, template: string, type: string, time: string; frequency: string }

const open = defineModel('open', { type: Boolean })
const form = defineModel('form', { type: Object })

const props = defineProps<{ok: (params: FromType) => Promise<boolean>}>()

type FormState = {
    current: number,
    items: { key: string, title: string }[],
    loading: boolean,
}

const state = reactive<FormState>({
    current: 0,
    items: [
        { key: '0', title: '基本信息' },
        { key: '1', title: '配置规则属性' },
        { key: '2', title: '设定调度周期' },
    ],
    loading: false
})

const formRef = ref()

const { current, items, loading } = toRefs(state)

async function handleDone() {
	try {
        await formRef.value.validate()

		loading.value = false
        current.value++
        
    } catch (error) {
        console.log(error)
        loading.value = false;
    }
}

async function handleOk() {
    try {
        const valid = await formRef.value.validate()

		loading.value = false
        const params = {
			...form.value,
			time: dayjs(valid.time).format('YYYY-MM-DD HH:mm:ss'),
		}

		if (props.ok) {
			const bool = await props.ok(params)
			open.value = bool
			if (!bool) {
				current.value = 0
			}
		}
        
    } catch (error) {
        console.log(error)
        loading.value = false;
    }
}



</script>

<style scoped></style>
