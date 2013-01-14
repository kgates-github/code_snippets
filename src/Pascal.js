
/**
*   Override var exports for SpecRunner
*/

if (!exports) { 
	var exports = {}; 
}

/**
*   Recursively create triangle.
*/

exports.pascalRecursive = function(n, a) {

	if (n < 2) return a; // We already have the top row

	var prevTier = a[a.length-1];
	var curTier = [1];

	for (var i = 1; i < prevTier.length; i++) {
		curTier[i] = prevTier[i] + prevTier[i-1];
	}
	curTier.push(1);
	a.push(curTier);

	return exports.pascalRecursive(n-1, a);
}

/**
*   Build each tier of the triangle using the previous tier. Needs a seed 
*   set (var tiers below) to get started. Boring, but human-readable.
*/

exports.pascalSimple = function(numTiers) {

	var triangle = [
		[1]
	],
	tier;

	for (var j = 0; j < numTiers-1; j++) {
		tier = [1];
		for (var k = 1; k < triangle[j].length; k++) {
			tier[k] = triangle[j][k] + triangle[j][k-1];
		}
		tier.push(1);
		triangle.push(tier);
	}

	return triangle;
}

/**
*   Really simple pretty print. Looks great for triangles with fewer 
*   than six tiers.
*/

exports.prettyprint = function(tiers) {

	var base = tiers.length,
			center = Math.ceil(base/2),
			output = '', 
			offset, 
			half;

	for (var i = 0; i < base; i++) {
		half = Math.floor(tiers[i].length/2);
		offset = center - half;
		
		for (var j = 0; j < offset; j++) output += '  ';
		if (i % 2 !== 0) output += ' '; // Odd rows get one extra space.
		output += tiers[i].join(' ') + '\n';
	}

	console.log(output);
}



