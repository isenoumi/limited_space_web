<template>
  <el-dialog title="项目信息" width="60%" :destroy-on-close="true">
    <div class="infoBox">
      <div class="title">项目名称：{{ projectForm.projectName }}</div>
      <!-- <div class="title">项目类型：{{ projectForm.projectType }}</div> -->
      <div class="title">
        项目资金来源：{{ projectForm.projectSourceFunds }}
      </div>
      <div class="title">所属公司：{{ projectForm.company }}</div>
      <div class="title">所属区域：{{ projectForm.area }}</div>
      <div class="title">客户名称：{{ projectForm.customerName }}</div>
      <div class="title">
        预合同金额（万）：{{ projectForm.prepareContractAmount }}
      </div>
      <div class="title">销售人员：{{ projectForm.salesperson }}</div>
      <div class="title">项目优先级：{{ projectForm.projectFirstLevel }}</div>
      <div class="title">所属部门：{{ projectForm.department }}</div>
      <div class="title">所属业务线：{{ projectForm.lineOfBusiness }}</div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('reset')">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onUpdated, onMounted } from "vue";
import { projectSelectPost } from "@/api/info/index";
import { myDict } from "@/utils/myDict.ts";
const myRow = ref({});
const emits = defineEmits(["reset"]);
const props = defineProps(["id", "formData"]);
// select下拉
const options = ref({});
// 项目信息form
const projectForm = ref({
  projectName: "",
  projectType: "",
  prepareContractAmount: "",
  area: "",
  customerName: "",
  customerContacts: "",
  projectSourceFunds: "",
  salesperson: "",
  projectFirstLevel: "",
  department: "",
  lineOfBusiness: "",
  expectedTransactionTime: "",
});

const changeVisible = ref(false);
// 操作记录表格
const operationRecordsTableData = ref([]);

// 查看项目信息
const openLog = (row) => {
  changeVisible.value = true;
  myRow.value = row;
};
onMounted(() => {
  if (props.formData) {
    projectForm.value = JSON.parse(JSON.stringify(props.formData));
    myDict(projectForm.value);
  }
});

onMounted(() => {
  options.value.typeOptions = JSON.parse(localStorage.getItem("typeOptions"));
  options.value.priorityOptions = JSON.parse(
    localStorage.getItem("priorityOptions")
  );
});
</script>

<style scoped lang="scss">
@import "../../../projectinfo/css/infoproject.scss";
</style>
