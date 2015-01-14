//Calculate something about elements in a page and disiplayt (like their widths)
var sliced = require('sliced')
var MutationObserver = require('mutation-observer');


var calcum = function(opts){
  //go through all divs we want to calc and label
  //carry out calculation and label them as an attribute
  sliced(document.querySelectorAll(opts.selector)).forEach(function(element){

    element.setAttribute(
      'data-'+ opts.label,
      (opts.labelVisible ?  opts.label + ':' : '') //show the label if they want to
      + opts.callback(element)+opts.units
    );
  });
};



module.exports = function(opts){

  //default options
  var options = {};
  options.selector = opts.selector || 'p[class*="col"],div[class*="col"]' ; //what elements to calculate and add data- attributes to

  //the calculation we'll perform on an element
  options.label = opts.label ||  'offsetWidth';

  options.labelVisible = opts.labelVisible && 1; //default to label being visible unless specified
  options.units = opts.units || ''; //default to 'px' being the unit unless specified (this is up to the client. the library knows nothing)

  options.callback = opts.callback || function(el){
    return el.offsetWidth;
  }

  //what event will trigure a recalculation? by default it's a 'resize' event on window
  options.eventOnElem = opts.eventOnElem || window;
  options.attribute = opts.attribute || 'style'; //by default, it'ss a style that will trigger the recalc (using your browser's element inspector)
  options.style = opts.style || 'width'; //the style we'll watch for

  //if they prefer a mutation observer

  options.observerConfig = { childList: false, characterData: false,
    attributes : true, attributeFilter : [ options.attribute ] };



  calcum(options); //display first time (since this is called within a dom load)

  //recalculate based on mutationobserver
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {

      var styleAttr = mutation.target.getAttribute('style');

      //was it the style change  we're examining
      if ( styleAttr.contains(options.style) ){
        calcum(options);
      }
    });

  });
  observer.observe(options.eventOnElem, options.observerConfig);



}
