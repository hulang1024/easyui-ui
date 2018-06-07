(function(){
  var options = {
     shadow: false,
     onMinimize: function () {
         $(this).window('move', {
             top: "95%"
         }).window('collapse').window('open');
     },
     onMaximize: function () {
         if ($(this).panel('options').collapsed) {
             $(this).window('expand');
         }
     },
     onRestore: function() {
         $(this).window('center');
     }
  };

  $.extend($.fn.window.defaults, options);
  $.extend($.fn.dialog.defaults, options);
})();
