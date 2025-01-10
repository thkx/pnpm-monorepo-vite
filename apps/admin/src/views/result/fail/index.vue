<template>
    <a-card :bordered="false">
        <a-result status="error" title="提交失败" subTitle="请核对并修改以下信息后，再重新提交。">
            <template #extra>
                <a-button key="console" type="primary">返回修改</a-button>
            </template>

            <div class="title">
                <span>您提交的内容有如下错误：</span>
            </div>
            <div style="margin-bottom: 16px;">
                <CloseCircleOutlined style="margin-right: 8px;" class="error_icon" />
                <span>您的账户已被冻结</span>
                <a style='margin-left: 16px'>
                    <span>立即解冻</span>
                    <RightOutlined />
                </a>
            </div>
            <div>
                <CloseCircleOutlined style='margin-right: 8px;' class="error_icon" />
                <span>您的账户还不具备申请资格</span>
                <a style='margin-left: 16px'>
                    <span>立即升级</span>
                    <RightOutlined />
                </a>
            </div>
        </a-result>
    </a-card>
</template>
<script lang="ts" setup>
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons-vue'
</script>
<style scoped>
.title {
    margin-bottom: 16px;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 500;
    font-size: 16px;
}

.error_icon {
    color: rgba(0, 0, 0, 0.15);
}
</style>