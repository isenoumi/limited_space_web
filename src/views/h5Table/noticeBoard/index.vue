<template >
  <div id="board">
    <el-card>

      <div class=" title">
        {{ ledgerData.name }}空间安全风险告知牌
      </div>
      <div class="info">
        <el-button type="primary" @click="view">提交作业记录 </el-button>
      </div>
      <table border="1" class="tableBox">
        <tr>
          <td>有限空间名称</td>
          <td>{{ ledgerData.name }}</td>
          <td>有限空间形状/体积</td>
          <td colspan="3">{{ ledgerData.shapeVolume }}</td>
        </tr>
        <tr>
          <td>有限空间编号</td>
          <td>{{ ledgerData.number }}</td>
          <td>主要负责人</td>
          <td>{{ledgerData.workResponsiblePerson  }}</td>
          <td>安全监督责任人</td>
          <td>{{ ledgerData.managementResponsiblePerson }}</td>
        </tr>
        <tr>
          <td colspan="3" class="center title1">主要危险有害因素危害及限值</td>
          <td colspan="3" class="center title1">主要安全防控措施</td>
        </tr>
        <tr>
          <td colspan="3">{{ledgerData.mainHazards  }}</td>
          <td colspan="3" rowspan="6">
            1.严格执行作业审批和安全培训。进人有限空间作业前必须进行安全风险分析并制定有展空间作业方案;对作业人员进行有限空间作业安全培训，培训不合格严禁上岗作业;未经许可严禁擅自进入作业。<br />
            2.严格执行“先通风、再检测、后作业”。作业时必须持续通风，连续进行气体检测，必须使用防爆型工具和设备作业。未经检测或检测不合格严禁作业。<br />
            3.正确个体防护。作业人员正确穿戴、使用防中毒窒息、防淹溺等个体安全防护用品(如压绾氧气自教器、全身式安全带安全绳等)。<br />
            4.现场设置围栏和标志。作业现场必须设置安全防护围栏和作业安全警示标志牌。<br />
            5.现场监护。现场应设置专人监护，作业期间严禁擅离职学<br />
            6.制定应急预案。现场配备应急教授人员和装备，遇险严禁言目施救 <br />
            <img class="img" src="https://oms.cestech.com.cn/file/3f0ea555dc4b41a0849a2ec60ffc3164.png" alt="">
          </td>
        </tr>
        <tr>
          <td>氧气</td>
          <td colspan="2">安全范围 19.5%-23.5%</td>
        </tr>
        <tr>
          <td>硫化氢</td>
          <td colspan="2">最高容许浓度 10mg/m3;爆炸下限 4.0%</td>
        </tr>
        <tr>
          <td>一氧化碳</td>
          <td colspan="2">时间加权平均容许浓度 20mmg/m3;
            短时间接触容许浓30mg/m3;
            爆炸极限 12.5% - 74.2%</td>
        </tr>
        <tr>
          <td>甲烷</td>
          <td colspan="2">爆炸极限5%-15%</td>
        </tr>
        <tr>
          <td>水深</td>
          <td colspan="2">3.3 米</td>
        </tr>
        <tr>
          <td colspan="6" class="center title2">应急处置措施</td>
        </tr>
        <tr>
          <td colspan="3"><img class="img" src="https://oms.cestech.com.cn/file/e6bfbd5132d44d62bfeaaf93fe4af850.png" alt=""></td>
          <td colspan="3">
            1.正确处理和报告。发生事故时，安全监护人员应立即判断、处理并立即报告。<br />
            2.正确施教。发生窒息、中毒事故时，应急人员进入污水处理池内必须使用正压式空气呼吸器等救援装各实施救援，同时至少有1名安全管理人员在有展空间外坚守岗位专人监护，在外部负责监护和联络。<br />
            3.防止盲目施救。发生事故时,严禁不采取任何防护措施盲目施救防止事故后果扩大。</td>
        </tr>
        <tr>
          <td>安全副总经理姓名及电话</td>
          <td>{{ ledgerData.managementResponsiblePerson  }}</td>
          <td>医院电话</td>
          <td>120</td>
          <td>消防电话</td>
          <td>119</td>
        </tr>
      </table>
      <div class="list">
        <el-table :data="record" style="width: 960px">
          <el-table-column type="index" align='center' label="序号" width="80" />
          <el-table-column prop="limitedName" align='center' label="有限空间名称" width="" />
          <el-table-column prop="createTime" align='center' label="提交时间" width="" />
          <el-table-column prop="status" align='center' label="状态" width="180" />
          <el-table-column prop="name" align='center' label="操作" width="120">
            <template #default="{row}">
              <el-button type="primary" link @click="viewRecord(row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog :modal="false" :append-to="board" width="800" @open="onOpen" @close="onClose" :title="type" v-model="visible">
        <div class="divBox" v-for="item in ledgerProcedureRef" :key="item.title">
          <div class="title">
            {{  item.title }}
          </div>
          <div v-if="item.url||item.videoPath" class="media">
            <div v-if="item.url" class="imgDiv">
              <div v-for="url,index in item.url?.split(',')" :key="index">
                <el-image hide-on-click-modal class="img" :src="url" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :preview-src-list="[url]" fit="cover" />
              </div>
            </div>
            <div v-if="item.videoPath" class="videoDiv">
              <video controls height="120">
                <source :src="item.videoPath" type="video/mp4">
                <source :src="item.videoPath" type="video/ogg">
                您的浏览器不支持视频标签。
              </video>
            </div>
          </div>

          <div class="noImg" v-else>
            <span>暂无图片或视频</span>
          </div>
        </div>
        <!-- <el-form ref="form" :model="formData" :rules="rules" size="medium" label-width="160px">

          <el-form-item v-for="item in ledgerProcedureRef" :key="item.title" :label="item.title">
            <div v-if="item.url||item.videoPath" class="media">
              <div v-if="item.url" class="imgDiv">
                <div v-for="url,index in item.url?.split(',')" :key="index">
                  <el-image class="img" :src="url" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :preview-src-list="[url]" fit="cover" />
                </div>
              </div>
              <div v-if="item.videoPath" class="videoDiv">
                <video controls height="120">
                  <source :src="item.videoPath" type="video/mp4">
                  <source :src="item.videoPath" type="video/ogg">
                  您的浏览器不支持视频标签。
                </video>
              </div>
            </div>

            <div v-else>
              <span>暂无图片或视频</span>
            </div>

          </el-form-item>

        </el-form> -->
        <div slot="footer" class="footer">
          <el-button @click="visible = false">关闭</el-button>
        </div>
      </el-dialog>
    </el-card>
    <!-- <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script> -->
  </div>
