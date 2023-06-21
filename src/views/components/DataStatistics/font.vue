<template>
  <div class="head">车位报修</div>
  <div id="mainFont" ref="main" style="width:100%;height:90%"></div>
</template>
<script lang="ts" setup>
import { ref, inject, onMounted } from 'vue';
// @ts-ignore
import link from "../../../api/Link.js";
// @ts-ignore
import apiUrl from "../../../api/url.js";
let echarts: any = inject("eCharts")
onMounted(() => {
  link(apiUrl.chartDataFour).then((ok: any) => {
    console.log(ok.data.num.一般用户
    );
    let myChart = echarts.init(document.getElementById('mainFont'));
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: ok.data.day
      },
      series: [
        {
          name: '一般用户',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: ok.data.num.一般用户
        },
        {
          name: '月租用户',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: ok.data.num.月租用户
        },
        {
          name: '特殊车辆',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: ok.data.num.特殊车辆

        }
      ]
    };
    myChart.setOption(option);
  })

})
</script>

<style lang="scss" scoped>
.head {
  text-align: center;
  font-size: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>