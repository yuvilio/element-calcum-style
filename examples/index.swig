<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>element-calcum Examples</title>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">

<link rel="stylesheet" href="css/styles.css">


<script src="js/source.js"></script>

</head>
<body>
  <div class="container-fluid">

    <div class="marked">#element-calcum-style Examples</div>

    <div class="marked">Documentation can be found [here](https://github.com/yuvilio/element-calcum-style), including the code for this [example](https://github.com/yuvilio/element-calcum-style/blob/master/examples).</div>

    <div class="marked">## Ex. 1: Height</div>

    <div class="marked">Below is a simple flexbox layout with the middle item having twice the flex-grow of the other two. To see what this means in terms of their heights, __inspect this element__ below (it's the div with class .ex-height-flex) __with your browser__ developer tools.  Try assigning it a height (say 200px) and then hitting the up or down arrows to adjust that height. It should trigger the calculations of the sibling elements. </div>

    <div class="ex-height-flex">
      <div class="item box-1">Box 1 Qui aute veniam aute fugiat proident officia ipsum officia. Aliqua qui ad duis proident anim ex nostrud nulla ea adipisicing excepteur veniam aliquip minim.</div>
      <div class="item box-2">Box 2</div>
      <div class="item box-3">Box 3</div>
    </div>

    <div class="marked">## Ex. 2: Multiple measurements</div>

    <div class="marked">You can monitor and display as many measurements as you want on the same elements. Simply run a calcum for each one and optionally concatenate them in the css content. adjusting the height/width below of .ex-multiple-calcum in the inspector will trigger a recalc of both. </div>

    <div class="ex-multiple-calcum">
      <div class="box-4">box-1</div>
      <div class="box-5">box-2</div>
      <div class="box-8">box-3</div>

    </div>


  <div class="marked">Need to use dom events (resize, mouseover, ...) or your own inputs (slider inputs, buttons, )? Have a look at [element-calcum](http://yuvilio.github.io/element-calcum/)</div>

  </div>



</body>
</html>
