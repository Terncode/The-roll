import MobileDetect = require("mobile-detect");
import { FlyingSaucer } from "./FlyingSaucer";
import { TextRoll } from "./RollingTest";
import { writeHistory } from "./writeHistory";


const videoId = `Lrj2Hq7xqQ8`;
writeHistory(videoId);

window.addEventListener("click", () => {
  const run = () => {
    const md = new MobileDetect(window.navigator.userAgent);
    if (md.phone()) {
      location.href = `https://www.youtube.com/watch?v=${videoId}`;
      return;
    }

    (window as any).player.playVideo();
    const dvdSaucer = new FlyingSaucer(videoId);
    dvdSaucer.summon();
    const black = document.getElementById("black");
    const testRoller = new TextRoll("You have been rick rolled in a professional way. ");
    testRoller.start();
    if (black) {
      try {
        const parent = black.parentElement;
        parent.removeChild(black);
      } catch (error) {
        /* ignored */
      }
    }
  };

  if (!(window as any).ready) {
    const frame = setInterval(() => {
      if (!(window as any).ready) {
        clearTimeout(frame);
        run();

        return;
      }
    }, 0);
  } else {
    run();
  }
});

