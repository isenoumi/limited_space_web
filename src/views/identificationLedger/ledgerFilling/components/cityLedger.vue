<template>
  <el-dialog @open="onOpen" @close="onClose" :title="type">
    <el-form ref="form" :disabled="type=='查看'" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label-width="140px" label="区县名称" prop="companyId">
            <el-input disabled v-model="formData.companyId" placeholder="请输入区县名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="140px" label="企业（单位）名称" prop="enterpriseName">
            <el-input :disabled="type=='修改'" v-model="formData.enterpriseName" placeholder="请输入企业（单位）名称" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="12">
          <el-form-item label-width="140px" label="行业类别" prop="industryCategory">
            <el-input v-model="formData.industryCategory" placeholder="请输入行业类别" clearable></el-input>
          </el-form-item>
        </el-col> <el-col :span="12">
          <el-form-item label-width="140px" label="地址" prop="address">
            <el-input v-model="formData.address" placeholder="请输入地址" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="12">
          <el-form-item label-width="140px" label="密闭设备数" prop="confinedDevices">
            <el-input disabled type="number" v-model="formData.confinedDevices" placeholder="请输入密闭设备数" clearable></el-input>
          </el-form-item>
        </el-col><el-col :span="12">
          <el-form-item label-width="140px" label="地下有限空间" prop="limitedSpaceUnderground">
            <el-input disabled type="number" v-model="formData.limitedSpaceUnderground" placeholder="请输入地下有限空间" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="12">
          <el-form-item label-width="140px" label="地上有限空间" prop="limitedSpaceAboveGround">
            <el-input disabled type="number" v-model="formData.limitedSpaceAboveGround" placeholder="请输入地上有限空间" clearable></el-input>
          </el-form-item>
        </el-col> <el-col :span="12">
          <el-form-item label-width="140px" label="主要危险有害因素" prop="mainHazards">
            <el-input disabled v-model="formData.mainHazards" placeholder="请输入主要危险有害因素" clearable :style="{ width: '100%' }"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="12">
          <el-form-item label-width="140px" label="主要负责人" prop="managementResponsiblePerson">
            <el-input disabled v-model="formData.managementResponsiblePerson" placeholder="请输入主要负责人" clearable></el-input>
          </el-form-item>
        </el-col> <el-col :span="12">
          <el-form-item label-width="140px" label="管理责任人" prop="workResponsiblePerson">
            <el-input v-model="formData.workResponsiblePerson" placeholder="请输入管理责任人" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="12">
          <el-form-item label-width="140px" label="区县政府责任人" prop="districtCountyPersons">
            <el-input v-model="formData.districtCountyPersons" placeholder="请输入区县政府责任人" clearable></el-input>
          </el-form-item>
        </el-col> <el-col :span="12">
          <el-form-item label-width="140px" label="乡镇/街道责任人" prop="streetResponsible">
            <el-input v-model="formData.streetResponsible" placeholder="请输入乡镇/街道责任人" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="12">
          <el-form-item label-width="140px" label="市级责任部门名称" prop="municipalResponsibleDepartments">
            <el-input v-model="formData.municipalResponsibleDepartments" placeholder="请输入市级责任部门名称" clearable></el-input>
          </el-form-item>
        </el-col><el-col :span="12">
          <el-form-item label-width="140px" label="市级主要责任人" prop="municipalMainPerson">
            <el-input v-model="formData.municipalMainPerson" placeholder="请输入市级主要责任人" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="12">
          <el-form-item label-width="140px" label="市级分管责任人" prop="municipalChargePerson">
            <el-input v-model="formData.municipalChargePerson" placeholder="请输入市级分管责任人" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label-width="140px" label="县级责任部门名称" prop="countyResponsibleDepartments">
            <el-input v-model="formData.countyResponsibleDepartments" placeholder="请输入县级责任部门名称" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row>
        <el-col :span="12">
          <el-form-item label-width="140px" label="县级主要责任人" prop="countyMainPerson">
            <el-input v-model="formData.countyMainPerson" placeholder="请输入县级主要责任人" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="140px" label="县级分管责任人" prop="countyChargePerson">
            <el-input v-model="formData.countyChargePerson" placeholder="请输入县级分管责任人" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>
