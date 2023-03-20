data = {
  first: {
    second: {
      third: 'tada'
    }
  },
  secondouter: {
    thirdinner: 'tadada'
  }
}

function addDiv(data) {
  const el = document.createElement('div');
  if (typeof data !== 'object') return 'done';
  const key = Object.keys(data)[0];
  if (key === undefined) return 'no key';
  el.innerText = key;
  this.appendChild(el);
  el.addEventListener('click', function (e) {
    //Stop propogation so we don't also affect div above
    e.stopPropagation();
    addDiv.call(el, data[key]);
  });
}

Object.keys(data).forEach(d => {
  const obj = {}
  obj[d] = data[d];
  addDiv.call(document.body, obj);
})

//TODOs
//easier approach is to build it entirely but then just hide it with css? 