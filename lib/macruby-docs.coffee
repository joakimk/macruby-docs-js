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

class DocRenderer
  constructor: (@declaration) ->

  render: ->
    "text"

if !window.in_tests
  addJQuery = (callback) ->
    script = document.createElement("script")
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js")

    addScriptToPage = ->
      script = document.createElement("script")
      script.textContent = "(" + callback.toString() + ")();"
      document.body.appendChild(script)

    script.addEventListener 'load', addScriptToPage, false
    document.body.appendChild(script)

  main = ->
    $.noConflict()
    check = ->
      try
        className = jQuery("#pageTitle", window.parent.frames[0].document).html().split(" ")[0]
        jQuery.each jQuery(".declaration", window.parent.frames[0].document), (i, element) ->
          content = element.innerHTML
          if content.indexOf("MacRuby") == -1
            element.innerHTML = element.innerHTML + "<br/><br/><h5>MacRuby</h5>" + new DocRenderer(content).render()
      catch err
        console.log(err)

    setInterval(check, 3000)
  addJQuery(main)
