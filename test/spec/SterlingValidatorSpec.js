define(["underscore", "SterlingValidator"], function(_, SterlingValidator) {
  describe("SterlingValidator", function() {
    var sterlingValidator;

    beforeEach(function() {
      sterlingValidator = new SterlingValidator();
    });


    it("should validate valid inputs as valid", function() {
      var validInputs = [
        "4",
        "85",
        "197p",
        "2p",
        "1.87",
        "£1.23",
        "£2",
        "£10",
        "£1.87p",
        "£1p",
        "£1.p",
        "£1.",
        "001.41p",
        "4.235p",
        "£1.257422457p"
      ];

      _.each(validInputs, function(validInput, index) {
        expect(sterlingValidator.validate(validInput)).toBe(true);
      });
    });
  });
});
