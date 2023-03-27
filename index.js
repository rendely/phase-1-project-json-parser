// Initializes the page 
init();
function init() {
  const defaultUrls = ['https://www.reddit.com/r/news.json',
    'https://anapioficeandfire.com/api/characters/583'];
  fetchJSON(defaultUrls[0]);
};

// Fetches JSON data
function fetchJSON(url) {
  fetch(url)
    .then(r => r.json())
    .then(allData => {
      //only take list of reddit posts if reddit data
      const data = url.match('reddit.com') ? allData.data.children : allData;
      //start rendering the DOM
      renderDOMWithJSON.call(document.querySelector('main'), data)
    })
}

// Populates DOM based on object data
function renderDOMWithJSON(data) {
  // Loop through all keys in the passed in object
  const keys = Object.keys(data);
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
                             <div class='key'>${key}:</div> 
                             <div class='value'> ${itemValue.slice(0, 100)}</div>
                             </div>`;
    if (itemType === 'object') itemElement.classList.add('object');
    if (itemType === 'null') itemElement.classList.add('null');
    this.appendChild(itemElement);
    addCollapsibleEventListener.call(itemElement);
    // recursively call render DOM function if object, otherwise it's a terminal item 
    if (itemType === 'object') {
      renderDOMWithJSON.call(itemElement, data[key])
    }
    else {
      itemElement.classList.add('terminal');
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
    case 'string': return `${value}`
    case 'number': return `${value}`
    default: return `Type: ${itemType}`
  }
}

// Gets an icon image based on the item type
function getTypeIcon(itemType) {
  return 'TBD'
}

// Filters the DOM based on a keyword
function filterKeep(string) {
  allDivs = document.querySelectorAll('div');
  allDivs.forEach(d => {
    const parentText = d.textContent;
    if (!parentText.match(string)) {
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