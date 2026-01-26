//use strict mode
"use strict";

/**
 * @module libSound
 * @description This module exports classes and constants for sound handling and sound generation.
 * @class TSoundWave, Generates a sound wave with selected note, octave, and waveform.
 * @class TSoundFile, Plays sound files with simple control.
 * @enum EOctave, Enum for octaves.
 * @enum ENoteName, Enum for note names.
 * @const Notes, Array with frequencies for all base notes and octaves.
 * @enum EWaveformType, Enum for waveform types.
 * @function activateAudioContext, Activates AudioContext (must be called from a user interaction).
 * @enum EAudioStateType, Enum for audio state.
 */

export { EOctave, ENoteName, Notes, EWaveformType, activateAudioContext, EAudioStateType, TSoundWave, TSoundFile } from "./sound.js";
