define([], function() {

  /**
   * Used to validate an input that represents an Sterling value
   * @constructor
   */
  function SterlingValidator() {
    this.pattern = /^\xA3?\d+(\.\d*)?p?$|^\d+p?$/;
  }


  // returns true if input matches this.pattern
  SterlingValidator.prototype.validate = function(input) {
    return this.pattern.test(input);
  };


  return SterlingValidator;
});
