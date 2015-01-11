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


Altenately for a standalone window global, download the [latest element-calcum.js build here](http://yuvilio.github.io/element-calcum/build/element-calcum-style.js)and include it in  your script to have a global window.elementCalcumStyle available.



```html

<div class="some-element">

...
</div>
```

```js

elementCalcumStyle({
  selector: '.ex-height-flex [class*="box"] ',
  label: 'height', //data-height
  unit: 'px',
  labelVisible: 1,
  eventOnElem: document.querySelector('.ex-height-flex'),
  style: 'height', //the one we'll affect in the inspector

  callback: function(el){ //the calculation we're doing on each selected element
    return el.offsetHeight;
  }
});

```

Optional css to reveal the data change visually

```css
..some-element p /* the elements we've recalculated */
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
