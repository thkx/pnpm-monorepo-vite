<template>

    <a-list item-layout="horizontal" class="coverCardList" rowKey="id"
        :grid="{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1, }" :data-source="data">
        <template #renderItem="{ item }">
            <a-list-item>

                <a-card class="card" hoverable>
                    <template #cover>
                        <img :alt="item.title" :src="item.cover" />
                    </template>

                    <a-card-meta :title="h('a', item.title)" :description="item.subDescription">
                    </a-card-meta>

                    <div class="cardItemContent">
                        <span>{{ dayjs(item.updatedAt).locale("zh-cn").fromNow() }}</span>
                        <div class="avatarList">
                            <div style="display: inline-block;">
                                <a-avatar-group>
                                    <template v-for="member in item.members" :key='`${item.id}-avatar-${member.id}`'>
                                        <a-tooltip :title="member.name" placement="top">
                                            <a-avatar size="small" :src="member.avatar" />
                                        </a-tooltip>
                                    </template>
                                </a-avatar-group>
                            </div>
                        </div>
                    </div>

                </a-card>
            </a-list-item>
        </template>
    </a-list>

</template>

<script lang="ts" setup>
import { h } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import "dayjs/locale/zh-cn.js"

dayjs.extend(relativeTime);

defineProps<{ data: any }>()

</script>


<style>
.coverCardList .ant-list-item {
    padding-inline: 0;
}

.coverCardList .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
}

.coverCardList .cardItemContent {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;
}

.coverCardList .cardItemContent>span {
    flex: 1;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
}

.coverCardList .cardItemContent .avatarList {
    flex: 0 1 auto;
}

.coverCardList .card .ant-card-meta-title>a {
    display: inline-block;
    max-width: 100%;
    color: rgba(0, 0, 0, 0.88);
}

.coverCardList .card:hover .ant-card-meta-title>a {
    color: #1890ff;
}
</style>
