<template>
  <div class="head">事故报修</div>
  <div id="mainThree" ref="main" style="width:100%;height:90%"></div>
</template>
<script lang="ts" setup>
import { ref, inject, onMounted } from 'vue';
// @ts-ignore
import link from "../../../api/Link.js";
// @ts-ignore
import apiUrl from "../../../api/url.js";
let echarts: any = inject("eCharts")
onMounted(() => {
  link(apiUrl.chartDataThree).then((ok: any) => {
    console.log(ok.data);
    let myChart = echarts.init(document.getElementById('mainThree'));
    let option = {
      title: {
        text: '',
        subtext: '',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        padding: [0, 0, 0, 50],
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: ok.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
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