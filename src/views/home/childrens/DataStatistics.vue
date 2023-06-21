<template>
  <!-- <div>数据统计</div> -->
  <div class="WholeDisplay">
    <div class="DisplayLeft">
      <item>
        <template #itemOne>
          <one></one>
        </template>
      </item>
      <item>
        <template #itemTwo>
          <two></two>
        </template>
      </item>
    </div>
    <div class="DisplayRight">
      <item>
        <template #itemThree>
          <three></three>
        </template>
      </item>
      <item>
        <template #itemFont>
          <font></font>
        </template>
      </item>
    </div>
  </div>
</template>

<script lang="ts" setup>
import item from "../../components/DataStatistics/single.vue";
import one from "../../components/DataStatistics/one.vue"
import two from "../../components/DataStatistics/two.vue"
import three from "../../components/DataStatistics/three.vue"
import font from "../../components/DataStatistics/font.vue"
</script>

<style lang="scss" scoped>
.WholeDisplay {
  width: 100%;
  background-color: #eaeaea;
  display: flex;

  .DisplayLeft {
    flex: 1;
  }

  .DisplayRight {
    flex: 1;
  }
}
</style>