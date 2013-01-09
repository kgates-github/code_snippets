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

The first version recursively creates a triangle. 

        function pascalRecursive(n, a) {

          if (n < 1) return a;

          var prevTier = a[a.length-1];
          var curTier = [1];

          for (var i = 1; i < prevTier.length; i++) {
            curTier[i] = prevTier[i] + prevTier[i-1];
          }
          curTier.push(1);
          a.push(curTier);

          return pascalRecursive(n-1, a);
        }

1. In Ruby you can map like this:

    ['a', 'b'].map { |x| x.uppercase }

The second version is much simpler. It starts with a seed set (see var tiers below), then builds each tier of the triangle using the previous tier. Boring, but human-readable and efficient (roughly 140x faster than the recursive version).

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