export class TextRoll {
  private frame: NodeJS.Timeout;
  constructor(private text: string) {}

  start() {
    if (!this.frame) {
      this.eventLoop();
    }
  }

  stop() {
    this.cancelFrame();
  }

  private eventLoop = () => {
    this.text = `${this.text.substring(1)}${this.text[0]}`;
    document.title = this.text.slice(0, 50);
    this.frame = setTimeout(this.eventLoop, 100);
  }
  private cancelFrame() {
    if (this.frame) {
      clearTimeout(this.frame);
      this.frame = undefined;
    }
  }
}
