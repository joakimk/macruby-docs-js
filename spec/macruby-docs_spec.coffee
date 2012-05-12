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

  it "can handle multiple spaces within a type", ->
    dec = new Declaration("- (id)initWithCString:(const char *)nullTerminatedCString encoding:(NSStringEncoding)encoding")
    expect(dec.parameters()).toEqual([ [ "nullTerminatedCString", "const char *" ], [ "encoding: encoding", "NSStringEncoding" ] ])

  it "can parse methods without parameters", ->
    dec = new Declaration("+ (id)string")
    expect(dec.parameters()).toEqual([])
    expect(dec.methodName()).toEqual("string")
    expect(dec.returnType()).toEqual("id")

describe "DocRenderer", ->
  it "can render docs", ->
    renderer = new DocRenderer("NSString", "- (NSData *)dataUsingEncoding:(NSStringEncoding)encoding")
    html = renderer.render()
    expect(html.indexOf('dataUsingEncoding')).toNotEqual(-1)

  it "handles errors in parsing", ->
    renderer = new DocRenderer("NSString", "BAD DATA")
    html = renderer.render()
    expect(html).toEqual('Could not parse or render, check issues at <a href="https://github.com/joakimk/macruby-docs-js/issues">https://github.com/joakimk/macruby-docs-js/issues</a>.')

