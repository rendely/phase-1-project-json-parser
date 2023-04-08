words = ['bat', 'dog', 'cat', 'rat']
console.log(words.sort())
// [ 'bat', 'cat', 'dog', 'rat' ]

numbers = [20, 10, 100, 50];
words = ['bce', 'abd', 'abde', 'abc', 101, '102', 103]

console.log(numbers.sort())
// [ 10, 100, 20, 50 ]
console.log(words.sort())
// [101, '102', 103, 'abc', 'abd', 'abde', 'bce']

function sortByNumber(a, b) {
  aVal = Number(a);
  bVal = Number(b);
  if (aVal > bVal) return 1;
  if (aVal < bVal) return -1;
  return 0;
}

console.log(numbers.sort(sortByNumber))
// [ 10, 20, 50, 100 ]

function sortByNumberAsc(asc = true) {
  return function (a, b) {
    aVal = Number(a);
    bVal = Number(b);
    if (aVal > bVal) return asc ? 1 : -1;
    if (aVal < bVal) return asc ? -1 : 1;
    return 0;
  }
}

console.log(numbers.sort(sortByNumberAsc))
// [ 10, 20, 50, 100 ]
console.log(numbers.sort(sortByNumberAsc(false)))
// [ 100, 50, 20, 10 ]

cars = [
  {
    "name": "Luxo",
    "class": "Sedan",
    "price": 70000
  },
  {
    "name": "Alpha",
    "class": "Sedan",
    "price": 65000
  },
  {
    "name": "Thunder",
    "class": "Sports",
    "price": 90000
  },
  {
    "name": "Viper",
    "class": "Sports",
    "price": 80000
  },
  {
    "name": "Fury",
    "class": "SUV",
    "price": 60000
  },
  {
    "name": "Juggernaut",
    "class": "SUV",
    "price": 55000
  }
]

function sortByNumberOnKeyAsc(key, asc = true) {
  return function (a, b) {
    aVal = Number(a[key]);
    bVal = Number(b[key]);
    if (aVal > bVal) return asc ? 1 : -1;
    if (aVal < bVal) return asc ? -1 : 1;
    return 0;
  }
}

console.table(cars.sort(sortByNumberOnKeyAsc('price')))
// [
//   { name: 'Juggernaut', class: 'SUV', price: 55000 },
//   { name: 'Fury', class: 'SUV', price: 60000 },
//   { name: 'Alpha', class: 'Sedan', price: 65000 },
//   { name: 'Luxo', class: 'Sedan', price: 70000 },
//   { name: 'Viper', class: 'Sports', price: 80000 },
//   { name: 'Thunder', class: 'Sports', price: 90000 }
// ]

function sortAlphaByKeyAsc(key, asc = true) {
  return function (a, b) {
    aVal = a[key];
    bVal = b[key];
    if (aVal > bVal) return asc ? 1 : -1;
    if (aVal < bVal) return asc ? -1 : 1;
    return 0;
  }
}

console.table(cars.sort(sortAlphaByKeyAsc('name')));
// [
//   { name: 'Alpha', class: 'Sedan', price: 65000 },
//   { name: 'Fury', class: 'SUV', price: 60000 },
//   { name: 'Juggernaut', class: 'SUV', price: 55000 },
//   { name: 'Luxo', class: 'Sedan', price: 70000 },
//   { name: 'Thunder', class: 'Sports', price: 90000 },
//   { name: 'Viper', class: 'Sports', price: 80000 }
// ]

// Sort Sedans first, then SUVs, then Sports
// Which is NOT alphabetical
function rankClass(carClass){
   switch(carClass){
    case 'Sedan': return 1;
    case 'SUV': return 2;
    case 'Sports': return 3;
   }

}

function sortByClass(a,b) {
    aVal = rankClass(a['class']);
    bVal = rankClass(b['class']);
    if (aVal > bVal) return 1;
    if (aVal < bVal) return  -1;
    return 0;
}

console.table(cars.sort(sortByClass))
// [
//   { name: 'Alpha', class: 'Sedan', price: 65000 },
//   { name: 'Luxo', class: 'Sedan', price: 70000 },
//   { name: 'Fury', class: 'SUV', price: 60000 },
//   { name: 'Juggernaut', class: 'SUV', price: 55000 },
//   { name: 'Thunder', class: 'Sports', price: 90000 },
//   { name: 'Viper', class: 'Sports', price: 80000 }
// ]

console.table(cars.sort(sortByNumberOnKeyAsc('price')).sort(sortByClass))
// [
//   { name: 'Alpha', class: 'Sedan', price: 65000 },
//   { name: 'Luxo', class: 'Sedan', price: 70000 },
//   { name: 'Juggernaut', class: 'SUV', price: 55000 },
//   { name: 'Fury', class: 'SUV', price: 60000 },
//   { name: 'Viper', class: 'Sports', price: 80000 },
//   { name: 'Thunder', class: 'Sports', price: 90000 }
// ]