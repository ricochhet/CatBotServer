function autoComplete(
  decorationArray,
  monsterArray,
  weaponArray,
  armorArray,
  skillArray,
  itemArray
) {
  let combinedArray = [
    ...decorationArray,
    ...monsterArray,
    ...weaponArray,
    ...armorArray,
    ...skillArray,
    ...itemArray
  ];

  searchAutocomplete(document.getElementById('search-input'), combinedArray);
  document.getElementById('search-bar').onsubmit = function(e) {
    e.preventDefault();
    let input = document.getElementById('search-input').value;
    let finalInput = input
      .toLowerCase()
      .split(' ')
      .join('');

    if (decorationArray.includes(input)) {
      window.location.href = `/decorations/${finalInput.split('/').join('+')}`;
    }

    if (monsterArray.includes(input)) {
      window.location.href = `/monsters/${finalInput}`;
    }

    if (weaponArray.includes(input)) {
      window.location.href = `/weapons/${finalInput}`;
    }

    if (armorArray.includes(input)) {
      window.location.href = `/armors/${finalInput}`;
    }

    if (skillArray.includes(input)) {
      window.location.href = `/skills/${finalInput}`;
    }

    if (itemArray.includes(input)) {
      window.location.href = `/items/${finalInput}`;
    }
  };
}

function searchAutocomplete(inp, arr) {
  let currentFocus;
  inp.addEventListener('input', function(e) {
    let a,
      b,
      i,
      val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    a = document.createElement('DIV');
    a.setAttribute('id', this.id + 'autocomplete-list');
    a.setAttribute('class', 'autocomplete-items');
    this.parentNode.appendChild(a);

    let divList = [];
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement(`DIV`);
        b.innerHTML = `<strong>` + arr[i].substr(0, val.length) + `</strong>`;
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += `<input type="hidden" value="` + arr[i] + `">`;

        b.addEventListener('click', function(e) {
          inp.value = this.getElementsByTagName('input')[0].value;
          closeAllLists();
        });

        divList.push(b);
      }
    }

    let sliced = divList.slice(0, 9);
    for (const i in sliced) {
      a.appendChild(sliced[i]);
    }
  });

  inp.addEventListener('keydown', function(e) {
    let x = document.getElementById(this.id + 'autocomplete-list');
    if (x) x = x.getElementsByTagName('div');
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add('autocomplete-active');
    inp.value = x[currentFocus].textContent;
  }

  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('autocomplete-active');
    }
  }

  function closeAllLists(elmnt) {
    let x = document.getElementsByClassName('autocomplete-items');
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener('click', function(e) {
    closeAllLists(e.target);
  });
}
