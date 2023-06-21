<template>
  <el-table :data="data.slice((currentPage4 - 1) * pageSize4, currentPage4 * pageSize4)" border style="width: 100%">
    <el-table-column prop="num" label="小区号" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="ElectricChargee" label="电费" />
    <el-table-column prop="WaterRate" label="水费" />
    <el-table-column prop="SanitaryFee" label="卫生费" />
    <el-table-column fixed="right" label="交费" width="120">
      <template #default='scope'>
        <el-button link type="primary" size="small" @click="dimensional(scope.$index, scope.row)">生成二维码</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="padding-top: 10px;"></div>
  <div class="demo-pagination-block">
    <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
      layout="total, sizes, prev, pager, next, jumper" :total="data.length" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
  <teleport to="#app">
    <div class="BJYS" v-show="EWM">
      <div class="qrcode">
        <div ref="qrcodeDom" id="qrcode"></div>
        <el-row class="mb-4">
          <el-button type="primary" @click="EWM = !EWM" style="margin-top: 10px;">关闭</el-button>
        </el-row>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts" setup>
// @ts-ignore
import QRcode from "qrcodejs2";
// @ts-ignore
import Link from "../../../api/Link.js";
// @ts-ignore
import UriApi from "../../../api/url.js";
import { onMounted, reactive, ref } from "vue";
import { nextTick } from "vue";
let EWM = ref(false)
const qrcodeDom = ref(null)
let dimensional = (index: number, row: any) => {
  console.log(index, row);
  EWM.value = !EWM.value;
  let itme = `姓名${row.name},楼号${row.num},电费${row.ElectricChargee},水费${row.WaterRate},卫生费${row.SanitaryFee}`
  nextTick(() => {
    new QRcode(qrcodeDom.value, {
      text: itme,
      colorDark: "#000",
      colorLight: "#fff",
      // correctLevel: QRcode.CorrectLevel.H
    })
  })
  const codeHtml = document.getElementById("qrcode");
  // @ts-ignore
  codeHtml.innerHTML = "";
};
let data: any = reactive([]);
onMounted(() => {
  Link(UriApi.PaymentRecord).then((ok: any) => {
    // data.push(ok.data);
    ok.data.forEach((itme: any) => {
      data.push(itme)
    });
    console.log(data);
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
.el-pagination {
  justify-content: center;
}

.qrcode {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-40%, -100%);

}

.BJYS {
  width: 99%;
  height: 99%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 9;
  position: absolute;
}

.el-row {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>