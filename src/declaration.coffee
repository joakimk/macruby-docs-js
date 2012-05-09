class Declaration
  constructor: (@declaration) ->

  returnType: ->
    pattern = ///
      . \((.+?)\)
    ///
    @declaration.match(pattern)[1]

  methodName: ->
    pattern = ///
      .+?\)(.+?):
    ///
    @declaration.match(pattern)[1]

  isInstanceMethod: ->
    pattern = ///
      -.+
    ///
    !!@declaration.match(pattern)

  parameters: ->
    pattern = ///
      .+?:(.+)
    ///

    # Split between parameters (not within, like with "NSString *")
    parameters = @declaration.match(pattern)[1].replace(new RegExp(" \\*", "g"), "#*").split(' ')
    parameters = (parameter.replace('#*', ' *') for parameter in parameters)

    @mapParameter(parameter) for parameter in parameters

  mapParameter: (parameter) ->
    # Handles "(type)value"
    if parameter[0] == "("
      
      pattern = ///
        \((.+?)\)(.+)
      ///
      parameter.match(pattern)[1..2].reverse()
    else
      # Handles "key:(type)value"
      pattern = ///
        \((.+?)\)(.+)
      ///
      [ key, arg ] = parameter.split(':')
      [ value, type ] = arg.match(pattern)[1..2].reverse()
      [ "#{key}: #{value}", type ]

