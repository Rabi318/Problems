"use strict";
class TrafficLight {
    constructor() {
        this.redState = new RedState(this);
        this.greenState = new GreenState(this);
        this.yellowState = new YellowState(this);
        this.currentState = this.redState; // Start with red
    }
    setState(state) {
        this.currentState = state;
    }
    getRedState() {
        return this.redState;
    }
    getGreenState() {
        return this.greenState;
    }
    getYellowState() {
        return this.yellowState;
    }
    // Trigger the current state's behavior
    change() {
        this.currentState.handle();
    }
}
class RedState {
    constructor(light) {
        this.light = light;
    }
    handle() {
        console.log("🔴 Red Light - Vehicles must stop.");
        this.light.setState(this.light.getGreenState());
    }
}
class GreenState {
    constructor(light) {
        this.light = light;
    }
    handle() {
        console.log("🟢 Green Light - Vehicles can go.");
        this.light.setState(this.light.getYellowState());
    }
}
class YellowState {
    constructor(light) {
        this.light = light;
    }
    handle() {
        console.log("🟡 Yellow Light - Vehicles should slow down.");
        this.light.setState(this.light.getRedState());
    }
}
const trafficLight = new TrafficLight();
trafficLight.change();
trafficLight.change();
trafficLight.change();
