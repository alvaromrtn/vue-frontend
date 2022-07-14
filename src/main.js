import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "@/i18n";

import "bootstrap/dist/css/bootstrap.min.css";

import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(VueApexCharts);
app.mount("#app");
