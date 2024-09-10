import type { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const store = createPinia();
store.use(piniaPluginPersistedstate) // 使用插件
// 全局注册 store
export function setupStore(app: App<Element>) {
  // 添加持久化插件
  // app.use(createPiniaPluginPersist(pinia))
  app.use(store);
}

export { store };
