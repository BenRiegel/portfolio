# JavaScript "this", explained

In this article, I will explain how the "this" identifier works in JavaScript. Specifically, I'll discuss the use of "this" in the global scope, the four ways in which "this" can be bound in functions, and how it can become un-bound. Finally, I'll discuss how "this" operates in ES6 arrow functions.

The "this" identifier represents the *context* in which "this"-code is executed. The execution context is usually an object, though in certain circumstances it may be undefined. The execution context is determined by where and how the "this"-code is executed. In other words, "this"-binding is dynamic, rather than static. It happens at runtime, rather than author-time. Things get a little more complicated, however, in the case of arrow functions, as I'll discuss below.

## "This" in the global scope

In the global scope, "this" refers to the global object, which in browsers is named "window." Declaring a variable using "var" in the global scope creates a variable on the window object. "this" in the global scope is simply a reference to the window object. This is true regardless of whether the code is executed using strict mode or not.

~~~js
var myName = 'Ben';
console.log(window.myName);  //Ben
console.log(this.myName);    //Ben
~~~

"this"-code, when executed in the scope of a function, may be bound to an object different from window. There are four ways in which the "this" identifier can be become bound. Let's discuss them in turn:

## 1. "New" Binding

Inside a function that is being used as a constructor, "this" is bound to the object that is returned by the constructor.

~~~js
function Person(name){
  this.name = name;
  this.sayName = function(){
    console.log(this.name);
  }
}
let ben = new Person('Ben');
ben.sayName();  //Ben
~~~

## 2. Explicit Binding

All functions in JavaScript have the methods 'call', 'apply', and 'bind' that allow you to specify the execution context. 'Call' and 'apply' are similar, differing only in how they deal with arguments. The 'bind' method returns a function with "this" bound to the specified object.

~~~js
function sayName(){
  console.log(this.name);
}
let ben = {
  name: 'Ben',
};
sayName.call(ben);   //Ben
~~~

In this example, the sayName.call function executes the sayName function with the "this"-code bound to the "ben" object.

## 3. Implicit Binding

When a function is "attached" to an object as a method and is executed as such, "this" is bound to that object. A function may be "attached" to an object either as an own property or a prototype property.

~~~js
let ben = {
  name: 'Ben',
  sayName: function(){
    console.log(this.name);
  }
};
ben.sayName();  //Ben
~~~

In this example, the sayName function is attached to the "ben" object as a method. When the ben.sayName function is executed, the "this"-code in the sayName function is bound to the ben object.

## 4. Default Binding

Default binding occurs when none of the above apply. In non-strict mode, “this” is bound to the global object ("window" in browsers). In strict mode, “this” is set to undefined. In strict mode, the global object is not eligible to be the default binding (however, it can be explicitly set using call, apply, bind).

~~~js
window.name = 'Ben';
function sayName(){
  console.log(this.name);
}
sayName();  //Ben
~~~

In this example, this is set to the global object because none of the other binding cases apply. The code logs "Ben" because this.name refers to a property on the window global object. In strict mode, this code will cause an error.

~~~js
"use strict";
window.name = 'Ben';
function sayName(){
  console.log(this.name);
}
sayName();  //TypeError
~~~

This code results in a type error because in strict mode, 'this' is set to undefined, and trying to access properties of undefined is not allowed.

## Lost binding

The this-binding of a function can sometimes be lost. This occurs when implicit binding is lost, resulting in default binding.

~~~js
window.name = 'John';
let ben = {
  name: 'Ben',
  sayName: function(){
    console.log(this.name);
  }
};
let f = ben.sayName;
f();  //John
~~~

In the above-example, the variable f is assigned to a reference to the sayName function that is defined in the context of the 'ben' object. When the function is executed, however, it is not executed in the context of 'ben.' Thus, the this code loses its implicit binding and default binding applies. "this" refers to the global object (because we're not in strict mode), so the name 'John' is logged instead of 'Ben'.

## Binding precedence

As discussed above, there are four ways in which this-code can become bound to an object. It's possible, however, for multiple binding mechanisms to be applicable in the same code. What happens then? Which one wins out? Let's take a look.

The default binding is only applicable when none of the other mechanisms apply. This means that there are only four cases that we need to be concerned with:

1) Explicit binding and implicit binding

~~~js
let obj1 = {
  setName: function(){
    this.name = 'Ben';
  }
}
let obj2 = {};
obj1.setName.call(obj2);
console.log(obj1.name);  //undefined
console.log(obj2.name);  //Ben
~~~

