<template>
    <a-list class="filterCardList" item-layout="hoverable" :grid="{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1, }"
        :data-source="data">
        <template #renderItem="{ item }">
            <a-list-item>
                <a-card hoverable :bodyStyle="{ paddingBottom: 20 }">
                    <template #actions>
                        <a-tooltip key="download" title="下载">
                            <DownloadOutlined />
                        </a-tooltip>
                        <a-tooltip title="编辑" key="edit">
                            <EditOutlined />
                        </a-tooltip>
                        <a-tooltip title="分享" key="share">
                            <ShareAltOutlined />
                        </a-tooltip>
                        <a-dropdown>
                            <EllipsisOutlined />
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item>
                                        <a href="javascript:;">1st menu item</a>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <a href="javascript:;">2nd menu item</a>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <a href="javascript:;">3rd menu item</a>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </template>

                    <a-card-meta :title="item.title" description="">
                        <template #avatar>
                            <a-avatar size="small" :src="item.avatar" />
                        </template>
                    </a-card-meta>

                    <div class="cardInfo">
                        <div>
                            <p>活跃用户</p>
                            <p>{{ item.activeUser }}</p>
                        </div>
                        <div>
                            <p>新增用户</p>
                            <p>{{ item.newUser }}</p>
                        </div>
                    </div>
                </a-card>
            </a-list-item>
        </template>
    </a-list>
</template>

<script lang="ts" setup>
import { DownloadOutlined, EditOutlined, ShareAltOutlined, EllipsisOutlined } from '@ant-design/icons-vue'

defineProps<{ data: any }>()

</script>


<style>
.filterCardList {
    margin-bottom: -24px;
}

.filterCardList .ant-list-item {
    padding-inline: 0;
}

.filterCardList .ant-card-meta-content {
    margin-top: 0;
}

.filterCardList .ant-card-meta-avatar {
    font-size: 0;
}

.filterCardList .ant-list .ant-list-item-content-single {
    max-width: 100%;
}

.filterCardList .cardInfo {
    margin-top: 16px;
    margin-left: 40px;
    zoom: 1;
}

.filterCardList .cardInfo::before, .filterCardList .cardInfo::after {
    display: table;
    content: ' ';
}

.filterCardList .cardInfo::after {
    clear: both;
    height: 0;
    font-size: 0;
    visibility: hidden;
}

.filterCardList .cardInfo > div {
    position: relative;
    float: left;
    width: 50%;
    text-align: left;
}

.filterCardList .cardInfo > div p {
    margin: 0;
    font-size: 24px;
    line-height: 32px;
}

.filterCardList .cardInfo > div p:first-child{
    margin-bottom: 4px;
    font-size: 12px;
    line-height: 20px;
}

</style>
