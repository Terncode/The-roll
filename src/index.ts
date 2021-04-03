import { FlyingSaucer } from "./FlyingSaucer";
import { TextRoll } from "./RollingTest";
import { writeHistory } from "./writeHistory";


const videoId = `Lrj2Hq7xqQ8`;
writeHistory(videoId);

window.addEventListener("click", () => {
  const dvdSaucer = new FlyingSaucer(videoId);
  dvdSaucer.summon();
});
const testRoller = new TextRoll("You have been rick rolled in a professional way. ");
testRoller.start();

