[macruby-docs.user.js](https://github.com/joakimk/macruby-docs-js/raw/master/macruby-docs.user.js) - Userscript that adds MacRuby/RubyMotion syntax to Apple's Objective-C/Cocoa docs.

Works for some cases. Still a work in progress. It fetches the latest stable version when used so you can install now and get more features as they are added.

Todo:
- Map types to ruby types. BOOL becomes Boolean, NSString is String, etc.
- Convert to selector shortcuts where possible: http://www.rubymotion.com/developer-center/guides/runtime/#_selector_shortcuts (isFoo becomes foo?)
- Release.
