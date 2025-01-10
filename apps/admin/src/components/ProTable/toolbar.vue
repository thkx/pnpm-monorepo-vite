<template>

    <div class="ant-pro-table-list-toolbar-container">
        <div class="ant-pro-table-title">{{ $attrs.headerTitle }}</div>

        <div class="ant-pro-table-list-toolbar-right">
            <div style="display: flex;align-items: center;gap: 8px;">
                <slot name="toolbar"></slot>
            </div>

            <div class="ant-pro-table-list-toolbar-setting-items">
                <div class="ant-pro-table-list-toolbar-setting-item">
                    <a-tooltip>
                        <template #title>刷新</template>
                        <ReloadOutlined @click="handleReload" />
                    </a-tooltip>
                </div>
                <div class="ant-pro-table-list-toolbar-setting-item">

                    <a-dropdown :trigger="['click']">

                        <a-tooltip>
                            <template #title>密度</template>
                            <ColumnHeightOutlined />
                        </a-tooltip>

                        <template #overlay>
                            <a-menu v-model:selectedKeys="size" @click="handleClick">
                                <a-menu-item key="large">默认</a-menu-item>
                                <a-menu-item key="middle">中等</a-menu-item>
                                <a-menu-item key="small">紧凑</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>

                </div>
                <div class="ant-pro-table-list-toolbar-setting-item">

                    <a-popover placement="bottomRight" trigger="click" :arrow="false">
                        <template #content>
                            <a-checkbox-group v-model:value="state.checkedList" style="width: 100%">
                                <a-tree class="draggable-tree" draggable block-node :tree-data="gData"
                                    @dragenter="onDragEnter" @drop="onDrop" default-expand-all @select="handleSelect">
                                    <template #title="{ title, key, data }">
                                        <HolderOutlined style="position: absolute;left: -22px;top: 4px;cursor: grab;" />
                                        <a-checkbox :value="key" style="margin-inline-end: 4px;">
                                            {{ title }}

                                            <a-tooltip>
                                                <template #title>{{ data.tip }}</template>
                                                <QuestionCircleOutlined v-if="data.tip" />
                                            </a-tooltip>
                                        </a-checkbox>
                                    </template>
                                </a-tree>
                            </a-checkbox-group>

                        </template>
                        <template #title>
                            <div>
                                <a-checkbox v-model:checked="state.checkAll" :indeterminate="state.indeterminate"
                                    @change="onCheckAllChange">
                                    列设置
                                </a-checkbox>
                            </div>
                        </template>
                        <a-tooltip>
                            <template #title>列设置</template>
                            <SettingOutlined />
                        </a-tooltip>
                    </a-popover>

                </div>
            </div>
        </div>
    </div>

</template>
<script lang="ts" setup>
import { ref, reactive, computed, defineEmits } from "vue";
import { ReloadOutlined, ColumnHeightOutlined, SettingOutlined, HolderOutlined, QuestionCircleOutlined } from "@ant-design/icons-vue";

import type { AntTreeNodeDragEnterEvent, AntTreeNodeDropEvent, TreeProps } from 'ant-design-vue/es/tree';

const columns = defineModel('columns', { type: Array<{ [key: string]: any }> })

const size = defineModel('size', { type: Array<String>, default: ['middle'] })

const emit = defineEmits<{reload: [value: {}]}>()

const handleClick = ({ key }: any) => {
    size.value = [key]
}

const handleReload = () => {
    emit('reload', {})
}

const keys = computed<string[]>(() => columns.value?.map((r: any) => r.key)!)

const state = reactive<{ indeterminate: boolean, checkAll: boolean, checkedList: string[] }>({
    indeterminate: !keys.value.length,
    checkAll: keys.value.length > 0,
    checkedList: keys.value || [],
});

const onCheckAllChange = (e: any) => {
    const checkedList = e.target.checked ? genData?.map((r: any) => r.key) : []

    columns.value = checkedList?.length ? genData?.filter(r => checkedList?.includes(r.key)) : []
    Object.assign(state, {
        checkedList: checkedList,
        indeterminate: false,
    });
};

