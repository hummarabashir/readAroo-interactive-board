const app = document.getElementById("alphabet");

const letterGrid = document.createElement("div");
letterGrid.setAttribute("class", "grid");

/*Create divs with paragraphs for each letter in the alphabet */
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
alphabet.map((current) => {
  const letterBlock = document.createElement("div");
  letterBlock.setAttribute("class", "block");
  letterBlock.setAttribute("id", current);
  const letter = document.createElement("p");
  letter.setAttribute("class", "letter");

  letter.textContent = current;
  letterBlock.append(letter);
  letterGrid.append(letterBlock);
});

app.append(letterGrid);

/*Set up sound 
src file and code from: https://codepen.io/chriscoyier/pen/xLYjKx */
const context = new window.AudioContext();
function playFile(file) {
  fetch(file)
    // read into memory as an arryBuffer
    .then((response) => response.arrayBuffer())
    // turn it into raw audio data 🎉
    .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => {
      // play the music 🎶
      const soundSource = context.createBufferSource();
      soundSource.buffer = audioBuffer;
      soundSource.connect(context.destination);
      soundSource.start();
    });
}

/* Listen to keyboard events and highlight the current event */

document.addEventListener("keyup", function (event) {
  const prevSelection = document.getElementsByClassName("selectedLetter");
  if (prevSelection.length) {
    prevSelection[0].classList.toggle("selectedLetter");
  }
  console.log(event.key);
  const selected = document.getElementById(event.key);
  selected.classList.toggle("selectedLetter");
  playFile("https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3");

  setTimeout(() => selected.classList.toggle("selectedLetter"), 200);
});
