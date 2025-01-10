<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

import { isEmail } from "@pnpm-monorepo-vite/utils";
console.log(isEmail('1234556'))


import StorageProxy from "@pnpm-monorepo-vite/cache";

const proxy = StorageProxy.getInstance(localStorage, { ttl: 10000 })

type User = {
  name: string;
  age: number
}

// 存储一个对象
const user: User = { name: 'Alice', age: 30 };
proxy.storage.setItem('user', user as any);

// 获取数据并指定类型
const storedUser = proxy.storage.getItem('user');
console.log(storedUser);  // 输出：{ name: 'Alice', age: 30 }

// 等待数据超时
setTimeout(() => {
  const expiredUser = proxy.storage.getItem('user');
  console.log(expiredUser);  // 输出：null（数据已过期）
}, 10000);
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
