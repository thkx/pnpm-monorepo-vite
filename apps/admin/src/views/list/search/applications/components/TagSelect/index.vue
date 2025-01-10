<template>
    <a-row>
        <a-col style="flex: auto;max-width: 100%;">
            <div class="tag-select">
                <a-checkable-tag v-model:checked="tagAll" @change="handleChangeAll">
                    {{ selectAllText }}
                </a-checkable-tag>
                <a-checkable-tag v-for="tag in modelValue" :key="tag" v-model:checked="tag.value"
                    @change="(checked: boolean) => handleChange(tag, checked)">
                    {{ tag.label }}
                </a-checkable-tag>

                <a class="trigger" @click="setExpand(!expand);">
                    <template v-if="expand">
                        {{ collapseText }}
                        <UpOutlined />
                    </template>

                    <template v-else>
                        {{ expandText }}
                        <DownOutlined />
                    </template>
                </a>
            </div>
        </a-col>
    </a-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { UpOutlined, DownOutlined } from '@ant-design/icons-vue';

type TagItem = { label: string, value: boolean, key?: string }

type TagSelectProps = {
    expandable: boolean;
    expandText?: string;
    collapseText?: string;
    selectAllText?: string;
}

const modelValue = defineModel('value', { type: Array<TagItem> })

withDefaults(defineProps<TagSelectProps>(), {
    expandable: false,
    expandText: '展开',
    collapseText: '收起',
    selectAllText: '全部'
})

const expand = ref(false)
const tagAll = ref(false)

const handleChange = (tag: TagItem, checked: boolean) => {
    console.log(tag, checked);
    const old = [...new Set(modelValue.value?.map(r => r.value))]
    tagAll.value = old.length > 1 ? false : old[0]
};

function setExpand(value: boolean) {
    expand.value = value
}

function handleChangeAll(checked: boolean) {
    modelValue.value = modelValue.value?.map(r => {
        r.value = checked
        return r
    })
}

</script>

<style scoped>
.tag-select {
    position: relative;
    max-height: 32px;
    margin-left: -8px;
    overflow: hidden;
    line-height: 32px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    user-select: none;
}

.trigger {
    position: absolute;
    top: 0;
    right: 0;
}

.tag-select .ant-tag {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
}
</style>
