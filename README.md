# element-calcum-style
Calculate some data item about elements you select. Refresh it's value when you change a style.

## Example usage


```html

<div class="some-element">

...
</div>
```

```js
var elCalcumStyle = require('element-calcum-style');

elCalcumStyle({
  selector: '.some-element p ',
  label: 'height', //data-height
  unit: 'px',
  labelVisible: 1,
  eventOnElem: document.querySelector('.some-element'),
  style: 'height', //the one we'll affect in the inspector

  callback: function(el){
    return size(el)[1];
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
