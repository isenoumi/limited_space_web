<template>
  <el-dialog @open="onOpen" @close="onClose" :title="type">
    <el-form ref="form" :disabled="type=='查看'" :model="formData" :rules="rules" size="medium" label-width="140px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="有限空间名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入有限空间名称" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所在区域" prop="area">
            <el-input v-model="formData.area" placeholder="请输入所在区域" clearable :style="{width: '100%'}">
            </el-input>
            <!-- <el-select v-model="formData.area" placeholder="请选择所在区域" :style="{width: '100%'}" clearable>
              <el-option v-for="item in districts" :key="item.value" :label="item.label" :value="item.value" />
            </el-select> -->

          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="编号" prop="number">
            <el-input v-model="formData.number" placeholder="请输入编号" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="有限空间类型" prop="spaceType">
            <el-select v-model="formData.spaceType" placeholder="请选择有限空间类型" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in spaceTypeOptions" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="有限空间形状/体积" prop="shapeVolume">
            <el-input v-model="formData.shapeVolume" placeholder="请输入有限空间形状/体积" clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主要介质名称" prop="mainMedium">
            <el-input v-model="formData.mainMedium" placeholder="请输入主要介质名称" clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="主要危险有害因素" prop="mainHazards">
            <el-input v-model="formData.mainHazards" placeholder="请输入主要危险有害因素" clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="作业分级" prop="jobGrading">
            <el-input v-model="formData.jobGrading" placeholder="请输入作业分级" clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="12">
          <el-form-item label="管理责任人" prop="managementResponsiblePerson">
            <el-input disabled v-model="formData.managementResponsiblePerson" placeholder="请输入管理责任人" clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主要负责人" prop="workResponsiblePerson">
            <el-input disabled v-model="formData.workResponsiblePerson" placeholder="请输入主要负责人" clearable :style="{width: '100%'}"></el-input>
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
  import { spaceTypeOptions } from "../common"
  import { districtsOption } from "../api"
  const props = defineProps(["type", "formValue"])
  const emits = defineEmits(["close"])
  import {
    enterprise_limitedSpaceIdentificationInsert,
    enterprise_limitedSpaceIdentificationEdite,
  } from "../api/enterprise"
  const form = ref(null)
  const districts = ref([])
  const formData = ref({
    name: undefined,
    area: undefined,
    number: undefined,
    spaceType: undefined,
    shapeVolume: undefined,
    mainMedium: undefined,
    mainHazards: undefined,
    jobGrading: undefined,
    workResponsiblePerson: undefined,
    managementResponsiblePerson: undefined,
  })
  const rules = ref({
    name: [
      {
        required: true,
        message: "请输入有限空间名称",
        trigger: "blur",
      },
    ],
    area: [
      {
        required: true,
        message: "请输入所在区域",
        trigger: "blur",
      },
    ],
    number: [
      {
        required: true,
        message: "请输入编号",
        trigger: "blur",
      },
    ],
    spaceType: [
      {
        required: true,
        message: "请选择有限空间类型",
        trigger: "change",
      },
    ],
    shapeVolume: [
      {
        required: true,
        message: "请输入有限空间形状/体积",
        trigger: "blur",
      },
    ],
    mainMedium: [
      {
        required: true,
        message: "请输入主要介质名称",
        trigger: "blur",
      },
    ],
    mainHazards: [
      {
        required: true,
        message: "请输入主要危险有害因素",
        trigger: "blur",
      },
    ],
    jobGrading: [
      {
        required: true,
        message: "请输入作业分级",
        trigger: "blur",
      },
    ],
    // workResponsiblePerson: [
    //   {
    //     required: true,
    //     message: "请输入主要负责人",
    //     trigger: "blur",
    //   },
    // ],
    // managementResponsiblePerson: [
    //   {
    //     required: true,
    //     message: "请输入管理责任人",
    //     trigger: "blur",
    //   },
    // ],
  })
  const onOpen = () => {
    if (props.type == "新建")
      formData.value = {
        name: undefined,
        area: undefined,
        number: undefined,
        spaceType: undefined,
        shapeVolume: undefined,
        mainMedium: undefined,
        mainHazards: undefined,
        jobGrading: undefined,
        workResponsiblePerson: undefined,
        managementResponsiblePerson: undefined,
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
        enterprise_limitedSpaceIdentificationInsert(formData.value).then(
          (res) => {
            if (res.code === 200) {
              ElMessage.success(res.msg)
              close()
            }
          },
        )
      } else if (props.type == "修改") {
        enterprise_limitedSpaceIdentificationEdite(formData.value).then((res) => {
          if (res.code === 200) {
            ElMessage.success(res.msg)
            close()
          }
        })
      }
    })
  }
  onMounted(() => {
    districtsOption().then((res) => {
      if (res.code == 200) {
        districts.value = res.data
      }
    })
  })
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    justify-content: right;
    margin-right: 40px;
  }
</style>
