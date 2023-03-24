fetch("https://www.reddit.com/r/news.json")
.then(r => r.json())
.then(data => {
  
Object.keys(data).forEach(d => {
  const obj = {}
  obj[d] = data[d];
  addDiv.call(document.querySelector('main'), obj);
})
})

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
    el.innerHTML = `<item-key>${key}:</item-key> <item-value> ${val.slice(0,100)}</item-value>`;
    // if (!!val.match('\.gif|.jpg|.jpeg|.png')) el.innerHTML += `<img src="${val}" width="200" height="200"/>`
    if (typeof data[key] === 'object') el.setAttribute('object','');
    if (data[key] === null) el.setAttribute('null','');
    this.appendChild(el);
    if (typeof data[key] === 'object') addDiv.call(el, data[key]);
    
    el.addEventListener('click', function toggleShow(e) {
      //Stop propogation so we don't also affect div above
      e.stopPropagation();
      Array.from(el.children).filter(e=> e.nodeName === 'DIV').forEach(c =>{
        c.classList.contains('hidden') ? c.classList.remove('hidden') : c.classList.add('hidden')        
      })
      // el.removeEventListener('click', show);
    });
  }
}

function filterKeep(string){
  allDivs = document.querySelectorAll('div');
  allDivs.forEach(d => {
    // const parentText = Array.from(d.childNodes)
    // .filter(node => node.nodeType === Node.TEXT_NODE)
    // .map(node => node.textContent.trim())
    // .join(" ");
    const parentText = d.textContent; 
    if (!parentText.match(string)){
      d.classList.add('hidden');
    }
  })
}

function unfilter(){
  allDivs = document.querySelectorAll('div');
  allDivs.forEach(d => {
          d.classList.remove('hidden');
    }
  )
}

document.querySelector('#filter').addEventListener('input', (e)=>{
  unfilter();
  filterKeep(e.target.value);
})

//TODO:
//Change it to show it all expanded by default and then click to toggle hiding on/off
