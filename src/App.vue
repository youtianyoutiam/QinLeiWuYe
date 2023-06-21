<template>
  <router-view />
</template>
<script lang="ts" setup>

import * as eCharts from 'echarts';
import { provide } from 'vue';
provide("eCharts", eCharts)

</script>

<style lang="scss" scoped></style>
