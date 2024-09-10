<script setup lang="ts">
  import { storeToRefs } from "pinia"
  import { useRoute, useRouter } from "vue-router"
  import { useAppStore } from "@/store/modules/app"
  import { useTagsViewStore } from "@/store/modules/tagsView"
  import { useUserStore } from "@/store/modules/user"
  import { ref, onMounted, nextTick } from "vue"
  import useUserInfoStore from "@/store/modules/userInfo" //引入仓库
  import { getNoticeNumber } from "../api"
  const userInfoStore = useUserInfoStore()
  const { isCity, isCounty, isEnterprise, levelType } = storeToRefs(userInfoStore) // 响应式
  import { deleteUsers } from "@/api/user"
  const appStore = useAppStore()
  const tagsViewStore = useTagsViewStore()
  const userStore = useUserStore()
  const username = localStorage.getItem("username")
  const companyId = JSON.parse(localStorage.getItem("users")).companyId
  const route = useRoute()
  const router = useRouter()
  const notice = ref(0)
  const formDatas = reactive<any>({})
  //修改密码弹框
  const dialog = reactive<any>({
    visible: false,
    visibles: false,
  })
  //用户详情信息
  const id = reactive<any>({
    ids: "",
    name: "",
    dis: false,
  })
  const noticeClick = () => {
    ElMessageBox.alert(`本周内共提交${notice.value}条作业记录。`, "系统消息", {
      // if you want to disable its autofocus
      autofocus: false,
      callback: () => {},
    })
  }
  onMounted(() => {
    getNoticeNumber({ companyId }).then((res) => {
      notice.value = res.data
    })
    // TODO notice
    setInterval(() => {
      setTimeout(() => {
        getNoticeNumber({ companyId }).then((res) => {
          nextTick(() => {
            notice.value = res.data
          })
        })
      })
    }, 120000)
  })
  const { device } = storeToRefs(appStore) // 设备类型：desktop-宽屏设备 || mobile-窄屏设备

  /**
   * 左侧菜单栏显示/隐藏
   */
  function toggleSideBar() {
    appStore.toggleSidebar(true)
  }

  /**
   * vueUse 全屏
   */
  const { isFullscreen, toggle } = useFullscreen()

  /**
   * 注销
   */
  // function logout() {
  //   ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
  //     confirmButtonText: "确定",
  //     cancelButtonText: "取消",
  //     type: "warning",
  //   }).then(() => {
  //     userStore
  //       .logout()
  //       .then(() => {
  //         tagsViewStore.delAllViews();
  //       })
  //       .then(() => {
  //         router.push(`/login?redirect=${route.fullPath}`);
  //       });
  //   });
  // }
  const editPassword = () => {
    // console.log(row)
    id.ids = JSON.parse(localStorage.getItem("users")).id
    id.name = localStorage.getItem("username")
    formDatas.username = ""
    formDatas.originPwd = ""
    formDatas.confirmPwd = ""
    formDatas.password = ""
    dialog.visibles = true
  }
  function logout() {
    // router.push(`/login?redirect=${route.fullPath}`);
    ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      userInfoStore.$reset()
      router.push({
        path: "/login",
      })

      userStore
        .logout()
        .then(() => {
          // console.log('222退出')
          // tagsViewStore.delAllViews();
          router.push({
            path: "/login",
          })
        })
        .then(() => {
          // console.log('333退出')
          router.push({
            path: "/login",
          })
        })
      localStorage.clear()
    })
  }
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
    deleteUsers(data).then(() => {
      ElMessage.success("修改密码成功")
      dialog.visibles = false
    })
  }

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
  /**
   * 关闭重置密码弹窗
   */
  function closeDialogs() {
    dialog.visibles = false
  }
</script>

<template>
  <!-- 顶部导航栏 -->
  <div class="navbar">
    <!-- 左侧面包屑 -->
    <div class="flex">
      <hamburger :is-active="appStore.sidebar.opened" @toggle-click="toggleSideBar" />
      <breadcrumb />
    </div>

    <!-- 右侧导航设置 -->
    <div class="flex">
      <!-- 导航栏设置(窄屏隐藏)-->
      <div v-if="device !== 'mobile'" class="setting-container">
        <!--全屏 -->
        <div class="setting-item" @click="toggle">
          <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" />
        </div>
        <!-- 布局大小 -->
        <!-- <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select class="setting-item" />
        </el-tooltip> -->
        <!--语言选择-->
        <!-- <lang-select class="setting-item" /> -->
        <div style="margin: 0 8px;" @click="noticeClick">
          <el-badge :value="notice" class="item">
            <!-- <el-button size="small">评论</el-button> -->
            <img class="bell" src="/src/assets/通知.png" alt="">
          </el-badge>
        </div>
        <!-- <div style="font-weight: 600;font-size: 16px;">用户名:{{ username }}</div> -->
        <div style="font-weight: 600;font-size: 16px;">具体单位:{{ companyId }}</div>
      </div>

      <!-- 用户头像 -->
      <el-dropdown trigger="click">
        <div class="avatar-container">
          <img :src="userStore.avatar + '?imageView2/1/w/80/h/80'" />
          <i-ep-caret-bottom class="w-3 h-3" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>{{ $t("navbar.dashboard") }}</el-dropdown-item>
            </router-link>
            <!-- <a
              target="_blank"
              href="https://github.com/youlaitech/vue3-element-admin"
            >
              <el-dropdown-item>Github</el-dropdown-item>
            </a> -->
            <!-- <a target="_blank" href="https://gitee.com/haoxr">
              <el-dropdown-item>{{ $t("navbar.gitee") }}</el-dropdown-item>
            </a> -->
            <!-- <a
              target="_blank"
              href="https://juejin.cn/post/7228990409909108793"
            >
              <el-dropdown-item>{{ $t("navbar.document") }}</el-dropdown-item>
            </a> -->
            <el-dropdown-item divided @click="editPassword">
              修改密码
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              {{ $t("navbar.logout") }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
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
</template>

<style lang="scss" scoped>
  .bell {
    height: 22px;
  }
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    background-color: #fff;
    box-shadow: 0 0 1px #0003;

    .setting-container {
      display: flex;
      align-items: center;

      .setting-item {
        display: inline-block;
        width: 30px;
        height: 50px;
        line-height: 50px;
        color: #5a5e66;
        text-align: center;
        cursor: pointer;

        &:hover {
          background: rgb(249 250 251 / 100%);
        }
      }
    }

    .avatar-container {
      display: flex;
      align-items: center;
      justify-items: center;
      margin: 0 5px;
      cursor: pointer;

      img {
        width: 40px;
        height: 40px;
        border-radius: 5px;
      }
    }
  }
</style>
