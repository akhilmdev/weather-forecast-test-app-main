import { describe, it, expect, vi, beforeEach } from "vitest";
import WeatherService from "../../services/weather-service.service";
import * as backendApi from "../../shared/backend-api";

describe("WeatherService", () => {
  let weatherService: WeatherService;

  beforeEach(() => {
    weatherService = new WeatherService();
    vi.clearAllMocks();
  });

  it("should fetch weather forecast for given coordinates", async () => {
    const mockResponse = {
      latitude: 40.7128,
      longitude: -74.006,
      elevation: 10,
      current_weather: {
        temperature: 20,
        windspeed: 5,
        winddirection: 180,
        weathercode: 1,
        time: new Date(),
      },
    };

    vi.spyOn(backendApi, "get").mockResolvedValue(mockResponse);

    const lat = 40.7128;
    const lng = -74.006;
    const forecast = await weatherService.getWeatherForecast(lat, lng);

    expect(backendApi.get).toHaveBeenCalledWith("weather/forecast", {
      lat,
      lng,
    });
    expect(forecast).toEqual(mockResponse);
  });

  it("should handle API errors gracefully", async () => {
    vi.spyOn(backendApi, "get").mockRejectedValue(new Error("API Error"));

    const lat = 40.7128;
    const lng = -74.006;

    await expect(weatherService.getWeatherForecast(lat, lng)).rejects.toThrow(
      "API Error"
    );
  });

  // Add more test cases as needed
});