<script setup>
  import { ref, onMounted, reactive } from "vue"
  import { city_insert, city_edit } from "../api/city"
  const props = defineProps(["type", "formValue"])
  const emits = defineEmits(["close"])
  const form = ref(null)
  const formData = ref({
    companyId: undefined,
    enterpriseName: undefined,
    industryCategory: undefined,
    address: undefined,
    confinedDevices: undefined,
    limitedSpaceUnderground: undefined,
    limitedSpaceAboveGround: undefined,
    mainHazards: undefined,
    managementResponsiblePerson: undefined,
    workResponsiblePerson: undefined,
    districtCountyPersons: undefined,
    streetResponsible: undefined,
    municipalResponsibleDepartments: undefined,
    municipalMainPerson: undefined,
    municipalChargePerson: undefined,
    countyResponsibleDepartments: undefined,
    countyMainPerson: undefined,
    countyChargePerson: undefined,
  })
  const rules = ref({
    // companyId: [
    //   {
    //     required: true,
    //     message: "请输入区县",
    //     trigger: "blur",
    //   },
    // ],
    enterpriseName: [
      {
        required: true,
        message: "请输入企业（单位）名称",
        trigger: "blur",
      },
    ],
    industryCategory: [
      {
        required: true,
        message: "请输入行业类别",
        trigger: "blur",
      },
    ],
    address: [
      {
        required: true,
        message: "请输入地址",
        trigger: "blur",
      },
    ],
    // confinedDevices: [
    //   {
    //     required: true,
    //     message: "请输入密闭设备数",
    //     trigger: "blur",
    //   },
    // ],
    // limitedSpaceUnderground: [
    //   {
    //     required: true,
    //     message: "请输入地下有限空间",
    //     trigger: "blur",
    //   },
    // ],
    // limitedSpaceAboveGround: [
    //   {
    //     required: true,
    //     message: "请输入地上有限空间",
    //     trigger: "blur",
    //   },
    // ],
    // mainHazards: [
    //   {
    //     required: true,
    //     message: "请输入主要危险有害因素",
    //     trigger: "blur",
    //   },
    // ],
    // managementResponsiblePerson: [
    //   {
    //     required: true,
    //     message: "主要负责人",
    //     trigger: "blur",
    //   },
    // ],
    // workResponsiblePerson: [
    //   {
    //     required: true,
    //     message: "请输入管理责任人",
    //     trigger: "blur",
    //   },
    // ],
    districtCountyPersons: [
      {
        required: true,
        message: "请输入区县政府责任人",
        trigger: "blur",
      },
    ],
    streetResponsible: [
      {
        required: true,
        message: "请输入乡镇/街道责任人",
        trigger: "blur",
      },
    ],
    municipalResponsibleDepartments: [
      {
        required: true,
        message: "请输入市级责任部门名称",
        trigger: "blur",
      },
    ],
    municipalMainPerson: [
      {
        required: true,
        message: "请输入市级主要责任人",
        trigger: "blur",
      },
    ],
    municipalChargePerson: [
      {
        required: true,
        message: "请输入市级分管责任人",
        trigger: "blur",
      },
    ],
    countyResponsibleDepartments: [
      {
        required: true,
        message: "请输入县级责任部门名称",
        trigger: "blur",
      },
    ],
    countyMainPerson: [
      {
        required: true,
        message: "请输入县级主要责任人",
        trigger: "blur",
      },
    ],
    countyChargePerson: [
      {
        required: true,
        message: "请输入县级分管责任人",
        trigger: "blur",
      },
    ],
  })

  const onOpen = () => {
    if (props.type == "新建")
      formData.value = {
        companyId: undefined,
        enterpriseName: undefined,
        industryCategory: undefined,
        address: undefined,
        confinedDevices: undefined,
        limitedSpaceUnderground: undefined,
        limitedSpaceAboveGround: undefined,
        mainHazards: undefined,
        managementResponsiblePerson: undefined,
        workResponsiblePerson: undefined,
        districtCountyPersons: undefined,
        streetResponsible: undefined,
        municipalResponsibleDepartments: undefined,
        municipalMainPerson: undefined,
        municipalChargePerson: undefined,
        countyResponsibleDepartments: undefined,
        countyMainPerson: undefined,
        countyChargePerson: undefined,
      }
    else formData.value = props.formValue
  }
  const onClose = () => {
    form.value.resetFields()
  }
  const close = () => {
    emits("reset")
  }
  const handleConfirm = () => {
    form.value.validate((valid) => {
      if (!valid) return
      if (props.type == "新建") {
        city_insert(formData.value).then((res) => {
          if (res.code === 200) {
            ElMessage.success(res.msg)
            close()
          }
        })
      } else if (props.type == "修改") {
        city_edit(formData.value).then((res) => {
          if (res.code === 200) {
            ElMessage.success(res.msg)
            close()
          }
        })
      }
    })
  }
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    justify-content: right;
    margin-right: 40px;
  }
</style>
