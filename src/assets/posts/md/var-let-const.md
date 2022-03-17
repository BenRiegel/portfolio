# 'Var', 'let', 'const' and the future of JavaScript

ES 6 introduced the keywords 'let' and 'const' as ways to declare new variables. It seems that everyone has an opinion on when it's appropriate to use 'let' and 'const' as opposed to 'var.' Some people seem to think that we shouldn't every use 'var' again. Others seem to think that there may still be situations in which it's appropriate to use 'var.' In this post, I'll discuss these issues and explain where I fall on this issue.

## 'var' vs 'let'

Let's first talk about the differences between 'let' and 'var.' I'll discuss 'const' later. There are several differences between 'let' and 'var' that I think are relevant here:

1) 'Let' creates a block scoping, whereas block scoping is not possible with 'var.'
2) 'Let' declarations are not hoisted to the top of the a function declaration, whereas 'var' declarations are.
3) 'Let' declarations in the global scope do not create new properties on the global object, whereas 'var' declarations do.
4) 'Let' declarations cannot be declared twice in the same scope.

Let's go over these points individually. There are clearly cases in which having variables scoped to blocks is a good thing. Some people seem to think that we should use var in cases where we're not explicitly signaling that a variable is scoped to a blog. If a variable is simply scoped to a surrounding function, then it's ok to use 'var.'

Hoisting.

Global objects.

If you declare a variable using the let keyword, you can't redeclare. It doesn't matter whether it's redeclared with let or var. With var, you can redeclare a variable. Thus, the following is allowable code in JavaScript.

~~~js

~~~

By contrast, this code results in a syntax error:

~~~js
{

}
~~~

It seems like a minor issue, but it seems like bad practice to declare the same variable twice. Whether this should result in a syntax error or not, I'm not sure. One could argue that it's more of a linting concern.

Let's step back and assess our reasons for using var vs let. We might declare variables in three types of scopes: the global scope, function scope, or block scope. In the global scope, there is a good reason to use let: namely, so that the declaration doesn't create a property on the global object. This avoids collisions. Within a function, it makes sense to use 'let' if we don't want to allow variables to be used before they are declared. Within a block, it makes sense to use 'let' for the purpose of creating a block scope. Thus, to me, it seems like there are good reasons to use 'let' instead of 'var' in all contexts. I'm sympathetic to the argument that you should use 'var' within functions where you're not explicitly creating a block scope. But then there is the hoisting argument.

## 'const'

The 'const' keyword functions in much the same way as 'let'. The main difference is that a variable declared with the 'const' keyword cannot be assigned to a new value. Thus, the following results in a type error:

~~~js
const myVar = 10;
myVar += 1;         //Error
~~~

However, if a variable is assigned to a reference type, then underlying object can be modified even if the variable is declared with const. This words, however.

~~~js
const myObj = {
  x: 1,
}
myObj.x += 1;    //this is fine
~~~

This makes it seem, however, that even if you declare a variable with the 'const' keyword, you can't *really* be sure that it's constant. All it means that you can't reassign the variable to some other primitive or reference type. Nevertheless, the point of having a 'const' is to let whoever comes back and reads your code that this variable shouldn't change. There is a signaling function and an enforcement function of 'const.' With primitive types, both the signalizing and enforcement work. With reference types, the enforcement doesn't really work because the underlying reference types can be mutated. Nevertheless, the signalizing function can still work. I think it makes sense to declare a variable with const if it's assigned to a reference type as long as the object is not mutated. If it is, then you should use 'let.'

## 'let' and the future of JavaScript

In ES 6, TC-39 decided that there were certain downsides of 'var' declarations and that the 'let' keyword could help fix them. For instance, it became apparent that it would be good if JavaScript could have block scoping. Furthermore, it would be good if variables declared in the global scope didn't create properties on the global object. And it would be good if variables couldn't be used before they are declared. 'Let' to the rescue! It does all three.

I think all those changes are good, but when I think about it, I'm not sure about the mechanism for fixing them, which is to introduce a new keyword. I can't help shake the feeling that there should really be only way to declare variables (well, maybe two if you want to have a 'const' variable). The fundamental problem here is that with JavaScript, unlike with many other programming languages, you can't simply fix the problem in a new major version. New major versions are not backwards compatible, and with JavaScript, backwards compatibility is very import because you don't want to break the internet. You want all code currently running a website to stay working. Thus, the designers of JavaScript are forced into ad hoc fixes like defining a new keyword let to allow block scoping.

But even assuming that we're forced into ad hoc fixes, it's not clear why creating a new 'let' keyword was necessary. If we want block scoping, why modify the variable keyword instead of something else. Perhaps it might be possible to create special block declarations, such as:

~~~js
if (true){*
  var x = 1;  
*}
~~~

The bracket-star syntax creates a new block scoped variable x even though it's declared with var. Perhaps another way to do is to do something similar to strict mode. Instead of include 'use strict' in a file, maybe it's possible to do something like 'use block scoping.' There still needs to be a backwards compatible, ad hoc fix, but at least it doesn't require the use of 'let', which does other things as well.

The use of ad hoc syntax fixes makes you wonder what the future of JavaScript will look like. In two years, will it be unrecognizable because the syntax has changed so much due to the need to create more ad hoc changes. Will 'let' have to be replaced with something else someday if we identify certain downsides with that keyword? It seems possible that in the future, the language will get pretty cluttered. 
