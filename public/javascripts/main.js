requirejs.config({
  paths: {
    jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min",
    underscore: "underscore-min"
  },

  shim: {
    underscore: {
      exports: '_'
    },
    jquery: {
      exports: "$"
    }
  }
});

require(["jquery", "FormHelper"], function($, FormHelper) {
  $(function() {
    $("#input-amount").focus();

    $("#form-calculate").submit(function(e) {
      e.preventDefault();
      var inputVal = $.trim($("#input-amount").val());

      if (inputVal) {
        var formHelper = new FormHelper();
        formHelper.processInput(inputVal);
      }
    });
  });
});
