describe("Pascal", function() {
  var numTiers = 5,
      expected = [ [ 1 ], [ 1, 1 ], [ 1, 2, 1 ], [ 1, 3, 3, 1 ], [ 1, 4, 6, 4, 1 ] ],
      tirangle;

  it("should be able to create a simple Pascal's Triangle", function() {
    triangle = exports.pascalSimple(numTiers);
    expect(triangle).toEqual(expected);
  });
  
  it("should be able to create a recursively generated Pascal's Triangle", function() {
    triangle = exports.pascalRecursive(numTiers, [[1]]);
    expect(triangle).toEqual(expected);
  });

});