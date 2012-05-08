describe "Declaration", ->
  it "can parse return type", ->
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag)")
    expect(dec.returnType()).toEqual("NSData *")

  it "can parse method name", ->
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag)")
    expect(dec.methodName()).toEqual("dataUsingEncoding")

