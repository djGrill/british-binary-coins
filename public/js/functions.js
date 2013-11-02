// CONSTANTS
var DECIMAL_MULTIPLIER = 100;
var VALID_COINS = [2, 1, 0.5, 0.2, 0.02, 0.01];


/**
 * Used to validate an input that represents an Sterling value
 * @constructor
 * @param {string} input Input text from the user
 */
function SterlingValidator(input) {
  this.input = input;
  this.pattern = /^\xA3?\d+(\.\d+p?)?$|^\d+p?$/;

  // returns true if this.input matches this.pattern
  this.validate = function() {
    return this.pattern.test(this.input);
  };
}


/**
 * Calculates the minimum amount of VALID_COINS needed to make the specified amount
 * @constructor
 * @param {float} numericInput Valid amount specified by the user
 */
function PenniesCalculator(numericInput) {
  this.numericInput = numericInput;
}

PenniesCalculator.prototype.calculate = function() {
  // here we'll store the amount of each type of coin needed
  var resultCoins = {};

  function updateResultCoins(coin) {
    if (!resultCoins[coin]) {
      resultCoins[coin] = 1;
    }
    else {
      resultCoins[coin] += 1;
    }
  }

  _.each(VALID_COINS, function(coin, index) {
    while (this.numericInput >= coin) {
      updateResultCoins(coin);
      this.numericInput -= coin;

      // make sure that numericInput is properly rounded
      this.numericInput = roundToDecimalPlace(this.numericInput);
    }
  }, this);

  return resultCoins;
};


/**
 * Converts and returns a float number with 2 decimal values. For example:
 * £1.25 => 1.25
 * 125 => 1.25
 * 25p => 0.25
 * @param {string} str String to convert
 */
function convertToValidFloat(str) {
  // parseFloat() doesn't work properly with the unicode '£' character,
  // -- so first we get the "numeric" part of the string with a regex
  var number = /\d+(\.\d+)?/.exec(str)[0];

  // check if the input refers to 'pences' only. In that case, convert to
  // -- the POUND.pence version with decimal numbers (determined by DECIMAL_MULTIPLIER)
  if (/\./.test(number) === false) {
    number /= DECIMAL_MULTIPLIER;
  }

  return parseFloat(number);
}


/**
 * Returns the number rounded to de decimal place specified by DECIMAL_MULTIPLIER
 * @param {number} number Number to convert
 */
function roundToDecimalPlace(number) {
  return Math.round(number * DECIMAL_MULTIPLIER) / DECIMAL_MULTIPLIER;
}


/**
 * Handles the validation of the user input
 * If the input is valid, run the calculator. If not, show error message
 * @param {string} input Input text form the user
 */
function validateAndCalculate(input) {
  var validator = new SterlingValidator(input);
  if (validator.validate()) {
    var numericInput = roundToDecimalPlace(convertToValidFloat(input));
    var calculator = new PenniesCalculator(numericInput);
    var result = calculator.calculate();
    showResult(result);
  }
  else {
    $("#result").html("Error: wrong format");
  }
}


/**
 * Loads result in a friendly format into the page
 * @param {object} result Data to show
 */
function showResult(result) {
  // reverse the keys order to show result sorted by coin value
  var resultKeys = Object.keys(result).sort().reverse();
  var $ul = $("<ul>");

  _.each(resultKeys, function(key) {
    var $li = $("<li>");
    $li.html(key + ": " + result[key]);
    $ul.append($li);
  });

  $("#result").html($ul);
}

$(function() {
  $("#form-calculate").submit(function(e) {
    e.preventDefault();
    validateAndCalculate($("#input-amount").val());
  });
});
