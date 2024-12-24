<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script setup lang="ts"></script>

<style lang="less">
:root,
:host {
  --van-tab-font-size: 0.24rem !important;
  --van-nav-bar-height: 0.88rem !important;
  --van-nav-bar-arrow-size: 0.44rem !important;
  --van-nav-bar-title-font-size: 0.36rem !important;
  --van-divider-margin: 0 !important;
  --van-number-keyboard-button-background: #ff7d41 !important;
  --van-dropdown-menu-background: white !important;
  --van-dropdown-menu-title-active-text-color: #ff7d41 !important;
  --van-dropdown-menu-option-active-color: #ff7d41 !important;
  --van-dropdown-menu-title-text-color: #666f83 !important;
  --van-dropdown-menu-title-font-size: 0.32rem !important;
}

.van-dropdown-menu__bar {
  box-shadow: none !important;
}
</style>
