var Declaration, DocRenderer, addJQuery, main;
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
DocRenderer = (function() {
  function DocRenderer(declaration) {
    this.declaration = declaration;
  }
  DocRenderer.prototype.render = function() {
    return "text";
  };
  return DocRenderer;
})();
if (!window.in_tests) {
  addJQuery = function(callback) {
    var addScriptToPage, script;
    script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    addScriptToPage = function() {
      script = document.createElement("script");
      script.textContent = "(" + callback.toString() + ")();";
      return document.body.appendChild(script);
    };
    script.addEventListener('load', addScriptToPage, false);
    return document.body.appendChild(script);
  };
  main = function() {
    var check;
    $.noConflict();
    check = function() {
      var className;
      try {
        className = jQuery("#pageTitle", window.parent.frames[0].document).html().split(" ")[0];
        return jQuery.each(jQuery(".declaration", window.parent.frames[0].document), function(i, element) {
          var content;
          content = element.innerHTML;
          if (content.indexOf("MacRuby") === -1) {
            return element.innerHTML = element.innerHTML + "<br/><br/><h5>MacRuby</h5>" + new DocRenderer(content).render();
          }
        });
      } catch (err) {
        return console.log(err);
      }
    };
    return setInterval(check, 3000);
  };
  addJQuery(main);
}