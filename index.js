// Initializes the page 
init();
function init() {
  const defaultUrls = ['https://www.reddit.com/r/gifs.json',
    'https://anapioficeandfire.com/api/characters/583'];
  fetchJSON(defaultUrls[0]);
};
let shouldSort = true;
var currentData;
// Fetches JSON data
function fetchJSON(url) {
  fetch(url)
    .then(r => r.json())
    .then(allData => {
      //only take list of reddit posts if reddit data
      const data = url.match('reddit.com') ? allData.data.children : allData;
      currentData = data;
      //start rendering the DOM
      renderDOMWithJSON.call(document.querySelector('main'), data)
    })
}

// Sorts by type
function sortByType(a,b){
  const aSortValue = getSortValue(this[a]);
  const bSortValue = getSortValue(this[b]);
  if (aSortValue > bSortValue) return 1;
  if (aSortValue < bSortValue) return -1;
  return 0;
}

function sortByKey(a,b){
  const aSortValue = a;
  const bSortValue = b;
  if (aSortValue > bSortValue) return 1;
  if (aSortValue < bSortValue) return -1;
  return 0;
}

function getSortValue(value){
  const itemType = getItemType(value);
  switch (itemType) {
    case 'array': return 7
    case 'object': return 6
    case 'empty object': return 5
    case 'null': return 4
    case 'boolean': return 3
    case 'string': return 2
    case 'number': return 1
    default: return 100
  }
}

// Populates DOM based on object data
function renderDOMWithJSON(data) {
  // Loop through all keys in the passed in object
  const keys = Object.keys(data);
  if (shouldSort) keys.sort(sortByKey).sort(sortByType.bind(data));
  for (const key of keys) {
    // Create a DOM element to display the item (key and value pair)
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');
    // Get the item value and type
    const itemValue = valueFormat(data[key]);
    const itemType = getItemType(data[key]);
    // Construct the item DOM 
    itemElement.innerHTML = `<div class='container'>
                             <div class='type-icon'>${getTypeIcon(itemType)}</div>
                             <div class='key'>${key}</div> 
                             <div class='value'>${itemValue}</div>
                             </div>`;
    if (itemType === 'object') itemElement.classList.add('object');
    if (itemType === 'null') itemElement.classList.add('null');
    this.appendChild(itemElement);
    addCollapsibleEventListener.call(itemElement);

    // recursively call render DOM function if object, otherwise it's a terminal item 
    if (itemType === 'object' || itemType === 'array') {
      renderDOMWithJSON.call(itemElement, data[key])
    }
    else {
      itemElement.classList.add('terminal');
      addSelectItemEventListener(itemElement.querySelector('.key'));
      addSelectItemEventListener(itemElement.querySelector('.value'));
    };

  }
}


// Makes DOM element collapsible/expandable 
function addCollapsibleEventListener() {
  this.addEventListener('click', function toggleShow(e) {
    //Stop propogation so we don't also affect div above
    e.stopPropagation();
    Array.from(this.children).filter(e => e.nodeName === 'DIV' && e.classList.contains('item')).forEach(c => {
      c.classList.contains('hidden') ? c.classList.remove('hidden') : c.classList.add('hidden')
    })
  })
}

// Gets the type of value being handled  
function getItemType(value) {
  if (value === null) {
    return 'null'
  }
  else if (typeof value === 'object' && Array.isArray(value)) {
    return 'array'
  }
  else if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) {
    return 'empty object'
  }
  else if (typeof value === 'object' && !Array.isArray(value)) {
    return 'object'
  }
  else { // covers boolean, string, number
    return typeof value;
  }
}

// Represents value appropriately based on type
function valueFormat(value) {
  const itemType = getItemType(value);
  switch (itemType) {
    case 'array': return `Array[${value.length}]`
    case 'empty object': return `Object {empty}`
    case 'object': return `Object`
    case 'null': return 'Null'
    case 'boolean': return String(value);
    case 'string': return `${value}`
    case 'number': return `${value}`
    default: return `Type: ${itemType}`
  }
}

// Gets an icon image based on the item type
function getTypeIcon(itemType) {
  let iconFile = '';
  switch (itemType) {
    case 'array': iconFile = 'array.svg'; break;
    case 'empty object': iconFile = 'object.svg'; break;
    case 'object': iconFile = 'object.svg'; break;
    case 'null': iconFile = 'null.svg'; break;
    case 'string': iconFile = 'string.svg'; break;
    case 'number': iconFile = 'number.svg'; break;
    case 'boolean': iconFile = 'boolean.svg'; break;
    default: iconFile = 'unknown.svg'; break;
  }
  return `<img src='icons/${iconFile}' alt='item type icon'>`
}

// Filters the DOM based on a keyword
function filterKeep(string) {
  allDivs = document.querySelectorAll('div.item');
  allDivs.forEach(d => {
    const textContent = d.textContent;
    if (!textContent.match(string)) {
      d.classList.add('hidden');
    }
  })
}

// Unfilters the DOM
function unfilter() {
  allDivs = document.querySelectorAll('div');
  allDivs.forEach(d => {
    d.classList.remove('hidden');
  }
  )
}

// Triggers filtering from text input
document.querySelector('#filter').addEventListener('input', (e) => {
  unfilter();
  filterKeep(e.target.value);
})

// Triggers sorting/not sorting 
document.querySelector('#sort').addEventListener('input', (e)=>{
   shouldSort = !shouldSort;
   document.querySelector('main').innerHTML = '';
   renderDOMWithJSON.call(document.querySelector('main'), currentData)
})

// Selects entire value when clicked
function addSelectItemEventListener(node) {
  node.addEventListener('click', () => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  })

}