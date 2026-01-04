const RAD = Math.PI / 180;

/**
 * @description Class for generating sine wave values
 * @param {number} aAmplitude - The amplitude of the sine wave
 * @param {number} aFrequency - The frequency of the sine wave
 */
export class TSineWave {
  #amplitude;
  #frequency;
  #angle;
  constructor(aAmplitude, aFrequency) {
    this.#amplitude = aAmplitude;
    this.#frequency = aFrequency;
    this.#angle = 0;
  }

  /**
   * @description Get the current value of the sine wave and update the angle
   * @returns {number} The current value of the sine wave
  */
  get value() {
    let value = this.#amplitude * Math.sin(this.#angle * RAD);
    this.#angle += this.#frequency;
    return value;
  }
} // end of TSineWave class
