# Phase 1 Project Pitch: JSON Parser

## Requirements:

https://github.com/learn-co-curriculum/phase-1-javascript-project-mode

## The basic story of your application

Developers frequently need to inspect new JSON data sources. While there are multiple free tools online, they are missing advanced features, which would make analyzing complex JSON files easier.

## The core features of your MVP

- Load example JSON data from one of several free APIs
- Or paste in text data, highlight any errors (stretch goal)
- Preview entire JSON file with color coding to distinguish objects, arrays and other values. Breadcrums to know where in JSON object item is located.
- Dropdown to choose number of levels of depth displayed
- Hover to show more actions
  - Click to toggle collapsing/expanding
  - Click to get path for selecting this value in javascript code (and generate javascript code to select it or all similar from set of siblings)
- Compare button to compare same key across siblings
- Pin button to pin the path + value to a pinned section (and track all the data of interest)
- Filter by term to only show matching keys
- Filter by term to only show matching values
- Sort by alphabetical, longest to shortest
- Inline preview of images
- Keyboard shortcuts for faster navigation/hiding/showing/filtering

## The API data you'll be using and how you'll use it

All of this API data will be shown in the JSON parsing tool:

- Reddit: https://reddit.com/r/gifs.json
- Game of thrones houses: https://anapioficeandfire.com/api/houses
- Healthcare Gov data: https://www.healthcare.gov/api/index.json

## Challenges you expect to face

- How different filters and collapsing will interact elegantly with eachother (and not undo each other)
- How to style the page so the information hierarchy is clear

## How you are meeting the requirements of the project

### Your app must be a HTML/CSS/JS frontend that accesses data from a public API or from a db.json file using json-server

OK

### Your API or db.json should return a collection of at least 5 objects with each object having at least 3 attributes

OK

### All interactions between the client and the API should be handled asynchronously and use JSON as the communication format

Will use fetch to retrieve JSON

### Try to avoid using an API that requires a key

OK

### Your entire app must run on a single page. There should be NO redirects or reloads. In other words, your project will contain a single HTML file

OK

### Use at least 3 distinct event listeners (3 events of different types) that enable interactivity

- Click: for collapse/expand of a section of the JSON
- Input: for filtering with a term
- Keydown: for keyboard shortcuts
- Mouseover/Mouseout: show additional actions on a value

### Each of your event listeners should also have its own unique callback function. These must be added using JavaScript's .addEventListener() method

OK

### Your project must implement at least one instance of array iteration using available array methods (map, forEach, filter, etc)

Both creating the DOM to show the JSON data and implementing the filtering functions will utilize array iteration

### Follow good coding practices. Keep your code DRY (Do not repeat yourself) by utilizing functions to abstract repetitive code*

OK
