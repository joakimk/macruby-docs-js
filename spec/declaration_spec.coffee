describe "Declaration", ->
  it "can parse return type", ->
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag)")
    expect(dec.return_type()).toEqual("NSData *")

  it "can parse method name", ->
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag)")
    expect(dec.method_name()).toEqual("dataUsingEncoding")

