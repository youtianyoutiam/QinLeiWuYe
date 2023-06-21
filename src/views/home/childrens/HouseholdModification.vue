<template>
  <el-row class="mb-4" style="padding-bottom:10px;">
    <el-button type="primary" @click="UserAppend">添加</el-button>
  </el-row>
  <el-table :data="tableData.listData.slice((currentPage4 - 1) * pageSize4, currentPage4 * pageSize4)"
    style="width: 100%">
    <el-table-column prop="id" label="编号" />
    <el-table-column prop="title" label="楼盘地址" />
    <el-table-column prop="type" label="房源类型" />
    <el-table-column prop="num" label="门牌号" />
    <el-table-column prop="name" label="户主" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- //分页显示 -->
  <div style="padding-top: 10px;"></div>
  <div class="demo-pagination-block">
    <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
      layout="total, sizes, prev, pager, next, jumper" :total="tableData.listData.length" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
  <PopUpBox @JvBu="JvBu"></PopUpBox>
  <AddBox :userget="userget"></AddBox>
</template>
<script lang="ts" setup>
import { useStore } from 'vuex';
import { ref, onMounted, reactive } from 'vue';
// @ts-ignore
import link from '../../../api/Link.js';
// @ts-ignore
import apiUrl from '../../../api/url.js';
import PopUpBox from '../../components/UserModifyPop-up.vue';
import AddBox from '../../components/UserDefiniteAddition.vue';
let store = useStore();
//封装一个获取用户Get请求
let userget = () => {
  console.log('11111111111');
  link(apiUrl.HouseholdInformation).then((ok: any) => {
    tableData.listData = ok.data;
  })
}
//修改删除
interface User {
  date: string
  name: string
  address: string
}
//修改
const handleEdit = (index: number, row: User) => {
  console.log(row);
  store.commit("UserModification");
  store.commit('UserModificationID', row);
  console.log(store.state.HomeModule.UserModificationID, 'id');
}
//点击删除
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
  // console.log(row.id);
  link(apiUrl.HouseholdInformation + '/' + row.id, "delete").then((ok: any) => {
    console.log(ok, 'ok');
    userget()
  })
}
// 列表数据
let tableData = reactive({
  listData: []
})
onMounted(() => {
  userget()
})
//当前分页显示位置
const currentPage4 = ref(1)
//每页分页显示个数
const pageSize4 = ref(10)
//分页显示条数
const handleSizeChange = (val: number) => {
  pageSize4.value = val;
}
//当前分页显示位置
const handleCurrentChange = (val: number) => {
  currentPage4.value = val;
}
//确定重新调用接口
let JvBu = (i: any) => {
  // console.log(i);
  if (i) {
    userget()
  }
}
//点击添加按钮
let UserAppend = () => {
  store.commit('UserAdditionForm')
} 
</script>

<style lang="scss" scoped>
.demo-pagination-block+.demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

.el-pagination {
  justify-content: center;
}
</style>