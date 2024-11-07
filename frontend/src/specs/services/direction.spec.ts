import { describe, it, beforeAll, beforeEach, expect, vi } from "vitest";
import DirectionService from "./../../services/direction.service";

describe("test cases for direction.services", () => {
  const directionService = new DirectionService();

  it("should return the wind direction 20 degree", async () => {
    const directions = await directionService.getWindDirection(10);

    expect(directions).toEqual("N");
  });

  it("should return the wind direction 190 degree", async () => {
    const directions = await directionService.getWindDirection(180);

    expect(directions).toEqual("S");
  });

  it("should return the wind direction 45 degree", async () => {
    const directions = await directionService.getWindDirection(45);

    expect(directions).toEqual("NE");
  });

  it("should return the wind direction -45 degree", async () => {
    const directions = await directionService.getWindDirection(-45);

    expect(directions).toEqual("NW");
  });

  it("should return the wind condition 15 kmh speed", async () => {
    const directions = await directionService.getWindCondition(15);

    expect(directions).toEqual("Light Breeze");
  });

  it("should return the wind condition 60 kmh speed", async () => {
    const directions = await directionService.getWindCondition(60);

    expect(directions).toEqual("Gale");
  });

  it("should return the wind condition 0.5 kmh speed", async () => {
    const directions = await directionService.getWindCondition(0.5);

    expect(directions).toEqual("Calm");
  });

  it("should return the wind condition -15 kmh speed", async () => {
    const directions = await directionService.getWindCondition(-15);

    expect(directions).toEqual("Unknown");
  });

  it("should return the wind condition 85 kmh speed", async () => {
    const directions = await directionService.getWindCondition(85);

    expect(directions).toEqual("Storm");
  });
});