</template>
<!--  -->
<!-- setup 无法设置组件名称，组件名称keepAlive必须 -->
<script  setup>
  import wx from "weixin-js-sdk"
  import { ref } from "vue"
  import { useRoute } from "vue-router"
  import { getLimitedSpaceIdentification, getLedgerList, jobInfo } from "./api"
  const router = useRoute()
  const ledgerData = ref({})
  const record = ref([])
  const visible = ref(false)
  const board = ref(document.querySelector("#board"))
  onMounted(() => {
    getLimitedSpaceIdentification(router.query.id).then((res) => {
      ledgerData.value = res.data
      getLedgerList({
        id: router.query.id,
        pageSize: 999,
        companyName: res.data.name,
      }).then((res) => {
        record.value = res.data.records
      })
    })
  })
  const ledgerProcedureRef = ref([
    {
      title: "作业方案审批情况",
      url: "",
    },
    {
      title: "作业人员培训情况",
      url: "",
    },

    {
      title: "作业过程通风情况",
    },
    {
      title: "有毒有害气体检测情况",
    },
    {
      title: "防护用品配备情况",
    },
    {
      title: "作业监护到位情况",
    },
    {
      title: "应急救援准备情况",
    },
  ])
  const viewRecord = (row) => {
    visible.value = true
    jobInfo(row.id).then((res) => {
      ledgerProcedureRef.value[0].url = res.data.approvalImage
      ledgerProcedureRef.value[1].url = res.data.trainingImage
      ledgerProcedureRef.value[2].url = res.data.ventilationImage
      ledgerProcedureRef.value[3].url = res.data.toxicDetectionImage
      ledgerProcedureRef.value[4].url = res.data.ppeImage
      ledgerProcedureRef.value[5].url = res.data.supervisionImage
      ledgerProcedureRef.value[6].url = res.data.emergencyImage
    })
  }

  const view = async (row) => {
    wx.miniProgram.redirectTo({
      // appId: "wxf8acefe9170a6968", //要跳转的小程序的AppID
      // path: "/pages/index/index", //要跳转的页面路径
      // extraData: {
      //   // 传递的参数
      // },
      url: "/pageLimited/secretKey/index?id=" + router.query.id,
      success(res) {},
    })
  }
  const resize = () => {
    var width = window.innerWidth
    let height = window.innerHeight
    let $wrapper = document.getElementById("app")
    console.log(width, height)
    let style = ""
    // if (width >= height) {
    //   // 横屏
    //   style += "width:" + width + "px;" // 注意旋转后的宽高切换
    //   style += "height:" + height + "px;"
    //   style += "-webkit-transform: rotate(0); transform: rotate(0);"
    //   style +=
    //     "-webkit-transform-origin: " + width / 2 + "px " + width / 2 + "px;"
    //   style += "transform-origin: " + width / 2 + "px " + width / 2 + "px;"
    // } else {
    // 竖屏
    style += "width:" + height + "px;"
    style += "height:" + width + "px;"
    // style += "width:2000px;"
    // style += "height:" + width + "px;"
    style += "-webkit-transform: rotate(90deg); transform: rotate(90deg);"
    // 注意旋转中点的处理
    // style += "-webkit-transform-origin: " + height + "px " + height / 2 + "px;"
    // style += "transform-origin: " + height + "px " + height / 2 + "px;"
    style += "-webkit-transform-origin: 42% " + width / 2 + "px;"
    style += "transform-origin: 42%" + width / 2 + "px;"
    // }
    $wrapper.style.cssText = style
  }
  onMounted(() => {
    resize()
  })
