<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="20">
        <lefNavigation />
      </el-aside>
      <el-container>
        <el-header>
          <RightTopToggleBar />
        </el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import lefNavigation from "../components/LeftNavigation.vue";
import RightTopToggleBar from "../components/RightTopToggleBar.vue"
</script>
<style  scoped>
.common-layout,
.el-container {
  height: 97vh;
}

/* .el-header {
  background-color: blue;
} */

.el-main {
  background-color: #eaeaea;
}
</style>