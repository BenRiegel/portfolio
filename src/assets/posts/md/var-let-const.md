# 'Var', 'let', 'const' and the future of JavaScript

JavaScript ES6 introduced the keywords 'let' and 'const' for declaring new variables. In this post, I'll discuss the main differences between 'let' and 'const', on the one hand, and 'var' on the other. I will explain why these differences are important enough that 'var' should no longer be used when creating new code. However, I will also express my concern about the strategy of introducing new keywords to fix problems with the JavaScript language itself.

## 'var' vs 'let'

Let's first talk about the differences between 'let' and 'var.' I'll discuss 'const' later. There are several differences between 'let' and 'var' that I think are relevant here:

1) 'Let' creates a new block scope, whereas block scoping is not possible with 'var.'
2) 'Let' declarations are not hoisted to the top of a function declaration, whereas 'var' declarations are.
3) 'Let' declarations in the global scope do not create new properties on the global object, whereas 'var' declarations do.
4) 'Let' declarations cannot be declared twice in the same scope.

Let's go over these points individually, starting with block scoping. There are cases in which being able to scope a variable to a block is a good thing. Let's consider a standard 'for' loop.

~~~js
function myFunct(){
  for (var i = 0; i < 10; i++){
    /* do something with i */
  }
  console.log(i) //10
}
~~~

Because i is declared using 'var' in the for loop, i becomes attached to the scope of myFunct. Thus, it is accessible outside the loop. However, because i is just a temporary variable used for the loop and nowhere else, this doesn't make sense. It would be better if i were scoped to the loop block instead of the surrounding function. Before ES6, JavaScript had no mechanism for block scoping. The use of 'let' (and 'const'), however, creates a new variable that is scoped to the surrounding function *or* block.

~~~js
function myFunct(){
  for (let i = 0; i < 10; i++){
    /* do something with i */
  }
  console.log(i)   //reference error
}
~~~

The above code results in a reference error because i, when declared with 'let', becomes scoped to the for block instead of the surrounding function myFunct. When we want a variable to be accessible only within a block, as in this case, it is clearly a good thing to be able to make this happen.

Another difference between 'var' and 'let' is that 'var' declarations are hoisted whereas 'let' (and 'const') declarations are not. Hoisting is the phenomenon in which variable and function declarations appear to be moved to the top of the scope in which they appear. The variable assignments, however, are not. Let's look at the following code:

```js
function myFunct(){
  console.log(i);          //undefined
  var i = 'hello world';  
}
```

This function does not result in an error because the declaration of i is hoisted to the top of myFunct. The console prints "undefined", however, because the while i is hoisted, it is not yet been assigned a value. With 'const' and 'let', however, this function results in a reference error:

```js
function myFunct(){
  console.log(i);          //reference error
  let i = 'hello world';  
}
```

To me, it seems like bad practice to use variables before they are declared, especially if doing so results in unpredictable behavior (e.g. printing "undefined" to the console instead of "hello world"). Thus, it seems to me that it is an advantage of 'let' and 'const' that they are not hoisted.

A third difference between 'let' and 'var' is that variables declared with 'var' in the global scope create properties on the global object. In browsers, the global object is 'window.'

```js
var myVar = 'hello world';
console.log(window.myVar)   //hello world
```

As we see in the above code, creating a variable 'myVar' with 'var' in the global scope creates a property of the same name on the window object. If the variable is declared with 'let', however, no such property is created.

```js
let myVar = 'hello world';
console.log(window.myVar)   //undefined
```

It's possible that in creating a variable in the global scope someone may accidentally overwrite a pre-existing property or method on the global object. This may not be super likely, but it's an advantage of 'let' and 'const' that they do not create properties on the global object.

Finally, if you declare a new variable using the 'let' keyword, you can't redeclare the variable (using 'let', 'var', or 'const') in the same scope. With 'var', you can redeclare a variable. Thus, the following is allowable code in JavaScript:

~~~js
var myVar = 'hello world';
/* do some stuff */
var myVar = 'something else';
~~~

By contrast, this code results in a syntax error:

~~~js
let myVar = 'hello world';
/* do some stuff */
let myVar = 'something else';
~~~

