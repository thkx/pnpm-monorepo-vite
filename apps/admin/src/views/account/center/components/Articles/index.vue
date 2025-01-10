<template>
    <a-list item-layout="vertical" size="default" class="articleList" rowKey="id" :data-source="data">
        <template #renderItem="{ item }">
            <a-list-item :key="item.id" class="">
                <template #actions>
                    <span>
                        <StarOutlined /> {{ item.star }}
                    </span>
                    <span>
                        <LikeOutlined /> {{ item.like }}
                    </span>
                    <span>
                        <MessageOutlined /> {{ item.message }}
                    </span>
                </template>

                <template #extra>
                    <!-- <img width="272" alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" /> -->
                </template>

                <a-list-item-meta>
                    <template #title>
                        <a class="title">{{ item.title }}</a>
                    </template>
                    <!-- <template #avatar><a-avatar :src="item.avatar" /></template> -->
                    <template #description>
                        <span>
                            <a-tag>Ant Design</a-tag>
                            <a-tag>设计语言</a-tag>
                            <a-tag>蚂蚁金服</a-tag>
                        </span>
                    </template>
                </a-list-item-meta>

                <div>
                    <div class="description">{{ item.content }}</div>
                    <div class="extra">
                        <a-avatar :src="item.avatar" size="small" />
                        <a :href="item.href">{{ item.owner }}</a> 发布在 <a :href="item.href">{{ item.href }}</a>
                        <em>{{ dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm') }}</em>
                    </div>
                </div>

            </a-list-item>
        </template>
    </a-list>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue'

defineProps<{ data: any }>()

</script>


<style>
.articleList .ant-list-item:first-child {
    padding-top: 0;
}

.articleList .description {
    max-width: 720px;
    line-height: 22px
}

.articleList .extra {
    margin-top: 16px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 22px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    gap: 8px;
}

.articleList .extra>em {
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.25);
    font-style: normal;
}
</style>