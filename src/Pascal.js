
/**
*   Override var exports for SpecRunner
*/

if (!exports) { 
	var exports = {}; 
}

/**
*	Recursively create triangle for each step to to create the current 
*   tier. Neat but not efficient.
*/

exports.getTier = function(n, a) {

	if (n < 1) return a;
	if (a.length === 1) return exports.getTier(n-1, [1,1]);

	var tier = [1];
	for (var i=1; i < a.length; i++) {
		tier[i] = a[i] + a[i-1];
	}
	tier.push(1);

	return exports.getTier(n-1, tier);
}

exports.pascalRecursive = function(numTiers) {

	var tiers = [];
	for (var j = 0; j < numTiers; j++) {
		tiers[j] = exports.getTier(j, [1]);
	}

	return tiers;
}

/**
*	Build each tier of the triangle using the previous tier. Needs a seed 
*   set (var tiers below) to get started. Boring, but efficient and 
*   human-readable.
*/

exports.pascalSimple = function(numTiers) {

	var tiers = [
		[1],
		[1,1]
	],
	tier;

	for (var j = 1; j < numTiers-1; j++) {
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