It seems like a minor issue, but it seems like bad practice to declare the same variable twice. Whether this should result in a syntax error or not, I'm not sure. It doesn't result in obviously buggy behavior or introduce a performance issue. One could argue that it's more of a linting concern.

Let's step back and assess our reasons for using var vs let. We might declare variables in three types of scopes: the global scope, a function scope, or a block scope. In the global scope, there is a good reason to use 'let': namely, so that the declaration doesn't create a property on the global object. This avoids collisions. Within a function, it makes sense to use 'let' if we don't want to allow variables to be hoisted and potentially used before they are declared. Within a block, it makes sense to use 'let' for the purpose of creating a block scope. Thus, to me, it seems like there are good reasons to use 'let' instead of 'var' in all contexts. I'm somewhat sympathetic to the argument that you should use 'var' within functions when you're not explicitly creating a block scope. However, if we also want to prevent variable declarations from being hoisted, then we still have a good reason to use 'let.'

## 'const'

The 'const' keyword functions in much the same way as 'let'. The main difference is that a variable declared with the 'const' keyword must be initialized with a value and cannot be assigned to a new value. Thus, the following results in a type error:

~~~js
const myVar = 10;
myVar += 1;         //Type Error
~~~

However, if a variable is assigned to a reference type, the underlying object can be modified even if the variable is declared with 'const.' The following does not result in an error:

~~~js
const myObj = {
  x: 1,
}
myObj.x += 1;    //this is fine
~~~

This makes it seem, however, that even if you declare a variable with the 'const' keyword, you can't *really* be sure that it's constant. All it means that you can't reassign the variable to some other primitive or reference type. Nevertheless, the point of having a 'const' is to let you or whoever comes back and reads your code know that this variable shouldn't change. Thus, there is a signaling function and an enforcement function of 'const.' With primitive types, both the signalizing and enforcement work. With reference types, the enforcement doesn't really work because the underlying reference types can be mutated. Nevertheless, the signalizing function can still work. I think it makes sense to declare a variable with const if it's assigned to a reference type as long as the object is not mutated. If it is, then you should use 'let.'

## 'let' and the future of JavaScript

In ES6, TC-39 decided that there were certain downsides of 'var' declarations and that the 'let' keyword could help fix them. It could fix the problem with JavaScript not having block scoping. It could fix the problem with variables declared in the global scope potentially overwriting properties on the global object. And it could fix the issue of variables being used before they are declared. 'Let' to the rescue! It does all three.

I think all those changes are good, but when I think about it, I'm not sure about the mechanism for fixing them, which is to introduce a new keyword. I can't help shake the feeling that there should only be one way to declare variables (well, maybe two if you want to have a 'const') in a language. The fundamental problem here is that with JavaScript, unlike with many other programming languages, you can't simply fix the problem in a new major version. New major versions are not backwards compatible, and with JavaScript, backwards compatibility is very import because you don't want to break the internet. You want all code currently running in a browser to stay working. Thus, the designers of JavaScript are forced into ad hoc fixes like defining a new keyword 'let' to allow block scoping.

But even assuming that we're forced into ad hoc fixes, it's not clear why creating a new 'let' keyword was necessary. If we want block scoping, why modify the variable keyword instead of something else? Perhaps it might be possible to create special block declarations, such as:

~~~js
if (true){*
  var x = 1;  
*}
~~~

The bracket-star syntax creates a new block scoped variable x even though it's declared with var. If this alternative syntax is not possible for some reason, perhaps another way to do it is to do something similar to strict mode, which was introduced in ES5. Instead of including 'use strict' in a file, maybe it's possible to include something like 'use block scoping.' This still introduces a backwards compatible, ad hoc fix, but at least it doesn't require the use of 'let', which does other things as well.

The use of ad hoc syntax fixes makes you wonder what the future of JavaScript will look like. In twenty years, will it be unrecognizable because the syntax has changed so much due to the need to create more ad hoc changes? Will 'let' have to be replaced with something else someday if we identify certain downsides with that keyword? It seems possible that in the future, the language could get pretty cluttered. We shall see....
