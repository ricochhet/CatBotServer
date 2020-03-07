/*****************************/
/*Search for keywords on page*/
/*****************************/

function _pageFilter(f) {
  let input = f;
  let filter = input.toUpperCase();
  let ul = document.getElementById('item-container');
  let li = ul.getElementsByTagName('a');

  for (i = 0; i < li.length; i++) {
    let a = li[i];
    txtValue = a.textContent || a.innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}

/*************************************/
/*Toggle between dark and light theme*/
/*************************************/

function _toggleTheme() {
  const toggleSwitch = document.querySelector(
    '.toggle-switch__input[type="checkbox"]'
  );
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
      toggleSwitch.checked = true;
    }
  }

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleSwitch.addEventListener('change', switchTheme, false);
}

/************************************/
/*Create an auto completion dropdown*/
/************************************/

function _searchCompletion(array, _function) {
  _searchDropdown(document.getElementById('search-input'), array);

  document.getElementById('search-bar').onsubmit = function(e) {
    e.preventDefault();
    let input = document.getElementById('search-input').value;
    let finalInput = input
      .toLowerCase()
      .split(' ')
      .join('');

    _function(input, finalInput);;
  };
}

/***********************/
/*Raw dropdown function*/
/***********************/

function _searchDropdown(inp, arr) {
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
    a.setAttribute('id', this.id + 'dropdown-list');
    a.setAttribute('class', 'dropdown-items');
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
    let x = document.getElementById(this.id + 'dropdown-list');
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
    x[currentFocus].classList.add('dropdown-active');
    inp.value = x[currentFocus].textContent;
  }

  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove('dropdown-active');
    }
  }

  function closeAllLists(elmnt) {
    let x = document.getElementsByClassName('dropdown-items');
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

/************************************/
/*Responsive navigation bar function*/
/************************************/

function responsiveNavigation() {
  let x = document.getElementById('navigation-bar__light');

  if (x.className === 'navigation-bar__light') {
    x.className += ' responsive';
  } else {
    x.className = 'navigation-bar__light';
  }
}
