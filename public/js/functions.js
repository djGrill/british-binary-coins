$(function() {
  // CONSTANTS
  var DECIMAL_MULTIPLIER = 100;
  var VALID_COINS = [2, 1, .5, .2, .02, .01];

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

    _.each(VALID_COINS, function(coin, index) {
      while (this.numeric_input >= coin) {
        updateResultCoins(coin);
        this.numeric_input -= coin;

        // make sure 'numeric_input' is properly rounded,
        // -- operations with floats are not always 100% precise
        this.numeric_input = roundToDecimalPlace(this.numeric_input);
      }
    }, this);

    return coins;
  };

  /**
  * Helper functions
  **/
  function convertToValidFloat(str) {
    // parseFloat() doesn't work properly with the unicode '£' character,
    // -- so first we get the "numeric" part of the string with a regex
    var number = /\d+(\.\d+)?/.exec(str)[0];

    // check if the input refers to 'pences' only. In that case, convert to
    // -- the POUND.pence version with decimal numbers (determined by DECIMAL_MULTIPLIER)
    if (/\./.test(number) == false) {
      number /= DECIMAL_MULTIPLIER;
    }

    return parseFloat(number);
  };

  function roundToDecimalPlace(number) {
    return Math.round(number * DECIMAL_MULTIPLIER) / DECIMAL_MULTIPLIER;
  };

  function validateAndCalculate(input) {
    var validator = new SterlingValidator(input);
    if (validator.validate()) {
      var numeric_input = roundToDecimalPlace(convertToValidFloat(input));
      var calculator = new PenniesCalculator(numeric_input);
      var result = calculator.calculate();
      printResult(result);
    }
    else {
      // show error message
    }
  };

  function printResult(result) {
    var $ul = $("<ul>");

    _.each(result, function(value, key) {
      var $li = $("<li>");
      $li.html(key + ": " + value);
      $ul.append($li);
    });

    $("#result").html($ul);
  };

  $("#form-calculate").submit(function(e) {
    e.preventDefault();
    validateAndCalculate($("#input-amount").val());
  });
});
