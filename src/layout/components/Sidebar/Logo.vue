<script lang="ts" setup>
  import { useSettingsStore } from "@/store/modules/settings"

  const settingsStore = useSettingsStore()

  defineProps({
    collapse: {
      type: Boolean,
      required: true,
    },
  })

  const logo = ref(new URL(`../../../assets/665564.ico`, import.meta.url).href)
</script>

<template>
  <div class="w-full h-[50px] bg-gray-800 dark:bg-[var(--el-bg-color-overlay)]">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="h-full w-full flex items-center justify-center logo_title" to="/">
        <img v-if="settingsStore.sidebarLogo" :src="logo" class="w-5 h-5" />
        <span v-else class="ml-3 text-white text-sm font-bold">泸州市城管领域有限空间安全管理系统</span>
      </router-link>

      <router-link v-else key="expand" class="h-full w-full flex items-center justify-center logo_title" to="/">
        <img v-if="settingsStore.sidebarLogo" :src="logo" style="width: 24px; height: 22px" />
        <span style="margin-left: 5px" class="ml-3 text-white text-sm font-bold">泸州市城管领域有限空间安全管理系统</span>
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  // https://cn.vuejs.org/guide/built-ins/transition.html#the-transition-component
  .sidebarLogoFade-enter-active {
    transition: opacity 2s;
  }
  .logo_title {
    padding: 8px;
  }

  .sidebarLogoFade-leave-active,
  .sidebarLogoFade-enter-from,
  .sidebarLogoFade-leave-to {
    opacity: 0;
  }
</style>
