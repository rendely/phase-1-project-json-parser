// Fetch the reddit JSON data and populate DOM
fetch("https://www.reddit.com/r/news.json")
  .then(r => r.json())
  .then(allData => {
    //only take list of reddit posts
    const data = allData.data.children;
    Object.keys(data).forEach(d => {
      const obj = {}
      obj[d] = data[d];
      addDiv.call(document.querySelector('main'), obj);
    })
  })

// Function for populating DOM based on object data
function addDiv(data) {
  if (typeof data !== 'object') {
    this.innerText += ` ${JSON.stringify(data)}`;
    return 'done';
  }
  if (data === null) return 'null';
  const keys = Object.keys(data);
  for (const key of keys) {
    const el = document.createElement('div');
    const val = (typeof data[key] === 'object' ? (Array.isArray(data[key]) ? `Array: ${data[key].length}` : (data[key] === null ? 'null' : 'object')) : String(data[key]))
    el.innerHTML = `<item-key>${key}:</item-key> <item-value> ${val.slice(0, 100)}</item-value>`;
    if (typeof data[key] === 'object') el.setAttribute('object', '');
    if (data[key] === null) el.setAttribute('null', '');
    this.appendChild(el);
    if (typeof data[key] === 'object') addDiv.call(el, data[key]);

    //Event listener to expand/collapse an object
    el.addEventListener('click', function toggleShow(e) {
      //Stop propogation so we don't also affect div above
      e.stopPropagation();
      Array.from(el.children).filter(e => e.nodeName === 'DIV').forEach(c => {
        c.classList.contains('hidden') ? c.classList.remove('hidden') : c.classList.add('hidden')
      })
    });
  }
}

// Function for filtering the DOM based on a keyword
function filterKeep(string) {
  allDivs = document.querySelectorAll('div');
  allDivs.forEach(d => {
    const parentText = d.textContent;
    if (!parentText.match(string)) {
      d.classList.add('hidden');
    }
  })
}

// Function to unfilter all
function unfilter() {
  allDivs = document.querySelectorAll('div');
  allDivs.forEach(d => {
    d.classList.remove('hidden');
  }
  )
}

// Event listener to trigger filtering
document.querySelector('#filter').addEventListener('input', (e) => {
  unfilter();
  filterKeep(e.target.value);
})