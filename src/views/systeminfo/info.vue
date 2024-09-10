<template>
  <div class="app-container">

    <el-row :gutter="20">
      <el-col>
        <div class="search-container">
          <headerTabs v-if="isCity" @tabClick="tabClick"></headerTabs>
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="手机号码" prop="name">
              <el-input v-model="queryParams.username" placeholder="请输入手机号码" clearable style="width: 200px" @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item v-if="isCity" label="所属区域" prop="area">
              <!-- <el-input v-model="queryParams.username" placeholder="请输入手机号码" clearable style="width: 200px" @keyup.enter="handleQuery" /> -->
              <el-select v-model="queryParams.area" placeholder="请选择所属区域" :style="{width: '100%'}" clearable>
                <el-option v-for="item in districts" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item v-if="!isEnterprise" label="状态" prop="status">
              <el-select v-model="queryParams.status" placeholder="全部" clearable style="width: 200px">
                <el-option label="启用" value="ENABLED" />
                <el-option label="禁用" value="DISABLED" />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="handleQuery"><i-ep-search />搜索</el-button>
              <el-button @click="resetQuery">
                <i-ep-refresh />
                重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-card shadow="never">
          <template #header v-if="!(isCity&&levelType=='公司级') &&!isEnterprise  ">
            <div class="flex justify-between">
              <div>
                <el-button type="success" @click="openDialog()"><i-ep-plus />新增</el-button>
              </div>
            </div>
          </template>
          <el-table border v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
            <el-table-column label="企业（单位）名称" align="center" prop="companyId" />
            <el-table-column label="手机号码" align="center" prop="username" />
            <el-table-column label="所属区域" align="center" prop="area" />
            <el-table-column label="单位主要负责人" align="center" prop="responsiblePerson" />
            <!-- <el-table-column label="管理责任人" align="center" prop="managementResponsiblePerson" /> -->

            <!-- <el-table-column v-if="!isEnterprise" label="状态" align="center" prop="statusValue">
              <template #default="scope">
                <el-switch v-model="scope.row.status" inactive-value="DISABLED" active-value="ENABLED" @change="handleStatusChange(scope.row)" />
              </template>
            </el-table-column> -->
            <!-- <el-table-column label="单位主要负责人" align="center" prop="responsiblePerson"></el-table-column> -->
            <el-table-column v-if="!(isCity&&levelType=='公司级') &&!isEnterprise  " label="操作" fixed="right" width="280" align="center">
              <template #default="scope">
                <el-button type="primary" size="small" link @click="openDialog(scope.row.id, scope.row, 'view')"><i-ep-view />查看</el-button>
                <el-button type="primary" link size="small" @click="openDialog(scope.row.id, scope.row, 'edit')"><i-ep-edit />编辑</el-button>
                <el-button type="primary" size="small" link @click="resetPassword(scope.row)"><i-ep-refresh-left />修改密码</el-button>
                <!-- <el-button type="primary" link size="small" @click="del(scope.row.id, scope.row)"><i-ep-delete />删除</el-button> -->
                <el-button type="primary" link size="small" @click="handleStatusChange(scope.row)"><i-ep-delete />删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div style="
              display: flex;
              justify-content: flex-end;
              margin-top: 20px;
              margin-left: 0 auto;
            ">
            <pagination v-if="total > 0" v-model:total="total" v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize" @pagination="handleQuery" />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 表单弹窗 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="600px" append-to-body @close="closeDialog">
      <el-form ref="userFormRef" :model="formData" :disabled="formDisabled" :rules="rules" label-width="140px">
        <el-form-item label="手机号码" prop="username">
          <el-input v-model="formData.username" :disabled="id.dis" maxlength="11" :readonly="!!formData.id" placeholder="请输入手机号码" />
        </el-form-item>

        <el-form-item label="企业（单位）名称" prop="companyId">
          <el-input :disabled="id.dis" v-model="formData.companyId" placeholder="请输入企业（单位）名称" />
        </el-form-item>
        <el-form-item label="所属区域" prop="area">
          <!-- <el-input v-model="formData.area" placeholder="请输入所属区域" /> -->
          <el-select v-model="formData.area" placeholder="请选择所属区域" :style="{width: '100%'}" clearable>
            <el-option v-for="item in districts" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="dialog.title == '新增用户'">
          <el-input v-model="formData.password" type="text" onkeyup="this.value=this.value.replace(/[^\w_]/g,'');" placeholder="请输入密码" />
        </el-form-item>
        <!-- <el-form-item label="所属部门" prop="departIds">
          <el-tree-select v-model="formData.departIds" placeholder="请选择所属部门" :data="deptList" multiple :render-after-expand="false" />
        </el-form-item> -->
        <!-- <el-form-item label="性别" prop="area">
          <el-select v-model="formData.area" placeholder="请选择">
            <el-option label="男" value="MALE" />
            <el-option label="女" value="FEMALE" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="单位主要负责人" prop="responsiblePerson">
          <el-input v-model="formData.responsiblePerson" placeholder="请输入单位主要负责人" maxlength="50" />
        </el-form-item>
        <el-form-item v-if="isCity" label="角色" prop="roleIds">
          <el-select v-model="formData.roleIds" placeholder="请选择角色" style="width: 100%;">
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="String(item.id)" />
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="备注">
          <el-input v-model="formData.description" placeholder="请输入备注" />
        </el-form-item> -->

        <!-- <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio label="ENABLED">正常</el-radio>
            <el-radio label="DISABLED">禁用</el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="closeDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog v-model="dialog.visibles" title="修改密码" width="400px" append-to-body @close="closeDialogs">
      <el-form ref="userFormRefs" :model="formDatas" label-width="80px">
        <el-form-item label="新密码">
          <el-input v-model="formDatas.password" type="text" @input="accountInput" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="formDatas.confirmPwd" type="text" @input="accountInputs" placeholder="请输入密码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="addSubmit">确 定</el-button>
          <el-button @click="dialog.visibles = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
  import useUserInfoStore from "@/store/modules/userInfo.js" //引入仓库
  import { storeToRefs } from "pinia" //引入pinia转换
  const userInfoStore = useUserInfoStore()
  const { isCity, isCounty, isEnterprise } = storeToRefs(userInfoStore) // 响应式
  const levelType = ref("")
  /**
   * @see {@link https://vuejs.org/api/sfc-script-setup.html#defineoptions}
   */
  import { onMounted } from "vue"
  defineOptions({
    name: "User",
    inheritAttrs: false,
  })
  import headerTabs from "./components/tabs.vue"
  import {
    getUserPage,
    updateUserPassword,
    addUser,
    updateUser,
    updateUserStatu,
    deleteUsers,
  } from "@/api/user"
  import { listDeptOptions } from "@/api/dept"
  import { listRoleOptions } from "@/api/role"
  import { enumSalesperson, districtsOption } from "@/api/enum"
  const districts = ref([])
  onMounted(() => {
    // 初始化用户列表数据
    if (isCity.value) levelType.value = "区级"
    else levelType.value = "公司级"
    handleQuery()
    districtsOption().then((res) => {
      if (res.code == 200) {
        districts.value = res.data
      }
    })
  })
  // 查询表单
  const queryFormRef = ref(ElForm)
  // 用户表单
  const userFormRef = ref(ElForm)
  // 用户表单
  const userFormRefs = ref(ElForm)
  //加载状态
  const loading = ref(false)
  const formDisabled = ref(false)
  const ids = ref([])
  //总条数
  const total = ref(0)
  const tab = ref("区县")
  //修改密码弹框
  const dialog = reactive<any>({
    visible: false,
    visibles: false,
  })
  //页数和条数
  const queryParams = reactive<any>({
    pageNo: 1,
    pageSize: 10,
  })
  //用户信息
  const userList = ref<any[]>()
  //用户详情信息
  const id = reactive<any>({
    ids: "",
    name: "",
    dis: false,
  })
  //账号的实时输入
  function accountInput(val: any) {
    let codeReg = new RegExp("[A-Za-z0-9]+"), //正则 英文+数字；
      len = val.length,
      str = ""
    for (var i = 0; i < len; i++) {
      if (codeReg.test(val[i])) {
        str += val[i]
      }
    }
    formDatas.password = str
  }
  //账号的实时输入
  function accountInputs(val: any) {
    let codeReg = new RegExp("[A-Za-z0-9]+"), //正则 英文+数字；
      len = val.length,
      str = ""
    for (var i = 0; i < len; i++) {
      if (codeReg.test(val[i])) {
        str += val[i]
      }
    }
    formDatas.confirmPwd = str
  }
  //状态开关
  const formData = reactive<any>({
    status: "ENABLED",
  })
  const formDatas = reactive<any>({})
  //验证输入框
  const rules = reactive({
    username: [
      { required: true, message: "手机号码不能为空", trigger: "blur" },
      {
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: "请输入正确的手机号码",
        trigger: "blur",
      },
    ],
    password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
    // name: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
    companyId: [
      { required: true, message: "企业（单位）名称不能为空", trigger: "blur" },
    ],
    area: [{ required: true, message: "所属区域不能为空", trigger: "blur" }],
    // departIds: [{ required: true, message: "所属部门不能为空", trigger: "blur" }],

    roleIds: [{ required: true, message: "用户角色不能为空", trigger: "blur" }],
    status: [{ required: true, message: "请选择用户状态", trigger: "blur" }],
    responsiblePerson: [
      {
        required: true,
        // pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
        message: "请输入单位主要负责人",
        trigger: "blur",
      },
    ],
    mobile: [],
  })
  //所属部门
  const deptList = ref<any[]>()
  //所属角色
  const roleList = ref<any[]>()
  /**
   * 获取角色下拉列表
   */
  async function getRoleOptions() {
    listRoleOptions().then((response: any) => {
      roleList.value = response.data.records
    })
  }

  /**
   * 修改用户状态
   */
  function handleStatusChange(row: { [key: string]: any }) {
    updateUserStatu(row.id, "DISABLED").then((response: any) => {
      if (response.code == 200) {
        ElMessage.success("删除成功")
      }
      handleQuery()
    })
    // const text = row.status === "DISABLED" ? "启用" : "停用"
    // ElMessageBox.confirm(
    //   "确认要" + "停用或启用" + row.username + "用户吗?",
    //   "警告",
    //   {
    //     confirmButtonText: "启用",
    //     cancelButtonText: "停用",
    //     type: "warning",
    //   },
    // )
    //   .then(() => {
    //     updateUserStatu(row.id, row.status)
    //   })
    //   .then(() => {
    //     ElMessage.success("启用成功")
    //   })
    //   .catch(() => {
    //     let status = "DISABLED"
    //     updateUserStatu(row.id, status)
    //     row.status = row.status === 1 ? 0 : 1
    //   })
  }

  /**
   * 查询
   */
  function handleQuery() {
    let area = ""
    if (isCounty.value) area = JSON.parse(localStorage.getItem("users"))?.area
    loading.value = true
    getUserPage({
      ...queryParams,
      levelType: levelType.value,
      area,
      status: "ENABLED",
    })
      .then((data: any) => {
        userList.value = data.data.records
        total.value = data.data.total
      })
      .finally(() => {
        loading.value = false
      })
  }
  // TODO tabClick
  const tabClick = (value) => {
    value.index == 0 ? (levelType.value = "区级") : (levelType.value = "公司级")
    console.log(levelType.value)
    handleQuery()
  }
  const del = (id, row) => {
    deleteUsers(id).then((res) => {})
  }
  /**
   * 重置查询
   */
  function resetQuery() {
    queryParams.username = ""
    queryFormRef.value.resetFields()
    queryParams.pageNo = 1
    queryParams.deptId = undefined
    handleQuery()
  }

  /**
   * 行checkbox
   */
  function handleSelectionChange(selection: any) {
    ids.value = selection.map((item: any) => item.id)
  }

  /**
   * 重置密码
   */
  function resetPassword(row: { [key: string]: any }) {
    console.log(row)
    id.ids = row.id
    id.name = row.username
    formDatas.username = ""
    formDatas.originPwd = ""
    formDatas.confirmPwd = ""
    formDatas.password = ""
    dialog.visibles = true
  }

  /**
   * 打开用户弹窗
   */
  async function openDialog(userId?: number, row?: any, type?: any) {
    await getDeptOptions()
    await getRoleOptions()
    dialog.visible = true
    if (userId && type == "edit") {
      id.dis = true
      formDisabled.value = false
      dialog.title = "修改用户"
      formData.name = row.name
      formData.username = row.username
      formData.companyId = row.companyId
      formData.responsiblePerson = row.responsiblePerson
      formData.description = row.description
      formData.status = row.status
      formData.area = row.area
      id.ids = row.id
      formData.roleIds = row.roleIds[0]
      formData.departIds = row.departIds
    } else if (userId && type == "view") {
      formDisabled.value = true
      id.dis = true
      dialog.title = "查看"
      formData.name = row.name
      formData.username = row.username
      formData.companyId = row.companyId
      formData.responsiblePerson = row.responsiblePerson
      formData.description = row.description
      formData.status = row.status
      formData.area = row.area
      id.ids = row.id
      formData.roleIds = row.roleIds[0]
      formData.departIds = row.departIds
    } else {
      id.dis = false
      formDisabled.value = false
      formData.name = ""
      formData.username = ""
      formData.companyId = ""
      formData.responsiblePerson = ""
      formData.description = ""
      formData.status = ""
      formData.area = ""
      dialog.title = "新增用户"
    }
  }

  /**
   * 关闭弹窗
   */
  function closeDialog() {
    dialog.visible = false
    resetForm()
  }
  /**
   * 关闭重置密码弹窗
   */
  function closeDialogs() {
    dialog.visibles = false
  }

  /**
   * 重置表单
   */
  function resetForm() {
    userFormRef.value.resetFields()
    userFormRef.value.clearValidate()

    formData.id = undefined
    formData.status = 1
  }
  /**
   * 表单提交
   */
  const handleSubmit = useThrottleFn(() => {
    userFormRef.value.validate((valid: any) => {
      if (valid) {
        const userId = id.ids
        loading.value = true
        if (dialog.title == "修改用户") {
          let data = {
            // roleIds: formData.roleIds,
            // departIds: formData.departIds,
            // username: formData.username,
            // name: formData.name,
            // area: formData.area,
            // responsiblePerson: formData.responsiblePerson,
            // companyId: formData.companyId,
            // description: formData.description,
            // status: formData.status,
            ...formData,
            roleIds: [formData.roleIds],
            id: userId,
          }
          updateUser(data)
            .then(() => {
              ElMessage.success("修改用户成功")
              closeDialog()
              resetQuery()
              enumSalesperson().then(({ data }) => {
                localStorage.setItem("salespersonOptions", JSON.stringify(data))
              })
            })
            .finally(() => (loading.value = false))
        } else {
          // if (!formData.area) {
          //   return ElMessage({ type: "info", message: "请选择您的性别" })
          // }
          if (!formData.companyId) {
            return ElMessage({ type: "info", message: "请输入您的手机号" })
          }
          // if (!formData.status) {
          //   return ElMessage({ type: "info", message: "请选择状态" })
          // }
          let myRoleId = ""
          if (isCity.value) {
            myRoleId = formData.roleIds
          } else {
            roleList.value?.map((item) => {
              if (item.name == "企业账号") {
                myRoleId = item.id
              }
            })
          }

          addUser({
            ...formData,
            roleIds: [myRoleId],
            gender: "MALE",
            levelType: levelType.value,
            status: "ENABLED",
          })
            .then((res) => {
              if (res.code == 200) ElMessage.success("新增用户成功")
              closeDialog()
              resetQuery()
            })
            .finally(() => (loading.value = false))
        }
      }
    })
  }, 3000)

  /**
   * 表单提交
   */
  function addSubmit() {
    if (formDatas.confirmPwd != formDatas.password) {
      return ElMessage.warning("两次密码不一致，请重新输入")
    }
    const data = {
      userId: String(id.ids),
      username: id.name,
      confirmPwd: String(formDatas.confirmPwd),
      password: String(formDatas.password),
    }
    updateUserPassword(data).then((res) => {
      if (res.code === 200) ElMessage.success("修改密码成功")
      dialog.visibles = false
      resetQuery()
    })
  }

  /**
   * 获取部门下拉项
   */
  async function getDeptOptions() {
    listDeptOptions().then((response) => {
      let stlist: any = JSON.stringify(response.data)
      stlist = stlist.replace(/\"id"/g, '"value"')
      stlist = stlist.replace(/\"name"/g, '"label"')
      stlist = stlist.replace(new RegExp(/(,"children":\[\])/g), "")
      deptList.value = JSON.parse(stlist)
    })
  }
</script>
