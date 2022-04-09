---
title: Progressive Enhancement
description: Test
slug: 'progressive-enhancement'
published: '2022-1-1'
---

```js:example.js {8} showLineNumbers
// Comment

/*
  Multiline comment
*/

function hello() {
  console.log('Hello, World!')
}
```

```html:index.html {2-3} showLineNumbers
<article>
  <h2>Heading</h2>
  <p>Paragraph</p>
</article>
```

```css:global.css {2} showLineNumbers
body {
  color: hsl(220 20% 10%);
}
```

```diff
- console.log('Before')
+ console.log('After)
```