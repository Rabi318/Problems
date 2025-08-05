"use strict";
//Define the smart light context
class SmartLight {
    constructor() {
        this.offState = new OffState(this);
        this.onState = new OnState(this);
        this.motionState = new MotionDetectionState(this);
        this.brightnessState = new BrightnessAdjustmentState(this);
        this.currentState = this.offState; // Default starting state
    }
    setState(state) {
        this.currentState = state;
    }
    getOffState() {
        return this.offState;
    }
    getOnState() {
        return this.onState;
    }
    getMotionState() {
        return this.motionState;
    }
    getBrightnessState() {
        return this.brightnessState;
    }
    // Delegate actions
    turnOn() {
        this.currentState.turnOn();
    }
    turnOff() {
        this.currentState.turnOff();
    }
    motionDetected() {
        this.currentState.motionDetected();
    }
    adjustBrightness(isDaytime) {
        this.currentState.adjustBrightness(isDaytime);
    }
}
//Implement the Concrete state classes
class OffState {
    constructor(light) {
        this.light = light;
    }
    turnOn() {
        console.log("💡 Light turned on manually.");
        this.light.setState(this.light.getOnState());
    }
    turnOff() {
        console.log("🔕 Light is already off.");
    }
    motionDetected() {
        console.log("🚶 Motion detected. Turning light on...");
        this.light.setState(this.light.getMotionState());
    }
    adjustBrightness(isDaytime) {
        console.log("⚠️ Cannot adjust brightness. Light is off.");
    }
}
class OnState {
    constructor(light) {
        this.light = light;
    }
    turnOn() {
        console.log("💡 Light is already on.");
    }
    turnOff() {
        console.log("🔕 Light turned off.");
        this.light.setState(this.light.getOffState());
    }
    motionDetected() {
        console.log("🚫 Motion ignored. Light is already on manually.");
    }
    adjustBrightness(isDaytime) {
        console.log("🌡️ Adjusting brightness based on time...");
        this.light.setState(this.light.getBrightnessState());
        this.light.adjustBrightness(isDaytime); // Delegate to new state
    }
}
class MotionDetectionState {
    constructor(light) {
        this.light = light;
    }
    turnOn() {
        console.log("💡 Light is already on due to motion.");
    }
    turnOff() {
        console.log("🔕 Turning light off from motion detection.");
        this.light.setState(this.light.getOffState());
    }
    motionDetected() {
        console.log("🔄 Motion continues. Light remains on.");
    }
    adjustBrightness(isDaytime) {
        console.log("🌡️ Adjusting brightness (motion mode)...");
        this.light.setState(this.light.getBrightnessState());
        this.light.adjustBrightness(isDaytime);
    }
}
class BrightnessAdjustmentState {
    constructor(light) {
        this.light = light;
    }
    turnOn() {
        console.log("💡 Light is on with adjusted brightness.");
        this.light.setState(this.light.getOnState());
    }
    turnOff() {
        console.log("🔕 Turning off light from brightness adjustment.");
        this.light.setState(this.light.getOffState());
    }
    motionDetected() {
        console.log("🚶 Motion detected. Switching to motion detection state.");
        this.light.setState(this.light.getMotionState());
    }
    adjustBrightness(isDaytime) {
        if (isDaytime) {
            console.log("🔆 Daytime detected. Reducing brightness.");
        }
        else {
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
