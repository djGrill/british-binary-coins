define(["Constants"], function(Constants) {

  function FormatHelper() {}


  /**
   * Converts str and returns a float number with 2 decimal values. For example:
   * £1.25 => 1.25
   * 125 => 1.25
   * 25p => 0.25
   * @param {string} str String to convert
   */
  FormatHelper.prototype.convertToValidFloat = function(str) {
    var number = /\d+(\.\d+)?/.exec(str)[0];

    // if str has the format "£NUMBER" (pounds only), convert number to "NUMBER.00"
    if (/^\xA3\d+$/.test(str)) {
      number += ".00";
    }

    // if str has the format "NUMBER" or "NUMBERp" (pences only), convert number to
    // -- the POUND.pence version with decimal numbers (determined by DECIMAL_MULTIPLIER)
    if (/^\d+p?$/.test(str)) {
      number /= Constants.DECIMAL_MULTIPLIER;
    }

    return this.roundToDecimalPlace(parseFloat(number));
  };


  /**
   * Returns the number rounded to de decimal place specified by DECIMAL_MULTIPLIER
   * @param {number} number Number to convert
   */
  FormatHelper.prototype.roundToDecimalPlace = function(number) {
    return Math.round(number * Constants.DECIMAL_MULTIPLIER) / Constants.DECIMAL_MULTIPLIER;
  };


  return FormatHelper;
});
