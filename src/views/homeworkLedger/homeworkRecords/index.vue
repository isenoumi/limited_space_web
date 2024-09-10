<template>
  <el-card>
    <div class="searchBox">
      <div class="headerSelect">
        <div class="inputBox" v-if="isCity">
          <div class="title">所属区域:</div>
          <el-select v-model="searchForm.area" placeholder="请选择所属区域" :style="{width: '100%'}" clearable>
            <el-option v-for="item in districts" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <!-- <el-input v-model="searchForm.area" class="input" clearable placeholder="请输入所属区域">
          </el-input> -->
        </div>
        <div class="inputBox" v-if="isCity||isCounty">
          <div class="title">有限空间名称:</div>

          <el-input v-model="searchForm.limitedName" class="input" clearable placeholder="请输入有限空间名称">
          </el-input>

        </div>
        <div class="inputBox">
          <div class="title">时间段:</div>
          <el-date-picker v-model="dateTime" @change="dataTimeChange" type="datetimerange" start-placeholder="开始时间" value-format="YYYY-MM-DD HH:mm:ss" end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" />
        </div>
      </div>
      <div class="btnList">
        <el-button type="primary" @click="queryList">搜索</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </div>
    </div>
    <!-- <div class="buttonControl">
      <el-button type="primary" @click="create">新建</el-button>
      <fileUpload :buttonType="false" style="display: inline-block; margin: 0 12px" actionUrl="/" :label="'导入'"></fileUpload>
      <el-button type="primary" @click="downloadLedger">导出台账</el-button>
      <el-button type="primary" @click="reset">查看企业码</el-button>
      <el-button type="primary" @click="statistics">台账统计</el-button>
    </div> -->
    <proTable v-loading="loading" :tableHeader="tableHeaderData" :isMoreSelect="false" :isShowIndex="true" :tableData="tableList" :currentChange="handleCurrentChange" :sizeChange="handleSizeChange" :pageSize="pageSizes" :currentPage="currentPages" :totalNum="total">
      <template v-slot:default="{ rows, cols }">
        <!-- 过滤一些内容-->
        <div v-if="cols.props == 'controls'">
          <el-button class="controlsButton" type="primary" @click="view(rows)" text> 查看 </el-button>
          <!-- <el-button class="controlsButton" type="primary" @click="edit(rows)" text> 修改 </el-button>
          <el-button class="controlsButton" type="primary" @click="del(rows)" text> 删除 </el-button> -->
        </div>
        <!-- 显示其他内容 -->
        <span v-else> {{ rows[cols.props] }} </span>
      </template>
    </proTable>
    <div v-if="ledgerVisible">
      <ledger v-model="ledgerVisible" @reset="reset" :id="id"></ledger>
    </div>
  </el-card>
</template>
<script setup>
  import { ref, onMounted, reactive } from "vue"
  import proTable from "@/components/myTable/table.vue"
  import { tableColumn } from "./common.js"
  import { jobRecords } from "./api/index"
  import ledger from "./components/ledger.vue"
  import { downloadFile } from "@/api/plan/feishu"
  import { download } from "@/utils/getFileType"
  import useUserInfoStore from "@/store/modules/userInfo.js" //引入仓库
  import { storeToRefs } from "pinia" //引入pinia转换
  const userInfoStore = useUserInfoStore()
  const { isCity, isCounty, isEnterprise, levelType } = storeToRefs(userInfoStore) // 响应式
  import { districtsOption } from "@/api/enum"
  import getFileType from "@/utils/getFileType"
  import { useHandleData } from "@/components/myTable/useHandleData.js"
  import { useRouter } from "vue-router"
  const router = useRouter()
  // 搜索参数
  const searchForm = ref({
    area: "",
    enterprise: "",
  })
  const districts = ref([])
  // 加载
  const loading = ref(false)
  const clickType = ref("create")
  const dateTime = ref([])
  const startTime = ref("")
  const endTime = ref("")
  const id = ref("")
  // 重置
  const reset = () => {
    ledgerVisible.value = false
    searchForm.value = {
      area: "",
      enterprise: "",
    }
    currentPages.value = 1
    startTime.value = ""
    endTime.value = ""
    dateTime.value = []
    queryList()
  }
  // 新增弹框
  const ledgerVisible = ref(false)
  // table数据
  const tableList = ref([{ name: "1" }])
  // table的行数据
  const tableRow = ref({})
  // Table表头
  const tableHeaderData = ref(tableColumn)
  // 总数
  const total = ref(10)
  // 当前页
  const currentPages = ref(1)
  // 页数size
  const pageSizes = ref(10)
  // 下载
  const dataTimeChange = () => {
    if (dateTime.value?.length > 0) {
      startTime.value = dateTime.value[0]
      endTime.value = dateTime.value[1]
    } else {
      startTime.value = ""
      endTime.value = ""
    }
  }
  const create = () => {
    ledgerVisible.value = true
    clickType.value = "create"
  }
  const view = (row) => {
    ledgerVisible.value = true
    id.value = row.id
  }
  const del = async () => {
    await useHandleData(deleteWorkshop, row.workshopId) //deleteWorkshop为接口， row.workshopId为接口参数
    queryList()
  }
  const statistics = () => {
    console.log(router)
    router.push({
      path: "/examineandapprove/Examineandapprove",
      query: {},
    })
  }
  //分页方法
  const queryList = () => {
    loading.value = true
    jobRecords({
      pageNo: currentPages.value,
      pageSize: pageSizes.value,
      ...searchForm.value,
      startTime: startTime.value,
      endTime: endTime.value,
      status: "完成",
      companyId: isEnterprise.value
        ? JSON.parse(localStorage.getItem("users")).companyId
        : "",
    }).then(({ data }) => {
      loading.value = false
      total.value = data.total
      tableList.value = data.records
    })
  }
  //分页相关按钮
  const handleSizeChange = (page) => {
    pageSizes.value = page
    queryList()
  }
  const handleCurrentChange = (page) => {
    console.log(page)
    currentPages.value = page
    queryList()
  }
  onMounted(() => {
    queryList()
    districtsOption().then((res) => {
      if (res.code == 200) {
        districts.value = res.data
      }
    })
  })
</script>
<style lang="scss" scoped>
  @import "./css/index.scss";

  .controlsButton {
    margin: 0;
  }
</style>
