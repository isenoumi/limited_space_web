<template>
  <el-dialog @open="onOpen" @close="onClose" title="查看详情">
    <el-form ref="form" :model="formData" :rules="rules" size="medium" label-width="160px">

      <el-form-item v-for="item in ledgerProcedureRef" :key="item.title" :label="item.title">
        <div v-if="item.url||item.videoPath" class="media">
          <div v-if="item.url" class="imgDiv">
            <div v-for="url,index in item.url?.split(',')" :key="index">
              <el-image class="img" :src="url" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :preview-src-list="[url]" fit="cover" />
            </div>
          </div>
          <div v-if="item.videoPath" class="videoDiv">
            <!-- <video :src="item.videoPath" height="120" controls /> -->
            <video controls height="120">
              <source :src="item.videoPath" type="video/mp4">
              <source :src="item.videoPath" type="video/ogg">
              您的浏览器不支持视频标签。
            </video>
          </div>
        </div>

      </el-form-item>

    </el-form>

    <div slot="footer" class="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>
<script setup>
  import { jobInfo } from "../api"
  import { ledgerProcedure } from "../common.js"
  import { ref, onMounted } from "vue"
  const props = defineProps(["id"])
  const emits = defineEmits(["close"])
  const loading = ref(true)
  const form = ref(null)
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
  const rules = ref({})
  const ledgerProcedureRef = ref(ledgerProcedure)
  const onOpen = () => {
    console.log("asdas", props.id)
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
      close()
    })
  }
  onMounted(() => {
    loading.value = true
    jobInfo(props.id).then((res) => {
      ledgerProcedureRef.value[0].url = res.data.approvalImage
      ledgerProcedureRef.value[1].url = res.data.trainingImage
      ledgerProcedureRef.value[2].url = res.data.ventilationImage
      ledgerProcedureRef.value[3].url = res.data.toxicDetectionImage
      ledgerProcedureRef.value[4].url = res.data.ppeImage
      ledgerProcedureRef.value[5].url = res.data.supervisionImage
      ledgerProcedureRef.value[6].url = res.data.emergencyImage

      ledgerProcedureRef.value[0].videoPath = res.data.approvalVideoPath
      ledgerProcedureRef.value[1].videoPath = res.data.trainingVideoPath
      ledgerProcedureRef.value[2].videoPath = res.data.ventilationVideoPath
      ledgerProcedureRef.value[3].videoPath = res.data.toxicDetectionVideoPath
      ledgerProcedureRef.value[4].videoPath = res.data.ppeVideoPath
      ledgerProcedureRef.value[5].videoPath = res.data.supervisionVideoPath
      ledgerProcedureRef.value[6].videoPath = res.data.emergencyVideoPath

      loading.value = false
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
      width: 120px;
      height: 120px;
      margin: 8px;
    }
  }
</style>

