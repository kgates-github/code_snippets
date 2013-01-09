/**
*	Make some of these:
*
*		    1
*	       1 1
*	      1 2 1
*	     1 3 3 1
*	    1 4 6 4 1
*	  1 5 10 10 5 1
*
*	http://en.wikipedia.org/wiki/Pascal's_triangle
*
*   To run:
*   > node pascal.js <number-of-tiers>
*/

var pascal = require('./Pascal.js'),
	numTiers,
	triangle;

if (process.argv[2] && parseInt(process.argv[2]) % 1 === 0) {
	numTiers = parseInt(process.argv[2]);
} else {
	numTiers = 5;
}

if (numTiers > 50 && numTiers > 2) {
	console.log("Enter a value that is greater than 2 and less than 50. Here are Pascal's triangles with five tiers:");
	numTiers = 5;
}

triangle = pascal.pascalRecursive(numTiers);
pascal.prettyprint(triangle);

triangle = pascal.pascalSimple(numTiers);
pascal.prettyprint(triangle);