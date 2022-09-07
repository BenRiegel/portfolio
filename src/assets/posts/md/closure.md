# What is a closure in JavaScript?

A closure in JavaScript is a function that behaves in a particular, useful way. In this post, I will explain what exactly this behavior is and why closures are important in JavaScript.

## Functions close over variables

The root idea behind closures is the idea of a function "closing over" variables. If a variable is "closed over" by a function, this just means that the variable is accessible within that function's scope. For example, variables declared within the scope of a function (i.e. local variables) are accessible within that scope. Thus, a function can be said to close over its own local variables.

~~~js
function sayHello(){
  let name = 'Ben';
  console.log('Hello, my name is ' + name);
}
~~~

In the code above, the name variable is declared within the scope of the sayHello function. Thus, the sayHello function closes over the name variable.

Furthermore, variables declared in outer scopes (i.e. parent functions and the global scope) can also be accessed within a child function. Thus, a child function can be said to close over variables in these outer scopes.

~~~js
let color = 'blue';
function sayHello(){
  let name = 'Ben';
  console.log('Hello, my name is ' + name);
  console.log('My favorite color is ' + color);
}
~~~

In the code above, the global variable 'color' is accessible within the scope of the sayHello function, so the sayHello function can be said to close over the color variable.

So far, there's nothing particular new here. I've just been discussing basic rules about how scope works in JavaScript. So far, so good, right?

## Why the "close" metaphor?

I'm not sure exactly why we talk about functions "closing over" variables. It doesn't seem like the perfect metaphor. However, it does work to some extent if we think of the variables that are accessible within a particular function as being closed - i.e. constant. This gets at another important rule about how scope works in JavaScript: it is *static*. For any particular function, the set of variables that fall within its scope doesn't change. It is constant (caveat: there are a few exceptions to this, but they don't matter here).

## So when does this closing occur?

The particular variables that fall within a function's scope is determined when the function is compiled. Thus, to determine which variables a function closes over, we have to look at where the function is declared, not where it is executed.

## Functions executed in another scope

From the rules outlined above about scope, it follows that when a function is executed in a different scope than where it was declared, it will still remember the variables that it closes over. Consider the following code:

~~~js
let name = 'Ben';
function logName(){
  console.log(name);
}
function run(){
  let name = 'Jim';
  logName();            //'Ben'
}
run();
~~~

In the global scope, a name variable is declared and is assigned the value 'Ben.' A logName function is also declared which logs to the console a name variable. Within the run function, a name variable is declared that shadows the global name variable. This local variable is assigned the value 'Jim'. Within the run function, the logName function is executed. Does it log the global name variable or the local name variable? To determine this, we have to look where logName function is declared, not where it is executed. When it is declared, it closes over the global name variable. Thus, when the logName function is executed, it logs the name 'Ben', even though it is executed in the scope of the run function, which has a diffferent local name variable.

The logName function is an example of "a closure" in this code. We can call it that because of its special behavior - i.e. its ability to remember the variables within its scope even though it is executed in a different scope.

## Closures are important in JavaScript

The concept of closure is not unique to JavaScript. What is unique to JavaScript (at least compared to some other languages) is the fact that functions are [first-class](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function). This means that they can be stored in variables, passed along as arguments to functions, returned from functions, etc., just like other objects. This is necessary in JavaScript because functions often have to be passed along as callbacks. For instance, if we want to add an event listener to a dom element, we have to pass along a reference to the callback function. Even though the callback function will be executed in a different scope, it will still remember which variables fall within its scope. This is useful. Consider the following code:

~~~js
let counter = 0;
function clickHandler(){
  counter += 1;
  console.log(counter);
}
let el = document.getElementById('button');
el.addEventListener('click', clickHandler);
~~~

Here we declare a counter variable and set it to zero. Then we declare a clickHandler function, which increments the counter variable and logs the result. We then add the clickHandler function as a click event listener for a button element. When the button is clicked, the clickHandler function is executed. Even though the clickHandler function is executed in a different scope (and it's not even obvious which one that is), it will still remember which variable is the right counter variable (the one declared in the global scope in the code snippet) and it will increment it.

In JavaScript, closure can lead to some powerful design patters, such as [the module pattern](https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch09s02.html). It's beyond the scope of this post to discuss why the module pattern is powerful. However, I will just say that it works with the help of closure.

## Summary

In summary, a closure is a function that behaves in a certain way - it will remember which variables fall within its scope even though it may be executed in a different scope. This behavior derives from basic facts about how scope works in JavaScipt. Moreover, closures are especially important in JavaScript due to the fact that functions are first-class objects.

I hope this has made things more clear!
