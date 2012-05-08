describe("Declaration", function() {
  it("can parse return type", function() {
    var dec;
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag)");
    return expect(dec.returnType()).toEqual("NSData *");
  });
  return it("can parse method name", function() {
    var dec;
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag)");
    return expect(dec.methodName()).toEqual("dataUsingEncoding");
  });
});