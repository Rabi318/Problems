export class Request {
  constructor(
    public fromFloor: number,
    public toFloor: number,
    public weight: number
  ) {
    if (fromFloor < 1 || toFloor < 1) {
      throw new Error(
        `Invalid floor: from ${fromFloor}, to ${toFloor}. Floor must be >= 1.`
      );
    }
    if (weight <= 0) {
      throw new Error(`Invalid weight: must be > 0`);
    }
  }
}
