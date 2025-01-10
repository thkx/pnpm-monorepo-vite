<template>
    <a-modal v-model:open="open" title="新建规则" :width="400">
        <template #footer>
            <a-button key="back" @click="open = false">取 消</a-button>
            <a-button key="submit" type="primary" :loading="loading" @click="handleOk">确 定</a-button>
        </template>
        <a-form layout="vertical" :model="form" ref="formRef">
            <a-form-item label="" name="name" :rules="[{ required: true, message: '规则名称为必填项' }]">
                <a-input v-model:value="form.name" placeholder="请输入" />
            </a-form-item>
            <a-form-item label="" name="desc">
                <a-textarea v-model:value="form.desc" placeholder="请输入" :rows="4" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue';

const open = defineModel('open', { type: Boolean })

type FormState = { name: string, desc: string }

const props = defineProps<{ok: (params: FormState) => Promise<boolean>}>()

const state = reactive<{form: FormState, loading: boolean}>({
    loading: false,
    form: {
        name: '',
        desc: '',
    }
})

const formRef = ref()

const { form, loading } = toRefs(state)

async function handleOk() {
    try {
        const valid = await formRef.value.validate()
        if (props.ok) {
            const bool = await props.ok(valid)
            console.log(bool)
			open.value = bool
        }

        loading.value = false;
    } catch (error) {
        console.log(error)
        loading.value = false;
    }
}

</script>

<style scoped></style>
