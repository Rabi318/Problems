interface State {
  play(): void;
  pause(): void;
  stop(): void;
}

class MediaPlayer {
  private playState: State;
  private pauseState: State;
  private stopState: State;

  private currentState: State;

  constructor() {
    this.playState = new PlayState(this);
    this.pauseState = new PauseState(this);
    this.stopState = new StopState(this);

    this.currentState = this.stopState; // Initial state
  }

  setState(state: State) {
    this.currentState = state;
  }

  getPlayState(): State {
    return this.playState;
  }

  getPauseState(): State {
    return this.pauseState;
  }

  getStopState(): State {
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

class PlayState implements State {
  constructor(private player: MediaPlayer) {}

  play(): void {
    console.log("▶️ Already playing.");
  }

  pause(): void {
    console.log("⏸️ Pausing media...");
    this.player.setState(this.player.getPauseState());
  }

  stop(): void {
    console.log("⏹️ Stopping media...");
    this.player.setState(this.player.getStopState());
  }
}

class PauseState implements State {
  constructor(private player: MediaPlayer) {}

  play(): void {
    console.log("▶️ Resuming media...");
    this.player.setState(this.player.getPlayState());
  }

  pause(): void {
    console.log("⏸️ Already paused.");
  }

  stop(): void {
    console.log("⏹️ Stopping media from pause...");
    this.player.setState(this.player.getStopState());
  }
}

class StopState implements State {
  constructor(private player: MediaPlayer) {}

  play(): void {
    console.log("▶️ Playing media from beginning...");
    this.player.setState(this.player.getPlayState());
  }

  pause(): void {
    console.log("⚠️ Can't pause. Media is stopped.");
  }

  stop(): void {
    console.log("⏹️ Already stopped.");
  }
}

const player = new MediaPlayer();
player.pause();
player.play();
player.stop();
