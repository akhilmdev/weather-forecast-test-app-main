import { describe, expect, test } from "vitest";

import DateTimeService from "../../services/date-time.service";

describe("testing date-time.services", () => {
  const dateTimeService = new DateTimeService();

  test("test the formatDate function with default format", async () => {
    const mockDate = new Date("2023-10-01T00:00:00Z");
    const convertTime = dateTimeService.formatDate(mockDate);
    expect(convertTime).toBe("10-01-2023");
  });

  test("test the formatDate function with custom format", async () => {
    const mockDate = new Date("2023-10-01T00:00:00Z");
    const convertTime = dateTimeService.formatDate(mockDate, "DD-MM-YYYY");
    expect(convertTime).toBe("01-10-2023");
  });

  test("test the formatDate function with date string", async () => {
    const mockDate = "2023-10-01T11:31:00Z";
    const convertTime = dateTimeService.formatDate(mockDate, "HH:mm");
    expect(convertTime).toBe("17:01");
  });
});
