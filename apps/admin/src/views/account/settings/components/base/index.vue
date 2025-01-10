<template>
    <div class="baseView">
        <div class="left">
            <a-form layout="vertical" :model="formState" @finishFailed="onFinishFailed" @finish="onFinish">
                <a-form-item label="邮箱" name="email" :rules="[{ required: true, message: '请输入您的邮箱!' }]">
                    <a-input v-model:value="formState.email" placeholder="请输入您的邮箱" allowClear />
                </a-form-item>
                <a-form-item label="昵称" name="name" :rules="[{ required: true, message: '请输入您的昵称!' }]">
                    <a-input v-model:value="formState.name" placeholder="请输入您的昵称" allowClear />
                </a-form-item>
                <a-form-item label="个人简介" name="profile" :rules="[{ required: true, message: '请输入个人简介!' }]">
                    <a-textarea v-model:value="formState.profile" />
                </a-form-item>
                <a-form-item label="国家/地区" name="country" :rules="[{ required: true, message: '请输入您的国家或地区!' }]">
                    <a-select v-model:value="formState.country" placeholder="" allowClear>
                        <a-select-option value="China">中国</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item label="所在省市">
                    <a-cascader v-model:value="geographic" :options="options" :load-data="loadData" placeholder="请选择"
                        change-on-select allowClear />
                </a-form-item>

                <a-form-item label="街道地址" name="address" :rules="[{ required: true, message: '请输入您的街道地址!' }]">
                    <a-input v-model:value="formState.address" placeholder="请输入您的街道地址" allowClear />
                </a-form-item>

                <a-form-item label="联系电话" name="phone"
                    :rules="[{ required: true, message: '请输入您的联系电话!' }, { validator: validatorPhone }]"
                    :autoLink="false">
                    <a-input-group>
                        <a-row :gutter="24">
                            <a-col :span="9">
                                <a-input v-model:value="formState.phone.split('-')[0]"
                                    @change="(e: any) => handleChange(e.target.value, 0)" />
                            </a-col>
                            <a-col :span="15">
                                <a-input v-model:value="formState.phone.split('-')[1]"
                                    @change="(e: any) => handleChange(e.target.value, 1)" />
                            </a-col>
                        </a-row>
                    </a-input-group>
                </a-form-item>

                <a-form-item>
                    <a-button type="primary" html-type="submit">更新基本信息</a-button>
                </a-form-item>
            </a-form>
        </div>
        <div class="right">

            <div class="avatar_title">头像</div>
            <div class="avatar">
                <img :src="formState.avatar" alt="avatar" />
            </div>
            <a-upload :show-upload-list="false">
                <div class="button_view">
                    <a-button>
                        <UploadOutlined />
                        更换头像
                    </a-button>
                </div>
            </a-upload>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { toRefs, reactive } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import type { CascaderProps } from 'ant-design-vue'

import { getCurrentUser, getCity, getProvince } from '../../service'
import type { GeographicItemType, CurrentUser } from '../../data.d'

type Option = GeographicItemType & {
    value?: string,
    label?: string,
    isLeaf?: boolean,
    children?: Option[]
}

type FormState = {
    options: Option[];
    formState: CurrentUser & { profile?: string };
    phoneValue: string[];
    geographic: GeographicItemType[];
}

const state = reactive<FormState>({
    options: [],
    formState: {
        name: '',
        avatar: '',
        userid: '',
        notice: [],
        email: '',
        signature: '',
        title: '',
        group: '',
        tags: [],
        notifyCount: 0,
        unreadCount: 0,
        country: '',
        geographic: {
            province: {
                name: '',
                id: '',
            },
            city: {
                name: '',
                id: '',
            },
        },
        address: '',
        phone: '',
        profile: '',
    },
    phoneValue: [],
    geographic: [],
})

const validatorPhone = (_: any, value: string) => {
    const vs = value.split('-')
    if (!vs[0]) {
        return Promise.reject('Please input your area code!');
    }
    if (!vs[1]) {
        return Promise.reject('Please input your phone number!');
    }
    return Promise.resolve();
};

const { options, formState, phoneValue, geographic } = toRefs(state)


const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const handleChange = (value: string, index: number) => {
    // console.log(value, index)
    const phone = formState.value.phone.split('-')
    phone[index] = value
    formState.value.phone = phone.join('-')
}

const loadData: CascaderProps['loadData'] = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    const [err, resp] = await getCity(targetOption.value as string)
    if (!err) {
        targetOption.loading = false;

        targetOption.children = Array.from(resp?.city || []).map(r => ({ ...r, value: r.id, label: r.name }));
        options.value = [...options.value];
    }

    // load options lazily
    // setTimeout(() => {
    //     targetOption.loading = false;
    //     targetOption.children = [
    //         {
    //             label: `${targetOption.label} Dynamic 1`,
    //             value: 'dynamic1',
    //         },
    //         {
    //             label: `${targetOption.label} Dynamic 2`,
    //             value: 'dynamic2',
    //         },
    //     ];
    //     options.value = [...options.value];
    // }, 1000);
};

async function getProvinceData() {
    const [err, resp] = await getProvince()
    // console.log(!err, resp)
    if (!err) {
        options.value = Array.from(resp?.province || []).map(r => ({ ...r, value: r.id, label: r.name, isLeaf: false }))
    }
}

async function getUser() {
    const [err, resp] = await getCurrentUser()
    if (!err) {
        formState.value = resp!
        phoneValue.value = formState.value.phone.split('-')
    }
}

getProvinceData()
getUser()
</script>

<style scoped>
.baseView {
    display: flex;
    padding-top: 12px;
}

.baseView .right {
    flex: 1;
    padding-left: 104px;
}

.baseView .right .avatar_title {
    height: 22px;
    margin-bottom: 8px;
    line-height: 22px;
}

.baseView .right .avatar {
    width: 144px;
    height: 144px;
    margin-bottom: 12px;
    overflow: hidden;
}

.baseView .right .avatar img {
    width: 100%
}

.baseView .button_view {
    width: 144px;
    text-align: center;
}

.baseView .area_code {
    width: 72px;
}

.baseView .phone_number {
    width: 214px
}

/* right: {
      flex: '1',
      paddingLeft: '104px',
      [`@media screen and (max-width: ${token.screenXL}px)`]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '448px',
        padding: '20px',
      },
    },
    avatar_title: {
      height: '22px',
      marginBottom: '8px',
      color: token.colorTextHeading,
      fontSize: token.fontSize,
      lineHeight: '22px',
      [`@media screen and (max-width: ${token.screenXL}px)`]: {
        display: 'none',
      },
    }, */
</style>
