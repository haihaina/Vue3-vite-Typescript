<script lang="ts" setup>
import {onMounted,onUnmounted} from 'vue';
    import * as echarts from "echarts";
    let echart = echarts;
    onMounted(() => {
      initChart();
    });
    onUnmounted(() => {
      echart.dispose;
    });
    function initChart() {
    let z =document.getElementById("myEcharts") as HTMLInputElement
    const randomData:any = []
    for(let i=0; i<=12;i++){
         let random:number = Math.random() * 1000
        randomData.push(random)
    }
   
      let chart = echart.init(z, "dark");
      // 配置和数据放这里
      chart.setOption({
        xAxis: {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ]
        },
        tooltip: {
          trigger: "axis"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: randomData,
            type: "line",
            smooth: true
          }
        ]
      });
    }
</script>
<template>
    echart
    <div class="echarts-box">
    <div id="myEcharts" :style="{ width: '80vw', height: '300px' }"></div>
  </div>
</template>
