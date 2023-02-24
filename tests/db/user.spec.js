//make sure to make a dummy database to test out the data and functions on
//need to make sure we don't save it in the main branch that way, but add it to the local client
function sum(a, b) {
  {
    return a + b;
  }
}

describe("testing sum function", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
