# element-calcum-style

## [Demo](https://yuvilio.github.io/element-calcum-style)

Calculate some data item about elements you select. Refresh it's value when you change a style with your inspector.

## Example usage

If using npm based system,

```bash
npm install element-calcum-style
```

```js
var elementCalcumStyle = require('element-calcum-style');
```


Alternately for a standalone window global, download the [latest element-calcum-style.js build here](http://yuvilio.github.io/element-calcum-style/build/element-calcum-style.js) and include it in  your script to have a global window.elementCalcumStyle available.

```html
<script src="element-calcum-style.js"></script>

```

Here is an example of an element whose children's height we want to see how they are affected when we adjust the parent element:

```html

<div class="some-element">
  <div class="box-1"></div>
  <div class="box-2"></div>
</div>
```

```js

elementCalcumStyle({
  selector: '.some-element [class*="box"] ',
  label: 'height', //data-height
  unit: 'px',
  labelVisible: 1,
  eventOnElem: document.querySelector('.some-element'),
  style: 'height', //the one we'll affect in the inspector

  callback: function(el){ //the calculation we're doing on each selected element
    return el.offsetHeight;
  }
});

```

Optional css to reveal the data change visually

```css
.some-element p /* the elements we've recalculated */
{
  &:before {
    display: table;
    bottom: 20px;
    background-color: salmon;
    color: white;
    padding: 3px 2px;
    right: 0;
    content: attr(data-height);
  }
}
```
