## Page:
https://michalaniol.github.io/home_page/

---
code for make:
```
minify js/waitingRoom.js > js/waitingRoom.min.js
minify js/index.js > js/index.min.js
minify js/animation.js > js/animation.min.js
minify js/searcher.js > js/searcher.min.js
css-minify --dir "./" --output "./"

```
```
minify index.js > index.min.js
```
---
##### to convert typescript files install:
```
npm install -g typescript
```
then run:
```
Ctrl+Shift+B:
tsc: build - tsconfig.json
tsc: watch - tsconfig.json
```
##### minify settings:
https://www.npmjs.com/package/minify
https://github.com/kangax/html-minifier
https://github.com/terser/terser
