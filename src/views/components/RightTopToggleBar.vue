<template>
  <div class="main">
    <el-icon v-if="store.state.HomeModule.navBool" @click="ck">
      <CaretLeft />
    </el-icon>
    <el-icon v-else="a" @click="ck">
      <CaretRight />
    </el-icon>
    <div class="item">
      <el-row class="demo-avatar demo-basic">
        <el-col :span="12">
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="43">
                <img src="../../imgs/uses/use.png" alt="">
              </el-avatar>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="UseName">{{ UesName }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import Link from '../../api/Link.js';
// @ts-ignore
import UriApi from '../../api/url.js';
import { CaretLeft, CaretRight } from '@element-plus/icons-vue';
import { ref, onMounted, reactive, toRefs } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
let router = useRouter()
let store = useStore();

let UesName = ref()
// let a: any = ref(true);
// onMounted(() => {
//   console.log(store.state, "!!!!");
// })
let ck = () => {
  // return a.value = !a.value;
  // store.commitn()
  //调用mutations方法 对state里面的数据进行处理
  store.commit("aaa")
}
const useNameID = store.state.HomeModule.UserAccountID;
onMounted(() => {
  if (useNameID) {
    Link(UriApi.url + "/" + useNameID).then((ok: any) => {
      UesName.value = ok.data.name
    })
  } else {
    // router.push('/Login')
    // console.log(1);
    UesName.value = '测试用户'
  }
})
</script>

<style lang="scss" scoped>
.el-icon {
  height: 100%;
  font-size: 2.5em;
}

.main {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}

.main .item {
  display: flex;
  align-items: center;
}

.main .item .UseName {
  padding: 0.1875rem;
  font-size: 0.25rem;
  color: pink;
}
</style>