// About closures
//Things to Remember
//✦ Functions can refer to variables defined in outer scopes.
//✦ Closures can outlive the function that creates them.
//✦ Closures internally store references to their outer variables, and can both read and update their stored variables.


// About hoistring
//Things to Remember
//✦ Variable declarations within a block are implicitly hoisted to the top of their enclosing function.
//✦ Redeclarations of a variable are treated as a single variable.
//✦ Consider manually hoisting local variable declarations to avoid confusion.


// About immediately invoked function expressions for local scopes
//Things to Remember
//✦ Understand the difference between binding and assignment.
//✦ Closures capture their outer variables by reference, not by value.
//✦ Use immediately invoked function expressions (IIFEs) to create local scopes.
//✦ Be aware of the cases where wrapping a block in an IIFE can change its behavior.


// About unportable scoping of Named Function Expressions
var f = function find(tree, key) {
  if (!tree) {
    return null;
  }
  if (tree.key === key) {
    return tree.value;
  }
  return find(tree.left, key) ||
    find(tree.right, key);
};

var constructor = function() {
  return null;
};
var f = function() {
  return constructor();
};
f(); // {} (in nonconformant environments)

var f = function g() {
  return 17;
};
g(); // 17 (in nonconformant environments)

var f = function g() {
  return 17;
};
var g = null;
//Things to Remember
//✦ Use named function expressions to improve stack traces in Error objects and debuggers.
//✦ Beware of pollution of function expression scope with Object .prototype in ES3 and buggy JavaScript environments.
//✦ Beware of hoisting and duplicate allocation of named function  expressions in buggy JavaScript environments.
//✦ Consider avoiding named function expressions or removing them before shipping.
//✦ If you are shipping in properly implemented ES5 environments, you’ve got nothing to worry about.


// About block-local function declarations
function f() {
  return "global";
}
function test(x) {
  function f() {
    return "local";
  }

  var result = [];
  if (x) {
    result.push(f());
  }
  result.push(f());
  return result;
}
test(true); // ["local", "local"]
test(false); // ["local"]
// ---
function f() {
  return "global";
}
function test(x) {
  var result = [];
  if (x) {
    function f() {
      return "local";
    } // block-local
    result.push(f());
  }
  result.push(f());
  return result;
}
test(true); // ?
test(false); // ?
// ---
function f() {
  return "global";
}
function test(x) {
  var g = f, result = [];
  if (x) {
    g = function() {
      return "local";
    }
    result.push(g());
  }
  result.push(g());
  return result;
}
//Things to Remember
//✦ Always keep function declarations at the outermost level of a program or a containing function to avoid unportable behavior.
//✦ Use var declarations with conditional assignment instead of conditional function declarations.


// About creating vars with eval
//Things to Remember
//✦ Avoid creating variables with eval that pollute the caller’s scope.
//✦ If eval code might create global variables, wrap the call in a nested function to prevent scope pollution.


// About direct / indirect eval
var x = "global";
function test() {
  var x = "local";
  return eval("x"); // direct eval
}
test(); // "local"
// ---
var x = "global";
function test() {
  var x = "local";
  var f = eval;
  return f("x"); // indirect eval
}
test(); // "global"
//A concise way to write an indirect call to eval is to use the expression sequencing operator (,) with an apparently pointless number literal:
//  (0,eval)(src);
//How does this peculiar-looking function call work? The number literal 0 is evaluated but its value is ignored, and the parenthesized
//sequence expression produces the eval function. So (0,eval) behaves
//almost exactly the same as the plain identifier eval, with the one
//important difference being that the whole call expression is treated as
//an indirect eval.

//Things to Remember
//✦ Wrap eval in a sequence expression with a useless literal to force the use of indirect eval.
//✦ Prefer indirect eval to direct eval whenever possible.
