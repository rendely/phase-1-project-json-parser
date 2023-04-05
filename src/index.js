// Initializes the page 
// init();
function init(i = 3) {
  const defaultUrls = [
    'https://www.reddit.com/r/gifs.json',
    'https://anapioficeandfire.com/api/characters/583',
    'https://chroniclingamerica.loc.gov/suggest/titles/?q=maryland',
    'https://api.disneyapi.dev/characters'
  ];
  fetchJSON(defaultUrls[i]);
};
var currentData;
let shouldSort = false;


// Fetches JSON data
function fetchJSON(url) {
  fetch(url)
    .then(r => r.json())
    .then(allData => {
      //only take list of reddit posts if reddit data
      const data = url.match('reddit.com') ? allData.data.children : allData;
      currentData = data;
      //start rendering the DOM
      resetDOM();
      renderDOMWithJSON.call(document.querySelector('main'), data,[]);
    })
}


// Populates DOM based on object data
function renderDOMWithJSON(data, path) {
  // Loop through all keys in the passed in object
  const keys = Object.keys(data);
  // Conditionally sort the keys alphabetically and by type
  if (shouldSort) keys.sort(sortByKeyAlphabetically).sort(sortByType.bind(data));
  for (const key of keys) {
    // Create a DOM element to display the item (key and value pair)
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');
    itemElement.setAttribute('path',`${JSON.stringify([...path, key])}`);
    // Get the item value and type
    const itemValue = valueFormat(data[key]);
    const itemType = getItemType(data[key]);
    // Construct the item DOM 
    itemElement.innerHTML = `<div class='container'>
                             <div class='type-icon'>${getTypeIcon(itemType)}</div>
                             <div class='key'>${key}</div> 
                             <div class='value'>${itemValue}</div>
                             <button class='hidden'>Copy path</button>
                             </div>`;
    if (itemType === 'object') itemElement.classList.add('object');
    if (itemType === 'null') itemElement.classList.add('null');
    // Append the item DOM
    this.appendChild(itemElement);
    // Add callback to make collapsible
    addCollapsibleEventListener.call(itemElement);

    // recursively call render DOM function if object/array, otherwise it's a terminal item 
    if (itemType === 'object' || itemType === 'array') {
      renderDOMWithJSON.call(itemElement, data[key], [...path,key])
    }
    else {
      // Add terminal class if no nested data to style differently
      itemElement.classList.add('terminal');
      // Add click event listern to make it easy to copy key or value
      addSelectItemEventListener(itemElement.querySelector('.key'));
      addSelectItemEventListener(itemElement.querySelector('.value'));
      addMouseOverImgEventListener(itemElement.querySelector('.value'));
      addMouseOverCopyPathEventListener(itemElement);
    };
  }
}


// Makes DOM element collapsible/expandable 
function addCollapsibleEventListener() {
  this.addEventListener('click', function toggleShow(e) {
    //Stop propogation so we don't also affect div above
    e.stopPropagation();
    //Loop through all children and toggle hiding items
    Array.from(this.children).filter(e => e.nodeName === 'DIV' && e.classList.contains('item')).forEach(c => {
      c.classList.contains('hidden') ? c.classList.remove('hidden') : c.classList.add('hidden')
    })
  })
}


// Helper: Gets the type of value being handled  
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


// Helper: Represents value appropriately based on type
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


// Helper: Gets an icon image based on the item type
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
  return `<img src='images/${iconFile}' alt='item type icon'>`
}


// Filters the DOM based on a keyword
function filterKeep(string) {
  allDivs = document.querySelectorAll('div.item');
  allDivs.forEach(d => {
    const textContent = d.textContent.toLowerCase();
    if (!textContent.match(string.toLowerCase())) {
      d.classList.add('hidden');
    }
  })
}


// Unfilters the DOM
function unfilter() {
  allDivs = document.querySelectorAll('main div');
  allDivs.forEach(d => {
    d.classList.remove('hidden');
  })
}


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


