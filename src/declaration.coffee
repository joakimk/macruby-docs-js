class Declaration
  constructor: (@declaration) ->

  return_type: ->
    pattern = ///
      . \((.+?)\) # Capture TYPE from '- (TYPE)method'
    ///
    @declaration.match(pattern)[1]

  method_name: ->
    pattern = ///
      .+?\)(.+?): # Capture METHOD from '- (type)METHOD:'
    ///
    @declaration.match(pattern)[1]

