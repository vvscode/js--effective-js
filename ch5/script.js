// About Lightweight dictionaries from Direct Instances of Object
function NaiveDict() {
}
NaiveDict.prototype.count = function() {
  var i = 0;
  for (var name in this) { // counts every property
    i++;
  }
  return i;
};
NaiveDict.prototype.toString = function() {
  return "[object NaiveDict]";
};
var dict = new NaiveDict();
dict.alice = 34;
dict.bob = 24;
dict.chris = 62;
dict.count(); // 5
//Things to Remember
//✦ Use object literals to construct lightweight dictionaries.
//✦ Lightweight dictionaries should be direct descendants of Object.prototype to protect against prototype pollution in for...in loops.


// Use null Prototypes to prevent prototype pollution
function C() {
}
C.prototype = null;
var o = new C();
Object.getPrototypeOf(o) === null; // false
Object.getPrototypeOf(o) === Object.prototype; // true
// ---
var x = Object.create(null);
Object.getPrototypeOf(o) === null; // true
// ---
var x = { __proto__: null };
x instanceof Object; // false (non-standard)

//Things to Remember
//✦ In ES5, use Object.create(null) to create prototype-free empty objects that are less susceptible to pollution.
//✦ In older environments, consider using { __proto__: null }.
//✦ But beware that __proto__ is neither standard nor entirely portable and may be removed in future JavaScript environments.
//✦ Never use the name "__proto__" as a dictionary key since some environments treat this property specially.


// Use .hasOwnproperty to protect against prototype pollution
var dict = {};
"alice" in dict; // false
"bob" in dict; // false
"chris" in dict; // false
"toString" in dict; // true
"valueOf" in dict; // true
dict.hasOwnProperty("alice"); // false
dict.hasOwnProperty("toString"); // false
dict.hasOwnProperty("valueOf"); // false

var hasOwn = Object.prototype.hasOwnProperty;
var dict = {};
dict.alice = 24;
hasOwn.call(dict, "hasOwnProperty"); // false
hasOwn.call(dict, "alice"); // true
dict.hasOwnProperty = 10; // breaking update
hasOwn.call(dict, "hasOwnProperty"); // true
hasOwn.call(dict, "alice"); // true

function Dict(elements) {
// allow an optional initial table
  this.elements = elements || {}; // simple Object
  this.hasSpecialProto = false; // has "__proto__" key?
  this.specialProto = undefined; // "__proto__" element
}
Dict.prototype.has = function(key) {
  if (key === "__proto__") {
    return this.hasSpecialProto;
  }
// own property only
  return {}.hasOwnProperty.call(this.elements, key);
};
Dict.prototype.get = function(key) {
  if (key === "__proto__") {
    return this.specialProto;
  }
  // own property only
  return this.has(key)
    ? this.elements[key]
    : undefined;
};
Dict.prototype.set = function(key, val) {
  if (key === "__proto__") {
    this.hasSpecialProto = true;
    this.specialProto = val;
  } else {
    this.elements[key] = val;
  }
};
Dict.prototype.remove = function(key) {
  if (key === "__proto__") {
    this.hasSpecialProto = false;
    this.specialProto = undefined;
  } else {
    delete this.elements[key];
  }
};
//Things to Remember
//✦ Use hasOwnProperty to protect against prototype pollution.
//✦ Use lexical scope and call to protect against overriding of the hasOwnProperty method.
//✦ Consider implementing dictionary operations in a class that encapsulates the boilerplate hasOwnProperty tests.
//✦ Use a dictionary class to protect against the use of "__proto__" as a key.


// Prefer Arrays to Dictionaries for Ordered Collections
//Things to Remember
//✦ Avoid relying on the order in which for...in loops enumerate object properties.
//✦ If you aggregate data in a dictionary, make sure the aggregate operations are order-insensitive.
//✦ Use arrays instead of dictionary objects for ordered collections.


// Never Add Enumerable Properties to Object.prototype
Object.defineProperty(Object.prototype, "allKeys", {
  value: function() {
    var result = [];
    for (var key in this) {
      result.push(key);
    }
    return result;
  },
  writable: true,
  enumerable: false,
  configurable: true
});

//Things to Remember
//✦ Avoid adding properties to Object.prototype.
//✦ Consider writing a function instead of an Object.prototype method.
//✦ If you do add properties to Object.prototype, use ES5’s Object.defineProperty to define them as nonenumerable properties.


// Avoid modifying an Object during Enumeration
function Member(name) {
  this.name = name;
  this.friends = [];
}
var a = new Member("Alice"),
  b = new Member("Bob"),
  c = new Member("Carol"),
  d = new Member("Dieter"),
  e = new Member("Eli"),
  f = new Member("Fatima");
