<template>
  <!-- //element 可以添加router属性根据 index的值进行跳转 -->
  <el-menu default-active="2" :collapse="store.state.HomeModule.navBool" class="el-menu-vertical-demo" @open="handleOpen"
    @close="handleClose" router>
    <template v-for="v in router.matched[0].children" :key="v.path">
      <!-- //有下拉框 -->
      <el-sub-menu :index="v.name" v-if="v.children">
        <template #title>
          <el-icon>
            <component :is="v.meta.icon"></component>
          </el-icon>
          <span>{{ v.meta.name }}</span>
        </template>
        <el-menu-item-group title="" v-for="val  in v.children" :key="val.path">
          <el-menu-item :index="val.name">{{ val.meta.name }}</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <!-- //无下拉框 -->
      <el-menu-item :index="v.name" v-else>
        <el-icon>
          <!-- <setting /> -->
          <component :is="v.meta.icon"></component>
        </el-icon>
        <span>{{ v.meta.name }}&nbsp;&nbsp;&nbsp;</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { template } from 'lodash';
let store = useStore();
let router = useRoute();
onMounted(() => {
  //获取当前路的所有信息
  console.log(router.matched[0].children[0].meta);
})
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped></style>