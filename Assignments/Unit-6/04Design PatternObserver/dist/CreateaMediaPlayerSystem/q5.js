"use strict";
// Implement AudioFile
class AudioFile {
    play() {
        console.log("Playing audio file...");
    }
}
// Implement VideoFile
class VideoFile {
    play() {
        console.log("Playing video file...");
    }
}
// Implement PDFFile
class PDFFile {
    play() {
        console.log("Displaying PDF document...");
    }
}
// MediaPlayer accepts any MediaFile
class MediaPlayer {
    constructor(media) {
        this.media = media;
    }
    playMedia() {
        this.media.play();
    }
}
// Example usage
const audioPlayer = new MediaPlayer(new AudioFile());
audioPlayer.playMedia();
const videoPlayer = new MediaPlayer(new VideoFile());
videoPlayer.playMedia();
const pdfViewer = new MediaPlayer(new PDFFile());
pdfViewer.playMedia();
