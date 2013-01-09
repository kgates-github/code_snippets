Code Snippets
===========================

Pascal's Triangles:
---------------------------

JavaScript code that creates two versions of these:

 		    1
 	       1 1
 	      1 2 1
 	     1 3 3 1
 	    1 4 6 4 1
 	  1 5 10 10 5 1

The first version recursively creates a triangle for each step to to create the current tier. This version is interesting, but not efficient. 

	funtion getTier(n, a) {

		if (n < 1) return a;
		if (a.length === 1) return getTier(n-1, [1,1]);

		var tier = [1];
		for (var i=1; i < a.length; i++) {
			tier[i] = a[i] + a[i-1];
		}
		tier.push(1);

		return getTier(n-1, tier);
	}

	function pascalRecursive(numTiers) {

		var tiers = [];
		for (var j = 0; j < numTiers; j++) {
			tiers[j] = exports.getTier(j, [1]);
		}

		return tiers;
	}



The second version is much simpler. It builds each tier of the triangle using the previous tier. Needs a seed set to get started (see var tiers below). Boring, but efficient and human-readable.

	function pascalSimple(numTiers) {

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

More info on the triangles can be found here: http://en.wikipedia.org/wiki/Pascal's_triangle

	To run:
	> node src/PascalsTriangles.js <number-of-tiers>