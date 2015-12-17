// About .prototype/.__proto__/.getPrototypeOf
//Things to Remember
//✦ C.prototype determines the prototype of objects created by new C().
//✦ Object.getPrototypeOf(obj) is the standard ES5 function for retrieving the prototype of an object.
//✦ obj.__proto__ is a nonstandard mechanism for retrieving the prototype of an object.
//✦ A class is a design pattern consisting of a constructor function and an associated prototype.
// Not all environment support __proto__ or changing __proto__. So next some points is about it.


// About .getPrototype vs .__proto__
//Things to Remember
//✦ Prefer the standards-compliant Object.getPrototypeOf to the nonstandard __proto__ property.
//✦ Implement Object.getPrototypeOf in non-ES5 environments that support __proto__.


// Never modify __proto__
//Things to Remember
//✦ Never modify an object’s __proto__ property.
//✦ Use Object.create to provide a custom prototype for new objects.


// Make constructors new-agnostic
function User(name, passwordHash) {
  this.name = name;
  this.passwordHash = passwordHash;
}
var u = User("baravelli", "d8b74df393528d51cd19980ae0aa028e");
u; // undefined
this.name; // "baravelli"
this.passwordHash; // "d8b74df393528d51cd19980ae0aa028e"
// --- vs
function User(name, passwordHash) {
  if (!(this instanceof User)) {
    return new User(name, passwordHash);
  }
  this.name = name;
  this.passwordHash = passwordHash;
}
// or
function User(name, passwordHash) {
  var self = this instanceof User
    ? this
    : Object.create(User.prototype);
  self.name = name;
  self.passwordHash = passwordHash;
}
//Things to Remember
//✦ Make a constructor agnostic to its caller’s syntax by reinvoking itself with new or with Object.create.
//✦ Document clearly when a function expects to be called with new.


// About storing methods on Prototypes
//Things to Remember
//✦ Storing methods on instance objects creates multiple copies of the functions, one per instance object.
//✦ Prefer storing methods on prototypes over storing them on instance objects.


// About closures for private data
function User(name, passwordHash) {
  this.toString = function() {
    return "[User " + name + "]";
  };
  this.checkPassword = function(password) {
    return hash(password) === passwordHash;
  };
}
//Things to Remember
//✦ Closure variables are private, accessible only to local references.
//✦ Use local variables as private data to enforce information hiding within methods.


// Store instance State only on Instance Objects
function Tree(x) {
  this.value = x;
}
Tree.prototype = {
  children: [], // should be instance state!
  addChild: function(x) {
    this.children.push(x);
  }
};
var left = new Tree(2);
left.addChild(1);
left.addChild(3);
var right = new Tree(6);
right.addChild(5);
right.addChild(7);
var top = new Tree(4);
top.addChild(left);
top.addChild(right);
top.children; // [1, 3, 5, 7, left, right]
// --- vs
function Tree(x) {
  this.value = x;
  this.children = []; // instance state
}
Tree.prototype = {
  addChild: function(x) {
    this.children.push(x);
  }
};

//Things to Remember
//✦ Mutable data can be problematic when shared, and prototypes are shared between all their instances.
//✦ Store mutable per-instance state on instance objects.


// Recognize the Implicit Binding of this ( it resolves with arrow function from ES6 )
//Things to Remember
//✦ The scope of this is always determined by its nearest enclosing function.
//✦ Use a local variable, usually called self, me, or that, to make a this-binding available to inner functions


// Call superclass constructor from subclass constructor
function SubClass(scene, x, y) {
  SuperClass.call(this, scene, x, y);
  this.points = 0;
}
SubClass.prototype = Object.create(SuperClass.prototype);
// we can't use
// SubClass.prototype = new SuperClass();
// cause we have no argument's for SuperClass's contructor

//Things to Remember
//✦ Call the superclass constructor explicitly from subclass constructors, passing this as the explicit receiver.
//✦ Use Object.create to construct the subclass prototype object to avoid calling the superclass constructor.


// Never reuse Superclass Property Names
//Things to Remember
//✦ Be aware of all property names used by your superclasses.
//✦ Never reuse a superclass property name in a subclass.


// About avoiding of inheritance from Standart Classes
//Things to Remember
//✦ Inheriting from standard classes tends to break due to special internal properties such as [[Class]].
//✦ Prefer delegating to properties instead of inheriting from standard classes.


// Treat Prototypes as an Implementation Detail

// JavaScript provides convenient introspection mechanisms for inspecting the details of an object. The Object.prototype
// .hasOwnProperty method determines whether a property is stored
// directly as an “own” property (i.e., an instance property) of an object,
// ignoring the prototype hierarchy completely. The Object.getPrototypeOf
// and __proto__ facilities (see Item 30) allow programs to traverse the
// prototype chain of an object and look at its prototype objects individually.
// These are powerful and sometimes useful features.

//Things to Remember
//✦ Objects are interfaces; prototypes are implementations.
//✦ Avoid inspecting the prototype structure of objects you don’t control.
//✦ Avoid inspecting properties that implement the internals of objects you don’t control.


// Avoid Reckless Monkey-Patching
//Things to Remember
//✦ Avoid reckless monkey-patching.
//✦ Document any monkey-patching performed by a library.
//✦ Consider making monkey-patching optional by performing the modifications in an exported function.
//✦ Use monkey-patching to provide polyfills for missing standard APIs.
