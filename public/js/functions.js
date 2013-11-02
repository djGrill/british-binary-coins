$(function() {
  /**
  * SterlingValidator constructor
  **/
  function SterlingValidator(input) {
    this.input = input;
    this.pattern = /^\xA3?\d+(\.\d+p?)?$|^\d+p?$/;

    this.validate = function() {
      return this.pattern.test(this.input);
    };
  };

  /**
  * PenniesCalculator constructor
  **/
  function PenniesCalculator(numeric_input) {
    this.valid_coins = [2, 1, .5, .2, .02, .01];
    this.numeric_input = numeric_input;
  };

  PenniesCalculator.prototype.calculate = function() {
    // in this object we'll register the amount of each type of coin needed
    var coins = {};

    function updateResultCoins(coin) {
      if (!coins[coin]) {
        coins[coin] = 1;
      }
      else {
        coins[coin] += 1;
      }
    };

    _.each(this.valid_coins, function(coin, index) {
      if (this.numeric_input >= coin) {
        updateResultCoins(coin);
        this.numeric_input -= coin;

        // make sure 'numeric_input' is properly rounded,
        // -- operations with floats are not always 100% precise
        this.numeric_input = roundToDecimalPlace(this.numeric_input, 2);
      }
    }, this);

    console.log(coins);
  };

  /**
  * Helper functions
  **/
  function convertToValidFloat(str) {
    // parseFloat() doesn't work properly with the unicode '£' character,
    // -- so first we get the "numeric" part of the string with a regex
    return parseFloat(/\d+(\.\d+)?/.exec(str));
  };

  function roundToDecimalPlace(number, decimal_place) {
    var multiplier = Math.pow(10, decimal_place);
    return Math.round(number * multiplier) / multiplier;
  };

  /**
  * Test code
  **/
  var input = "\xA31.212213487p";

  var validator = new SterlingValidator(input);
  if (validator.validate()) {
    var numeric_input = roundToDecimalPlace(convertToValidFloat(input), 2);
    var calculator = new PenniesCalculator(numeric_input);
    calculator.calculate();
  }
});
