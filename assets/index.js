const ripples = document.querySelectorAll('.ripple');
for (let i = 0; i < ripples.length; i++) {
  ripples[i].addEventListener('mousedown', rippleEffect, false);
}

function rippleEffect(e) {
  const width = this.clientWidth;
  const height = this.clientHeight;
  const rect = this.getBoundingClientRect();
  const posX = e.clientX - rect.left;
  const posY = e.clientY - rect.top;
  const size = Math.max(width, height);
  const effect = document.createElement('DIV');

  effect.className = 'effect';
  effect.style.width = size + 'px';
  effect.style.height = size + 'px';
  effect.style.top = posY - size / 2 + 'px';
  effect.style.left = posX - size / 2 + 'px';

  this.appendChild(effect);
  const parent = this;

  setTimeout(function() {
    parent.removeChild(effect);
  }, 750);
}

function themeToggle() {
  const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
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

function autocomplete(inp, arr) {
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
