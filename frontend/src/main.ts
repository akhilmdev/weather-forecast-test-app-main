import { createApp } from "vue";
import VueGoogleMaps from "@fawmi/vue-google-maps";

import "./index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import WeatherService from "./services/weather-service.service";
import DateTimeService from "./services/date-time.service";
import { setupAxiosInterceptors } from "./shared/axios-interceptor";
import WindDirectionService from "./services/direction.service";

setupAxiosInterceptors(() => {
  console.log("Unauthenticated");
});

const app = createApp(App);

const weatherService = new WeatherService();
const dateTimeService = new DateTimeService();
const windDirectionService = new WindDirectionService();

app.provide("weatherService", weatherService);
app.provide("dateTimeService", dateTimeService);
app.provide("windDirectionService", windDirectionService);

app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAmlmN3Spuolpvy8xtSeeYK2KgH0166I90",
    libraries: "places,geometry",
  },
});

app.use(store).use(router);

app.mount("#app");
