/**

  Variable hoisting: JavaScript variable scope funkiness.
  The term "variable hoisting" was coined in this blog post:
  http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting

*/

var foo = 1;

function barOne() {
  if (!foo) var foo = 100;
  return foo;
}

console.log(barOne());

function barTwo() {
  (function () {
    var foo = 1000;
  }());
  return foo;
}

console.log(barTwo());

function barThree() {
  (function () {
    foo = 10000;
  }());
  return foo;
}

console.log(barThree());