const handleSelect = (_: any, e: { selected: boolean, selectedNodes: any, node: any, event: any }) => {
    // console.log(selectedKeys, e.node.key)
    const stateList = state.checkedList
    const checkedList = stateList.includes(e.node.key) ? stateList.filter(r => r != e.node.key) : [...stateList, e.node.key]

    let indeterminate: boolean = false

    if (checkedList.length == 0) {
        indeterminate = false
    } else {
        indeterminate = checkedList.length !== columns.value?.length
    }

    const checkAll: boolean = checkedList.length === columns.value?.length

    // console.log(checkedList)

    columns.value = genData?.filter(r => checkedList.includes(r.key))

    Object.assign(state, {
        checkedList,
        indeterminate,
        checkAll,
    });
}


const genData: TreeProps['treeData'] = Array.from(columns.value as any[])

type TreeDataItem = any;
const gData = ref<TreeProps['treeData']>(genData);
const onDragEnter = (_: AntTreeNodeDragEnterEvent) => {
    // console.log(info);
    // expandedKeys 需要展开时
    // expandedKeys.value = info.expandedKeys;
};

const onDrop = (info: AntTreeNodeDropEvent) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos?.split('-');
    const dropPosition = info.dropPosition - Number(dropPos![dropPos!.length - 1]);
    const loop = (data: TreeProps['treeData'], key: string | number, callback: any) => {
        data?.forEach((item, index) => {
            if (item.key === key) {
                return callback(item, index, data);
            }
            if (item.children) {
                return loop(item.children, key, callback);
            }
        });
    };
    const data = [...gData.value!];

    // Find dragObject
    let dragObj: TreeDataItem;
    loop(data, dragKey, (item: TreeDataItem, index: number, arr: TreeProps['treeData']) => {
        arr?.splice(index, 1);
        dragObj = item;
    });
    if (!info.dropToGap) {
        // Drop on the content
        loop(data, dropKey, (item: TreeDataItem) => {
            item.children = item.children || [];
            /// where to insert 示例添加到头部，可以是随意位置
            item.children.unshift(dragObj);
        });
    } else if (
        (info.node.children || []).length > 0 && // Has children
        info.node.expanded && // Is expanded
        dropPosition === 1 // On the bottom gap
    ) {
        loop(data, dropKey, (item: TreeDataItem) => {
            item.children = item.children || [];
            // where to insert 示例添加到头部，可以是随意位置
            item.children.unshift(dragObj);
        });
    } else {
        let ar: TreeProps['treeData'] = [];
        let i = 0;
        loop(data, dropKey, (_item: TreeDataItem, index: number, arr: TreeProps['treeData']) => {
            ar = arr;
            i = index;
        });
        if (dropPosition === -1) {
            ar.splice(i, 0, dragObj);
        } else {
            ar.splice(i + 1, 0, dragObj);
        }
    }

    // console.log(data)
    gData.value = data;

    columns.value = gData.value
};

</script>
<style scoped>
.ant-pro-table-list-toolbar-container {
    display: flex;
    justify-content: space-between;
    padding-block: 16px;
    padding-inline: 0;
}

.ant-pro-table-title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 500;
    font-size: 16px;
}

.ant-pro-table-list-toolbar-right {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 8px;
}

.ant-pro-table-list-toolbar-setting-items {
    display: flex;
    gap: 8px;
    line-height: 32px;
    align-items: center;
}

.ant-pro-table-list-toolbar-setting-item {
    margin-block: 0;
    margin-inline: 4px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 16px;
    cursor: pointer;
}

.ant-pro-table-list-toolbar-setting-item>span {
    display: block;
    width: 100%;
    height: 100%;
}

.ant-pro-table-list-toolbar-setting-item:hover {
    color: #1890ff;
}
</style>