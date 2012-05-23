macruby-docs.user.js - A userscript that adds MacRuby/RubyMotion syntax to Apple's Objective-C/Cocoa docs.

After installing and visiting apple docs (like [NSString](https://developer.apple.com/library/mac/#documentation/Cocoa/Reference/Foundation/Classes/NSString_Class/Reference/NSString.html)), you should be able to see "MacRuby" sections like this one within the documenation:

![Example](https://github.com/joakimk/macruby-docs-js/raw/master/example.png)

## Installing

Either install the [macruby-docs.user.js](https://github.com/joakimk/macruby-docs-js/raw/master/macruby-docs.user.js) userscript or the [Safari Extension](https://github.com/downloads/joakimk/macruby-docs-js/macruby.safariextz).

## Development instructions

This project uses ruby to get a web server setup for development. You also need to make sure you have node and coffee-script installed.

    git clone git@github.com:joakimk/macruby-docs-js.git
    cd macruby-docs-js
    # [sudo] gem install bundler
    bundle
    rake

Open run_specs.html to run the specs.

Install the extension using tools/macruby-docs-dev.user.js to use the local development version.

## Credits and license

Contributors:
- Safari support (Safari Extension) was added by [seanlilmateus](https://github.com/seanlilmateus).

By [Joakim Kolsjö](https://github.com/joakimk) under the MIT license:

>  Copyright (c) 2012 Joakim Kolsjö
>
>  Permission is hereby granted, free of charge, to any person obtaining a copy
>  of this software and associated documentation files (the "Software"), to deal
>  in the Software without restriction, including without limitation the rights
>  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
>  copies of the Software, and to permit persons to whom the Software is
>  furnished to do so, subject to the following conditions:
>
>  The above copyright notice and this permission notice shall be included in
>  all copies or substantial portions of the Software.
>
>  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
>  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
>  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
>  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
>  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
>  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
>  THE SOFTWARE.
