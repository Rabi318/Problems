"use strict";
class MediaPlayer {
    constructor() {
        this.playState = new PlayState(this);
        this.pauseState = new PauseState(this);
        this.stopState = new StopState(this);
        this.currentState = this.stopState; // Initial state
    }
    setState(state) {
        this.currentState = state;
    }
    getPlayState() {
        return this.playState;
    }
    getPauseState() {
        return this.pauseState;
    }
    getStopState() {
        return this.stopState;
    }
    // Delegated operations
    play() {
        this.currentState.play();
    }
    pause() {
        this.currentState.pause();
    }
    stop() {
        this.currentState.stop();
    }
}
class PlayState {
    constructor(player) {
        this.player = player;
    }
    play() {
        console.log("▶️ Already playing.");
    }
    pause() {
        console.log("⏸️ Pausing media...");
        this.player.setState(this.player.getPauseState());
    }
    stop() {
        console.log("⏹️ Stopping media...");
        this.player.setState(this.player.getStopState());
    }
}
class PauseState {
    constructor(player) {
        this.player = player;
    }
    play() {
        console.log("▶️ Resuming media...");
        this.player.setState(this.player.getPlayState());
    }
    pause() {
        console.log("⏸️ Already paused.");
    }
    stop() {
        console.log("⏹️ Stopping media from pause...");
        this.player.setState(this.player.getStopState());
    }
}
class StopState {
    constructor(player) {
        this.player = player;
    }
    play() {
        console.log("▶️ Playing media from beginning...");
        this.player.setState(this.player.getPlayState());
    }
    pause() {
        console.log("⚠️ Can't pause. Media is stopped.");
    }
    stop() {
        console.log("⏹️ Already stopped.");
    }
}
const player = new MediaPlayer();
player.pause();
player.play();
player.stop();