// Helper: Sorts by type
function sortByType(a, b) {
  const aSortValue = getSortValue(this[a]);
  const bSortValue = getSortValue(this[b]);
  if (aSortValue > bSortValue) return 1;
  if (aSortValue < bSortValue) return -1;
  return 0;
}


// Helper: Sorts by key alphabetical
function sortByKeyAlphabetically(a, b) {
  let aSortValue;
  let bSortValue;
  if (!isNaN(Number(a)) && !isNaN(Number(b))) {
    aSortValue = Number(a);
    bSortValue = Number(b);
  }
  else {
    aSortValue = a;
    bSortValue = b;
  }
  if (aSortValue > bSortValue) return 1;
  if (aSortValue < bSortValue) return -1;
  return 0;
}


// Helper: Gets sort value for sort by type
function getSortValue(value) {
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

// Toggles sorting of the data
function toggleSort() {
  shouldSort = !shouldSort;
  resetDOM();
  renderDOMWithJSON.call(document.querySelector('main'), currentData, []);
  document.querySelector('#sort').toggleAttribute('checked');
}

// Reset DOM
function resetDOM() {
  document.querySelector('main').innerHTML = '';
}


// Add keyboard shortcuts
document.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'Escape':
      document.querySelector('#filter').blur();
      break;
    case 's':
      if (document.querySelector('#filter') !== document.activeElement &&
        document.querySelector('#paste_text') !== document.activeElement) toggleSort();
      break;
    case 'f':
      if (document.querySelector('#filter') !== document.activeElement &&
        document.querySelector('#paste_text') !== document.activeElement) document.querySelector('#filter').focus();
      break;
  }
})

// Trigger preview of image when hovering over item
function addMouseOverImgEventListener(node) {
  node.addEventListener('mouseover', (e) => {
    if (e.target.innerText.match('png$|jpg$|jpeg$|gifv$|gif$')) {
      const img = document.createElement('img');
      img.className = 'preview';
      img.src = e.target.innerText;
      node.appendChild(img);
    }
  })
  node.addEventListener('mouseout', (e) => {
    if (node.querySelector('img')) node.querySelector('img').remove();
  })
}

// Trigger showing copy path button when hovering on item
function addMouseOverCopyPathEventListener(node) {
  node.addEventListener('mouseover', (e) => {
    node.querySelector('button').classList.remove('hidden');
  })
  node.addEventListener('mouseout', (e) => {
    node.querySelector('button').classList.add('hidden');
  })
  node.querySelector('button').addEventListener('click', (e) =>{
    const pathArray = JSON.parse(node.getAttribute('path'));
    const pathString = pathArray.reduce((acc,curr) => {
      return `${acc}['${String(curr)}']`
    },'currentData')
     navigator.clipboard.writeText(pathString);
  })
}

//Helper function for toggling showing JSON paste form
function togglePasteForm(shouldShow) {
  const form = document.querySelector('#paste_form');
  if (shouldShow === undefined) {
    form.classList.toggle('hidden');
  }
  else if (!shouldShow) {
    form.classList.add('hidden')
  }
  else {
    form.classList.remove('hidden');
    form.scrollIntoView();
  }
}

// Triggers filtering from text input
document.querySelector('#filter').addEventListener('input', (e) => {
  unfilter();
  filterKeep(e.target.value);
})


// Triggers toggle of sorting
document.querySelector('#sort').addEventListener('input', toggleSort)


// Triggers changing data set via dropdown
document.querySelector('#dataset').addEventListener('input', (e) => {
  const urlIndex = e.target.value;
  togglePasteForm(false);
  init(urlIndex);
})

// Triggers showing paste form:
document.querySelector('#show_paste_input').addEventListener('click', () => {
  togglePasteForm();
  resetDOM();
})

// Triggers parsing of pasted in JSON
document.querySelector('#submit_paste').addEventListener('click', (e) => {
  const pasteText = document.querySelector('#paste_text').value;
  try {
    currentData = JSON.parse(pasteText);
    resetDOM();
    renderDOMWithJSON.call(document.querySelector('main'), currentData, []);
    togglePasteForm();
  } catch (e) {
    console.log(e);
  }
})