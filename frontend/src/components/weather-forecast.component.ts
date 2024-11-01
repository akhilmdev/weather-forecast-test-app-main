import WeatherService from "@/services/weather-service.service";
import { Options, Vue } from "vue-class-component";
import { Inject, Watch } from "vue-property-decorator";
import { mapState, useStore } from "vuex";

@Options({
  props: {},
  computed: mapState({
    selectedPlace: (state: any) => state.selectedPlace, // Ensure this points to the correct state in Vuex
  }),
})
export default class WeatherForecast extends Vue {
  @Inject("weatherService")
  public weatherService!: WeatherService;
  // private selectedPlace = null;

  @Watch("selectedPlace", { immediate: true, deep: true })
  onSelectedPlaceChange(newValue: any, oldValue: any) {
    if (oldValue?.lat !== newValue?.lat || oldValue?.lng !== newValue?.lng) {
      this.weatherService
        .getWeatherForecast(newValue.lat, newValue.lng)
        .then((res) => {
          console.log(res);
        });
    }
    // You can perform additional actions here if needed
  }

  mounted() {
    // TODO - use the latitude and longitude from the search city component
    // TODO - display the weather forecast in the template
    // TODO - Error handling, if the API call fails we should display an error message
  }
}
