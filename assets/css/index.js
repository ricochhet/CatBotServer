const ripples = document.querySelectorAll('.ripple');
for (var i = 0; i < ripples.length; i++) {
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
