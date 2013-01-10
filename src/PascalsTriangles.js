/**
*	Make some of these:
*
*		      1
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
		triangle,
		start,
		stop,
		executionTime,
		print;

if (process.argv[2] && parseInt(process.argv[2]) % 1 === 0) {
	numTiers = parseInt(process.argv[2]);
} else {
	numTiers = 5;
}

if (process.argv[3] === 'false') {
	print = false;
} else {
	print = true;
}

if (numTiers < 2 || numTiers > 1999) {
	console.log("Enter a value that is greater than 2 or less than 2000. Here are Pascal's Triangles with five tiers:\n");
	numTiers = 5;
}

if (numTiers > 50) {
	console.log("For values with more than 50 tiers, the triangle won't print. You can still see the execution times:\n");
	print = false;
}

start = new Date().getMilliseconds();
triangle = pascal.pascalRecursive(numTiers-2, [[1],[1,1]]);
stop = new Date().getMilliseconds();
executionTime = stop - start;
if (print) pascal.prettyprint(triangle);
console.log('Execution time: ' + executionTime + '\n');

start = new Date().getMilliseconds();
triangle = pascal.pascalSimple(numTiers-1);
stop = new Date().getMilliseconds();
executionTime = stop - start;
if (print) pascal.prettyprint(triangle);
console.log('Execution time: ' + executionTime + '\n');


