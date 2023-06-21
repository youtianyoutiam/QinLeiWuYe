
<template>
  <div class="head">住户统计</div>
  <div id="mainOne" ref="main" style="width:100%;height:90%;margin: 20px auto;"></div>
</template>
<script lang="ts" setup>
import { ref, inject, onMounted } from 'vue';
// @ts-ignore
import link from "../../../api/Link.js";
// @ts-ignore
import apiUrl from "../../../api/url.js";
let echarts: any = inject("eCharts")
onMounted(() => {
  link(apiUrl.chartDataOne, 'get').then((ok: any) => {
    let data: any = [{ title: '一号楼' }, { title: '二号楼' }, { title: '三号楼' }, { title: '四号楼' }, { title: '五号楼' }, { title: '六号楼' },]
    ok.data.forEach((item: any) => {
      // xAxis.push(item)
      let flag = data.find((i: any) => { return i.title == item.title });
      if (!flag) {
        data.push(item)
      } else {
        if (flag.num) {
          flag.num += item.num
        } else {
          flag.num = item.num
        }
      }
    })
    let xAxis: Array<string> = data.map((i: any) => {
      return i.title
    })
    let yAxis: Array<number> = data.map((i: any) => {
      return i.num
    })
    // console.log(xAxis, yAxis);
    let myChart = echarts.init(document.getElementById('mainOne'));
    // console.log(myChart, 'myChart');
    // 指定图表的配置项和数据
    var option = {
      title: {},
      tooltip: {},
      legend: {
        data: ['住户'],
        x: 'right',      //可设定图例在左、右、居中
        // y: 'center',     //可设定图例在上、下、居中
        padding: [0, 50, 0, 0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
      },
      xAxis: {
        data: xAxis
      },
      yAxis: {},
      series: [
        {
          name: '住户',
          type: 'bar',
          data: yAxis,
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: { //数值样式
                  color: 'black',
                  fontSize: 16
                }
              }
            }
          },
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  });
})
</script>

<style lang="scss" scoped>
.head {
  text-align: center;
  font-size: 20px;
  padding-top: 10px;
}
</style>