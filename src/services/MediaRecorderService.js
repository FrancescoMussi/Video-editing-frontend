export default class MediaRecorderService {
  constructor(stream) {
    this.stream = stream
  }

  initMediaRecorder() {
    return new MediaRecorder(this.stream, {
      mimeType: 'video/webm;codecs=h264'
    })
  }
}