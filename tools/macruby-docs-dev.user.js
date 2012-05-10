// ==UserScript==
// @name          MacRuby Docs JS - DEV version.
// @namespace     http://twitter.com/joakimk
// @description   
// @include       http://developer.apple.com/library/mac/*
// @include       https://developer.apple.com/library/mac/*
// @version       1.0
// ==/UserScript==

(function() {
  var head = document.getElementsByTagName("head")[0];

  var require = function(src) {
    var script = document.createElement("script");
    script.setAttribute("language", "javascript");
    script.setAttribute("src", src);
    head.appendChild(script);
  };

  var load_latest = function() {
    require("http://localhost:55444/dev.js");
  };
  
  load_latest();
})();
