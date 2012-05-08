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
  return Declaration;
})();