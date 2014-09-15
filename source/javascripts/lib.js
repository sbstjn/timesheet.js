(function() {
  'use strict';

  var Lib = {
    /* http://www.dustindiaz.com/smallest-domready-ever */
    /* jshint -W030 */
    ready: function r(f){ /in/.test(document.readyState)?setTimeout(function () {Lib.ready(f);},9):f(); }
  };

  window.Lib = Lib;
})();
