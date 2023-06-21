<template>
  <div class="head">每日人数统计</div>
  <div id="mainTwo" ref="main" style="width:100%;height:90%"></div>
</template>
<script lang="ts" setup>
import { ref, inject, onMounted } from 'vue';
// @ts-ignore
import link from "../../../api/Link.js";
// @ts-ignore
import apiUrl from "../../../api/url.js";
let echarts: any = inject("eCharts")
onMounted(() => {
  link(apiUrl.chartDataTwo).then((ok: any) => {
    console.log(ok.data[0].num.住户);
    let myChart = echarts.init(document.getElementById('mainTwo'));
    console.log(myChart, 'myChart');
    var option = {
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      // title: {
      //   text: 'Gradient Stacked Area Chart'
      // },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['住户', '外卖', '快递', '一般访客', '授权访客']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ok.data[0].day
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '住户',
          type: 'line',
          stack: 'Total',
          label: {
            show: true,
            position: 'top'
          },
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: ok.data[0].num.住户
        },
        {
          name: '外卖',
          type: 'line',
          stack: 'Total',
          label: {
            show: true,
            position: 'top'
          },
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(0, 221, 255)'
              },
              {
                offset: 1,
                color: 'rgb(77, 119, 255)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: ok.data[0].num.外卖
        },
        {
          name: '快递',
          type: 'line',
          stack: 'Total',
          label: {
            show: true,
            position: 'top'
          },
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)'
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: ok.data[0].num.快递
        },
        {
          name: '一般访客',
          type: 'line',
          stack: 'Total',
          smooth: true,
          label: {
            show: true,
            position: 'top'
          },
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 0, 135)'
              },
              {
                offset: 1,
                color: 'rgb(135, 0, 157)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: ok.data[0].num.一般访客
        },
        {
          name: '授权访客',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 191, 0)'
              },
              {
                offset: 1,
                color: 'rgb(224, 62, 76)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: ok.data[0].num.授权访客
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