<template>
  <el-row class="mb-4" style="margin-bottom: 10px;">
    <el-button @click="defaultPX">默认</el-button>
    <el-button @click="AscendingPX" type="primary">升序</el-button>
    <el-button @click="DescendingPX" type="success">降序</el-button>
  </el-row>
  <el-table :data="tableData.listData.slice((currentPage4 - 1) * pageSize4, currentPage4 * pageSize4)"
    style="width: 100%">
    <el-table-column prop="id" label="编号" />
    <el-table-column prop="title" label="楼盘地址" />
    <el-table-column prop="type" label="房源类型" />
    <el-table-column prop="num" label="门牌号" />
    <el-table-column prop="name" label="户主" />
    <el-table-column>
      <template #header>
        <el-input v-model="inputName" size="small" placeholder="请输入你要查询的姓名" @blur="inputNames"></el-input>
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
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import link from '../../../api/Link.js';
import apiUrl from '../../../api/url.js';

// 默认排序
let defaultPX = () => {
  link(apiUrl.HouseholdInformation).then((ok: any) => {
    tableData.listData = ok.data;
  })
}
//升序
let AscendingPX = () => {
  tableData.listData = tableData.listData.sort((a, b) => {
    return a.id - b.id
  })
}
//降序
let DescendingPX = () => {
  tableData.listData = tableData.listData.sort((a, b) => {
    return b.id - a.id
  })
}
//查询名字信息
const inputName = ref('');
let inputNames = () => {
  if (inputName.value == "") {
    link(apiUrl.HouseholdInformation).then((ok: any) => {
      tableData.listData = ok.data;
    })
  } else {
    tableData.listData = tableData.listData.filter(i => {
      var reg = new RegExp(inputName.value, "gi");
      return reg.test(i.name)
    })
    // link(apiUrl.HouseholdInformation, "GET", {}, { name: inputName.value }).then((ok: any) => {
    //   tableData.listData = ok.data;
    // })
  }
}
// 列表数据
let tableData = reactive({
  listData: []
})
onMounted(() => {
  link(apiUrl.HouseholdInformation).then((ok: any) => {
    tableData.listData = ok.data;
  })
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