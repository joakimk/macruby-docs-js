// ==UserScript==
// @name          Translate Objective-C Docs to MacRuby
// @namespace     http://twitter.com/joakimk
// @description   Inserts MacRuby / RubyMotion syntax below Obj-c declarations in Apple documentation.
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
    //require("https://raw.github.com/joakimk/macruby-docs-js/master/dist/latest.js");
////
//////////

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
  $.noConflict()
  //alert("There are " + $('a').length + " links on this page.");

  function check()
  {
var Declaration;
Declaration = (function() {
  function Declaration(declaration) {
    this.declaration = declaration;
  }
  Declaration.prototype.returnType = function() {
    var pattern;
    pattern = /.\((.+?)\)/;
    return this.declaration.match(pattern)[1];
  };
  Declaration.prototype.methodName = function() {
    var pattern;
    pattern = /.+?\)(.+?):/;
    return this.declaration.match(pattern)[1];
  };
  Declaration.prototype.isInstanceMethod = function() {
    var pattern;
    pattern = /-.+/;
    return !!this.declaration.match(pattern);
  };
  Declaration.prototype.parameters = function() {
    var parameter, parameters, pattern, _i, _len, _results;
    pattern = /.+?:(.+)/;
    parameters = this.declaration.match(pattern)[1].replace(new RegExp(" \\*", "g"), "#*").split(' ');
    parameters = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = parameters.length; _i < _len; _i++) {
        parameter = parameters[_i];
        _results.push(parameter.replace('#*', ' *'));
      }
      return _results;
    })();
    _results = [];
    for (_i = 0, _len = parameters.length; _i < _len; _i++) {
      parameter = parameters[_i];
      _results.push(this.mapParameter(parameter));
    }
    return _results;
  };
  Declaration.prototype.mapParameter = function(parameter) {
    var arg, key, pattern, type, value, _ref, _ref2;
    if (parameter[0] === "(") {
      pattern = /\((.+?)\)(.+)/;
      return parameter.match(pattern).slice(1, 3).reverse();
    } else {
      pattern = /\((.+?)\)(.+)/;
      _ref = parameter.split(':'), key = _ref[0], arg = _ref[1];
      _ref2 = arg.match(pattern).slice(1, 3).reverse(), value = _ref2[0], type = _ref2[1];
      return ["" + key + ": " + value, type];
    }
  };
  return Declaration;
})();

    try {
      className = jQuery("#pageTitle", window.parent.frames[0].document).html().split(" ")[0];
      jQuery.each(jQuery(".declaration", window.parent.frames[0].document), function(i, element) {
        content = element.innerHTML;
        if(content.indexOf("MacRuby") == -1) {
          dec = new Declaration(element.textContent)
          try {
            element.innerHTML = element.innerHTML + "<br/><br/><h5>MacRuby:</h5>" + className + dec.methodName();
          }
          catch(err2) {
          }
        }
      });
    }
    catch(err) {
      console.log(err)
    }
  }

  setInterval(check, 3000);
}

// load jQuery and execute the main function
addJQuery(main);
//////////

  };
  
  load_latest();
})();
