import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "@/i18n";

import VueApexCharts from "vue3-apexcharts";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(VueApexCharts);
app.component("EasyDataTable", Vue3EasyDataTable);
app.mount("#app");