a.friends.push(b);
b.friends.push(c);
c.friends.push(e);
d.friends.push(b);
e.friends.push(d, f);

Member.prototype.inNetwork = function(other) {
  var visited = {};
  var workset = {};
  workset[this.name] = this;
  for (var name in workset) {
    var member = workset[name];
    delete workset[name]; // modified while enumerating
    if (name in visited) { // don't revisit members
      continue;
    }
    visited[name] = member;
    if (member === other) { // found?
      return true;
    }
    member.friends.forEach(function(friend) {
      workset[friend.name] = friend;
    });
  }
  return false;
};
a.inNetwork(f); // false
// ---
function WorkSet() {
  this.entries = new Dict();
  this.count = 0;
}
WorkSet.prototype.isEmpty = function() {
  return this.count === 0;
};
WorkSet.prototype.add = function(key, val) {
  if (this.entries.has(key)) {
    return;
  }
  this.entries.set(key, val);
  this.count++;
};
WorkSet.prototype.get = function(key) {
  return this.entries.get(key);
};
WorkSet.prototype.remove = function(key) {
  if (!this.entries.has(key)) {
    return;
  }
  this.entries.remove(key);
  this.count--;
};
Dict.prototype.pick = function() {
  for (var key in this.elements) {
    if (this.has(key)) {
      return key;
    }
  }
  throw new Error("empty dictionary");
};
WorkSet.prototype.pick = function() {
  return this.entries.pick();
};
Member.prototype.inNetwork = function(other) {
  var visited = {};
  var worklist = [this];
  while (worklist.length > 0) {
    var member = worklist.pop();
    if (member.name in visited) { // don't revisit
      continue;
    }
    visited[member.name] = member;
    if (member === other) { // found?
      return true;
    }
    member.friends.forEach(function(friend) {
      worklist.push(friend); // add to work-list
    });
  }
  return false;
};

//Things to Remember
//✦ Make sure not to modify an object while enumerating its properties with a for...in loop.
//✦ Use a while loop or classic for loop instead of a for...in loop when iterating over an object whose contents might change during the loop.
//✦ For predictable enumeration over a changing data structure, consider using a sequential data structure such as an array instead of a dictionary object.


// Prefer for-loops to for..in-loops for array iteration
var scores = [98, 74, 85, 77, 93, 100, 89];
var total = 0;
for (var score in scores) {
  total += score;
}
var mean = total / scores.length;
mean; // ?

// 17636.571428571428
// I caused the fact 'keys of object are always strings'
// so total isn't (0 + 1 + 2 ... ) but ('0' + '1' + '2' ...)
// finally total is '0123456'
// 1234567/7 = 17636.571428571428

//Things to Remember
//■ Always use a for loop rather than a for...in loop for iterating over the indexed properties of an array.
//■ Consider storing the length property of an array in a local variable before a loop to avoid recomputing the property lookup.


// Prefer Iteration Methods to loops
for (var i = 0; i <= n; i++) { /* extra end iteration */}
for (var i = 1; i < n; i++) { /* missing first iteration */ }
for (var i = n; i >= 0; i--) { /* extra start iteration */ }
for (var i = n - 1; i > 0; i--) { /* missing last iteration */ }

//Things to Remember
//✦ Use iteration methods such as Array.prototype.forEach and Array.prototype.map in place of for loops to make code more readable and avoid duplicating loop control logic.
//✦ Use custom iteration functions to abstract common loop patterns that are not provided by the standard library.
//✦ Traditional loops can still be appropriate in cases where early exit is necessary; alternatively, the some and every methods can be used for early exit.


// Reuse generic array methods on array-like objects
function highlight() {
  [].forEach.call(arguments, function(widget) {
    widget.setBackground("yellow");
  });
}

var arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
var result = Array.prototype.map.call(arrayLike, function(s) {
  return s.toUpperCase();
}); // ["A", "B", "C"]

var result = Array.prototype.map.call("abc", function(s) {
  return s.toUpperCase();
}); // ["A", "B", "C"]

//Things to Remember
//✦ Reuse generic Array methods on array-like objects by extracting method objects and using their call method.
//✦ Any object can be used with generic Array methods if it has indexed properties and an appropriate length property.


// Prefer Array Literal to the Array Constructor
var a = [1, 2, 3, 4, 5];
var a = new Array(1, 2, 3, 4, 5);

function f(Array) {
  return new Array(1, 2, 3, 4, 5);
}
f(String); // new String(1)

Array = String;
new Array(1, 2, 3, 4, 5); // new String(1)

//Things to Remember
//✦ The Array constructor behaves differently if its first argument is a number.
//✦ Use array literals instead of the Array constructor.
