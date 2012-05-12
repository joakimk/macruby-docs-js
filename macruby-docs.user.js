// ==UserScript==
// @name          MacRuby Docs JS - Adds MacRuby/RubyMotion syntax to Apple's Objective-C/Cocoa docs.
// @namespace     http://twitter.com/joakimk
// @description   Adds MacRuby/RubyMotion syntax to Apple's Objective-C/Cocoa docs.
// @include       http://developer.apple.com/library/*
// @include       https://developer.apple.com/library/*
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
    require("https://raw.github.com/joakimk/macruby-docs-js/master/lib/macruby-docs.stable.js");
  };
  
  load_latest();
})();
