//js for 009-highlightjs-redux
console.log('hey there from 009-highlightjs-redux ');

var sliced = require('sliced');
var marked = require('marked'); //markdown
var hljs = require('highlight-redux'); //syntax highlighting
hljs.registerLanguage('javascript', require('highlight-redux/lib/languages/javascript'));
hljs.registerLanguage('css', require('highlight-redux/lib/languages/css'));



var elementCalcumStyle = require('../../index.js'); // require('element-calcum-style') typically


window.addEventListener('load', function(){

  //Conveniences

  //syntax highlighting by highlightjs
  sliced( document.querySelectorAll('pre.hljs') ).forEach(function( block, i){
    hljs.highlightBlock( block );
  });

  //markdown rendering by marked
  sliced( document.querySelectorAll('.marked') ).forEach(function( el, i ){
    el.outerHTML = '<p class="marked">' + marked(el.textContent) + '</p>';
  });


  //actual examples

  //ex-width
  elementCalcumStyle({
    selector: '.ex-height-flex [class*="box"] ',
    label: 'height', //data-height
    units: 'px',
    labelVisible: 1,
    eventOnElem: document.querySelector('.ex-height-flex'),
    style: 'height', //the one we'll affect in the inspector

    callback: function(el){
      return el.offsetHeight;
    }
  });


  //ex-multiple
  elementCalcumStyle({
    selector: '.ex-multiple-calcum [class*="box"] ',
    label: 'width', //data-height
    units: 'px',
    labelVisible: 1,
    eventOnElem: document.querySelector('.ex-multiple-calcum'),
    style: 'width',

    callback: function(el){
      return el.offsetWidth;
    }
  });

  elementCalcumStyle({
    selector: '.ex-multiple-calcum [class*="box"] ',
    label: 'height', //data-height
    units: 'px',
    labelVisible: 1,
    eventOnElem: document.querySelector('.ex-multiple-calcum'),
    style: 'height', //the one we'll affect in the inspector

    callback: function(el){
      return el.offsetHeight;
    }
  });


  elementCalcumStyle({
    selector: '.ex-multiple-calcum [class*="box"] ',
    label: 'width-height-ratio', //data-height
    units: '',
    labelVisible: 1,
    eventOnElem: document.querySelector('.ex-multiple-calcum'),
    style: 'height', //the one we'll affect in the inspector

    callback: function(el){
      return (el.offsetWidth / el.offsetHeight).toFixed(1);
    }
  });



}); //on load
