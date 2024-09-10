<template>
  <el-card v-loading="imgLoading">
    <div class="searchBox">
      <div class="headerSelect">
        <div class="inputBox">
          <div class="title">有限空间名称:</div>
          <el-input v-model="searchForm.name" class="input" clearable placeholder="请输入有限空间名称">
          </el-input>
        </div>
        <div class="inputBox">
          <div class="title">有限空间类型:</div>
          <el-select v-model="searchForm.spaceType" class="input" clearable placeholder="请选择有限空间类型">
            <el-option v-for="item in spaceTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <div class="btnList">
        <el-button type="primary" @click="queryList">搜索</el-button>
        <el-button type="info" @click="reset">重置</el-button>
        <el-button @click="back">返回</el-button>
      </div>
    </div>
    <!-- <div class="buttonControl">
      <el-button v-if="!isCity" type="primary" @click="create">新建</el-button>
      <fileUpload v-if="isEnterprise" @getFileUrl="reset" :showFile="false" :buttonType="false" style="display: inline-block; margin: 0 12px" actionUrl="/yx-project/api/limitedSpaceIdentification/importExcel" :label="'导入'"></fileUpload>
      <fileUpload v-if="isCounty" @getFileUrl="reset" :showFile="false" :buttonType="false" style="display: inline-block; margin: 0 12px" actionUrl="/yx-project/api/countyOperationLedger/importExcel" :label="'导入'"></fileUpload>
      <el-button type="primary" @click="downloadLedger">导出台账</el-button>
      <el-button type="primary" v-if="!isCity" @click="downloadTemplate">模版下载</el-button>
      <el-button type="primary" @click="enterpriseQRCode" v-if="isEnterprise">查看企业码</el-button>
      <el-button v-if="!isEnterprise" type="primary" @click="statistics">台账统计</el-button>
    </div> -->
    <proTable v-loading="loading" :tableHeader="tableHeaderData" :isMoreSelect="false" :isShowIndex="true" :tableData="tableList" :currentChange="handleCurrentChange" :sizeChange="handleSizeChange" :pageSize="pageSizes" :currentPage="currentPages" :totalNum="total">
      <template v-slot:default="{ rows, cols }">
        <!-- 过滤一些内容-->
        <div v-if="cols.props == 'controls'">
          <el-button class="controlsButton" type="primary" @click="view(rows)" text> 查看 </el-button>
        </div>
        <div v-else-if="cols.props == 'file'">
          <el-button v-if="rows.file" type="primary" @click="clickDownloadFile(rows.file)" link> 下载 </el-button>
          <div v-else>暂无附件</div>
        </div>
        <!-- 显示其他内容 -->
        <span v-else> {{ rows[cols.props] }} </span>
      </template>
    </proTable>
    <!-- <div v-if="countyLedgerVisible"> -->
    <enterpriseLedger :formValue="formValue" :type="clickType" v-model="enterpriseLedgerVisible" @reset="reset" :clickType="clickType"></enterpriseLedger>
    <!-- </div> -->
  </el-card>
