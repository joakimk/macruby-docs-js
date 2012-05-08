describe("Declaration", function() {
  it("can parse return type", function() {
    var dec;
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag)");
    return expect(dec.returnType()).toEqual("NSData *");
  });
  it("can parse method name", function() {
    var dec;
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag)");
    return expect(dec.methodName()).toEqual("dataUsingEncoding");
  });
  return it("can parse method type", function() {
    var dec;
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag)");
    expect(dec.isInstanceMethod()).toEqual(true);
    dec = new Declaration("+ (id)stringWithContentsOfFile:(NSString *)path usedEncoding:(NSStringEncoding *)enc error:(NSError **)error");
    return expect(dec.isInstanceMethod()).toEqual(false);
  });
});