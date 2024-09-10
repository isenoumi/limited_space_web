<template>
  <el-card v-loading="loading">
    <div class="title">区县有限空间自查台账统计</div>
    <div class="main">
      <div class="left">
        <div class="search">
          <!-- <div class="item" v-for="item in dateList" :key="item">
            <a class="controlsButton" @click="dateButton(item)"> {{item}} </a>
          </div> -->

          <div class="item">
            <el-date-picker v-model="dateTime" @change="dataTimeChange" type="datetimerange" start-placeholder="开始时间" value-format="YYYY-MM-DD HH:mm:ss" end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" />
          </div>
        </div>
        <div class="echarts">
          <div class="echartsTitle">完成率统计</div>
          <div id="circular-diagram"></div>
        </div>

      </div>
      <div class="right">
        <div class="complete">
          <div class="completeTitle">
            <span>区县排名</span>
          </div>
          <div class="list">
            <el-table :data="completeTableData" style="width: 100%" @row-click="rowClick">
              <el-table-column type="index" label="" width="40" />
              <el-table-column prop="companyId" align='center' label="名称" width="140" />
              <el-table-column prop="completionRate" align='center' label="完成率" width="120">
                <template #default="{row}">
                  <div>
                    {{ row.completionRate*100+'%' }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="zichashu" align='center' label="累计自查次数" width="120" />
            </el-table>
          </div>
        </div>
        <!-- <div class="complete">
          <div class="completeTitle">
            <span>未完成列表</span>
            <a style="color:#409eff" @click="view('incomplete')">查看全部</a>
          </div>
          <div class="list">
            <el-table :data="incompleteTableData" style="width: 100%">
              <el-table-column type="index" label="" width="40" />
              <el-table-column prop="date" align='center' label="企业（单位）名称" width="240" />
              <el-table-column prop="name" align='center' label="累计自查次数" width="120" />
            </el-table>
          </div>
        </div> -->

      </div>
    </div>
    <div class="back">
      <el-button type="primary" @click="back"> 返回 </el-button>

    </div>

  </el-card>
</template>

<script setup>
  import { getSelfHistogramList } from "./api"
  import * as echarts from "echarts"
  import { onMounted, ref } from "vue"
  import { useRouter } from "vue-router"
  const router = useRouter()
  const x = ref(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"])
  const y = ref([20, 30, 50, 77, 38, 89, 64])
  const loading = ref(false)
  const dateList = ["今日", "本日", "本月", "今年"]
  const dateTime = ref([])
  const startTime = ref("")
  const endTime = ref("")
  const setMyChart = (x, y) => {
    var chartDom = document.getElementById("circular-diagram")
    var myChart = echarts.init(chartDom)

    var option = {
      xAxis: {
        type: "category",
        data: x,
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 100,
        interval: 10,
      },
      series: [
        {
          data: y,
          type: "bar",
          barMaxWidth: "60px",

          label: {
            show: true, // 开启显示
            position: "top", // 在上方显示
            distance: 15, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效
            verticalAlign: "middle",
            textStyle: {
              color: "#424656", // 顶部数据的颜色
              fontSize: 14, // 顶部数据的字体大小
            },
            formatter: function (params) {
              // dataIndex是当前柱状图的索引
              let num = y[params.dataIndex]

              return num + "%" // 此处return的字符串可根据自身项目需求自定义
            },
          },
        },
      ],
    }
    myChart.setOption(option)
    myChart.on("click", function (params) {
      router.push({
        path: "/enterpriseStatisticsSelf",
        query: { companyId: params.name },
      })
    })
  }
  const rowClick = (row) => {
    router.push({
      path: "/enterpriseStatisticsSelf",
      query: { companyId: row.companyId },
    })
  }
  const completeTableData = ref([{ date: "丰川祥子", name: 17 }])
  const view = (type) => {}
  const dateButton = (type) => {}
  const back = () => {
    router.back()
  }
  const dataTimeChange = () => {
    if (dateTime.value?.length > 0) {
      startTime.value = dateTime.value[0]
      endTime.value = dateTime.value[1]
    } else {
      startTime.value = ""
      endTime.value = ""
    }
    queryList()
  }
  const queryList = () => {
    loading.value = true
    getSelfHistogramList({
      startTime: startTime.value,
      endTime: endTime.value,
    }).then(({ data }) => {
      completeTableData.value = data
      x.value = []
      y.value = []
      completeTableData.value.map((item) => {
        x.value.push(item.companyId)
        y.value.push(item.completionRate * 100)
      })
      setMyChart(x.value, y.value)
      loading.value = false
    })
  }
  onMounted(() => {
    queryList()
  })
</script>

<style lang="scss" scoped>
  #circular-diagram {
    height: 500px;
    width: 100%;
  }
  .title {
    font-size: 40px;
    font-weight: 700;
    margin: 0px auto 32px;
    text-align: center;
    width: 100%;
  }
  .main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .left {
      width: 60%;
      .search {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 630px;
        .item {
          .controlsButton {
            font-size: 16px;
            font-weight: 500;
          }
        }
      }
      .echarts {
        .echartsTitle {
          font-size: 18px;
          font-weight: 600;
          margin: 20px;
        }
      }
    }
    .right {
      width: 25%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 60px;
      .complete {
        .completeTitle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          margin: 0 0 20px;
          font-weight: 600;
        }
      }
    }
  }
  .back {
    display: flex;
    justify-content: right;
    margin: 20px 40px 0;
  }
</style>