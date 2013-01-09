
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

	if (n < 1) return a;

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

	var tiers = [
		[1],
		[1,1]
	],
	tier;

	for (var j = 1; j < numTiers; j++) {
		tier = [1];
		for (var k = 1; k < tiers[j].length; k++) {
			tier[k] = tiers[j][k] + tiers[j][k-1];
		}
		tier.push(1);
		tiers.push(tier);
	}

	return tiers;
}

/**
*   Really simple pretty print. Looks great for triangles with fewer 
*   than six tiers.
*/

exports.prettyprint = function(tiers) {

	var base = tiers.length,
		center = Math.ceil(base/2),
		output = '', 
		offset, half;

	for (var i = 0; i < base; i++) {
		half = Math.floor(tiers[i].length/2);
		offset = center - half;
		
		for (var j = 0; j < offset; j++) output += '  ';
		if (i % 2 !== 0) output += ' '; // Odd rows get one extra space.
		output += tiers[i].join(' ') + '\n';
	}

	console.log(output);
}




