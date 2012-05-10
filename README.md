[macruby-docs.user.js](https://github.com/joakimk/macruby-docs-js/raw/master/macruby-docs.user.js) - A userscript that adds MacRuby/RubyMotion syntax to Apple's Objective-C/Cocoa docs.

It downloads the latest stable version when used so you can install now and get more features as they are added.

Still a work in progress.

Todo:
- Handle more declaration types.
- Map types to ruby types. BOOL becomes Boolean, NSString is String, etc.
- Convert to selector shortcuts where possible: http://www.rubymotion.com/developer-center/guides/runtime/#_selector_shortcuts (isFoo becomes foo?)
- Release.
