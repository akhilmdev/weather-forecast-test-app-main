import dayjs from "dayjs";

interface DateTimeInterface {
  formatDate: (date: string | Date, format: string) => string;
}

export default class DateTimeService implements DateTimeInterface {
  constructor() {}

  // Formats a given date into the specified format.
  // @param date - The date to format, either as a string or a Date object.
  // @param format - The format string, defaulting to "MM-DD-YYYY".
  // @returns The formatted date as a string.
  formatDate(date: string | Date, format: string = "MM-DD-YYYY"): string {
    return dayjs(date).format(format);
  }
}
