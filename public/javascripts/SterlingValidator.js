define([], function() {

  /**
   * Used to validate an input that represents an Sterling value
   * @constructor
   * @param {string} input Input text from the user
   */
  function SterlingValidator(input) {
    this.input = input;
    this.pattern = /^\xA3?\d+(\.\d*)?p?$|^\d+p?$/;
  }


  // returns true if this.input matches this.pattern
  SterlingValidator.prototype.validate = function() {
    return this.pattern.test(this.input);
  };


  return SterlingValidator;
});
