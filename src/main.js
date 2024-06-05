import './assets/main.scss';

import { createApp } from 'vue';
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';
import router from '@/router';
import App from './App.vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-persistedstate-plugin';
import locale from 'element-plus/dist/locale/zh-cn.js'

// 富文本编辑
import { QuillEditor } from '@vueup/vue-quill'

const app = createApp(App);
const pinia = createPinia();
const persist = createPersistedState();
pinia.use(persist)

app.use(ElementPlus,{locale})
app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.component('quill-editor', QuillEditor);
app.mount('#app');