</script>



<style lang="scss" scoped>
  .tableBox {
    margin: 10px auto;
    .title1 {
      font-size: 18px;
      font-weight: 700;
      line-height: 28px;
      height: 28px;
      background: #0070c0;
      letter-spacing: 8px;
    }
    .title2 {
      font-size: 18px;
      font-weight: 700;
      line-height: 28px;
      height: 28px;
      background: #ff0000;

      letter-spacing: 36px;
    }
  }
  .title,
  .noImg {
    font-size: 36px;
    text-align: center;
    margin: 36px auto 10px;
  }
  .info {
    display: flex;
    justify-content: right;
    margin-bottom: 4px;
    width: 860px;
    margin: 0 auto;
  }
  table,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  td {
    width: 160px;
    padding: 0 8px;
  }
  .center {
    text-align: center;
  }
  table {
    display: table;
    /* border-collapse: separate; */
    border-spacing: 2px;
    border-color: gray;
  }
  .img {
    width: 450px;
  }
  .list {
    margin: 20px auto;
    width: 960px;
  }
  .imgDiv {
    display: flex;
    justify-content: left;
    align-items: center;
    flex-wrap: wrap;
    .img {
      width: 100px;
      height: 100px;
      margin: 8px;
    }
  }
  .footer {
    display: flex;
    justify-content: right;
    margin-right: 24px;
  }
  .divBox {
    .title {
      text-align: left;
      color: #000;
    }
    .media {
      display: flex;
      justify-content: left;
      flex-wrap: nowrap;
      .imgDiv {
        .img {
          width: 220px;
          height: 220px;
        }
      }
    }
    .noImg {
      text-align: left;
      color: #909399;
      margin-top: 12px;
      margin-bottom: 64px;
    }
  }
</style>
