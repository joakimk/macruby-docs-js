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
    if (this.hasParameters()) {
      pattern = /.+?\)(.+?):/;
    } else {
      pattern = /.+?\)(.+)/;
    }
    return this.declaration.match(pattern)[1];
  };
  Declaration.prototype.isInstanceMethod = function() {
    var pattern;
    pattern = /-.+/;
    return !!this.declaration.match(pattern);
  };
  Declaration.prototype.parameters = function() {
    var parameter, parameters, pattern, _i, _len, _results;
    if (!this.hasParameters()) {
      return [];
    }
    pattern = /(([a-zA-Z]+?:)?\(.+?\).+?\b)/g;
    parameters = this.declaration.match(pattern).slice(1);
    _results = [];
    for (_i = 0, _len = parameters.length; _i < _len; _i++) {
      parameter = parameters[_i];
      _results.push(this.mapParameter(parameter));
    }
    return _results;
  };
  Declaration.prototype.hasParameters = function() {
    return this.declaration.indexOf(":") !== -1;
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
  function DocRenderer(className, declarationText) {
    this.className = className;
    this.declarationText = declarationText;
  }
  DocRenderer.prototype.render = function() {
    var i, length, param, parameters, str;
    try {
      this.declaration = new Declaration(this.declarationText);
      parameters = this.declaration.parameters();
      length = parameters.length;
      i = 0;
      str = "<div><span>" + this.className + (this.separator()) + (this.declaration.methodName()) + "</span>";
      str += "<span style='color: #fff'><table style='color: #000; margin-left: 20px'>";
      str += ((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = parameters.length; _i < _len; _i++) {
          param = parameters[_i];
          _results.push("<tr><td>" + param[0] + (this.addComma((i += 1), length)) + "</td><td style='color: gray; padding-left: 10px;'># (" + param[1] + ")</td></tr>");
        }
        return _results;
      }).call(this)).join();
      str += "</table></span><div style='margin-top: 10px; color: gray;'>Return type: (" + (this.declaration.returnType()) + ")</div> </div>";
      return str;
    } catch (err) {
      return 'Could not parse or render, check issues at <a href="https://github.com/joakimk/macruby-docs-js/issues">https://github.com/joakimk/macruby-docs-js/issues</a>.';
    }
  };
  DocRenderer.prototype.separator = function() {
    if (this.declaration.isInstanceMethod()) {
      return "#";
    } else {
      return ".";
    }
  };
  DocRenderer.prototype.addComma = function(i, length) {
    if (length !== i) {
      return ',';
    } else {
      return '';
    }
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
        if (jQuery(".declaration .macruby", window.parent.frames[0].document).length > 0) {
          return;
        }
        return jQuery.each(jQuery(".api .declaration", window.parent.frames[0].document), function(i, element) {
          var content;
          content = element.textContent;
          return element.innerHTML = element.innerHTML + "<h5 class='macruby' style='margin-top: 20px'>MacRuby</h5>" + new DocRenderer(className, content).render();
        });
      } catch (err) {
        console.log("macruby-docs.user.js error:");
        return console.log(err);
      }
    };
    return setInterval(check, 1000);
  };
  addJQuery(main);
}