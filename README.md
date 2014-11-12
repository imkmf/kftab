kftab
===

![preview](http://i.imgur.com/0dmTgDg.png)

KFTab is a Chrome extension that implements live tab filtering and selection. It's intended for usage when your tab bar looks like this:

![tabs](http://i.imgur.com/YEpjdZP.png)

[download](https://github.com/imkmf/kftab/releases)

Configuration
---

KFTab has a toolbar (maybe not the correct terminology) icon and can be configured to use a [keyboard shortcut](http://lifehacker.com/add-custom-keyboard-shortcuts-to-chrome-extensions-for-1595322121) for activation.

Usage
---

When activated, begin typing to filter through tabs. There's some more keyboard shortcuts: `<Ctrl-n>` and `<Ctrl-p>` to navigate the tabs, `<Enter>` to select one. These should probably be customizable at some point :)

Development
---

Clone the repo and [load](https://developer.chrome.com/extensions/getstarted#unpacked) it into Chrome to begin development locally.

Structure
---

KFTab is a one-file [Ember.js](http://emberjs.com) app. `TabsRoute` handles getting data from Chrome about available tabs, and `TabView` handles navigation and actions on the tab list. KFTab makes use of the awesome [Fuse.js](http://kiro.me/projects/fuse.html) library for fuzzy searching.

License
---

The MIT License (MIT)

Copyright (c) 2014 Kristian Freeman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
