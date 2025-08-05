export class TimeUtils {
  static calculateHoursBetween(start: Date, end: Date): number {
    const diffInMs = end.getTime() - start.getTime();
    return Math.ceil(diffInMs / (1000 * 60 * 60)); // convert ms to hours, always round up
  }

  static now(): Date {
    return new Date();
  }
}
