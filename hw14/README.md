It's important that JS developers be able to navigate both callbacks and promises. Even if you prefer promises, there is a lot of existing code written in callbacks, that you need to be able to understand (and work with effectively). As such, for this assignment you are to write the same functionality twice: Once using callbacks and once using promises.

Create two different scripts. One will contain the callback-centered code, and the other the promises-centered code. The two scripts should contain the same functionality, and solve the same problems.
Each script should expose a function that accepts one argument: an integer between 1 and 1000 called "num". When that function is called, the following steps should happen for "num" in order:

1. Calculate the square of num and log it to the console
2. Wait "num" milliseconds 
3. Calculate the square root of num and log it to the console
4. Determine the prime-number that is closest to num without being greater than or equal to num, and then log it to the console
5. Count the total elapsed time from when the original function was called until the last step was completed, and log that to the console as well.


