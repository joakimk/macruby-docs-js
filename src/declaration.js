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