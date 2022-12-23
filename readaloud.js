"use strict";
var ReadAloud = function(audioElSelector, options) {
  var paragraphElSelector = ".chapter-ReadAloud";
  var audioEl = document.querySelector(audioElSelector);

  var speedControlButton = document.querySelector(
    ".readaloud_speedToggle"
  );

  var playPauseToggleButton = document.querySelector("#playPauseToggleButton");
  var stopButton = document.querySelector("#stopButton");

  options = options || {};
  // override with a custom highlight class in case there are issues with ADE
  options.highlightClass = "customHighlighted";

  var customReader = new CustomReadAloud(
    paragraphElSelector,
    audioElSelector,
    options
  );

  var paragraphContainer = document.querySelector(paragraphElSelector);

  paragraphContainer.addEventListener(
    "click",
    function paragraphContainerHandler(e) {
      e.preventDefault();
    }
  );

  var audioControlsContainer = document.querySelector(".audioControls");
  audioControlsContainer.addEventListener(
    "click",
    function audioControlsContainerHandler(e) {
      e.preventDefault();
    }
  );

  playPauseToggleButton.addEventListener(
    "click",
    function playPauseToggleButtonHandler(e) {
      togglePlay();
      // e.stopPropagation();
      e.preventDefault();
    }
  );
  stopButton.addEventListener("click", function stopButtonClickHandler(e) {
    customReader.stop();
    playPauseToggleButton.setAttribute("data-pressed", false);
    e.preventDefault();
  });

  audioEl.addEventListener("playStateChange", function playStateChangeHandler(
    e
  ) {
    if (customReader.isPlaying) {
      playPauseToggleButton.setAttribute("data-playing", true);
      playPauseToggleButton.setAttribute("data-pressed", true);
      stopButton.setAttribute("data-pressed", false);
    } else {
      playPauseToggleButton.setAttribute("data-playing", false);
      if (customReader.current == customReader.audioClipBegin) {
        playPauseToggleButton.setAttribute("data-pressed", false);
      }
    }
  });

  // restore focus to the play button
  audioEl.addEventListener("highlightChange", function restoreFocus() {
    playPauseToggleButton.focus();
  });

  var togglePlay = function() {
    if (customReader.isPlaying) {
      customReader.pause();
    } else {
      customReader.play();
    }
  };

  // the handler is wrapped in a function that also passes the index for each element with the listener
  function handleSpeedControlChange(speed) {
    // only pause and play if currently playing
    if (customReader.isPlaying) {
      customReader.pause();
      customReader.changePlaybackRate(speed);
      customReader.play();
      
    }
    // only adjust the playback rate otherwise
    else {
      customReader.changePlaybackRate(speed);
    }
  }

function controlSpeed(){
  
  if(audioEl.playbackRate == 0.75){
    speedControlButton.setAttribute("data-pressed", "false");
    audioEl.playbackRate = 1;
  }else{
    speedControlButton.setAttribute("data-pressed", "true");
    audioEl.playbackRate = 0.75;
  }  
    
}

speedControlButton.addEventListener('click', controlSpeed);
console.log(speedControlButton); 

 

  // A simple forEach replacement with the minimum functionality needed to use with an element NodeList

  function _forEach(elementArray, callback) {
    for (var i = 0; i < elementArray.length; i++) {
      callback(elementArray[i], i);
    }
  }
};
