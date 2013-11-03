define(["jquery", "underscore", "SterlingValidator", "FormatHelper", "PenniesCalculator", "Constants"],
  function($, _, SterlingValidator, FormatHelper, PenniesCalculator, Constants) {

  function FormHelper() {}


  /**
   * Handles the validation of the user input
   * If the input is valid, run the calculator. If not, show error message
   * @param {string} input Input text form the user
   */
  FormHelper.prototype.processInput = function(input) {
    var validator = new SterlingValidator();

    if (validator.validate(input)) {
      var formatHelper = new FormatHelper();
      var numericInput = formatHelper.convertToValidFloat(input);
      var calculator = new PenniesCalculator(numericInput);
      this.showResult(calculator.calculate());
    } else {
      $("#result").html("Error: wrong format");
    }
  };


  /**
   * Loads result in a friendly format into the page
   * @param {object} result Data to show
   */
  FormHelper.prototype.showResult = function(result) {

    /**
     * Returns the name of the coin in a human-friendly format. For example:
     * 1 => £1
     * 0.20 => 20p
     * @param {string} coin Numeric name of the coin
     */
    function getHumanizedCoinName(coin) {
      if (/\./.test(coin)) {
        coin *= Constants.DECIMAL_MULTIPLIER;
        coin += "p";
      } else {
        coin = "\xA3" + coin;
      }

      return coin;
    }

    function isPence(coinName) {
      return (/p$/.test(coinName));
    }

    // reverse the keys order to show result sorted by coin value
    var resultKeys = Object.keys(result).sort().reverse();

    var $ul = $("<ul>");
    $ul.addClass("coins");

    _.each(resultKeys, function(key) {
      var $li = $("<li>");
      var coinName = getHumanizedCoinName(key);

      var $newCoin = $("<span>");
      $newCoin.html(coinName);
      $newCoin.addClass("coin");

      if (isPence(coinName)) {
        $newCoin.addClass("pence");
      }

      $li.html(result[key] + " x");
      $li.append($newCoin);
      $ul.append($li);
    });

    $("#result").html($ul);
  };


  return FormHelper;
});
