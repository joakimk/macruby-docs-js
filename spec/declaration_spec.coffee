describe "Declaration", ->
  it "can parse return type", ->
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag)")
    expect(dec.returnType()).toEqual("NSData *")

  it "can parse method name", ->
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag)")
    expect(dec.methodName()).toEqual("dataUsingEncoding")

  it "can parse method type", ->
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag)")
    expect(dec.isInstanceMethod()).toEqual(true)

    dec = new Declaration("+ (id)stringWithContentsOfFile:(NSString *)path usedEncoding:(NSStringEncoding *)enc error:(NSError **)error")
    expect(dec.isInstanceMethod()).toEqual(false)

