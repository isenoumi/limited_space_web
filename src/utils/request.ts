
import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { useUserStoreHook } from '@/store/modules/user';
import router from "@/router/index";
// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 500000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStoreHook();
    if (userStore.token) {
      config.headers.Authorization = localStorage.getItem("accessToken")

    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data;
    if (code === '200' || code === 200) {
      return response.data;
    }
    if (!code || response instanceof ArrayBuffer) {
      return response;
    }
    if (code === '401' || code === 401) {
      localStorage.clear()
      router.push({
        path: '/login'
      });
      // ElMessage.error(msg || '系统出错');

      return
    }
    if (code === '400' || code === 400) {
      ElMessage.error(msg || '系统出错');
      localStorage.clear()
      router.push({
        path: '/login'
      });
      return
    }
    ElMessage.error(msg || '系统出错');
    return response;

  },
  (error: any) => {
    console.log(error);
    if (error.response.data) {

      const { code, msg } = error.response.data;
      // token 过期,重新登录
      if (code === '401' || code === 401) {
        ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          localStorage.clear()
          location.href = '/login';

        });

      } else {
        ElMessage.error(msg || '系统出错');
      }
    }
    return Promise.reject(error.message);
  }
);

// 导出 axios 实例
export default service;
