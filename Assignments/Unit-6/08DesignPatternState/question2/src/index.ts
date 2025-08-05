interface State {
  handle(): void;
}

class TrafficLight {
  private redState: State;
  private greenState: State;
  private yellowState: State;

  private currentState: State;

  constructor() {
    this.redState = new RedState(this);
    this.greenState = new GreenState(this);
    this.yellowState = new YellowState(this);

    this.currentState = this.redState; // Start with red
  }

  setState(state: State) {
    this.currentState = state;
  }

  getRedState(): State {
    return this.redState;
  }

  getGreenState(): State {
    return this.greenState;
  }

  getYellowState(): State {
    return this.yellowState;
  }

  // Trigger the current state's behavior
  change() {
    this.currentState.handle();
  }
}

class RedState implements State {
  constructor(private light: TrafficLight) {}

  handle(): void {
    console.log("🔴 Red Light - Vehicles must stop.");
    this.light.setState(this.light.getGreenState());
  }
}

class GreenState implements State {
  constructor(private light: TrafficLight) {}

  handle(): void {
    console.log("🟢 Green Light - Vehicles can go.");
    this.light.setState(this.light.getYellowState());
  }
}

class YellowState implements State {
  constructor(private light: TrafficLight) {}

  handle(): void {
    console.log("🟡 Yellow Light - Vehicles should slow down.");
    this.light.setState(this.light.getRedState());
  }
}

const trafficLight = new TrafficLight();
trafficLight.change();
trafficLight.change();
trafficLight.change();
