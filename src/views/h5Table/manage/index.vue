<template>
  <div id="resizeDiv">
    <el-card>

      <!-- <el-table :data="tableQiye" style="width: 100%">
        <el-table-column prop="date" label="企业(单位)名称" width="150" />
        <el-table-column prop="date" label="行业类别" width="120" />
        <el-table-column prop="date" label="地址" width="" />

        <el-table-column label="有限空间作业场所个数">
          <el-table-column prop="name" label="密闭设备" width="120" />
          <el-table-column prop="name" label="地下有限空间" width="120" />
          <el-table-column prop="name" label="地上有限空间" width="120" />

        </el-table-column>
        <el-table-column prop="date" label="有限空间主要危险有害因素" width="" />
        <el-table-column label="企业(单位)主体责任">
          <el-table-column prop="name" label="主要负责人及电话" width="" />
          <el-table-column prop="name" label="管理责任人及电话" width="" />

        </el-table-column>
      </el-table> -->

      <table border="1" class="tableBox">
        <tr>
          <td rowspan="2" class="title1">企业(单位)名称</td>
          <td rowspan="2">行业类别</td>
          <td rowspan="2" class="title1">地址</td>
          <td colspan="3">有限空间作业场所个数</td>
          <td rowspan="2" class="title1">有限空间主要危险有害因素</td>
          <td colspan="2">企业(单位)主体责任</td>
        </tr>
        <tr>
          <td>密闭设备</td>
          <td>地下有限空间</td>
          <td>地上有限空间</td>
          <td style="width: 160px;">主要负责人及电话</td>
          <td style="width: 160px;">管理责任人及电话</td>
        </tr>
        <tr>
          <td>{{enterpriseData.enterpriseName}}</td>
          <td>{{enterpriseData.industryCategory}}</td>
          <td>{{enterpriseData.address}}</td>
          <td>{{enterpriseData.confinedDevices}}</td>
          <td>{{enterpriseData.limitedSpaceUnderground}}</td>
          <td>{{enterpriseData.limitedSpaceAboveGround}}</td>
          <td>{{enterpriseData.mainHazards}}</td>
          <td>{{enterpriseData.managementResponsiblePerson}}</td>
          <td>{{enterpriseData.workResponsiblePerson}}</td>
        </tr>
      </table>

      <div class="title">
        {{ enterpriseData.enterpriseName }} (企业/单位) 有限空间安全管理台账
      </div>
      <div class="info">
        <div>
          行业: {{ enterpriseData.industryCategory }}
        </div>
        <div>
          建档日期: {{createTime  }}
        </div>
        <div>
          更新日期: {{ updateTime }}
        </div>
      </div>
      <!-- <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="有限空间类型" width="150" />
        <el-table-column label="有限空间编号及名称">
          <el-table-column prop="name" label="所在区域" width="120" />
          <el-table-column prop="name" label="编号" width="120" />
          <el-table-column prop="name" label="有限空间名称" width="120" />

        </el-table-column>
        <el-table-column prop="date" label="有限空间形状／体积" width="" />
        <el-table-column prop="date" label="主要介质名称" width="" />
        <el-table-column prop="date" label="主要危险有害因素" width="" />
        <el-table-column prop="date" label="作业分级" width="" />
        <el-table-column prop="date" label="管理责任人" width="" />
        <el-table-column prop="date" label="主要负责人" width="" />
        <el-table-column prop="" label="" width="100" align='center'>
          <template #default="{ row }">
            <el-button size="small" type="primary" @click="view(row)" text>查看台账</el-button>
          </template>
        </el-table-column>

      </el-table> -->
      <table border="1" class="tableBox tableBox2">
        <tr>
          <td rowspan="2">有限空间类型</td>
          <td colspan="3">有限空间编号及名称</td>
          <td rowspan="2">有限空间形状/体积</td>
          <td rowspan="2">主要介质名称</td>
          <td rowspan="2">主要危险有害因素</td>
          <td rowspan="2">作业分级</td>
          <td rowspan="2">管理责任人</td>
          <td rowspan="2">主要负责人</td>

        </tr>
        <tr>
          <td>所在区域</td>
          <td>编号</td>
          <td>有限空间名称</td>
        </tr>
        <tr v-for="item,index in tableData" :key='index'>
          <td>{{item.spaceType}}</td>
          <td>{{item.area}}</td>
          <td>{{item.number}}</td>
          <td>{{item.name}}</td>
          <td>{{item.shapeVolume}}</td>
          <td>{{item.mainMedium}}</td>
          <td>{{item.mainHazards}}</td>
          <td>{{item.jobGrading}}</td>
          <td>{{item.managementResponsiblePerson}}</td>
          <td>{{item.workResponsiblePerson}}</td>
          <td style="border:none">
            <div style="width:137px; text-align: center;"> <el-button size="small" type="primary" @click="view(item)" text>查看台账</el-button>
            </div>
          </td>

        </tr>
        <tr>
          <td colspan="10" style="text-align: left;">
            建档说明：
            <br /> 1.有限空间分为三类。第一类：封闭、半封闭设备；第二类：地下有限空间；第三类：地上有限空间。
            <br />2.有限空间作业分级：分为特殊有限空间作业和一级有限空间作业。特殊有限空间作业由企业主要负责人审批，一级有限空间作业由企业分管安全负责人审批。
            <br />3.特殊有限空间作业包括：（1）进入闪速炉、阳极炉、余热锅炉等炉内进行的作业。（2）进入硫酸转化器、烟道等有有害气体的装置或塔内进行的作业。（3）进入有酸、碱等危险化学品储槽或储罐内进行的作业。（4）进入与污水排放系统相连的下水井、下水道等部位的作业。（5）涉及有限空间的夜间作业、动火作业、交叉作业。（6）经主部门或者企业确认，要求特殊有限空间作业控制的。一级有限空间作业包括：除特殊有限空间作业以外的，为一级有限空间作业。

          </td>
        </tr>
      </table>
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
  import { getEnterprise, getLedgerList } from "./api"
  const router = useRoute()
  const createTime = ref("")
  const updateTime = ref("")
  const ledgerId = ref("")
  const enterpriseData = ref({})
  const tableData = ref([])
  onMounted(() => {
    console.log(router)
    // alert(router.query.id)
    getEnterprise(router.query.id).then((res) => {
      enterpriseData.value = res.data
      getLedgerList({ name: res.data.enterpriseName }).then((res) => {
        tableData.value = res.data.limitedSpaceIdentifications
        updateTime.value = res.data.updateTime
        createTime.value = res.data.createTime
      })
    })
  })
  const view = async (row) => {
    // router.push({
    //   path: "/noticeBoardTable",
    //   query: { id: row.name },
    // })
    wx.miniProgram.redirectTo({
      url: "/pageLimited/noticeBoardTable/index?id=" + row.id,
      success(res) {},
    })
  }
  const resize = () => {
    var width = window.innerWidth + 300
    let height = document.getElementById("resizeDiv").scrollHeight
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
    style += "width:" + width + "px;"
    style += "height:" + height + "px;"
    // style += "width:2000px;"
    // style += "height:" + width + "px;"
    style += "-webkit-transform: rotate(90deg); transform: rotate(90deg);"
    // 注意旋转中点的处理
    // style += "-webkit-transform-origin: " + width / 2 + "px " + width / 2 + "px;"
    // style += "transform-origin: " + width / 2 + "px " + width / 2 + "px;"
    // style += `-webkit-transform-origin: 1000px ${width}px;`
    style += "transform-origin: 25% 110%;"
    // }
    $wrapper.style.cssText = style
  }
  onMounted(() => {
    resize()
  })
</script>



<style lang="scss" scoped>
  .title {
    font-size: 36px;
    text-align: center;
    margin: 36px auto;
  }
  .info {
    display: flex;
    justify-content: space-between;
    margin: 0 36px;
    margin-bottom: 4px;
    width: 1000px;
    /* padding-right: 100px; */
  }
  table {
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid black;
  }
  td {
    width: 120px;
    padding: 0 8px;
    text-align: center;
  }
  .center {
    text-align: center;
  }
  .tableBox {
    margin: 10px auto;
    .title1 {
      width: 240px;
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
  .tableBox2 {
    td {
      width: 138px;
    }
  }
</style>
