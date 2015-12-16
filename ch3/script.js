// About function/method/constructor call
//Things to Remember
//✦ Method calls provide the object in which the method property is looked up as their receiver.
//✦ Function calls provide the global object (or undefined for strict functions) as their receiver. Calling methods with function call syntax is rarely useful.
//✦ Constructors are called with new and receive a fresh object as their receiver.


// About comfort with using higher-order function
//Things to Remember
//✦ Higher-order functions are functions that take other functions as arguments or return functions as their result.
//✦ Familiarize yourself with higher-order functions in existing libraries.
//✦ Learn to detect common coding patterns that can be replaced by higher-order functions.


// About .call
//Things to Remember
//✦ Use the call method to call a function with a custom receiver.
//✦ Use the call method for calling methods that may not exist on a given object.
//✦ Use the call method for defining higher-order functions that allow clients to provide a receiver for the callback.


// About .apply
//Things to Remember
//✦ Use the apply method to call variadic functions with a computed array of arguments.
//✦ Use the first argument of apply to provide a receiver for variadic methods.


// About arguments
//Things to Remember
//✦ Use the implicit arguments object to implement variable-arity functions.
//✦ Consider providing additional fixed-arity versions of the variadic functions you provide so that your consumers don’t need to use the apply method.
//✦ Never modify the arguments object.
//✦ Copy theargumentsobject to a real array using[].slice.call(arguments) before modifying it.
//✦ Be aware of the function nesting level when referring to arguments.
//✦ Bind an explicitly scoped reference to arguments in order to refer to it from nested functions.


// About .bind
//Things to Remember
//✦ Beware that extracting a method does not bind the method’s receiver to its object.
//✦ When passing an object’s method to a higher-order function, use an anonymous function to call the method on the appropriate receiver.
//✦ Use bind as a shorthand for creating a function bound to the appropriate receiver.
//✦ Use bind to curry a function, that is, to create a delegating function with a fixed subset of the required arguments.
//✦ Pass null or undefined as the receiver argument to curry a function that ignores its receiver.


// About preferring closures to strings for encapsulation code
//✦ Never include local references in strings when sending them to APIs that execute them with eval. ( see chapter2 about indirect eval )
//✦ Prefer APIs that accept functions to call rather than strings to eval.


// About avoiding relying on the functions .toString method
(function(x) {
  return x + 1;
}).bind(16).toString(); // "function (x) {\n [native code]\n}"
(function(x) {
  return function(y) {
    return x + y;
  }
})(42).toString(); // "function (y) {\n return x + y;\n}"
//Things to Remember
//✦ JavaScript engines are not required to produce accurate reflections of function source code via toString.
//✦ Never rely on precise details of function source, since different engines may produce different results from toString.
//✦ The results of toString do not expose the values of local variables stored in a closure.
//✦ In general, avoid using toString on functions.


// About avoiding nonstandart stack inspections
function revealCaller() {
  return revealCaller.caller;
}
function start() {
  return revealCaller();
}
start() === start; // true

function getCallStack() {
  var stack = [];
  for (var f = getCallStack.caller; f; f = f.caller) {
    stack.push(f);
  }
  return stack;
}
// for simple call stacks
function f1() {
  return getCallStack();
}
function f2() {
  return f1();
}
var trace = f2();
trace; // [f1, f2]
// BUT!!!!
function f(n) {
  return n === 0 ? getCallStack() : f(n - 1);
}
var trace = f(1); // infinite loop
// Also
function f() {
  "use strict";
  return f.caller;
}
f(); // error: caller may not be accessed on strict functions

//Things to Remember
//✦ Avoid the nonstandard arguments.caller and arguments.callee, because they are not reliably portable.
//✦ Avoid the nonstandard caller property of functions, because it does not reliably contain complete information about the stack.
