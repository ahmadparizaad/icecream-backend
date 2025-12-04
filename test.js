var x = 10;
function foo() {
  console.log("x", x);
  var x = 20;
}
console.log(foo())