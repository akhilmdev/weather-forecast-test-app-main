import { ICON_MAPPER } from "@/constants/generic.constants";
import dayjs from "dayjs";

interface windInterface {
  getWindDirection: (degree: number) => string;
}

export default class WindService implements windInterface {
  constructor() {}

  /**
   * Determines the wind direction based on the given degree.
   * @param degrees - The degree of the wind direction (0 to 360).
   * @returns The cardinal direction as a string (e.g., 'N', 'NE', 'E').
   */
  getWindDirection(degrees: number): string {
    // Normalize the degrees to be within 0-360 range
    const normalizedDegrees = ((degrees % 360) + 360) % 360;

    // Array of compass directions in order
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    // Calculate the index by dividing degrees by 45 (since 360°/8 directions = 45°)
    const index = Math.round(normalizedDegrees / 45) % 8;

    return directions[index];
  }

  /**
   * Determines the wind condition based on the given wind speed.
   * @param windSpeed - The speed of the wind in km/h.
   * @returns A string representing the wind condition, such as 'Calm', 'Light Breeze', 'Moderate Breeze', etc.
   */
  getWindCondition(windSpeed: number): keyof typeof ICON_MAPPER {
    if (windSpeed < 0) return "Unknown";
    const conditions: {
      maxSpeed: number;
      condition: keyof typeof ICON_MAPPER;
    }[] = [
      { maxSpeed: 1, condition: "Calm" },
      { maxSpeed: 20, condition: "Light Breeze" },
      { maxSpeed: 40, condition: "Moderate Breeze" },
      { maxSpeed: 60, condition: "Strong Breeze" },
      { maxSpeed: 80, condition: "Gale" },
      { maxSpeed: Infinity, condition: "Storm" },
    ];

    for (const { maxSpeed, condition } of conditions) {
      if (windSpeed < maxSpeed) {
        return condition;
      }
    }
    return "Unknown";
  }
}
