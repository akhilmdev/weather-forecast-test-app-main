import WeatherService from "@/services/weather-service.service";
import DateTimeService from "@/services/date-time.service";
import { Options, Vue } from "vue-class-component";
import { Inject, Watch } from "vue-property-decorator";
import { mapState, useStore } from "vuex";
import WindDirectionService from "@/services/direction.service";
import { ICON_MAPPER, WindCondition } from "@/constants/generic.constants";
import { get } from "@/shared/backend-api";

interface WeatherInterface {
  time: string;
  windspeed: string;
  windDirection: string;
  windCondition: string;
  temperature: string;
  latlng: string;
  imageName: string;
}

interface ForecastResponse {
  current_weather: {
    time: string;
    windspeed: number;
    winddirection: number;
    temperature: number;
  };
  latitude: number;
  longitude: number;
  // Add other properties if needed
}

@Options({
  props: {},
  computed: mapState({
    selectedPlace: (state: any) => state.selectedPlace, // Ensure this points to the correct state in Vuex
  }),
})
export default class WeatherForecast extends Vue {
  @Inject("weatherService")
  public weatherService!: WeatherService;
  @Inject("dateTimeService")
  public dateTimeService!: DateTimeService;
  @Inject("windDirectionService")
  public windDirectionService!: WindDirectionService;

  public weather: WeatherInterface | null = null;
  public error: { isError: boolean; errorMessage: string } | null = null;

  private getUrl(windCondition: WindCondition) {
    return new URL(ICON_MAPPER[windCondition], import.meta.url).href;
  }

  @Watch("selectedPlace", { immediate: true, deep: true })
  onSelectedPlaceChange(newValue: any, oldValue: any) {
    if (oldValue?.lat !== newValue?.lat || oldValue?.lng !== newValue?.lng) {
      // this.error = null;
      get("forecast", {
        latitude: newValue?.lat,
        longitude: newValue?.lng,
        current_weather: true,
      })
        .then((res: any) => {
          const formattedTime = this.dateTimeService.formatDate(
            res.current_weather.time,
            "HH:mm"
          );
          const windDirection = this.windDirectionService.getWindDirection(
            res.current_weather?.winddirection
          );
          const windCondition = this.windDirectionService.getWindCondition(
            res.current_weather?.windspeed
          );

          this.weather = {
            time: formattedTime,
            windspeed: `${res.current_weather?.windspeed} ${res.current_weather_units.windspeed}`,
            temperature: `${res.current_weather?.temperature} ${res.current_weather_units.temperature}`,
            latlng: `${res.latitude.toFixed(2)}, ${res.latitude.toFixed(2)}`,
            windDirection,
            windCondition,
            imageName: ICON_MAPPER[windCondition],
          };
        })
        .catch((error) => {
          console.log(error);
          this.error = {
            isError: true,
            errorMessage:
              error.reason ||
              "Failed to fetch weather data. Please try again later.",
          };
        });
    }
  }

  mounted() {
    // Done - use the latitude and longitude from the search city component
    // Done - display the weather forecast in the template
    // Done - Error handling, if the API call fails we should display an error message
  }
}
