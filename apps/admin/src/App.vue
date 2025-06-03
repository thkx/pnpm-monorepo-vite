<script setup lang="ts">
import { ref, reactive, watch, nextTick } from 'vue';
import { theme } from 'ant-design-vue';
import type { GlobalToken } from 'ant-design-vue/es/theme';

const { useToken } = theme;
const { token } = useToken();

import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import { usePermission } from "@/store/permission";

dayjs.locale('zh');

const permission = usePermission();

permission.setThemeColor(permission.getThemeColor())

const locale = ref(zhCN.locale);
// watch(locale, val => {
// 	dayjs.locale(val);
// });

const defaultTheme = reactive<{ token: Partial<GlobalToken> }>({
	token: {
		colorPrimary: permission.themeColor.value,
		colorLink: permission.themeColor.value,
		// colorLinkHover: appStore.themeColor.value,
		// colorLinkActive: appStore.themeColor.value,
		// colorLinkVisited: appStore.themeColor.value,
	},
})

watch(permission.themeColor, (val) => {
	defaultTheme.token.colorPrimary = val;
	defaultTheme.token.colorLink = val;
	// theme.token.colorLinkHover = val;
	// theme.token.colorLinkActive = val;
	// theme.token.colorLinkVisited = val;

	nextTick(() => {
		defaultTheme.token.colorLinkHover = token.value.colorPrimaryHover
		defaultTheme.token.colorLinkActive = token.value.colorPrimaryActive
		// defaultTheme.token.colorLinkVisited = token.value.colorPrimaryHover
		// console.log(val, token.value)
	})
})
</script>

<template>
	<a-config-provider :locale="locale === 'en' ? enUS : zhCN" :theme="defaultTheme">
		<router-view />
	</a-config-provider>
</template>

<style scoped></style>
