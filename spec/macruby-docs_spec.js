describe("Declaration", function() {
  it("can parse return type", function() {
    var dec;
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag");
    return expect(dec.returnType()).toEqual("NSData *");
  });
  it("can parse method name", function() {
    var dec;
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag");
    return expect(dec.methodName()).toEqual("dataUsingEncoding");
  });
  it("can parse method type", function() {
    var dec;
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag");
    expect(dec.isInstanceMethod()).toEqual(true);
    dec = new Declaration("+ (id)stringWithContentsOfFile:(NSString *)path usedEncoding:(NSStringEncoding *)enc error:(NSError **)error");
    return expect(dec.isInstanceMethod()).toEqual(false);
  });
  it("can parse parameters", function() {
    var dec;
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag");
    return expect(dec.parameters()).toEqual([["encoding", "NSStringEncoding"], ["allowLossyConversion: flag", "BOOL"]]);
  });
  it("can parse more complex parameters", function() {
    var dec, parameters;
    dec = new Declaration("- (NSArray *)linguisticTagsInRange:(NSRange)range scheme:(NSString *)tagScheme options:(NSLinguisticTaggerOptions)opts orthography:(NSOrthography *)orthography tokenRanges:(NSArray **)tokenRanges");
    parameters = dec.parameters();
    expect(parameters.length).toEqual(5);
    expect(parameters[0]).toEqual(["range", "NSRange"]);
    expect(parameters[1]).toEqual(["scheme: tagScheme", "NSString *"]);
    expect(parameters[2]).toEqual(["options: opts", "NSLinguisticTaggerOptions"]);
    expect(parameters[3]).toEqual(["orthography: orthography", "NSOrthography *"]);
    return expect(parameters[4]).toEqual(["tokenRanges: tokenRanges", "NSArray **"]);
  });
  it("can handle multiple spaces within a type", function() {
    var dec;
    dec = new Declaration("- (id)initWithCString:(const char *)nullTerminatedCString encoding:(NSStringEncoding)encoding");
    return expect(dec.parameters()).toEqual([["nullTerminatedCString", "const char *"], ["encoding: encoding", "NSStringEncoding"]]);
  });
  return it("can parse methods without parameters", function() {
    var dec;
    dec = new Declaration("+ (id)string");
    expect(dec.parameters()).toEqual([]);
    expect(dec.methodName()).toEqual("string");
    return expect(dec.returnType()).toEqual("id");
  });
});
describe("DocRenderer", function() {
  it("can render docs", function() {
    var html, renderer;
    renderer = new DocRenderer("NSString", "- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding");
    html = renderer.render();
    return expect(html.indexOf('dataUsingEncoding')).toNotEqual(-1);
  });
  return it("handles errors in parsing", function() {
    var html, renderer;
    renderer = new DocRenderer("NSString", "BAD DATA");
    html = renderer.render();
    return expect(html).toEqual('Could not parse or render, check issues at <a href="https://github.com/joakimk/macruby-docs-js/issues">https://github.com/joakimk/macruby-docs-js/issues</a>.');
  });
});