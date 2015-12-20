// Don't block the event queue on I/O
//Things to Remember
//✦ Asynchronous APIs take callbacks to defer processing of expensive operations and avoid blocking the main application.
//✦ JavaScript accepts events concurrently but processes event handlers sequentially using an event queue.
//✦ Never use blocking I/O in an application’s event queue


// Use nested or named callbacks for async sequencing
//Things to Remember
//✦ Use nested or named callbacks to perform several asynchronous operations in sequence.
//✦ Try to strike a balance between excessive nesting of callbacks and awkward naming of non-nested callbacks.
//✦ Avoid sequencing operations that can be performed concurrently.


// Be aware of dropped errors
try {
  f();
  g();
  h();
} catch (e) {
// handle any error that occurred...
}

downloadAsync("a.txt", function(a) {
  downloadAsync("b.txt", function(b) {
    downloadAsync("c.txt", function(c) {
      console.log("Contents: " + a + b + c);
    }, function(error) {
      console.log("Error: " + error);
    });
  }, function(error) { // repeated error-handling logic
    console.log("Error: " + error);
  });
}, function(error) { // repeated error-handling logic
  console.log("Error: " + error);
});

function onError(error) {
  console.log("Error: " + error);
}
downloadAsync("a.txt", function(a) {
  downloadAsync("b.txt", function(b) {
    downloadAsync("c.txt", function(c) {
      console.log("Contents: " + a + b + c);
    }, onError);
  }, onError);
}, onError);
//Things to Remember
//✦ Avoid copying and pasting error-handling code by writing shared error-handling functions.
//✦ Make sure to handle all error conditions explicitly to avoid dropped errors.


// Use Recursion for async loops
//Things to Remember
//✦ Loops cannot be asynchronous.
//✦ Use recursive functions to perform iterations in separate turns of the event loop.
//✦ Recursion performed in separate turns of the event loop does not overflow the call stack.


// Don't block the event queue on cuputation
//Things to Remember
//✦ Avoid expensive algorithms in the main event queue.
//✦ On platforms that support it, the Worker API can be used for running long computations in a separate event queue.
//✦ When the Worker API is not available or is too costly, consider breaking up computations across multiple turns of the event loop.


// Use a bounter to perform concurrent operations
function downloadAllAsync(urls, onsuccess, onerror) {
  var pending = urls.length;
  var result = [];
  if (pending === 0) {
    setTimeout(onsuccess.bind(null, result), 0);
    return;
  }
  urls.forEach(function(url, i) {
    downloadAsync(url, function(text) {
      if (result) {
        result[i] = text; // store at fixed index
        pending--; // register the success
        if (pending === 0) {
          onsuccess(result);
        }
      }
    }, function(error) {
      if (result) {
        result = null;
        onerror(error);
      }
    });
  });
}
//Things to Remember
//✦ Events in a JavaScript application occur nondeterministically, that is, in unpredictable order.
//✦ Use a counter to avoid data races in concurrent operations.


// Never call async callback synchronously
var cache = new Dict();
function downloadCachingAsync(url, onsuccess, onerror) {
  if (cache.has(url)) {
    var cached = cache.get(url);
    setTimeout(onsuccess.bind(null, cached), 0);
    return;
  }
  return downloadAsync(url, function(file) {
    cache.set(url, file);
    onsuccess(file);
  }, onerror);
}
//Things to Remember
//✦ Never call an asynchronous callback synchronously, even if the data is immediately available.
//✦ Calling an asynchronous callback synchronously disrupts the expected sequence of operations and can lead to unexpected interleaving of code.
//✦ Calling an asynchronous callback synchronously can lead to stack overflows or mishandled exceptions.
//✦ Use an asynchronous API such as setTimeout to schedule an asynchronous callback to run in another turn.


// Use promises for cleaner async logic
//Things to Remember
//✦ Promises represent eventual values, that is, concurrent computations that eventually produce a result.
//✦ Use promises to compose different concurrent operations.
//✦ Use promise APIs to avoid data races.
//✦ Use select (also known as choose) for situations where an intentional race condition is required.
