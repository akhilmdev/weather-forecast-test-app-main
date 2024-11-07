export type WindCondition =
  | "Calm"
  | "Light Breeze"
  | "Moderate Breeze"
  | "Strong Breeze"
  | "Gale"
  | "Storm"
  | "Unknown";

export const ICON_MAPPER: Record<WindCondition, string> = {
  Calm: "calm-wind",
  "Light Breeze": "calm-wind",
  "Moderate Breeze": "moderate-wind",
  "Strong Breeze": "moderate-wind",
  Gale: "storm",
  Storm: "storm",
  Unknown: "air",
};

export const BASE_URL = "https://api.open-meteo.com/v1";
