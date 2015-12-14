// About strict-mode
function f(x){
  'use strict';
  var arguments = []; // redefinitio of arguments is not allowed
}

// Never concatenate strict files and nonstrict files.

// Concatenate files by wrapping their bodies in immediately invoked function expressions
(function() {
  'use strict';
  function f() {
    // ...
  }
  // ...
})();


// About floating-point numbers

// all numbers are doubles

// bitwise arithmetic convert umber to 32-bit ints

//Floating-point arithmetic can only produce approximate results, rounding to the nearest representable real number.
console.log(0.1 + 0.2);
console.log((0.1 + 0.2) + 0.3);
console.log(0.1 + (0.2 + 0.3));

//To remember:
//✦ JavaScript numbers are double-precision floating-point numbers.
//✦ Integers in JavaScript are just a subset of doubles rather than a separate datatype.
//✦ Bitwise operators treat numbers as if they were 32-bit signed integers.
//✦ Be aware of limitations of precisions in floating-point arithmetic.


// About Implicit Coercions
console.log("2" + 3);
console.log(2 + "3");
console.log(1 + 2 + "3");
console.log(1 + "2" + 3);
console.log("17" * 3);
console.log("8" | 1);

console.log(NaN === NaN);
console.log(isNaN(NaN));
console.log(isNaN("foo"));
console.log(isNaN(undefined));
console.log(isNaN({}));
console.log(isNaN({value: "foo"}));
var a = NaN;
console.log(a !== a);

console.log("J" + { toString: function() { return "S"; } });
console.log(2 * { valueOf: function() { return 3; } });

var obj = {
  toString: function() {
    return "[object MyObject]";
  },
  valueOf: function() { // JavaScript resolves this ambiguity by blindly choosing valueOf over toString
    return 17;
  }
};
"object: " + obj;

//Things to Remember
//✦ Type errors can be silently hidden by implicit coercions.
//✦ The + operator is overloaded to do addition or string concatenation depending on its argument types.
//✦ Objects are coerced to numbers via valueOf and to strings via toString.
//✦ Objects with valueOf methods should implement a toString method that provides a string representation of the number produced by valueOf.
//✦ Use typeof or comparison to undefined rather than truthiness to test for undefined values.


// About prefer primitive vs object wrappers
var s1 = new String("hello");
var s2 = new String("hello");
var hello = 'hello';
console.log(typeof s);
console.log(typeof hello);
console.log(s1 === s2);// F
console.log(s1 == s2); // F
hello.a = 17;
s1.a = 17;
console.log(hello.a, s1.a);

//Things to Remember
//✦ Object wrappers for primitive types do not have the same behavior as their primitive values when compared for equality.
//✦ Getting and setting properties on primitives implicitly creates object wrappers.

// About using '==' with mixed types
console.log("1.0e0" == { valueOf: function() { return true; } }); // T
console.log('1999/12/31' == new Date('1999/12/31')); // F

//Things to Remember
//✦ The == operator applies a confusing set of implicit coercions when its arguments are of different types.
//✦ Use === to make it clear to your readers that your comparison does not involve any implicit coercions.
//✦ Use your own explicit coercions when comparing values of different types to make your program’s behavior clearer.


// About limits of semicolon insertion;
// Semicolons are only ever inserted before a } token, after one or more newlines, or at the end of the program input.
// Semicolons are only ever inserted when the next input token cannot be parsed.
/*
 a = b
 (f());
-->
 a = b(f());

 a = b;
 f();
 a = b f(); // parse error
 */
/*
return {};
-->
but
return
{};
-->
return;
{}
;
 */

//Things to Remember
//✦ Semicolons are only ever inferred before a }, at the end of a line, or at the end of a program.
//✦ Semicolons are only ever inferred when the next token cannot be parsed.
//✦ Never omit a semicolon before a statement beginning with (, [, +, -, or /.
//✦ When concatenating scripts, insert semicolons explicitly between scripts.
//✦ Never put a newline before the argument to return, throw, break, continue, ++, or --.
//✦ Semicolons are never inferred as separators in the head of a for loop or as empty statements.


// About strings as sequences of 16-bit code units
console.log("𝄞 clef".length); // 7
console.log("G clef".length); // 6
console.log("𝄞 clef".charCodeAt(0));     // 55348 (0xd834)
console.log("𝄞 clef".charCodeAt(1));     // 56606 (0xdd1e)
console.log("𝄞 clef".charAt(1) === " "); // F
console.log("𝄞 clef".charAt(2) === " "); // T
console.log(/^.$/.test("𝄞"));  // F
console.log(/^..$/.test("𝄞")); // T
