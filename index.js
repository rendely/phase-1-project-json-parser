data = {
  first: {
    second: {
      third: 'tada'
    }
  }
}

function addDiv(data){
  const el = document.createElement('div');
  const key = Object.keys(data)[0];
  if (key === undefined) return 'no key';
  el.innerText = key;
  this.appendChild(el);
  el.addEventListener('click', function(e) { 
    //Stop propogation so we don't also affect div above
    e.stopPropagation();
    addDiv.call(el, data[key]);
    console.log('click');
  });
}

addDiv.call(document.body, data);
