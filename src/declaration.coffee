class Declaration
  constructor: (@declaration) ->

  returnType: ->
    pattern = ///
      . \((.+?)\) # Capture TYPE from '- (TYPE)method'
    ///
    @declaration.match(pattern)[1]

  methodName: ->
    pattern = ///
      .+?\)(.+?): # Capture METHOD from '- (type)METHOD:'
    ///
    @declaration.match(pattern)[1]

  isInstanceMethod: ->
    pattern = ///
      -.+ # Does it start with "-" ?
    ///
    !!@declaration.match(pattern)
