# Phase 1 Blog Post: Tips and tricks for sorting arrays

## Overview

In this blog post we'll start by walking through the very basics of how to sort Arrays in Javascript and what to watch out for. We'll then build on those fundamentals to handle several of the most common scenarios you'll face. These scenarios include sorting alphabetically, sorting numerically, sorting objects and, lastly, custom sorting rules. 

## Array sorting basics

To understand basic sorting, let's start with an array of strings and see what we get.

```javascript
words = ['bat', 'dog', 'cat', 'rat']
console.log(words.sort())
// [ 'bat', 'cat', 'dog', 'rat' ]
```

Great! This `sort` method seems to just magically work! How about we try it on some numbers next?

```javascript
numbers = [20, 10, 100, 50];
console.log(numbers.sort())
// [ 10, 100, 20, 50 ]
```

Huh? Why is `100` showing up between `10` and `20` and not at the end? 

Reading the documentation you'll see that the `sort` method has an optional parameter `sort(compareFn)`. And further, [if compareFn is not supplied, all non-undefined array elements are sorted by converting them to strings and comparing strings in UTF-16 code units order.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#:~:text=If%20compareFn%20is%20not%20supplied%2C%20all%20non%2Dundefined%20array%20elements%20are%20sorted%20by%20converting%20them%20to%20strings%20and%20comparing%20strings%20in%20UTF%2D16%20code%20units%20order.)

The sort function is treating our list of numbers as a list of strings instead. How can we fix that?

## Sorting numeric values

To sort numeric values the way we want, we'll need to write our own compare function. The full documentation is [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort). Below is a briefly explained version of a simple compare function. 

```javascript
//sort calls the compare function and passed two arguments, a and b
//these are the two elements from our list being compared
function sortByNumber(a, b) {
  //convert each of them to a Number type 
  aVal = Number(a);
  bVal = Number(b);
  //if a is bigger we return > 0 to sort a after b
  if (aVal > bVal) return 1;
  //if b is bigger we return < 0 to sort b after a
  if (aVal < bVal) return -1;
  //else keep the original order
  return 0;
}
```

And the moment of truth...
```javascript
console.log(numbers.sort(sortByNumber))
// [ 10, 20, 50, 100 ]
```

Hurray! It works!

## Sorting by ascending and descending

What if we wanted to sort the numbers in descending order instead? We could write a separate compare function, but that would fail our DRY (Don't Repeat Yourself) principle. Let's see how we can extend the functionality of our compare function.

```javascript
function sortByNumberAsc(asc = true) {
  return function (a, b) {
    aVal = Number(a);
    bVal = Number(b);
    if (aVal > bVal) return asc ? 1 : -1;
    if (aVal < bVal) return asc ? -1 : 1;
    return 0;
  }
}
```

## Sorting arrays of objects

## Creating custom sorting rules