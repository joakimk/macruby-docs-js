Work in progress.

Will be a user script to make Apple's Objective-C docs more readable by providing a translation to MacRuby syntax. For use when coding MacRuby or RubyMotion.

Prototype made in ruby can be found at:
https://gist.github.com/2630440

Todo:
- Declaration parser.
- Document scanner.
- Render MacRuby docs and insert into page.
  - Notes:

    $($(".declaration", window.parent.frames[0].document)[0]).append("<br/><br/>MacRuby:")

- Map types to ruby types. BOOL becomes Boolean, NSString is String, etc.
- Convert to selector shortcuts where possible: http://www.rubymotion.com/developer-center/guides/runtime/#_selector_shortcuts (isFoo becomes foo?)
- Test in Firefox and Chrome.
- Release.
