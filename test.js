var a = 1;
function bar() {
  console.log(a);
};

function foo() {
  var a = 2;
  bar();
}

foo() // 1