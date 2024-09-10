<template>
  <el-card v-loading="loading">
    <div class="title">企业有限空间自查台账统计</div>
    <div class="main">
      <div class="left">
        <div class="search">
          <!-- <div class="item">
            <a class="controlsButton" @click="view(rows)"> 本月 </a>
          </div>
          <div class="item">
            <a class="controlsButton" @click="view(rows)"> 本年 </a>
          </div> -->
          <div class="item">
            <el-date-picker v-model="dateTime" @change="dataTimeChange" type="datetimerange" start-placeholder="开始时间" value-format="YYYY-MM-DD HH:mm:ss" end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" />
          </div>
        </div>
        <div class="echarts">
          <div id="circular-diagram"></div>
          <div class="num">
            {{ completeNum }} / {{ totals }}
          </div>
        </div>

      </div>
      <div class="right">
        <div class="complete">
          <div class="completeTitle">
            <span>已完成列表</span>
            <!-- <a style="color:#409eff" @click="view('complete')">查看全部</a> -->
          </div>
          <div class="list">
            <el-table :data="completeTableData" style="width: 100%">
              <el-table-column type="index" label="" width="40" />
              <el-table-column prop="enterpriseName" align='center' label="企业（单位）名称" width="240" />
              <el-table-column prop="cishu" align='center' label="自查次数" width="120" />
            </el-table>
          </div>
        </div>
        <div class="complete">
          <div class="completeTitle">
            <span>未完成列表</span>
            <!-- <a style="color:#409eff" @click="view('incomplete')">查看全部</a> -->
          </div>
          <div class="list">
            <el-table :data="incompleteTableData" style="width: 100%">
              <el-table-column type="index" label="" width="40" />
              <el-table-column prop="enterpriseName" align='center' label="企业（单位）名称" width="240" />
              <el-table-column prop="cishu" align='center' label="自查次数" width="120">
                <template #default="{row}">
                  <div v-if="!row.cishu">
                    0
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

      </div>
    </div>
    <div class="back">
      <el-button type="primary" @click="back"> 返回 </el-button>

    </div>

  </el-card>
</template>

<script setup>
  import { getSelfExaminationList } from "./api"
  import * as echarts from "echarts"
  import { onMounted, ref } from "vue"
  import { useRouter, useRoute } from "vue-router"
  const router = useRouter()
  const route = useRoute()
  const completeNum = ref(0)
  const totals = ref(0)
  const loading = ref(false)
  const dateTime = ref([])
  const startTime = ref("")
  const endTime = ref("")
  const setMyChart = (value) => {
    var chartDom = document.getElementById("circular-diagram")
    var myChart = echarts.init(chartDom)

    const gaugeData = [
      {
        value,
        name: "完成率",
        title: {
          offsetCenter: ["0%", "30%"],
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ["0%", "-10%"],
        },
      },
    ]
    var option = {
      series: [
        {
          type: "gauge",
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false,
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: "#464646",
            },
          },
          axisLine: {
            lineStyle: {
              width: 25,
            },
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
            distance: 50,
          },
          data: gaugeData,
          title: {
            fontSize: 24,
          },
          detail: {
            width: 50,
            height: 14,
            fontSize: 50,
            color: "inherit",
            borderColor: "inherit",
            formatter: "{value}%",
          },
        },
      ],
    }
    myChart.setOption(option)
  }
  const completeTableData = ref([{ enterpriseName: "丰川祥子", cishu: 17 }])
  const incompleteTableData = ref([{ enterpriseName: "长崎素世", cishu: 17 }])
  const view = (type) => {}
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
    getSelfExaminationList({
      startTime: startTime.value,
      endTime: endTime.value,
      companyId: route.query.companyId,
    }).then(({ data }) => {
      completeNum.value = data.completedList.length

      completeTableData.value = data.completedList
      incompleteTableData.value = data.incompleteLists
      totals.value = data.completedList.length + data.incompleteLists.length
      setMyChart(data.completionRate * 100)
    })
  }
  onMounted(() => {
    // const now = new Date()
    // const previous = new Date(now)
    // // 设置当前日期为当天的0点
    // now.setHours(0, 0, 0, 0)
    // // 设置前一天日期为前一天的0点
    // previous.setDate(previous.getDate() - 1)
    // previous.setHours(0, 0, 0, 0)

    // endTime.value = now.toISOString().split("T")[0] + " 00:00:00"
    // startTime.value = previous.toISOString().split("T")[0] + " 00:00:00"
    // dateTime.value = [startTime.value, endTime.value]
    queryList()
  })
</script>

<style lang="scss" scoped>
  #circular-diagram {
    height: 400px;
    width: 400px;
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
      width: 30%;
      .search {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .item {
          .controlsButton {
            font-size: 16px;
            font-weight: 400;
          }
        }
      }
      .echarts {
        display: flex;
        /* justify-content: space-between; */
        align-items: center;
        .num {
          width: 150px;
          font-size: 48px;
          color: #5a5aff;
          font-weight: 600;
          margin-left: 20px;
        }
      }
    }
    .right {
      width: 55%;
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-right: 28px;
      .complete {
        .completeTitle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          margin: 0 0 20px;
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