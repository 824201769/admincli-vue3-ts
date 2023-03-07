<template>
  <div>
    <a-button v-permission="['banner']" type="primary">删除</a-button>
    <a-button type="primary">新增</a-button>
    <div :style="{ display: 'flex' }">
      <a-card :style="{ width: '360px' }" title="Arco Card">
        <template #extra>
          <a-link>More</a-link>
        </template>
        ByteDance's core product, Toutiao ("Headlines"), is a content platform
        in China and around the world. Toutiao started out as a news
        recommendation engine and gradually evolved into a platform delivering
        content in various formats.
      </a-card>
    </div>
    <a-collapse :default-active-key="['1', 2]">
      <a-collapse-item header="Beijing Toutiao Technology Co., Ltd." key="1">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </a-collapse-item>
      <a-collapse-item
        header="Beijing Toutiao Technology Co., Ltd."
        :key="2"
        disabled
      >
        <div>Beijing Toutiao Technology Co., Ltd.</div>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </a-collapse-item>
      <a-collapse-item header="Beijing Toutiao Technology Co., Ltd." key="3">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </a-collapse-item>
    </a-collapse>
  </div>
</template>

<script lang="ts" setup>
  // import { useRouter } from 'vue-router';
  //
  // const permission = useRouter().currentRoute.value.meta.permissions || [];
</script>

<script lang="ts">
  export default {
    name: 'TestIndex', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>
