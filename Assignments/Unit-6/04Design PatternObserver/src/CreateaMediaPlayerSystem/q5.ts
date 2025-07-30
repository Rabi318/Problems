// MediaFile interface
interface MediaFile {
  play(): void;
}

// Implement AudioFile
class AudioFile implements MediaFile {
  play(): void {
    console.log("Playing audio file...");
  }
}

// Implement VideoFile
class VideoFile implements MediaFile {
  play(): void {
    console.log("Playing video file...");
  }
}

// Implement PDFFile
class PDFFile implements MediaFile {
  play(): void {
    console.log("Displaying PDF document...");
  }
}

// MediaPlayer accepts any MediaFile
class MediaPlayer {
  private media: MediaFile;

  constructor(media: MediaFile) {
    this.media = media;
  }

  playMedia(): void {
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
