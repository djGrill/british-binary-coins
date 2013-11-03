define(["underscore", "FormatHelper"], function(_, FormatHelper) {
  describe("FormatHelper", function() {
    var formatHelper;

    beforeEach(function() {
      formatHelper = new FormatHelper();
    });


    it("should convert valid amounts into float numbers with 2 decimals", function() {
      var validStringsCombinations = [
        {
          validStrings: ["£1.25p", "£1.25", "1.25p", "1.25", "£1.254321p"],
          result: 1.25
        },
        {
          validStrings: ["£16.25p", "£16.25", "16.25p", "16.25", "16.254321"],
          result: 16.25
        },
        {
          validStrings: ["£1", "£1p", "£1.", "£1.p"],
          result: 1.00
        },
        {
          validStrings: ["£16", "£16p", "£16.", "£16.p"],
          result: 16.00
        },
        {
          validStrings: ["16", "16p", "0.16", "£0.16p"],
          result: 0.16
        },
      ];

      _.each(validStringsCombinations, function(validStringsCombination, index) {
        _.each(validStringsCombination.validStrings, function(validString, index) {
          expect(formatHelper.convertToValidFloat(validString)).toEqual(parseFloat(validStringsCombination.result));
        });
      });
    });
  });
});
