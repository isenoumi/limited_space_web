<template>
  <el-dialog @open="onOpen" @close="onClose" title="查看有限空间隐患自查自纠表">
    <!-- <el-form ref="form" :model="formData" :rules="rules" size="medium" label-width="140px"> -->

    <!-- <el-form-item v-for="item in ledgerProcedureRef" :key="item.title" :label="item.title"> -->
    <div v-if="item" style="display: flex;">
      <div class="imgDiv" v-for="url,index in item?.split(',')" :key="index">
        <el-image class="img" :src="url" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :preview-src-list="[url]" fit="cover" />
      </div>
    </div>
    <div v-else>
      <span>暂无图片</span>
    </div>

    <!-- </el-form-item> -->

    <!-- </el-form> -->

    <div slot="footer" class="footer">
      <el-button @click="close">关闭</el-button>
      <!-- <el-button type="primary" @click="handleConfirm">确定</el-button> -->
    </div>
  </el-dialog>
</template>
<script setup>
  import { jobInfo } from "../api"
  import { ledgerProcedure } from "../common.js"
  import { ref, onMounted } from "vue"
  const props = defineProps(["id"])
  const emits = defineEmits(["close"])
  const form = ref(null)
  const item = ref("")
  const formData = ref({
    field104: undefined,
    field101: undefined,
    field105: undefined,
    field106: undefined,
    field107: undefined,
    field108: undefined,
    field109: undefined,
    field110: undefined,
    field111: undefined,
    field112: undefined,
    field113: undefined,
    field114: undefined,
    field115: undefined,
    field116: undefined,
  })
  const rules = ref({
    field104: [
      {
        required: true,
        message: "请输入企业",
        trigger: "blur",
      },
    ],
    field101: [
      {
        required: true,
        message: "请输入行业类别",
        trigger: "blur",
      },
    ],
    field105: [
      {
        required: true,
        message: "请输入地址",
        trigger: "blur",
      },
    ],
    field106: [
      {
        required: true,
        message: "请输入密闭设备数",
        trigger: "blur",
      },
    ],
    field107: [
      {
        required: true,
        message: "请输入地下有限空间",
        trigger: "blur",
      },
    ],
    field108: [
      {
        required: true,
        message: "请输入地上有限空间",
        trigger: "blur",
      },
    ],
    field109: [
      {
        required: true,
        message: "请输入主要危险有害因素",
        trigger: "blur",
      },
    ],
    field110: [
      {
        required: true,
        message: "请输入管理责任人",
        trigger: "blur",
      },
    ],
    field111: [
      {
        required: true,
        message: "请输入主要负责人",
        trigger: "blur",
      },
    ],
    field112: [
      {
        required: true,
        message: "请输入区县政府责任人",
        trigger: "blur",
      },
    ],
    field113: [
      {
        required: true,
        message: "请输入乡镇/街道责任人",
        trigger: "blur",
      },
    ],
    field114: [
      {
        required: true,
        message: "请输入市级责任部门名称",
        trigger: "blur",
      },
    ],
    field115: [
      {
        required: true,
        message: "请输入主要责任人",
        trigger: "blur",
      },
    ],
    field116: [
      {
        required: true,
        message: "请输入分管责任人",
        trigger: "blur",
      },
    ],
  })
  const ledgerProcedureRef = ref(ledgerProcedure)
  const onOpen = () => {}
  const onClose = () => {
    // form.value.resetFields()
  }
  const close = () => {
    emits("reset")
  }
  const handleConfirm = () => {
    // form.value.validate((valid) => {
    //   if (!valid) return
    //   close()
    // })
  }
  onMounted(() => {
    jobInfo(props.id).then((res) => {
      item.value = res.data.selfExaminationImage
    })
  })
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    justify-content: right;
    margin-right: 40px;
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
</style>

