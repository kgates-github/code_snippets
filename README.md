Code Snippets
===========================

Pascal's Triangles:
---------------------------

To run:

    > node src/PascalsTriangles.js <number-of-tiers>

JavaScript code that creates two versions of these:

          1
         1 1
        1 2 1
       1 3 3 1
      1 4 6 4 1
    1 5 10 10 5 1

The first version uses recursion to create the triangle. 

```javascript
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
```

The second version starts with a seed set (see var tiers below), then builds each tier of the triangle using the previous tier. Boring, a bit less efficient, but simpler.

```javascript
function pascalSimple(numTiers) {

	var triangle = [
			[1],
			[1,1]
		],
		tier;

	for (var j = 1; j < numTiers-1; j++) {
		tier = [1];
		for (var k = 1; k < triangle[j].length; k++) {
			tier[k] = triangle[j][k] + triangle[j][k-1];
		}
		tier.push(1);
		triangle.push(tier);
	}

	return tiers;
}
```

More info on the triangles can be found here: http://en.wikipedia.org/wiki/Pascal's_triangle
