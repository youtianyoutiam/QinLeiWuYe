<template>
  <div class="item">
    <slot name="itemOne"></slot>
    <slot name="itemTwo"></slot>
    <slot name="itemThree"></slot>
    <slot name="itemFont"></slot>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.item {
  height: 40vh;
  margin: 0.125rem;
  background-color: azure;
}
</style>