</template>
<script setup>
  import { ref, onMounted, reactive } from "vue"
  import proTable from "@/components/myTable/table.vue"
  import { city, county, enterprise, spaceTypeOptions } from "../common.js"
  import countyLedger from "./countyLedger.vue"
  import enterpriseLedger from "./enterpriseLedger.vue"
  import cityLedger from "./cityLedger.vue"
  import { downloadFile } from "@/api/plan/feishu"
  import { download } from "@/utils/getFileType"
  import fileUpload from "@/components/Upload/fileUpload.vue"
  import {
    enterprise_limitedSpaceIdentificationPage,
    enterprise_limitedSpaceIdentificationDelete,
    enterprise_companyExport,
    enterprise_enterpriseQRCode,
    enterprise_ledgerQRCode,
    enterprise_viewLedgerPage,
  } from "../api/enterprise"
  import { districtsOption } from "@/api/enum"
  import { county_page, county_delete, county_export } from "../api/county"
  import { city_page, city_delete, city_export } from "../api/city"
  import getFileType from "@/utils/getFileType"
  import { useRouter, useRoute } from "vue-router"
  import useUserInfoStore from "@/store/modules/userInfo.js" //引入仓库
  import { storeToRefs } from "pinia" //引入pinia转换
  const userInfoStore = useUserInfoStore()
  const { isCity, isCounty, isEnterprise, levelType } = storeToRefs(userInfoStore) // 响应式
  const router = useRouter()
  const route = useRoute()
  // 搜索参数
  const searchForm = ref({
    spaceType: "",
    name: "",
    enterpriseName: "",
    area: "",
  })
  // 加载
  const loading = ref(false)
  const imgLoading = ref(false)
  const id = ref("")
  const actionUrl = ref("")
  const clickType = ref("新建")
  const districts = ref([])
  // 重置
  const reset = () => {
    countyLedgerVisible.value = false
    enterpriseLedgerVisible.value = false
    cityLedgerVisible.value = false
    searchForm.value = {
      spaceType: "",
      name: "",
      enterpriseName: "",
      area: "",
    }
    currentPages.value = 1
    queryList()
  }
  // 新增弹框
  const countyLedgerVisible = ref(false)
  const cityLedgerVisible = ref(false)
  const enterpriseLedgerVisible = ref(false)
  const enterpriseQRCodeUrl = ref("")
  // table数据
  const tableList = ref([])
  // table的行数据
  const formValue = ref({})
  // 用户枚举
  const userEnums = ref([])
  // Table表头
  const tableHeaderData = ref(enterprise)
  // 总数
  const total = ref(10)
  // 当前页
  const currentPages = ref(1)
  // 页数size
  const pageSizes = ref(10)
  // 下载
  const clickDownloadFile = (url) => {
    loading.value = true
    const formData = new FormData()
    formData.append("fileUrl", url)
    downloadFile(formData).then((res) => {
      loading.value = false
      download(res, url)
    })
  }
  const back = () => {
    router.go(-1)
  }
  const create = () => {
    if (isEnterprise.value) enterpriseLedgerVisible.value = true
    if (isCounty.value) countyLedgerVisible.value = true
    if (isCity.value) cityLedgerVisible.value = true
    clickType.value = "新建"
  }
  const edit = (row) => {
    id.value = row.id
    if (isEnterprise.value) enterpriseLedgerVisible.value = true
    if (isCounty.value) countyLedgerVisible.value = true
    if (isCity.value) cityLedgerVisible.value = true
    formValue.value = JSON.parse(JSON.stringify(row))
    clickType.value = "修改"
  }
  const view = (row) => {
    enterpriseLedgerVisible.value = true

    formValue.value = JSON.parse(JSON.stringify(row))
    // countyLedgerVisible.value = true
    clickType.value = "查看"
  }
  const del = (row) => {
    if (isEnterprise.value)
      enterprise_limitedSpaceIdentificationDelete(row.id).then(({ code }) => {
        ElMessage.success("删除成功")
        reset()
      })
    else if (isCounty.value)
      county_delete(row.id).then(({ code }) => {
        ElMessage.success("删除成功")
        reset()
      })
    else if (isCity.value)
      city_delete(row.id).then(({ code }) => {
        ElMessage.success("删除成功")
        reset()
      })
  }
  const statistics = () => {
    console.log(router)
    if (isCounty.value)
      router.push({
        path: "/enterpriseStatistics",
        query: {},
      })
    else if (isCity.value)
      router.push({
        path: "/countyStatistics",
        query: {},
      })
  }

  const createQRCode = async (row) => {
    let url = ""
    let name = ""
    imgLoading.value = true
    await enterprise_ledgerQRCode({ id: row.id }).then((res) => {
      url = res.msg
      name = row.name
      imgLoading.value = false
    })
    ElMessageBox.confirm(
      `<img src='${url}'  style='width:150px;height:170px;' />`,
      "二维码",
      {
        center: true,
        dangerouslyUseHTMLString: true,
        confirmButtonText: "下载",
      },
    ).then(() => {
      const formData = new FormData()
      const fileUrl = url
      formData.append("fileUrl", fileUrl)
      downloadFile(formData).then((res) => {
        const blob = new Blob([res.data], {
          type: getFileType(fileUrl),
        })
        const objectUrl = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.download = name
        a.href = objectUrl
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      })
    })
  }
  const enterpriseQRCode = async () => {
    let url = ""
    let name = ""
    imgLoading.value = true
    await enterprise_enterpriseQRCode().then((res) => {
      url = res.data
      name = res.msg
      imgLoading.value = false
    })
    ElMessageBox.confirm(
      `<img src='${url}'  style='width:150px;height:170px;' />`,
      "企业码",
      {
        center: true,
        dangerouslyUseHTMLString: true,
        confirmButtonText: "下载",
      },
    ).then(() => {
      // downloadByBlob(url, name)
      const formData = new FormData()
      const fileUrl = url
      formData.append("fileUrl", fileUrl)
      downloadFile(formData).then((res) => {
        const blob = new Blob([res.data], {
          type: getFileType(fileUrl),
        })
        const objectUrl = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.download = name
        a.href = objectUrl
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      })
    })
  }
  //计划模板下载
  const downloadLedger = () => {
    if (isEnterprise.value)
      enterprise_companyExport().then((res) => {
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
        const objectUrl = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.download = "台账"
        a.href = objectUrl
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      })
    else if (isCounty.value)
      county_export().then((res) => {
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
        const objectUrl = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.download = "台账"
        a.href = objectUrl
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      })
    else if (isCity.value)
      city_export().then((res) => {
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
        const objectUrl = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.download = "台账"
        a.href = objectUrl
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      })
  }
  //计划模板下载
  const downloadTemplate = () => {
    const formData = new FormData()
    let fileUrl = ""
    if (isCounty.value)
      fileUrl =
        "https://oms.cestech.com.cn/file/fc1fe9349ec14b7593566ea989e27dc4.xlsx"
    else if (isEnterprise.value)
      fileUrl =
        "https://oms.cestech.com.cn/file/b88fc3ef17af48c39c91d526fd4539d9.xlsx"
    formData.append("fileUrl", fileUrl)
    downloadFile(formData).then((res) => {
      const blob = new Blob([res.data], {
        type: getFileType(fileUrl),
      })
      const objectUrl = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.download = "台账模版"
      a.href = objectUrl
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    })
  }
  //分页方法
  const queryList = () => {
    console.log(route)
    loading.value = true
    //调接口拿数据
    enterprise_viewLedgerPage({
      pageNo: currentPages.value,
      pageSize: pageSizes.value,
      companyName: route.query.companyName,
      ...searchForm.value,
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
    districtsOption().then((res) => {
      if (res.code == 200) {
        districts.value = res.data
      }
    })
    queryList()
  })
</script>
<style lang="scss" scoped>
  @import "../css/index";

  .controlsButton {
    margin: 0;
  }
</style>
