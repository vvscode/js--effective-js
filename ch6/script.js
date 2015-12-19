// Maintain Consisten Conventions
//Things to Remember
//✦ Use consistent conventions for variable names and function signatures.
//✦ Don’t deviate from conventions your users are likely to encounter in other parts of their development platform.


// Threat undifined as 'No Value'
function Server(port, hostname) {
  if (arguments.length < 2) {
    hostname = "localhost";
  }
  hostname = Sting(hostname);
  // ...
}
// --- vs
function Server(port, hostname) {
  if (hostname === undefined) {
    hostname = "localhost";
  }
  hostname = String(hostname);
// ...
}

var s3 = new Server(80, config.hostname); // config.hostname can be undefined
//Things to Remember
//✦ Avoid using undefined to represent anything other than the absence of a specific value.
//✦ Use descriptive string values or objects with named boolean properties, rather than undefined or null, to represent application-specific flags.
//✦ Test for undefined instead of checking arguments.length to provide parameter default values.
//✦ Never use truthiness tests for parameter default values that should allow 0, NaN, or the empty string as valid arguments.


// Accept options objects for keyword arguments
// you should read comments/source to find sense of params
var alert = new Alert(100, 75, 300, 200,
  "Error", message,
  "blue", "white", "black",
  "error", true);

// self documented otions. Easy for .extend with defaultsOptions / use defaults on no-arguments
var alert = new Alert({
  x: 100, y: 75,
  width: 300, height: 200,
  title: "Error", message: message,
  titleColor: "blue", bgColor: "white", textColor: "black",
  icon: "error", modal: true
});
//Things to Remember
//✦ Use options objects to make APIs more readable and memorable.
//✦ The arguments provided by an options object should all be treated  as optional.
//✦ Use an extend utility function to abstract out the logic of extracting values from options objects.


// Avoid unnecessary state
// It's mostly the same as about using pure functions ( as I understand this part )
//Things to Remember
//✦ Prefer stateless APIs where possible.
//✦ When providing stateful APIs, document the relevant state that each operation depends on.


// Use structural typing for flexible interfaces
//Things to Remember
//✦ Use structural typing (also known as duck typing) for flexible object interfaces.
//✦ Avoid inheritance when structural interfaces are more flexible and lightweight.
//✦ Use mock objects, that is, alternative implementations of interfaces that provide repeatable behavior, for unit testing.


// Distinguish between Array and Array-Like
//Things to Remember
//✦ Never overload structural types with other overlapping types.
//✦ When overloading a structural type with other types, test for the other types first.
//✦ Accept true arrays instead of array-like objects when overloading with other object types.
//✦ Document whether your API accepts true arrays or array-like values.
//✦ Use ES5’s Array.isArray to test for true arrays.


// Avoid Excessive Coercion
//Things to Remember
//✦ Avoid mixing coercions with overloading.
//✦ Consider defensively guarding against unexpected inputs.


// Support method chaining
//Things to Remember
//✦ Use method chaining to combine stateless operations.
//✦ Support method chaining by designing stateless methods that produce new objects.
//✦ Support method chaining in stateful methods by returning this.
