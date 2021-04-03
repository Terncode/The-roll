import { random } from "lodash";

export class FlyingSaucer {
  private readonly maxStuck = 150;
  private readonly moveSpeed = 5;

  private window: Window;
  private frame: number;
  private lastX = 0;
  private lastY = 0;
  private increasingX = true;
  private increasingY = true;
  private xStuckCounter = 0;
  private yStuckCounter = 0;

  constructor(private ytID: string) {
  }

  summon() {
    if (!this.window) {
      this.window = window.open("", "", `toolbar=no,scrollbars=no,resizable=no,width=${this.width + 10},height=${this.height + 10}`);
      const data = this.getYTiframe(this.ytID, this.width, this.height);
      const html = this.html(data);
      this.window.document.write(html);
      this.eventLoop();
    }
  }
  shot() {
    this.cancelFrame();

    if (this.window) {
      this.window.close();
    }
  }

  start() {

  }

  eventLoop = () => {
    if (!this.window)
      return this.cancelFrame();

    if (this.window.closed) {
      return this.shot();
    }
    this.window.focus();


    this.window.moveBy(this.increasingX ? this.moveSpeed : -this.moveSpeed, this.increasingY ? this.moveSpeed : -this.moveSpeed);

    this.lastX = this.window.screenX;
    this.lastY = this.window.screenY;

    this.xStuckCounter++;
    if (this.xStuckCounter > this.maxStuck) {
      this.xStuckCounter = random(0, 100);
      this.increasingX = !this.increasingX;
    }
    this.yStuckCounter++;
    if (this.yStuckCounter > this.maxStuck) {
      this.yStuckCounter = random(0, 100);
      this.increasingY = !this.increasingY;
    }

    this.frame = requestAnimationFrame(this.eventLoop);
  }
  private getYTiframe(id: string, width: number, height: number) {
    const ytUrl = `https://www.youtube.com/embed/${id}`;
    console.log(ytUrl)
    const fancyArray = [
      `<iframe`,
      `width="${width}"`,
      `height="${height}"`,
      `src="${ytUrl}"`,
      `title="YouTube video player"`,
      `frameborder="0"`,
      `allow="autoplay"`,
      `allow="accelerometer;`,
      `autoplay;`,
      `clipboard-write;`,
      `encrypted-media;`,
      `enablejsapi=true`,
      `gyroscope;`,
      `picture-in-picture"`,
      `allowfullscreen>`,
      `</iframe>`
    ];
    return fancyArray.join(" ");
  }
  private html(data: string) {
    const fancyArray = [
    `<!DOCTYPE html>`,
    `<html lang="en">`,
    `<head>`,
    `    <meta charset="UTF-8">`,
    `    <meta http-equiv="X-UA-Compatible" content="IE=edge">`,
    `    <meta name="viewport" content="width=device-width, initial-scale=1.0">`,
    `    <title>Document</title>`,
    `     <style>`,
    `        * {`,
    `          padding: 0;`,
    `          border: 0;`,
    `          background-color: black;`,
    `          overflow: hidden;`,
    `        }`,
    `        </style>`,
    `</head>`,
    `<body>`,
    `${data}`,
    `</body>`,
    `</html>`];

    return fancyArray.join(" \n");
  }


  private cancelFrame() {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
      this.frame = undefined;
    }
  }
  private get height() {
    return Math.floor(screen.height * 0.25);
  }
  private get width() {
    return Math.floor(screen.width * 0.25);
  }
}

