import MobileDetect = require("mobile-detect");
import { FlyingSaucer } from "./FlyingSaucer";
import { TextRoll } from "./RollingTest";
import { writeHistory } from "./writeHistory";


const videoId = `dQw4w9WgXcQ`;
writeHistory(videoId);
const run = () => {
  const md = new MobileDetect(window.navigator.userAgent);

  (window as any).player.playVideo();
  if (md.phone()) {
    const frame = document.body;
    if (frame.requestFullscreen) {
      frame.requestFullscreen();
    } else if ((frame as any).webkitRequestFullscreen) { /* Safari */
      (frame as any).webkitRequestFullscreen();
    } else if ((frame as any).msRequestFullscreen) { /* IE11 */
      (frame as any).msRequestFullscreen();
    }
  } else {
      const dvdSaucer = new FlyingSaucer(videoId);
      dvdSaucer.summon();

  }

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

window.addEventListener("click", () => {
 run();
});

function removeScripts() {
  if ((window as any).playerLoaded) {
    [...document.getElementsByTagName("script")].filter(e => e.src).forEach(script => script.parentNode.removeChild(script));
  }
}
setInterval(removeScripts, 1000);
removeScripts();

document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
}, false);
document.addEventListener("keydown", function(e) {
  if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      disabledEvent(e);
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      disabledEvent(e);
  }
  if (e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
      disabledEvent(e);
  }
  if (e.ctrlKey && e.keyCode === 85) {
      disabledEvent(e);
  }
  if (e.keyCode === 123) {
      disabledEvent(e);
  }
}, false);
function disabledEvent(e) {
  if (e.stopPropagation) {
      e.stopPropagation();
  } else if (window.event) {
      window.event.cancelBubble = true;
  }
  e.preventDefault();
  return false;
}