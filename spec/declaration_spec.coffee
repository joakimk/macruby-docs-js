describe "Declaration", ->
  it "can parse return type", ->
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag")
    expect(dec.returnType()).toEqual("NSData *")

  it "can parse method name", ->
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag")
    expect(dec.methodName()).toEqual("dataUsingEncoding")

  it "can parse method type", ->
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag")
    expect(dec.isInstanceMethod()).toEqual(true)

    dec = new Declaration("+ (id)stringWithContentsOfFile:(NSString *)path usedEncoding:(NSStringEncoding *)enc error:(NSError **)error")
    expect(dec.isInstanceMethod()).toEqual(false)

  it "can parse parameters", ->
    dec = new Declaration("- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding allowLossyConversion:(BOOL)flag")
    expect(dec.parameters()).toEqual([ [ "encoding", "NSStringEncoding" ], [ "allowLossyConversion: flag", "BOOL" ] ])

  it "can parse more complex parameters", ->
    dec = new Declaration("- (NSArray *)linguisticTagsInRange:(NSRange)range scheme:(NSString *)tagScheme options:(NSLinguisticTaggerOptions)opts orthography:(NSOrthography *)orthography tokenRanges:(NSArray **)tokenRanges")
    parameters = dec.parameters()
    expect(parameters.length).toEqual(5)
    expect(parameters[0]).toEqual([ "range", "NSRange" ])
    expect(parameters[1]).toEqual([ "scheme: tagScheme", "NSString *" ])
    expect(parameters[2]).toEqual([ "options: opts", "NSLinguisticTaggerOptions" ])
    expect(parameters[3]).toEqual([ "orthography: orthography", "NSOrthography *" ])
    expect(parameters[4]).toEqual([ "tokenRanges: tokenRanges", "NSArray **" ])
