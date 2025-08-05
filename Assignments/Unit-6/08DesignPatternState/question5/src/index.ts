interface LightState {
  turnOn(): void;
  turnOff(): void;
  motionDetected(): void;
  adjustBrightness(isDaytime: boolean): void;
}

//Define the smart light context
class SmartLight {
  private offState: LightState;
  private onState: LightState;
  private motionState: LightState;
  private brightnessState: LightState;

  private currentState: LightState;

  constructor() {
    this.offState = new OffState(this);
    this.onState = new OnState(this);
    this.motionState = new MotionDetectionState(this);
    this.brightnessState = new BrightnessAdjustmentState(this);

    this.currentState = this.offState; // Default starting state
  }

  setState(state: LightState): void {
    this.currentState = state;
  }

  getOffState(): LightState {
    return this.offState;
  }

  getOnState(): LightState {
    return this.onState;
  }

  getMotionState(): LightState {
    return this.motionState;
  }

  getBrightnessState(): LightState {
    return this.brightnessState;
  }

  // Delegate actions
  turnOn(): void {
    this.currentState.turnOn();
  }

  turnOff(): void {
    this.currentState.turnOff();
  }

  motionDetected(): void {
    this.currentState.motionDetected();
  }

  adjustBrightness(isDaytime: boolean): void {
    this.currentState.adjustBrightness(isDaytime);
  }
}

//Implement the Concrete state classes
class OffState implements LightState {
  constructor(private light: SmartLight) {}

  turnOn(): void {
    console.log("💡 Light turned on manually.");
    this.light.setState(this.light.getOnState());
  }

  turnOff(): void {
    console.log("🔕 Light is already off.");
  }

  motionDetected(): void {
    console.log("🚶 Motion detected. Turning light on...");
    this.light.setState(this.light.getMotionState());
  }

  adjustBrightness(isDaytime: boolean): void {
    console.log("⚠️ Cannot adjust brightness. Light is off.");
  }
}

class OnState implements LightState {
  constructor(private light: SmartLight) {}

  turnOn(): void {
    console.log("💡 Light is already on.");
  }

  turnOff(): void {
    console.log("🔕 Light turned off.");
    this.light.setState(this.light.getOffState());
  }

  motionDetected(): void {
    console.log("🚫 Motion ignored. Light is already on manually.");
  }

  adjustBrightness(isDaytime: boolean): void {
    console.log("🌡️ Adjusting brightness based on time...");
    this.light.setState(this.light.getBrightnessState());
    this.light.adjustBrightness(isDaytime); // Delegate to new state
  }
}

class MotionDetectionState implements LightState {
  constructor(private light: SmartLight) {}

  turnOn(): void {
    console.log("💡 Light is already on due to motion.");
  }

  turnOff(): void {
    console.log("🔕 Turning light off from motion detection.");
    this.light.setState(this.light.getOffState());
  }

  motionDetected(): void {
    console.log("🔄 Motion continues. Light remains on.");
  }

  adjustBrightness(isDaytime: boolean): void {
    console.log("🌡️ Adjusting brightness (motion mode)...");
    this.light.setState(this.light.getBrightnessState());
    this.light.adjustBrightness(isDaytime);
  }
}

class BrightnessAdjustmentState implements LightState {
  constructor(private light: SmartLight) {}

  turnOn(): void {
    console.log("💡 Light is on with adjusted brightness.");
    this.light.setState(this.light.getOnState());
  }

  turnOff(): void {
    console.log("🔕 Turning off light from brightness adjustment.");
    this.light.setState(this.light.getOffState());
  }

  motionDetected(): void {
    console.log("🚶 Motion detected. Switching to motion detection state.");
    this.light.setState(this.light.getMotionState());
  }

  adjustBrightness(isDaytime: boolean): void {
    if (isDaytime) {
      console.log("🔆 Daytime detected. Reducing brightness.");
    } else {
      console.log("🌙 Night detected. Increasing brightness.");
    }
    // Stay in the same state or go back to On if needed
    this.light.setState(this.light.getOnState());
  }
}

// Usage
const smartLight = new SmartLight();
smartLight.turnOn();
smartLight.adjustBrightness(true);
smartLight.motionDetected();
smartLight.adjustBrightness(false);
smartLight.turnOff();
