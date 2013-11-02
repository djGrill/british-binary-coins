define(["underscore", "Constants", "FormatHelper"],

  function(_, Constants, FormatHelper) {

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
    var formatHelper = new FormatHelper();

    function updateResultCoins(coin) {
      if (!resultCoins[coin]) {
        resultCoins[coin] = 1;
      } else {
        resultCoins[coin] += 1;
      }
    }

    _.each(Constants.VALID_COINS, function(coin, index) {
      while (this.numericInput >= coin) {
        updateResultCoins(coin);
        this.numericInput -= coin;

        // make sure that numericInput is properly rounded
        this.numericInput = formatHelper.roundToDecimalPlace(this.numericInput);
      }
    }, this);

    return resultCoins;
  };


  return PenniesCalculator;
});
