<template>
    <ProPageHeader>
        将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。
    </ProPageHeader>
    <a-card :bordered="false">
        <a-row>
            <a-col :span="24">
                <a-steps :current="current" :items="items" style="max-width: 960px;margin: auto;"></a-steps>
            </a-col>
        </a-row>

        <a-form ref="formRef" :model="formState" :rules="rules" layout="vertical"
            style="width: max-content;min-width: 420px;max-width: 100%;margin: auto;margin-block-start: 32px;">

            <template v-if="current == 0">
                <a-form-item label="付款账户" name="payAccount">
                    <a-select v-model:value="formState.payAccount" placeholder="请选择"
                        :options="[{ value: 'ant-design@alipay.com', label: 'ant-design@alipay.com' }]" />
                </a-form-item>

                <a-input-group>
                    <div style="padding: 0 0 8px;">收款账户</div>
                    <a-space :size="8">

                        <a-form-item label="" name="receiverMode">
                            <a-select v-model:value="formState.receiverMode" placeholder="请选择付款账户"
                                :options="[{ value: 'alipay', label: '支付宝' }, { value: 'bank', label: '银行账户' }]" />
                        </a-form-item>

                        <a-form-item label="" name="receiverAccount">
                            <a-input v-model:value="formState.receiverAccount" placeholder="test@example.com" />
                        </a-form-item>
                    </a-space>

                </a-input-group>

                <a-form-item label="收款人姓名" name="receiverName">
                    <a-input v-model:value="formState.receiverName" placeholder="请输入收款人姓名" />
                </a-form-item>

                <a-form-item label="转账金额" name="amount">
                    <a-input-number v-model:value="formState.amount" placeholder="请输入金额" prefix="￥"
                        style="width: 100%;" />
                </a-form-item>

                <a-form-item>
                    <a-button type="primary" @click="handleDone" v-if="current == 0">下一步</a-button>
                </a-form-item>
            </template>

            <template v-if="current == 1">
                <div class="result">
                    <a-alert closable show-icon message="确认转账后，资金将直接打入对方账户，无法退回。" style="margin-bottom: 24px;" />

                    <a-descriptions :column="1" bordered>
                        <a-descriptions-item label="付款账户"> {{ formState.payAccount }}</a-descriptions-item>
                        <a-descriptions-item label="收款账户"> {{ formState.receiverAccount }}</a-descriptions-item>
                        <a-descriptions-item label="收款人姓名"> {{ formState.receiverName }}</a-descriptions-item>
                        <a-descriptions-item label="转账金额">
                            <a-statistic :value="formState.amount" :precision="2">
                                <template #suffix>
                                    <span style="font-size: 14px;">
                                        元
                                    </span>
                                </template>
                            </a-statistic>
                        </a-descriptions-item>
                    </a-descriptions>

                    <a-divider style="margin: 24px 0;" />
                    <a-form-item label="支付密码" name="password">
                        <a-input-password v-model:value="formState.password" placeholder="请输入支付密码" />
                    </a-form-item>
                </div>
                <a-form-item>
                    <a-space>
                        <a-button @click="current = 0">上一步</a-button>
                        <a-button type="primary" @click="handleDone">下一步</a-button>
                    </a-space>

                </a-form-item>
            </template>

            <template v-if="current == 2">
                <a-result status="success" title="操作成功" subTitle="预计两小时内到账" class="result">
                    <template #extra>
                        <a-button type="primary" @click="onFinish">
                            再转一笔
                        </a-button>
                        <a-button>查看账单</a-button>
                    </template>

                    <a-descriptions :column="1">
                        <a-descriptions-item label="付款账户"> {{ formState.payAccount }}</a-descriptions-item>
                        <a-descriptions-item label="收款账户"> {{ formState.receiverAccount }}</a-descriptions-item>
                        <a-descriptions-item label="收款人姓名"> {{ formState.receiverName }}</a-descriptions-item>
                        <a-descriptions-item label="转账金额">
                            <a-statistic :value="formState.amount" :precision="2">
                                <template #suffix>
                                    <span style="font-size: 14px;">
                                        元
                                    </span>
                                </template>
                            </a-statistic>
                        </a-descriptions-item>
                    </a-descriptions>
                </a-result>
            </template>
        </a-form>

        <a-divider style="margin: 40px 0 24px;" />
        <div>
            <h3>说明</h3>
            <h4>转账到支付宝账户</h4>
            <p>
                如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
            </p>
            <h4>转账到银行卡</h4>
            <p>
                如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
            </p>
        </div>
    </a-card>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';

import ProPageHeader from '@/components/ProPageHeader';

// import { IState } from './data.d'
// import { fakeSubmitForm } from './service'

type FormState = {
    items: { key: string, title: string }[];
    current: number;
    formState: {
        payAccount?: string;
        receiverMode?: string;
        receiverAccount?: string;
        receiverName?: string;
        amount?: string;
        password?: string;
    };
    rules: Record<string, Rule[]>;
}

const formRef = ref()

const steps = [
    {
        title: '填写转账信息',
        key: '填写转账信息',
    },
    {
        title: '确认转账信息',
        key: '确认转账信息',
    },
    {
        title: '完成',
        key: '完成',
    },
];

const state = reactive<FormState>({
    items: steps,
    current: 0,

    formState: {
        payAccount: 'ant-design@alipay.com',
        receiverAccount: 'test@example.com',
        receiverName: 'Alex',
        amount: '500',
        receiverMode: 'bank',
        password: '',
    },
    rules: {
        payAccount: [{ required: true, message: '请选择付款账户', trigger: 'change' }],
        receiverMode: [{ required: true, message: '请选择付款账户', trigger: 'change' }],
        receiverAccount: [{ required: true, message: '请输入收款人账户', trigger: 'blur' }, { type: 'email', message: '账户名应为邮箱格式', trigger: 'blur' }],
        receiverName: [{ required: true, message: '请输入收款人姓名', trigger: 'blur' }],
        amount: [{ required: true, message: '请输入转账金额', trigger: 'blur' }, { pattern: /^(\d+)((?:\.\d+)?)$/, message: '请输入合法金额数字', trigger: 'blur' }],
        password: [{ required: true, message: '需要支付密码才能进行支付', trigger: 'blur' }],
    },
})

const { items, current, formState, rules } = toRefs(state)

async function handleDone() {
    try {
        await formRef.value.validate()
        current.value++

    } catch (error) {
        console.log(error)
    }
}

function onFinish() {
    current.value = 0
}

</script>
<style scoped>
.result {
  max-width: 560px;
  margin: 0 auto;
  padding: 24px 0 8px;
}
</style>