<template>
  <el-tabs v-model="carefulName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="区县" name="区级"></el-tab-pane>
    <el-tab-pane label="企业" name="公司级"></el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from "vue"
  import type { TabsPaneContext } from "element-plus"
  const emits = defineEmits("tabClick")
  //头部选项卡默认选中
  const carefulName = ref<any>("区级")
  const handleClick = (tab: TabsPaneContext, event: Event) => {}
  onMounted(() => {})
</script>
<style lang="scss" scoped>
  /* @import "../css/index.scss"; */
</style>