"use strict";
/**
 * @module libSound
 * @description This module provides classes to play sound files. And generate sound effects.
 */

/**
 * Enum of octaves
 * @enum {number}
 */
// prettier-ignore
export const EOctave = {
  Octave1: 0, Octave2: 1, Octave3: 2, Octave4: 3, Octave5: 4, Octave6: 5, Octave7: 6, Octave8: 7, Octave9: 8
};

/**
 * Enum of note names
 */
// prettier-ignore
export const ENoteName = {
  C: "C", Db: "Db", D: "D", Eb: "Eb", E: "E", F: "F", Gb: "Gb", G: "G", Ab: "Ab", A: "A", Bb: "Bb", B: "B"
};

/**
 * Array for all basic notes
 * @type {Array}
 * @const
 * Use example: Notes.C[EOctave.Octave4]
 */
// prettier-ignore
const Notes = {
  //       0      1     2        3        4      5         6      7         8
     C: [16.35, 32.70,  65.41, 130.80, 261.60, 523.30, 1047.00, 2093.00, 4186.00],
    Db: [17.32, 34.65,  69.30, 138.60, 277.20, 554.40, 1109.00, 2217.00, 4435.00],
     D: [18.35, 36.71,  73.42, 146.80, 293.70, 587.30, 1175.00, 2349.00, 4699.00],
    Eb: [19.45, 38.89,  77.78, 155.60, 311.10, 622.30, 1245.00, 2489.00, 4978.00],
     E: [20.60, 41.20,  82.41, 164.80, 329.60, 659.30, 1319.00, 2637.00, 5274.00],
     F: [21.83, 43.65,  87.31, 174.60, 349.20, 698.50, 1397.00, 2794.00, 5588.00],
    Gb: [23.12, 46.25,  92.50, 185.00, 370.00, 740.00, 1480.00, 2960.00, 5920.00],
     G: [24.50, 49.00,  98.00, 196.00, 392.00, 784.00, 1568.00, 3136.00, 6272.00],
    Ab: [25.96, 51.91, 103.80, 207.70, 415.30, 830.60, 1661.00, 3322.00, 6645.00],
     A: [27.50, 55.00, 110.00, 220.00, 441.00, 880.00, 1760.00, 3520.00, 7040.00],
    Bb: [29.14, 58.27, 116.50, 233.10, 466.20, 932.30, 1865.00, 3729.00, 7459.00],
     B: [30.87, 61.74, 123.50, 246.90, 493.90, 987.80, 1976.00, 3951.00, 7902.00]
};

/**
 * Enum of waveform types
 * @enum {string}
 */
// prettier-ignore
export const EWaveformType = {
  Sine: "sine", Square: "square", Sawtooth: "sawtooth", Triangle: "triangle"
};

let audioContext = null;


/**
 * @class TSoundWave
 * @description This class generates a sound wave
 * @param {EOctave} aOctave - The octave of the note
 * @param {ENoteName} aNote - The note name
 * @param {EWaveformType} aWaveformType - The waveform type
 */
class TSoundWave {
  #oscillator;
  #gainNode; // Reduce the "click" sound when the sound starts and stops
  #frequency;
  #waveformType;
  constructor(aOctave, aNote, aWaveformType = EWaveformType.Sine) {
    if (audioContext === null) throw new Error("AudioContext has not been created. Please create a new instance of TAudioContext in a user interaction event.");
    this.#frequency = Notes[aNote][aOctave];
    this.#waveformType = aWaveformType;

    this.#setUpNodes();
  }

  #setUpNodes() {
    this.#oscillator = audioContext.createOscillator();
    this.#oscillator.type = this.#waveformType;
    this.#oscillator.frequency.value = this.#frequency;

    this.#gainNode = audioContext.createGain();
    this.#oscillator.connect(this.#gainNode);
    this.#gainNode.connect(audioContext.destination);
    this.#gainNode.gain.setValueAtTime(0, audioContext.currentTime) // Mute the sound
    this.#oscillator.start(); // Start the oscillator, in muted state
  }

  play(){
    this.#gainNode.gain.setTargetAtTime(1, audioContext.currentTime, 0.015); // Full volume in 0.015 seconds to avoid "click" sound
  }

  stop(){
    this.#gainNode.gain.setTargetAtTime(0, audioContext.currentTime, 0.015); // Mute the sound, 0.015 seconds to avoid "click" sound
  }

}


/**
 * @function activateAudioContext
 * @description This function activates the audio context, call this in a user interaction event! This can be called multiple times, but only the first call will create the audio context.
 */
function activateAudioContext() {
  if (audioContext === null) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext; // Return the audio context
}

//--------------- Objects and Variables ----------------------------------//
const EAudioStateType = { Stopped: 1, Playing: 2, Paused: 3 };

//--------------- Classes ------------------------------------------------//
class TSoundFile {
  #audio;
  #audioState;
  constructor(aSoundFile) {
    this.#audio = new Audio(aSoundFile);
    this.#audioState = EAudioStateType.Stopped;
  }

  play() {
    if (!this.#audioState === EAudioStateType.Stopped) {
      this.#audio.currentTime = 0;
    }
    if (this.#audioState !== EAudioStateType.Playing) {
      this.#audio.play();
      this.#audioState = EAudioStateType.Playing;
    }
  }

  stop() {
    this.#audio.pause();
    this.#audio.currentTime = 0; // Reset the audio to the beginning
    this.#audioState = EAudioStateType.Stopped; // Set the audio state to stopped
  }

  pause() {
    this.#audio.pause();
    this.#audioState = EAudioStateType.Paused;
  }

  get audioState() {
    return this.#audioState;
  }
}

//--------------- Exports -----------------------------------------------//
export default {
  /**
   * @enum {EAudioStateType}
   * @description This enumeration defines the audio state types.
   */
  EAudioStateType,

  /**
   * @class TSoundFile
   * @description This class plays a sound
   * @param {string} aSoundFile - The sound file to play
   * @method play - Play the sound
   * @method stop - Stop the sound
   * @method pause - Pause the sound
   */
  TSoundFile,

  /**
   * @function activateAudioContext
   * @description This function activates the audio context, call this in a user interaction event!
   */
  activateAudioContext,

  /**
   * @enum {EOctave}
   * @description This enumeration defines the octaves
   * @example Notes.C[EOctave.Octave4]
   */
  EOctave,

  /**
   * @enum {ENoteName}
   * @description This enumeration defines the note names
   */
  ENoteName,

  /**
   * @enum {EWaveformType}
   * @description This enumeration defines the waveform types
   */
  EWaveformType,

  /**
   * @class TSoundWave
   * @description This class generates a
   * @param {EOctave} aOctave - The octave of the note
   * @param {ENoteName} aNote - The note name
   * @param {EWaveformType} aWaveformType - The waveform type
   * @method play - Play the sound
   * @method stop - Stop the sound
   */
  TSoundWave
};
