import { random } from "lodash";

export class BlockTab {
  private readonly maxStuck = 100;
  private readonly moveSpeed = 5;

  private window: Window;
  private frame: number;
  private increasingX = true;
  private xStuckCounter = 0;

  constructor() {
  }

  summon() {
    if (!this.window) {
      this.window = window.open("", "", `toolbar=no,scrollbars=no,resizable=no,width=${this.width},height=${this.height}`);
      this.eventLoop();
    }
  }
  shot() {
    this.cancelFrame();

    if (this.window) {
      this.window.close();
      this.window = undefined;
    }
  }

  start() {

  }

  eventLoop = () => {
    if (!this.window)
      return this.cancelFrame();

    if (this.window.closed) {
      this.shot();
      return;
    }
    this.window.focus();
    this.window.moveBy(random(-50, 50), -100);

    this.xStuckCounter++;
    if (this.xStuckCounter > this.maxStuck) {
      this.xStuckCounter = random(0, 100);
      this.increasingX = !this.increasingX;
    }
    this.frame = requestAnimationFrame(this.eventLoop);
  }

  private cancelFrame() {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
      this.frame = undefined;
    }
  }
  private get height() {
    return Math.floor(screen.height * 0.10);
  }
  private get width() {
    return screen.width - 200;
  }
}