In this example, the setName method is attached to obj1; however, the function is executed using the call method, which explicitly binds "this" to obj2. If implicit binding has precedence, then "this" should be bound to obj1. However, if explicit binding has precedence, then this should be bound to obj2. As it turns out, "this" is bound to obj2, which means that explicit binding has precedence over implicit binding.

2) New binding and implicit binding

~~~js
let obj1 = {
  setName: function(){
    this.name = 'Ben';
  }
}
let obj2 = new obj1.setName();
console.log(obj1.name);  //undefined
console.log(obj2.name);  //Ben
~~~
In this example, the setName method is attached to obj1; however, the function is being as a constructor that assigns a new object to obj2. If implicit binding has precedence, then "this" should be bound to obj1. However, if new binding has precedence, then "this" should be bound to obj2. As it turns out, this is bound to obj2, which means that new binding has precedence over implicit binding.

3) New binding and explicit binding

~~~js
function setName(){
  this.name = 'Ben';
}
let obj2 = {};
let f = setName.bind(obj2);
let obj3 = new f();
console.log(obj2.name);  //undefined
console.log(obj3.name);  //Ben
~~~

In this example, f is assigned to the setName function bound to obj2. f is being used as a constructor that returns the object that is assigned to obj3. If explicit binding has precedence, then this should be bound to obj2; however, if the new binding has precedence, then this bound to obj3. As it turns out, this is bound to obj3, which means that new binding has precedence over explicit binding.

4) New binding, explicit binding, and implicit binding

~~~js
let obj1 = {
  setName: function(){
    this.name = 'Ben';
  }
};
let obj2 = {};
let obj3 = new ( obj1.setName.bind(obj2) );
console.log(obj1.name);  //undefined
console.log(obj2.name);  //undefined
console.log(obj3.name);  //Ben
~~~

This is a case in which all three of the binding mechanisms could apply. 'obj3' is assigned the object that is returned as a result of a constructor call using the new keyword. The constructor function is the obj1.setName method that is explicitly bound to obj2. Thus, the "this"-code could be bound to obj1 in virtue of the fact that the setName function is attached to obj1. Or this could be bound to obj2 in virtue of the fact that the setName function is explicitly bound to obj2. Or it could be obj3 in virtue of the fact that the (bound) function is being using as a constructor. As it turns out, the "this"-code is bound to obj3. Thus, the new binding has more precedence than the other two types of binding.

## "this" and arrow functions

ES6 introduces arrow functions, which have a different syntax than regular functions. I won't go over all of the differences between arrow functions and regular functions. Rather, I'll just discuss one particular difference, namely how "this" works in arrow functions. Arrow functions don't have their own execution contexts but rather take on the execution context of the enclosing function or global scope.

~~~js
var name = 'John';
let myObj = {
  name: 'Ben',
  sayName: ()=>{
    console.log(this.name);
  }
}
myObj.sayName();  //John
~~~

In this example, myObj.sayName is declared in the global scope, which means that "this," because it is within an arrow function is bound to the global object instead of the myObj object. Thus, the console logs 'John' instead of 'Ben.'

~~~js
var name = 'John';
let myObj = {
  name: 'Ben',
  sayName: function(){
    setTimeout( () => {
      console.log(this.name);      
    }, 0);
  }
}
myObj.sayName();  //Ben
~~~

In this example, the arrow function is used as a callback passed as an argument to the setTimeout function. "this" is bound to the context of the surrounding sayName function. When the sayName function is executed, the execution context is myObj. Thus, "this" in the callback is bound to myObj, and so 'Ben' is logged to the console instead of 'John.'

The special "this"-binding associated with arrow functions is sometimes referred to as 'lexical this.' In one sense, this makes sense because "this" within arrow functions is inherited from the outer function. In another sense, this is not quite accurate because lexical scope in JavaScript is static, author-time binding. In arrow functions, "this" is also dynamic because the enclosing function have different execution contexts.

~~~js
let myObj = {
  name: 'Ben',
  sayName: function(){
    setTimeout( () => {
      console.log(this.name);      
    }, 0);
  }
}
let myObj2 = {
  name:'John',
}
myObj.sayName.call(myObj2);  //John
~~~
In this example, when the sayName function is executed, it is explicitly bound to myObj2. When the arrow function is executed, it is bound to the execution context of the myName function, which is myOb2 and not myObj1. Thus, the console logs "John" instead of 'Ben.' In this way, the binding of "this" in arrow functions still has a dynamic element.

This pretty much sums up how 'this' works in JavaScript. Thanks for reading.
