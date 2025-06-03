<template>
    <a-row :gutter="24">
        <a-col :lg="7" :md='24'>
            <a-card :bordered="false" style="margin-bottom: 24px;" :loading="loading">
                <div v-if="!loading && currentUser">
                    <div class="avatarHolder">
                        <img alt="" :src="currentUser.avatar" />
                        <div class="name">{{ currentUser.name }}</div>
                        <div>{{ currentUser.signature }}</div>
                    </div>

                    <div class="detail">
                        <p>
                            <ContactsOutlined style="margin-right: 8px;" />
                            {{ currentUser.title }}
                        </p>
                        <p>
                            <ClusterOutlined style="margin-right: 8px;" />
                            {{ currentUser.group }}
                        </p>
                        <p>
                            <HomeOutlined style="margin-right: 8px;" />
                            {{ currentUser.geographic.province.label || '' }}
                            {{ currentUser.geographic.city.label || '' }}
                        </p>
                    </div>

                    <a-divider dashed />
                    <div class="tags">
                        <div class="tagsTitle">标签</div>
                        <template v-for="tag in currentUser.tags" :key="tag">
                            <a-tag>
                                {{ tag.label }}
                            </a-tag>
                        </template>

                        <a-input v-if="inputVisible" ref="inputRef" v-model:value="inputValue" type="text" size="small"
                            :style="{ width: '78px' }" @blur="handleInputConfirm" @keyup.enter="handleInputConfirm" />
                        <a-tag v-else style="background: #fff; border-style: dashed" @click="showInput">
                            <plus-outlined />
                        </a-tag>
                    </div>

                    <a-divider style="margin-top: 16px" dashed />
                    <div class="team">
                        <div class="teamTitle">团队</div>
                        <a-row :gutter="36">
                            <template v-if="currentUser.notice">
                                <a-col v-for="item in currentUser.notice" :key="item.id" :lg="24" :xl="12">
                                    <a :href="item.href">
                                        <a-avatar size="small" :src="item.logo" />
                                        {{ item.member }}
                                    </a>
                                </a-col>
                            </template>
                        </a-row>
                    </div>
                </div>
            </a-card>
        </a-col>
        <a-col :lg="17" :md="24">
            <a-card class="tabsCard" :bordered="false" :tabList="operationTabList" :activeTabKey="tabKey"
                @tabChange="handleTabChange">
                <Articles :data="tableData" v-if="tabKey === 'articles'" />
                <Applications :data="tableData" v-if="tabKey === 'applications'" />
                <Projects :data="tableData" v-if="tabKey === 'projects'" />
            </a-card>
        </a-col>
    </a-row>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, nextTick, h } from 'vue'
import { ContactsOutlined, ClusterOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons-vue'

import Projects from './components/Projects/index.vue'
import Articles from './components/Articles/index.vue'
import Applications from './components/Applications/index.vue'

import { currentUserDetail, fakeListDetail } from './service'
import type { CurrentUser, ListItemDataType } from './data.d'

const inputRef = ref()

const operationTabList = [
    {
        key: 'articles',
        tab: h('span', ['文章 ', h('span', { style: { fontSize: 14, } }, "(8)")]),
    },
    {
        key: 'applications',
        tab: h('span', ['应用 ', h('span', { style: { fontSize: 14, } }, "(8)")])
    },
    {
        key: 'projects',
        tab: h('span', ['项目 ', h('span', { style: { fontSize: 14, } }, "(8)")])
    },
];

const state = reactive({
    loading: false,
    currentUser: { geographic: { province: { label: '' }, city: { label: '' } } } as CurrentUser,
    inputVisible: false,
    inputValue: '',
    tabKey: 'articles',
    tableData: [] as ListItemDataType[],
})

const { loading, currentUser, inputVisible, inputValue, tabKey, tableData } = toRefs(state)


function handleTabChange(_tabKey: string) {
    tabKey.value = _tabKey
}

const showInput = () => {
    inputVisible.value = true;
    nextTick(() => {
        inputRef.value.focus();
    });
};

const handleInputConfirm = () => {
    const inputValue = state.inputValue;
    const user = currentUser.value;
    if (inputValue && user.tags.map(r => r.label).indexOf(inputValue) === -1) {
        user.tags = [...user.tags, { key: inputValue, label: inputValue }];
    }

    Object.assign(state, {
        currentUser: user,
        inputVisible: false,
        inputValue: '',
    });
};

async function getCurrentUser() {
    const [err, resp] = await currentUserDetail()
    if (!err) {
        currentUser.value = resp!
    }
}

async function getFakeList() {
    const [err, resp] = await fakeListDetail()
    if (!err) {
        console.log(resp)
        tableData.value = resp!
    }
}

getCurrentUser()
getFakeList()
</script>
<style scoped>
.avatarHolder {
    margin-bottom: 24px;
    text-align: center;
}

.avatarHolder img {
    width: 104px;
    height: 104px;
    margin-bottom: 20px;
}

.avatarHolder .name {
    margin-bottom: 4px;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
}

.detail p {
    position: relative;
    margin-bottom: 8px;
    padding-left: 26px;
}

.tags .ant-tag {
    margin-bottom: 8px;
}

.tags .tagsTitle,
.team .teamTitle {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 500;
}

.team a {
    display: block;
    margin-bottom: 24px;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.88);
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-transition: color 0.3s;
    transition: color 0.3s;
}

.team a:hover {
    color: var(--color-customization);
}

.team .ant-avatar {
    margin-right: 12px;
}
</style>